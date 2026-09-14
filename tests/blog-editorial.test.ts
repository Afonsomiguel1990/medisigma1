import test from 'node:test';
import assert from 'node:assert/strict';
import { BLOG_EDITORIAL, getServiceCta, getBlogAuthor, getBlogTitle, getBlogCanonical, selectRelatedArticles } from '../src/lib/blog-editorial';

test('commercial destinations follow the subject instead of incidental words in article text', () => {
  const expected = {
    'medicina-trabalho-exames-obrigatorios': '/servicos/medicina-no-trabalho/',
    'ficha-aptidao-trabalho-validade': '/servicos/medicina-no-trabalho/',
    'kit-primeiros-socorros-empresa': '/ferramentas/simulador-caixas-primeiros-socorros/',
    'tipos-extintores-classes-fogo-portugal': '/servicos/manutencao-extintores/',
    'inspecoes-act-2025-guia-empresas': '/servicos/seguranca-no-trabalho/',
    'simulacros-de-emergencia-em-portugal-guia-completo': '/servicos/seguranca-incendios/',
    '40-horas-formacao-obrigatoria-empresas': '/servicos/formacao-certificada/',
    'plano-prevencao-controlo-legionella-empresas': '/servicos/legionella/',
    'controlo-pragas-obrigatorio-legislacao-haccp': '/servicos/controlo-pragas/',
  };
  for (const [slug, url] of Object.entries(expected)) assert.equal(getServiceCta(slug)?.url, url);
  assert.equal(Object.keys(BLOG_EDITORIAL).length, 28);
  assert.equal(getServiceCta('unreviewed-new-article'), null);
  assert.equal(getServiceCta('sistema-volta-cobrar-devolver-deposito-estabelecimento'), null);
});

test('author fallback is institutional and explicit people retain their actual name', () => {
  for (const author of [null, undefined, '', '   ', 'Equipa Medisigma', 'Medisigma']) {
    assert.equal(getBlogAuthor(author)['@type'], 'Organization');
  }
  assert.equal(getBlogAuthor(null).name, 'Equipa Medisigma');
  assert.deepEqual(getBlogAuthor(' Maria Silva '), { '@type': 'Person', name: 'Maria Silva' });
});

test('page title has a single brand suffix and preserves the training wording', () => {
  assert.equal(getBlogTitle('Medicina do Trabalho: Exames Obrigatórios | Medisigma - Medisigma'), 'Medicina do Trabalho: Exames Obrigatórios - Medisigma');
  assert.equal(getBlogTitle('40 Horas de Formação Obrigatória para Empresas'), '40 Horas de Formação Obrigatória para Empresas - Medisigma');
  assert.equal(getBlogTitle('Blog Medisigma: Segurança, Saúde e Conformidade'), 'Blog Medisigma: Segurança, Saúde e Conformidade');
  assert.equal(getBlogCanonical('radao-o-inimigo-invisivel-na-sua-empresa'), 'https://www.medisigma.pt/blog/o-que-e-o-radao/');
  assert.equal(getBlogCanonical('perigo-lagarta-do-pinheiro-caes'), 'https://www.medisigma.pt/blog/perigo-lagarta-do-pinheiro/');
});

test('related articles prioritise the editorial topic, exclude unpublished/self and handle missing mapped posts', () => {
  const current = 'simulacros-de-emergencia-em-portugal-guia-completo';
  const article = (slug: string, date = '2026-01-01', status = 'published') => ({ slug, date, status });
  const articles = [
    article(current),
    article('gestao-alergenios-restauracao', '2026-09-14'),
    article('tipos-extintores-classes-fogo-portugal', '2025-01-01'),
    article('medidas-autoprotecao-scie-epoca-incendios-empresas', '2026-09-14', 'draft'),
    article('inspecoes-act-2025-guia-empresas'),
    article('kit-primeiros-socorros-empresa'),
  ];
  const before = JSON.stringify(articles);
  const selected = selectRelatedArticles(current, articles);
  assert.deepEqual(selected.map(item => item.slug), ['tipos-extintores-classes-fogo-portugal', 'kit-primeiros-socorros-empresa', 'inspecoes-act-2025-guia-empresas']);
  assert.equal(JSON.stringify(articles), before);
  assert.deepEqual(selectRelatedArticles(current, [article(current), article('missing-map-article')]).map(item => item.slug), ['missing-map-article']);
  assert.deepEqual(selectRelatedArticles(current, [article(current)]), []);
  assert.deepEqual(selectRelatedArticles('unknown', [article('old'), article('new', '2026-09-14')]).map(item => item.slug), ['new', 'old']);
});
