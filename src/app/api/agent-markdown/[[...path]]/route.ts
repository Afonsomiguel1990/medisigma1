import type { NextRequest } from "next/server";
import { agentFriendlyNotFoundMarkdown } from "@/lib/agent-recovery";
import { appendVaryAccept } from "@/lib/content-negotiation";
import { htmlToMarkdown } from "@/lib/markdown";
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

function applyCacheHeaders(headers: Headers, status: number) {
  if (status >= 500) {
    headers.set("Cache-Control", "no-store");
    headers.set("CDN-Cache-Control", "no-store");
    headers.set("Vercel-CDN-Cache-Control", "no-store");
    return;
  }

  const edgePolicy =
    status === 404
      ? "public, max-age=60, stale-while-revalidate=600"
      : "public, max-age=300, stale-while-revalidate=86400";
  headers.set("Cache-Control", "public, max-age=0, must-revalidate");
  headers.set("CDN-Cache-Control", edgePolicy);
  headers.set("Vercel-CDN-Cache-Control", edgePolicy);
}

function responseHeaders(source: Response | null, status: number) {
  const headers = new Headers();
  const sourceVary = source?.headers.get("Vary");

  if (sourceVary) headers.set("Vary", sourceVary);
  appendVaryAccept(headers);
  applyCacheHeaders(headers, status);
  headers.set("Content-Type", "text/markdown; charset=utf-8");

  if (status >= 400) headers.set("X-Robots-Tag", "noindex, nofollow");
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

async function markdownResponse(
  request: NextRequest,
  context: RouteContext,
  includeBody: boolean,
) {
  if (!request.headers.has(ORIGINAL_PATH_HEADER)) {
    return new Response(includeBody ? "Not found.\n" : null, {
      status: 404,
      headers: responseHeaders(null, 404),
    });
  }

  const path = await originalPath(request, context);
  const origin = request.nextUrl.origin;

  if (!path.startsWith("/") || path.startsWith("//")) {
    return new Response(includeBody ? "Invalid source path.\n" : null, {
      status: 400,
      headers: responseHeaders(null, 400),
    });
  }

  const sourceUrl = new URL(path, origin);
  if (
    sourceUrl.origin !== origin ||
    !isNegotiablePublicPath(sourceUrl.pathname)
  ) {
    return new Response(includeBody ? "Source path is not public.\n" : null, {
      status: 404,
      headers: responseHeaders(null, 404),
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
          request.headers.get("user-agent") || "Medisigma-Markdown-Renderer/1.0",
      },
    });

    const headers = responseHeaders(source, source.status);
    headers.set("Content-Location", sourceUrl.toString());

    if (source.status >= 300 && source.status < 400) {
      const location = source.headers.get("Location");
      if (location) headers.set("Location", location);
      return new Response(null, { status: source.status, headers });
    }

    if (source.status === 404) {
      return new Response(
        includeBody ? agentFriendlyNotFoundMarkdown(origin) : null,
        { status: 404, headers },
      );
    }

    const contentType = source.headers.get("content-type") || "";
    const html = await source.text();
    const markdown = contentType.includes("text/html")
      ? htmlToMarkdown(html)
      : `${html.trim()}\n`;

    return new Response(includeBody ? markdown : null, {
      status: source.status,
      headers,
    });
  } catch (error) {
    console.error("Markdown representation failed", error);
    return new Response(
      includeBody ? "# Representação temporariamente indisponível\n" : null,
      { status: 502, headers: responseHeaders(null, 502) },
    );
  }
}

export function GET(request: NextRequest, context: RouteContext) {
  return markdownResponse(request, context, true);
}

export function HEAD(request: NextRequest, context: RouteContext) {
  return markdownResponse(request, context, false);
}
