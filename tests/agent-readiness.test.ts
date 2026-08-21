import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { NextRequest } from "next/server";
import { GET as getHtmlRepresentation } from "../src/app/api/agent-html/[[...path]]/route";
import { GET as getMarkdownRepresentation } from "../src/app/api/agent-markdown/[[...path]]/route";
import {
  appendVaryAccept,
  HTML_MEDIA_TYPE,
  MARKDOWN_MEDIA_TYPE,
  negotiatePublicRepresentation,
} from "../src/lib/content-negotiation";
import { htmlToMarkdown } from "../src/lib/markdown";
import {
  MEDISIGMA,
  MEDISIGMA_POSTAL_ADDRESS,
  organizationAndWebsiteJsonLd,
} from "../src/lib/organization";
import {
  canonicalTrailingSlashPath,
  isNegotiablePublicPath,
  isSafeBlogPath,
  ORIGINAL_PATH_HEADER,
  REPRESENTATION_SOURCE_HEADER,
} from "../src/lib/public-routes";
import { middleware } from "../src/middleware";

test("Accept negotiation respects defaults, weights, wildcards and exclusions", () => {
  const cases: Array<[string | null, string | null]> = [
    [null, HTML_MEDIA_TYPE],
    ["*/*", HTML_MEDIA_TYPE],
    ["text/html", HTML_MEDIA_TYPE],
    ["text/markdown", MARKDOWN_MEDIA_TYPE],
    ["text/html;q=0.8, text/markdown;q=1", MARKDOWN_MEDIA_TYPE],
    ["text/markdown;q=0.4, text/html;q=0.9", HTML_MEDIA_TYPE],
    ["text/markdown;q=0, text/*;q=0.8", HTML_MEDIA_TYPE],
    ["text/html;q=0, */*;q=0.8", MARKDOWN_MEDIA_TYPE],
    ["text/*;q=0, text/markdown;q=0.7", MARKDOWN_MEDIA_TYPE],
    ["text/markdown, text/html", MARKDOWN_MEDIA_TYPE],
    ["application/json", null],
    ["text/html;q=0, text/markdown;q=0", null],
  ];

  for (const [accept, expected] of cases) {
    assert.equal(negotiatePublicRepresentation(accept), expected, accept || "absent");
  }
});

test("Vary preserves existing values and adds Accept only once", () => {
  const headers = new Headers({
    Vary: "RSC, Next-Router-State-Tree, Accept-Encoding",
  });
  appendVaryAccept(headers);
  appendVaryAccept(headers);

  assert.equal(
    headers.get("Vary"),
    "RSC, Next-Router-State-Tree, Accept-Encoding, Accept",
  );
});

test("public route classification only normalizes known pages", () => {
  assert.equal(canonicalTrailingSlashPath("/contact"), "/contact/");
  assert.equal(canonicalTrailingSlashPath("/servicos/legionella"), "/servicos/legionella/");
  assert.equal(canonicalTrailingSlashPath("/does-not-exist"), null);
  assert.equal(canonicalTrailingSlashPath("/blog/unknown-slug"), null);

  assert.equal(isNegotiablePublicPath("/contact/"), true);
  assert.equal(isNegotiablePublicPath("/does-not-exist"), true);
  assert.equal(isNegotiablePublicPath("/api/contact"), false);
  assert.equal(isNegotiablePublicPath("/admin/blog"), false);
  assert.equal(isNegotiablePublicPath("/estatisticas/"), false);
  assert.equal(isNegotiablePublicPath("/llms.txt"), false);
  assert.equal(isNegotiablePublicPath("/sitemap.xml"), false);
  assert.equal(isSafeBlogPath("/blog/artigo-seguro/"), true);
  assert.equal(isSafeBlogPath("/blog/../admin"), false);
});

test("HTML transformation removes executable and navigation chrome", () => {
  const markdown = htmlToMarkdown(`<!doctype html>
    <html><head><title>Página de Teste</title><style>.hidden{}</style><script>alert(1)</script></head>
    <body><header>Navegação global</header><nav>Menu</nav><main>
      <h1>Conteúdo principal</h1><p>Texto útil com <a href="/contact/">contacto</a>.</p>
      <svg><text>Ícone interno</text></svg><form><label>Segredo</label><input /></form>
      <section data-agent-ignore><h2>Ignorar esta secção</h2></section>
    </main><footer>Rodapé repetido</footer></body></html>`);

  assert.match(markdown, /^# Conteúdo principal/m);
  assert.match(markdown, /Texto útil com \[contacto\]\(\/contact\/\)/);
  assert.doesNotMatch(markdown, /alert|Navegação|Menu|Ícone|Segredo|Ignorar|Rodapé/);
});

test("middleware exposes the negotiated HTTP contract without redirecting unknown paths", async () => {
  const html = middleware(
    new NextRequest("https://www.medisigma.pt/caminho-inexistente", {
      headers: { Accept: "text/html" },
    }),
  );
  assert.equal(html.status, 200);
  assert.equal(html.headers.get("Location"), null);
  assert.match(html.headers.get("Vary") || "", /(?:^|,\s*)Accept(?:,|$)/i);

  const markdown = middleware(
    new NextRequest("https://www.medisigma.pt/contact/", {
      headers: { Accept: "text/markdown" },
    }),
  );
  assert.match(
    markdown.headers.get("x-middleware-rewrite") || "",
    /\/api\/agent-markdown\/contact\/$/,
  );
  assert.match(markdown.headers.get("Vary") || "", /Accept/i);

  const incompatible = middleware(
    new NextRequest("https://www.medisigma.pt/", {
      headers: { Accept: "application/json" },
    }),
  );
  assert.equal(incompatible.status, 406);
  assert.match(incompatible.headers.get("Vary") || "", /Accept/i);

  const canonical = middleware(
    new NextRequest("https://www.medisigma.pt/contact", {
      headers: { Accept: "text/html" },
    }),
  );
  assert.equal(canonical.status, 308);
  assert.equal(canonical.headers.get("Location"), "https://www.medisigma.pt/contact/");

  const canonicalWithQuery = middleware(
    new NextRequest("https://www.medisigma.pt/contact?utm_source=agent", {
      headers: { Accept: "text/html" },
    }),
  );
  assert.equal(
    canonicalWithQuery.headers.get("Location"),
    "https://www.medisigma.pt/contact/?utm_source=agent",
  );

  const blocked = middleware(
    new NextRequest("https://www.medisigma.pt/wp-admin", {
      headers: { Accept: "text/markdown" },
    }),
  );
  assert.equal(blocked.status, 404);
  assert.match(blocked.headers.get("Content-Type") || "", /^text\/markdown/);
  assert.match(blocked.headers.get("X-Robots-Tag") || "", /noindex/);
  assert.match(await blocked.text(), /sitemap\.xml/);

  const rsc = middleware(
    new NextRequest("https://www.medisigma.pt/contact/", {
      headers: { Accept: "*/*", RSC: "1" },
    }),
  );
  assert.equal(rsc.headers.get("x-middleware-rewrite"), null);
  assert.equal(rsc.headers.get("x-middleware-next"), "1");

  const api = middleware(
    new NextRequest("https://www.medisigma.pt/api/contact", {
      headers: { Accept: "text/markdown" },
    }),
  );
  assert.equal(api.headers.get("x-middleware-rewrite"), null);
  assert.equal(api.headers.get("Vary"), null);
});

test("representation handlers preserve status and emit recoverable Markdown 404s", async () => {
  const originalFetch = globalThis.fetch;
  const requests: Request[] = [];
  const context = { params: Promise.resolve({ path: ["missing"] }) };

  try {
    globalThis.fetch = async (input, init) => {
      requests.push(new Request(input, init));
      return new Response(
        "<!doctype html><html><head><title>Não existe</title></head><body><h1>Não existe</h1></body></html>",
        {
          status: 404,
          headers: {
            "Content-Type": "text/html; charset=utf-8",
            Vary: "RSC, Accept-Encoding",
          },
        },
      );
    };

    const request = new NextRequest(
      "https://www.medisigma.pt/api/agent-markdown/missing/",
      { headers: { [ORIGINAL_PATH_HEADER]: "/missing/" } },
    );
    const response = await getMarkdownRepresentation(request, context);

    assert.equal(response.status, 404);
    assert.match(response.headers.get("Content-Type") || "", /^text\/markdown/);
    assert.equal(response.headers.get("Vary"), "RSC, Accept-Encoding, Accept");
    assert.match(response.headers.get("CDN-Cache-Control") || "", /max-age=60/);
    assert.match(response.headers.get("X-Robots-Tag") || "", /noindex/);
    assert.match(await response.text(), /sitemap\.xml/);
    assert.equal(requests.length, 1);
    assert.equal(requests[0].headers.get(REPRESENTATION_SOURCE_HEADER), "1");
    assert.equal(requests[0].headers.get("Accept"), "text/html");

    globalThis.fetch = async () =>
      new Response(
        "<!doctype html><html><head><title>Removido</title></head><body><h1>Conteúdo removido</h1><p>Este conteúdo deixou de estar disponível.</p></body></html>",
        { status: 410, headers: { "Content-Type": "text/html" } },
      );

    const gone = await getMarkdownRepresentation(request, context);
    assert.equal(gone.status, 410);
    assert.match(await gone.text(), /^# Conteúdo removido/m);

    globalThis.fetch = async () =>
      new Response("<html><body><h1>404 visual</h1></body></html>", {
        status: 404,
        headers: { "Content-Type": "text/html", Vary: "RSC" },
      });
    const html = await getHtmlRepresentation(
      new NextRequest("https://www.medisigma.pt/api/agent-html/missing/", {
        headers: { [ORIGINAL_PATH_HEADER]: "/missing/" },
      }),
      context,
    );
    assert.equal(html.status, 404);
    assert.equal(html.headers.get("Vary"), "RSC, Accept");
    assert.match(html.headers.get("X-Robots-Tag") || "", /noindex/);
    assert.match(await html.text(), /404 visual/);

    const directInternal = await getMarkdownRepresentation(
      new NextRequest("https://www.medisigma.pt/api/agent-markdown/contact/"),
      { params: Promise.resolve({ path: ["contact"] }) },
    );
    assert.equal(directInternal.status, 404);
    assert.match(directInternal.headers.get("X-Robots-Tag") || "", /noindex/);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("Organization and WebSite JSON-LD expose the complete public NAP", () => {
  const graph = organizationAndWebsiteJsonLd["@graph"];
  const organization = graph.find((item) => item["@type"] === "Organization");
  const website = graph.find((item) => item["@type"] === "WebSite");

  assert.ok(organization);
  assert.ok(website);
  assert.equal(organization.legalName, MEDISIGMA.legalName);
  assert.equal(organization.email, MEDISIGMA.email);
  assert.equal(organization.telephone, MEDISIGMA.telephone);
  assert.equal(organization.address.streetAddress, MEDISIGMA.streetAddress);
  assert.equal(organization.address.postalCode, MEDISIGMA.postalCode);
  assert.equal(organization.contactPoint.email, MEDISIGMA.email);
  assert.deepEqual(organization.sameAs, [MEDISIGMA.linkedin]);
  assert.equal(MEDISIGMA_POSTAL_ADDRESS, "Zona Industrial, Via 2, Lote 5, 2200-293 Abrantes");
});

test("llms.txt follows the v2 heading and link-list structure", async () => {
  const llms = await readFile("public/llms.txt", "utf8");
  const lines = llms.split(/\r?\n/);
  const headings = lines.filter((line) => /^#{1,6}\s/.test(line));

  assert.equal(lines[0], "# Medisigma");
  assert.match(lines[2], /^> /);
  assert.ok(headings.some((line) => line === "## Quando usar a Medisigma"));
  assert.ok(headings.every((line) => /^#(?:#)?\s/.test(line)));
  assert.match(llms, /Accept: text\/markdown/);
  assert.match(llms, /não realiza diagnóstico clínico/i);
  assert.match(llms, /não enviar dados clínicos/i);

  let insideFileList = false;
  for (const line of lines) {
    if (/^##\s/.test(line)) {
      insideFileList = true;
      continue;
    }
    if (insideFileList && line.trim()) {
      assert.match(line, /^- \[[^\]]+\]\(https?:\/\/[^)]+\): /);
    }
  }
});
