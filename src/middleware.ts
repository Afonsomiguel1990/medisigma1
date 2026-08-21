import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { requireAdminAuth } from "@/lib/admin-auth";
import {
  appendVaryAccept,
  MARKDOWN_MEDIA_TYPE,
  negotiatePublicRepresentation,
} from "@/lib/content-negotiation";
import { agentFriendlyNotFoundMarkdown } from "@/lib/agent-recovery";
import {
  canonicalTrailingSlashPath,
  INTERNAL_HTML_PREFIX,
  INTERNAL_MARKDOWN_PREFIX,
  isNegotiablePublicPath,
  isSafeBlogPath,
  ORIGINAL_PATH_HEADER,
  REPRESENTATION_SOURCE_HEADER,
} from "@/lib/public-routes";

const SUSPICIOUS_PATTERNS = [
  /^\/zootopia/i,
  /^\/product\//i,
  /^\/beast/i,
  /torrent/i,
  /download/i,
  /\.php$/i,
  /\.asp$/i,
  /\.jsp$/i,
  /wp-admin/i,
  /wp-content/i,
  /wp-includes/i,
  /administrator/i,
  /\.env$/i,
  /config\.php/i,
  /phpmyadmin/i,
];

function withAcceptVary(response: NextResponse) {
  appendVaryAccept(response.headers);
  return response;
}

function redirect(request: NextRequest, pathname: string, status = 308) {
  const url = new URL(request.url);
  url.pathname = pathname;
  return withAcceptVary(NextResponse.redirect(url, status));
}

function notAcceptable(request: NextRequest) {
  const body =
    request.method === "HEAD"
      ? null
      : "Not Acceptable. Available representations: text/html, text/markdown.\n";
  const response = new NextResponse(body, {
    status: 406,
    headers: {
      "Cache-Control": "no-store",
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
  return withAcceptVary(response);
}

function directNotFound(request: NextRequest) {
  const representation = negotiatePublicRepresentation(
    request.headers.get("accept"),
  );
  const origin = request.nextUrl.origin;
  const markdown = representation === MARKDOWN_MEDIA_TYPE;
  const html = `<!doctype html><html lang="pt"><head><meta charset="utf-8"><meta name="robots" content="noindex,nofollow"><title>404 — Página não encontrada</title></head><body><main><h1>404 — Página não encontrada</h1><p>A página pedida não existe ou foi movida.</p><ul><li><a href="/sitemap.xml">Mapa do site</a></li><li><a href="/llms.txt">Instruções para agentes</a></li><li><a href="/servicos/">Serviços</a></li><li><a href="/blog/">Blog</a></li><li><a href="/contact/">Contactos</a></li></ul></main></body></html>`;
  const body =
    request.method === "HEAD"
      ? null
      : markdown
        ? agentFriendlyNotFoundMarkdown(origin)
        : html;

  const response = new NextResponse(body, {
    status: 404,
    headers: {
      "Cache-Control": "no-store",
      "Content-Type": markdown
        ? "text/markdown; charset=utf-8"
        : "text/html; charset=utf-8",
      "X-Robots-Tag": "noindex, nofollow",
    },
  });
  return withAcceptVary(response);
}

function representationRewrite(request: NextRequest, internalPrefix: string) {
  const url = request.nextUrl.clone();
  url.pathname = `${internalPrefix}${request.nextUrl.pathname}`;

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set(
    ORIGINAL_PATH_HEADER,
    `${request.nextUrl.pathname}${request.nextUrl.search}`,
  );

  const response = NextResponse.rewrite(url, {
    request: { headers: requestHeaders },
  });
  return withAcceptVary(response);
}

function isNextRouterRequest(request: NextRequest) {
  return (
    request.headers.has("rsc") ||
    request.headers.has("next-router-state-tree") ||
    request.headers.has("next-router-prefetch") ||
    request.headers.has("next-router-segment-prefetch")
  );
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isStaticAsset =
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.startsWith("/images") ||
    pathname.startsWith("/public") ||
    /\.(ico|png|jpg|jpeg|svg|gif|webp|css|js|woff|woff2|ttf|eot)$/i.test(
      pathname,
    );

  if (pathname === "/controlo_pragas.php") {
    return redirect(request, "/servicos/controlo-pragas/", 301);
  }

  if (pathname.startsWith("/admin") && !isStaticAsset) {
    const authError = requireAdminAuth(request);
    if (authError) return authError;
  }

  if (pathname.startsWith("/api") || isStaticAsset) {
    return NextResponse.next();
  }

  if (pathname === "/privacy" || pathname === "/privacy/") {
    return redirect(request, "/politica-de-privacidade/");
  }

  for (const pattern of SUSPICIOUS_PATTERNS) {
    if (pattern.test(pathname)) return directNotFound(request);
  }

  if (!isSafeBlogPath(pathname)) return directNotFound(request);

  if (
    request.headers.get(REPRESENTATION_SOURCE_HEADER) === "1" ||
    !isNegotiablePublicPath(pathname) ||
    (request.method !== "GET" && request.method !== "HEAD")
  ) {
    return NextResponse.next();
  }

  const canonicalPath = canonicalTrailingSlashPath(pathname);
  if (canonicalPath) return redirect(request, canonicalPath);

  if (isNextRouterRequest(request)) return NextResponse.next();

  const representation = negotiatePublicRepresentation(
    request.headers.get("accept"),
  );

  if (representation === null) return notAcceptable(request);
  if (representation === MARKDOWN_MEDIA_TYPE) {
    return representationRewrite(request, INTERNAL_MARKDOWN_PREFIX);
  }

  return representationRewrite(request, INTERNAL_HTML_PREFIX);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
