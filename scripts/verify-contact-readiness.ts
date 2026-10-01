import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { hasEmDash } from './check-public-copy.mjs';

const origin = (process.argv[2] || 'http://127.0.0.1:3086').replace(/\/$/, '');
const results: { path: string; status: number; markdownStatus: number }[] = [];
function publicText(html: string) {
  const jsonLd = [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)].map(match => match[1]).join('\n');
  return html.replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi, '').replace(/<svg\b[^>]*>[\s\S]*?<\/svg>/gi, '') + jsonLd;
}

async function main() {
  const sitemap = await fetch(origin + '/sitemap.xml');
  assert.equal(sitemap.status, 200);
  const paths = [...(await sitemap.text()).matchAll(/<loc>(.*?)<\/loc>/g)].map(match => new URL(match[1]).pathname);
  paths.push('/pagina-inexistente-contacto/', '/zootopia', '/contact/?enviado=1', '/pedir-proposta/?servico=manutencao-extintores');
  for (let start = 0; start < paths.length; start += 4) {
    await Promise.all(paths.slice(start, start + 4).map(async path => {
      const [htmlResponse, markdownResponse] = await Promise.all([
        fetch(origin + path, { headers: { Accept: 'text/html' } }),
        fetch(origin + path, { headers: { Accept: 'text/markdown' } }),
      ]);
      const expected = path.includes('inexistente') || path === '/zootopia' ? 404 : 200;
      assert.equal(htmlResponse.status, expected, path + ' HTML');
      assert.equal(markdownResponse.status, expected, path + ' Markdown');
      const html = await htmlResponse.text();
      const markdown = await markdownResponse.text();
      assert.equal(hasEmDash(publicText(html)), false, path + ': m-dash em HTML/metadados');
      assert.equal(hasEmDash(markdown), false, path + ': m-dash em Markdown');
      assert.doesNotMatch(markdown, /(?:resposta|respondemos|orçamento)[^.\n]{0,65}\b24\s*(?:h|horas)/i, path + ': prazo antigo');
      if (expected === 200) {
        const footer = html.match(/<footer\b[\s\S]*?<\/footer>/i)?.[0] || '';
        assert.ok(footer.includes('mailto:info@medisigma.pt'), path + ': email no rodapé');
        assert.ok(footer.includes('tel:+351241331504'), path + ': telefone no rodapé');
        assert.ok(markdown.includes('info@medisigma.pt'), path + ': email Markdown');
        assert.ok(markdown.includes('+351 241 331 504'), path + ': telefone Markdown');
      }
      if (path === '/') {
        const testimonials = html.match(/<section[^>]*id="testimonials"[\s\S]*?<\/section>/)?.[0] || '';
        assert.equal(testimonials.split('O Grupo Medisigma é o parceiro ideal').length - 1, 1, 'Uma cópia no HTML inicial');
        assert.equal(markdown.split('O Grupo Medisigma é o parceiro ideal').length - 1, 1, 'Uma cópia no Markdown');
      }
      if (path === '/contact/') for (const field of ['nome', 'localidade', 'tipo_instalacao', 'servico']) assert.ok(html.includes('name="' + field + '"'), field);
      if (path === '/contact/?enviado=1') assert.ok(html.includes('Mensagem recebida. Obrigado! Respondemos em até 48 horas úteis.'));
      if (path.startsWith('/pedir-proposta/')) {
        for (const field of ['concelho', 'nif', 'numero_trabalhadores', 'numero_estabelecimentos', 'numero_extintores']) {
          assert.ok(html.includes('name="' + field + '"'), path + ': campo ' + field);
          assert.ok(markdown.includes(field), path + ': documentação ' + field);
        }
        assert.ok(html.includes('action="/api/contact"')); assert.ok(html.includes('method="post"'));
        if (path.includes('servico=')) assert.match(html, /value="Manutenção de Extintores" selected=""/);
      }
      results.push({ path, status: htmlResponse.status, markdownStatus: markdownResponse.status });
    }));
    console.log('Verificadas ' + Math.min(start + 4, paths.length) + '/' + paths.length + ' páginas.');
  }
  for (const alias of ['/contacto', '/contacto/', '/contactos', '/contactos/', '/fale-connosco', '/fale-connosco/']) {
    for (const accept of ['text/html', 'text/markdown']) {
      const response = await fetch(origin + alias + '?origem=teste', { redirect: 'manual', headers: { Accept: accept } });
      assert.equal(response.status, 301);
      assert.equal(new URL(response.headers.get('Location') || '', origin).pathname, '/contact/');
      assert.equal(new URL(response.headers.get('Location') || '', origin).search, '?origem=teste');
    }
  }
  await mkdir('output/contact-review', { recursive: true });
  await writeFile('output/contact-review/pages.json', JSON.stringify({ origin, checkedAt: new Date().toISOString(), results }, null, 2));
  console.log('Verificação concluída: ' + results.length + ' páginas em HTML e Markdown, sem submissões de contacto.');
}
main().catch(error => { console.error(error); process.exitCode = 1; });
