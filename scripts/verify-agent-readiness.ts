import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { MEDISIGMA } from "../src/lib/organization";

type HtmlAnalysis = {
  textCharacters: number;
  efficiency: number;
  headings: Array<{ level: number; text: string }>;
  jsonLd: unknown[];
};

function decodeEntities(value: string) {
  return value
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCodePoint(parseInt(code, 16)))
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">");
}

function visibleText(html: string) {
  return decodeEntities(
    html
      .replace(/<(script|style|noscript|svg)\b[^>]*>[\s\S]*?<\/\1>/gi, " ")
      .replace(/<!--([\s\S]*?)-->/g, " ")
      .replace(/<[^>]+>/g, " "),
  )
    .replace(/\s+/g, " ")
    .trim();
}

function analyzeHtml(html: string): HtmlAnalysis {
  const withoutNonContent = html.replace(
    /<(script|style|noscript|svg)\b[^>]*>[\s\S]*?<\/\1>/gi,
    " ",
  );
  const headings = Array.from(
    withoutNonContent.matchAll(/<h([1-6])\b[^>]*>([\s\S]*?)<\/h\1>/gi),
    (match) => ({
      level: Number(match[1]),
      text: visibleText(match[2]),
    }),
  );
  const jsonLd = Array.from(
    html.matchAll(
      /<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi,
    ),
    (match) => JSON.parse(decodeEntities(match[1])),
  );
  const text = visibleText(html);

  return {
    textCharacters: text.length,
    efficiency: (text.length / html.length) * 100,
    headings,
    jsonLd,
  };
}

function jsonLdNodes(documents: unknown[]) {
  return documents.flatMap((document) => {
    if (!document || typeof document !== "object") return [];
    const record = document as Record<string, unknown>;
    return Array.isArray(record["@graph"])
      ? (record["@graph"] as Array<Record<string, unknown>>)
      : [record];
  });
}

function assertHomepage(html: string, label: string) {
  const analysis = analyzeHtml(html);
  const h1 = analysis.headings.filter((heading) => heading.level === 1);

  assert.ok(analysis.textCharacters > 500, `${label}: raw HTML needs more than 500 text characters`);
  assert.equal(h1.length, 1, `${label}: expected exactly one H1, got ${h1.length}`);

  for (let index = 1; index < analysis.headings.length; index += 1) {
    const previous = analysis.headings[index - 1];
    const current = analysis.headings[index];
    assert.ok(
      current.level <= previous.level + 1,
      `${label}: heading jump H${previous.level} → H${current.level} before "${current.text}"`,
    );
  }

  assert.ok(
    analysis.efficiency >= 5,
    `${label}: content efficiency ${analysis.efficiency.toFixed(2)}% is below 5%`,
  );

  const nodes = jsonLdNodes(analysis.jsonLd);
  const organization = nodes.find(
    (node) => node["@type"] === "Organization",
  ) as Record<string, any> | undefined;
  const website = nodes.find((node) => node["@type"] === "WebSite");
  const faq = nodes.find((node) => node["@type"] === "FAQPage");

  assert.ok(organization, `${label}: Organization JSON-LD missing`);
  assert.ok(website, `${label}: WebSite JSON-LD missing`);
  assert.ok(faq, `${label}: FAQPage JSON-LD missing`);
  assert.equal(organization.legalName, MEDISIGMA.legalName);
  assert.equal(organization.email, MEDISIGMA.email);
  assert.equal(organization.telephone, MEDISIGMA.telephone);
  assert.equal(organization.address?.streetAddress, MEDISIGMA.streetAddress);
  assert.equal(organization.address?.postalCode, MEDISIGMA.postalCode);
  assert.equal(organization.contactPoint?.email, MEDISIGMA.email);
  assert.equal(organization.contactPoint?.telephone, MEDISIGMA.telephone);

  const target = analysis.efficiency >= 5.25 ? "target met" : "minimum met; target is 5.25%";
  console.log(
    `${label}: ${analysis.textCharacters} text chars, ${analysis.efficiency.toFixed(2)}% efficiency (${target}), ${analysis.headings.length} headings, ${analysis.jsonLd.length} JSON-LD blocks`,
  );
  return analysis;
}

async function verifyBuild() {
  const homepagePath = path.join(process.cwd(), ".next", "server", "app", "index.html");
  const html = await readFile(homepagePath, "utf8");
  assertHomepage(html, "build homepage");
}

function assertVaryAccept(response: Response, label: string) {
  assert.match(response.headers.get("Vary") || "", /(?:^|,\s*)Accept(?:,|$)/i, `${label}: Vary must include Accept`);
}

async function fetchChecked(url: string, init: RequestInit = {}) {
  return fetch(url, {
    redirect: "manual",
    ...init,
    headers: {
      "User-Agent": "Medisigma-Agent-Readiness-Verification/1.0",
      ...(init.headers || {}),
    },
  });
}

async function inBatches<T>(items: T[], size: number, task: (item: T) => Promise<void>) {
  for (let index = 0; index < items.length; index += size) {
    await Promise.all(items.slice(index, index + size).map(task));
  }
}

async function verifyLive(baseUrlInput: string) {
  const baseUrl = new URL(baseUrlInput);
  const root = new URL("/", baseUrl).toString();
  const sitemapResponse = await fetchChecked(new URL("/sitemap.xml", baseUrl).toString());
  assert.equal(sitemapResponse.status, 200, "sitemap.xml status");
  const sitemap = await sitemapResponse.text();
  const canonicalUrls = Array.from(
    sitemap.matchAll(/<loc>(.*?)<\/loc>/g),
    (match) => decodeEntities(match[1]),
  );
  const urls = canonicalUrls.map((canonicalUrl) => {
    const parsed = new URL(canonicalUrl);
    return new URL(`${parsed.pathname}${parsed.search}`, baseUrl).toString();
  });
  assert.ok(urls.length > 0, "sitemap.xml must contain URLs");

  await inBatches(urls, 6, async (url) => {
    const html = await fetchChecked(url, { headers: { Accept: "text/html" } });
    assert.equal(html.status, 200, `${url}: HTML status`);
    assert.match(html.headers.get("Content-Type") || "", /^text\/html/i, `${url}: HTML type`);
    assertVaryAccept(html, `${url} HTML`);

    const markdown = await fetchChecked(url, { headers: { Accept: "text/markdown" } });
    assert.equal(markdown.status, 200, `${url}: Markdown status`);
    assert.match(markdown.headers.get("Content-Type") || "", /^text\/markdown/i, `${url}: Markdown type`);
    assertVaryAccept(markdown, `${url} Markdown`);
    const edgeCache =
      markdown.headers.get("CDN-Cache-Control") ||
      markdown.headers.get("Vercel-CDN-Cache-Control") ||
      markdown.headers.get("Cache-Control") ||
      "";
    assert.match(edgeCache, /(?:s-maxage|max-age)=/i, `${url}: Markdown cache`);
    assert.ok((await markdown.text()).trim().length > 80, `${url}: Markdown content is unexpectedly short`);
  });

  for (const machinePath of ["/robots.txt", "/llms.txt", "/sitemap.xml"]) {
    const response = await fetchChecked(new URL(machinePath, baseUrl).toString());
    assert.equal(response.status, 200, `${machinePath} status`);
  }

  for (const trustPath of [
    "/sobre-nos/",
    "/contact/",
    "/politica-de-privacidade/",
  ]) {
    const response = await fetchChecked(new URL(trustPath, baseUrl).toString(), {
      headers: { Accept: "text/markdown" },
    });
    assert.equal(response.status, 200, `${trustPath}: trust page status`);
    assert.ok(
      (await response.text()).trim().length >= 500,
      `${trustPath}: trust page needs at least 500 Markdown characters`,
    );
  }

  for (const alias of ["/privacy", "/privacy/"]) {
    const response = await fetchChecked(new URL(alias, baseUrl).toString());
    assert.ok([301, 308].includes(response.status), `${alias}: permanent redirect expected`);
    assert.equal(
      new URL(response.headers.get("Location") || "", baseUrl).pathname,
      "/politica-de-privacidade/",
      `${alias}: canonical destination`,
    );
  }

  const about = await fetchChecked(new URL("/about/", baseUrl).toString());
  assert.ok(about.status >= 300 && about.status < 400, "/about/ must remain an alias");
  assert.equal(new URL(about.headers.get("Location") || "", baseUrl).pathname, "/sobre-nos/");

  const incompatible = await fetchChecked(root, { headers: { Accept: "application/json" } });
  assert.equal(incompatible.status, 406, "incompatible Accept status");
  assertVaryAccept(incompatible, "406 response");

  const probePath = `/agent-readiness-probe-${Date.now()}`;
  const missingHtml = await fetchChecked(new URL(probePath, baseUrl).toString(), {
    headers: { Accept: "text/html" },
  });
  assert.equal(missingHtml.status, 404, "unknown HTML path status");
  assert.equal(missingHtml.headers.get("Location"), null, "unknown path must not redirect");
  assertVaryAccept(missingHtml, "HTML 404");
  assert.match(await missingHtml.text(), /sitemap\.xml|llms\.txt/i, "HTML 404 recovery links");

  const missingMarkdown = await fetchChecked(new URL(probePath, baseUrl).toString(), {
    headers: { Accept: "text/markdown" },
  });
  assert.equal(missingMarkdown.status, 404, "unknown Markdown path status");
  assert.match(missingMarkdown.headers.get("Content-Type") || "", /^text\/markdown/i);
  assert.match(missingMarkdown.headers.get("X-Robots-Tag") || "", /noindex/i);
  assertVaryAccept(missingMarkdown, "Markdown 404");
  assert.match(await missingMarkdown.text(), /sitemap\.xml/);

  const markdownHead = await fetchChecked(root, {
    method: "HEAD",
    headers: { Accept: "text/markdown" },
  });
  assert.equal(markdownHead.status, 200, "Markdown HEAD status");
  assert.match(markdownHead.headers.get("Content-Type") || "", /^text\/markdown/i);
  assertVaryAccept(markdownHead, "Markdown HEAD");

  const homepage = await fetchChecked(root, { headers: { Accept: "text/html" } });
  assert.equal(homepage.status, 200);
  assertHomepage(await homepage.text(), "live homepage");

  console.log(`live endpoints: ${urls.length} sitemap URLs verified in HTML and Markdown`);
}

async function main() {
  const baseUrlIndex = process.argv.indexOf("--base-url");
  if (baseUrlIndex !== -1) {
    const baseUrl = process.argv[baseUrlIndex + 1];
    assert.ok(baseUrl, "--base-url requires a URL");
    await verifyLive(baseUrl);
    return;
  }

  await verifyBuild();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
