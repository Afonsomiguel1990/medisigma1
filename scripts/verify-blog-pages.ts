import assert from 'node:assert/strict';

function argument(name: string, fallback: string) {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] || fallback : fallback;
}
function decode(value: string) {
  return value.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'").replace(/&nbsp;/g, ' ').replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)));
}
function text(html: string) {
  return decode(html.replace(/<(script|style|noscript|svg)\b[^>]*>[\s\S]*?<\/\1>/gi, '').replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();
}
function articleBody(html: string) {
  const opening = /<div\b[^>]*\bclass=["'][^"']*\bprose\s[^"']*["'][^>]*>/i.exec(html);
  if (!opening) return '';
  const start = opening.index + opening[0].length;
  const tags = /<div\b[^>]*>|<\/div\s*>/gi;
  tags.lastIndex = start;
  let depth = 1;
  for (let match = tags.exec(html); match; match = tags.exec(html)) {
    depth += /^<\//.test(match[0]) ? -1 : 1;
    if (!depth) return html.slice(start, match.index);
  }
  return '';
}
async function get(url: string) {
  return fetch(url, { method: 'GET', redirect: 'manual', signal: AbortSignal.timeout(30000), headers: { Accept: 'text/html', 'User-Agent': 'Medisigma-Blog-GET-Verification/1.0' } });
}
async function main() {
  const base = new URL(argument('--base-url', 'https://www.medisigma.pt'));
  const inventory = new URL(argument('--inventory-url', 'https://www.medisigma.pt/sitemap.xml'));
  const expected = Number(argument('--expected', '27'));
  assert.ok(Number.isInteger(expected) && expected > 0, '--expected must be a positive integer');
  const response = await get(inventory.href);
  assert.equal(response.status, 200, 'Public inventory must return HTTP 200');
  const xml = await response.text();
  const paths = [...new Set([...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => new URL(decode(match[1]))).filter(url => url.origin === 'https://www.medisigma.pt' && /^\/blog\/[^/]+\/$/.test(url.pathname)).map(url => url.pathname))];
  assert.equal(paths.length, expected, `Public blog inventory has ${paths.length} canonical articles; expected ${expected}`);
  const failures: string[] = [];
  const results: Array<{ path: string; title: string; h1: string; textCharacters: number }> = [];
  for (let offset = 0; offset < paths.length; offset += 3) {
    await Promise.all(paths.slice(offset, offset + 3).map(async path => {
      try {
        const page = await get(new URL(path, base).href);
        assert.equal(page.status, 200, 'HTML status must be 200 without redirects');
        assert.match(page.headers.get('content-type') || '', /^text\/html/i);
        const html = await page.text();
        const h1s = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)].map(match => text(match[1]));
        assert.equal(h1s.length, 1, 'Article must have exactly one H1');
        assert.ok(h1s[0].length > 5, 'H1 must contain real article text');
        const title = text(html.match(/<title>([\s\S]*?)<\/title>/i)?.[1] || '');
        assert.ok(title.length > 10, 'Article title is missing');
        assert.ok((title.match(/medisigma/gi) || []).length <= 1, 'Brand duplicated in title');
        const canonicalTag = html.match(/<link\b(?=[^>]*\brel=["']canonical["'])[^>]*>/i)?.[0] || '';
        const canonical = decode(canonicalTag.match(/\bhref=["']([^"']+)["']/i)?.[1] || '');
        assert.equal(canonical, `https://www.medisigma.pt${path}`, 'Canonical must match the public inventory');
        const article = html.match(/<article\b[^>]*>([\s\S]*?)<\/article>/i)?.[1];
        assert.ok(article, 'Article element missing');
        const body = articleBody(article!);
        assert.ok(body, 'Rendered MDX body is missing');
        const content = text(body);
        assert.ok(content.length > 500, 'Article HTML has too little visible content');
        assert.doesNotMatch(content, /Erro ao carregar o conteúdo deste artigo|Application error|Internal Server Error|Post Não Encontrado/i, 'Article exposes an error fallback');
        results.push({ path, title, h1: h1s[0], textCharacters: content.length });
      } catch (error) { failures.push(`${path}: ${error instanceof Error ? error.message : String(error)}`); }
    }));
  }
  console.log(JSON.stringify({ checkedAt: new Date().toISOString(), base: base.origin, inventory: inventory.href, expected, passed: results.length, failed: failures.length, results: results.sort((a,b) => a.path.localeCompare(b.path)), failures }, null, 2));
  assert.equal(failures.length, 0, 'One or more public articles failed verification');
}
main().catch(error => { console.error(error instanceof Error ? error.message : error); process.exitCode = 1; });
