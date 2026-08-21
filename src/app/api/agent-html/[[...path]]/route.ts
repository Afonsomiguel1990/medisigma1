import type { NextRequest } from "next/server";
import { appendVaryAccept } from "@/lib/content-negotiation";
import {
  isNegotiablePublicPath,
  ORIGINAL_PATH_HEADER,
  REPRESENTATION_SOURCE_HEADER,
} from "@/lib/public-routes";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type RouteContext = {
  params: Promise<{ path?: string[] }>;
};

const FORWARDED_HEADERS = [
  "Cache-Control",
  "CDN-Cache-Control",
  "Content-Language",
  "Content-Security-Policy",
  "ETag",
  "Last-Modified",
  "Link",
  "Permissions-Policy",
  "Referrer-Policy",
  "Vercel-CDN-Cache-Control",
  "X-Content-Type-Options",
  "X-Frame-Options",
  "X-Robots-Tag",
] as const;

function responseHeaders(source: Response, status: number) {
  const headers = new Headers();

  for (const name of FORWARDED_HEADERS) {
    const value = source.headers.get(name);
    if (value) headers.set(name, value);
  }

  headers.set(
    "Content-Type",
    source.headers.get("Content-Type") || "text/html; charset=utf-8",
  );
  const sourceVary = source.headers.get("Vary");
  if (sourceVary) headers.set("Vary", sourceVary);
  appendVaryAccept(headers);

  if (status === 404) headers.set("X-Robots-Tag", "noindex, nofollow");
  return headers;
}

async function originalPath(request: NextRequest, context: RouteContext) {
  const supplied = request.headers.get(ORIGINAL_PATH_HEADER);
  if (supplied) return supplied;

  const { path = [] } = await context.params;
  return `/${path.map(encodeURIComponent).join("/")}${
    request.nextUrl.pathname.endsWith("/") ? "/" : ""
  }${request.nextUrl.search}`;
}

async function htmlResponse(
  request: NextRequest,
  context: RouteContext,
  includeBody: boolean,
) {
  if (!request.headers.has(ORIGINAL_PATH_HEADER)) {
    const headers = new Headers({
      "Cache-Control": "no-store",
      "Content-Type": "text/plain; charset=utf-8",
      "X-Robots-Tag": "noindex, nofollow",
    });
    appendVaryAccept(headers);
    return new Response(includeBody ? "Not found.\n" : null, {
      status: 404,
      headers,
    });
  }

  const path = await originalPath(request, context);
  const origin = request.nextUrl.origin;

  if (!path.startsWith("/") || path.startsWith("//")) {
    return new Response(includeBody ? "Invalid source path.\n" : null, {
      status: 400,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }

  const sourceUrl = new URL(path, origin);
  if (
    sourceUrl.origin !== origin ||
    !isNegotiablePublicPath(sourceUrl.pathname)
  ) {
    return new Response(includeBody ? "Not found.\n" : null, {
      status: 404,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "X-Robots-Tag": "noindex, nofollow",
      },
    });
  }

  try {
    const source = await fetch(sourceUrl, {
      method: "GET",
      redirect: "manual",
      cache: "no-store",
      headers: {
        Accept: "text/html",
        [REPRESENTATION_SOURCE_HEADER]: "1",
        "User-Agent":
          request.headers.get("user-agent") || "Medisigma-HTML-Renderer/1.0",
      },
    });
    const headers = responseHeaders(source, source.status);

    if (source.status >= 300 && source.status < 400) {
      const location = source.headers.get("Location");
      if (location) headers.set("Location", location);
      return new Response(null, { status: source.status, headers });
    }

    const body = includeBody ? await source.arrayBuffer() : null;
    return new Response(body, { status: source.status, headers });
  } catch (error) {
    console.error("HTML representation failed", error);
    return new Response(
      includeBody ? "HTML representation temporarily unavailable.\n" : null,
      {
        status: 502,
        headers: {
          "Cache-Control": "no-store",
          "Content-Type": "text/plain; charset=utf-8",
        },
      },
    );
  }
}

export function GET(request: NextRequest, context: RouteContext) {
  return htmlResponse(request, context, true);
}

export function HEAD(request: NextRequest, context: RouteContext) {
  return htmlResponse(request, context, false);
}
