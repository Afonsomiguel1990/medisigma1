const services = {
  medicine: { url: '/servicos/medicina-no-trabalho/', label: 'Medicina no Trabalho' },
  sst: { url: '/servicos/seguranca-no-trabalho/', label: 'Segurança no Trabalho' },
  training: { url: '/servicos/formacao-certificada/', label: 'Formação Certificada' },
  food: { url: '/servicos/seguranca-alimentar/', label: 'Segurança Alimentar' },
  legionella: { url: '/servicos/legionella/', label: 'Prevenção de Legionella' },
  pests: { url: '/servicos/controlo-pragas/', label: 'Controlo de Pragas' },
  fire: { url: '/servicos/seguranca-incendios/', label: 'Segurança Contra Incêndios' },
  extinguishers: { url: '/servicos/manutencao-extintores/', label: 'Manutenção de Extintores' },
  kit: { url: '/ferramentas/simulador-caixas-primeiros-socorros/', label: 'Simulador de Caixas de Primeiros Socorros' },
  overview: { url: '/servicos/', label: 'Serviços para Empresas' },
} as const;

type Topic = 'medicine' | 'sst' | 'training' | 'food' | 'legionella' | 'pests' | 'fire' | 'institutional';
type EditorialEntry = { topic: Topic; service: keyof typeof services | null };

// Explicit editorial choices for reviewed articles, including subsequent publications.
// New articles receive no commercial CTA until their destination is reviewed.
export const BLOG_EDITORIAL: Record<string, EditorialEntry> = {
  '40-horas-formacao-obrigatoria-empresas': { topic: 'training', service: 'training' },
  'medicina-trabalho-exames-obrigatorios': { topic: 'medicine', service: 'medicine' },
  'ficha-aptidao-trabalho-validade': { topic: 'medicine', service: 'medicine' },
  'kit-primeiros-socorros-empresa': { topic: 'sst', service: 'kit' },
  'tipos-extintores-classes-fogo-portugal': { topic: 'fire', service: 'extinguishers' },
  'inspecoes-act-2025-guia-empresas': { topic: 'sst', service: 'sst' },
  'simulacros-de-emergencia-em-portugal-guia-completo': { topic: 'fire', service: 'fire' },
  'sistema-volta-cobrar-devolver-deposito-estabelecimento': { topic: 'food', service: null },
  'gestao-alergenios-restauracao': { topic: 'food', service: 'food' },
  'agua-torneira-2026-decreto-lei-69-2023': { topic: 'legionella', service: 'legionella' },
  'seguranca-alimentar-2026-haccp-proteinas-verdes': { topic: 'food', service: 'food' },
  'plano-prevencao-controlo-legionella-empresas': { topic: 'legionella', service: 'legionella' },
  'medidas-autoprotecao-scie-epoca-incendios-empresas': { topic: 'fire', service: 'fire' },
  'controlo-pragas-obrigatorio-legislacao-haccp': { topic: 'pests', service: 'pests' },
  'plano-controlo-pragas-haccp-dossier-empresa': { topic: 'pests', service: 'pests' },
  'seguranca-restauracao-testemunho-restaurante-o-ramiro': { topic: 'food', service: 'food' },
  'investir-sst-lucro-empresas': { topic: 'sst', service: 'sst' },
  'prevenir-quedas-tropecoes-trabalho-portugal': { topic: 'sst', service: 'sst' },
  'lesoes-musculoesqueleticas-trabalho-prevencao': { topic: 'sst', service: 'sst' },
  'o-que-e-o-radao': { topic: 'sst', service: 'sst' },
  'qualidade-do-ar-interior-como-avaliar': { topic: 'sst', service: 'sst' },
  'guia-teletrabalho-2025': { topic: 'sst', service: 'sst' },
  'bem-estar-empresas-retencao-talento': { topic: 'medicine', service: 'medicine' },
  'perigo-lagarta-do-pinheiro': { topic: 'pests', service: 'pests' },
  'agentes-cancerigenos-trabalho-guia-prevencao': { topic: 'sst', service: 'sst' },
  'literacia-financeira-empresas-saude-ocupacional': { topic: 'medicine', service: 'medicine' },
  '5-avaliacoes-essenciais-seguranca-trabalho-portugal': { topic: 'sst', service: 'sst' },
  'bem-vindos-blog-medisigma': { topic: 'institutional', service: 'overview' },
};

export const BLOG_ALIASES: Record<string, string> = {
  'radao-o-inimigo-invisivel-na-sua-empresa': 'o-que-e-o-radao',
  'perigo-lagarta-do-pinheiro-caes': 'perigo-lagarta-do-pinheiro',
};

export function getServiceCta(slug: string) {
  if (slug === 'seguranca-restauracao-testemunho-restaurante-o-ramiro') return {
    url: '/contact/', label: 'Segurança na Restauração',
    heading: 'Precisa de ajuda profissional com Segurança na Restauração?',
    description: 'Diga-nos que apoio procura para a sua equipa e para o seu restaurante. A Medisigma ajuda a definir o acompanhamento adequado.',
    action: 'Pedir proposta para o meu restaurante',
  };
  const key = BLOG_EDITORIAL[slug]?.service;
  if (!key) return null;
  const service = services[key];
  return {
    ...service,
    heading: key === 'kit' ? 'Prepare a caixa de primeiros socorros da sua empresa' : `Precisa de apoio em ${service.label}?`,
    description: key === 'kit'
      ? 'Use o simulador para preparar uma lista indicativa e rever o material necessário com o responsável de saúde e segurança no trabalho.'
      : `Conheça o serviço de ${service.label} da Medisigma e fale connosco sobre as necessidades da sua empresa.`,
    action: key === 'kit' ? 'Abrir o simulador' : `Saber mais sobre ${service.label}`,
  };
}

export function getBlogAuthor(author: string | null | undefined) {
  const name = author?.trim() || 'Equipa Medisigma';
  const institutional = /medisigma|^equipa\b|^equipa editorial\b/i.test(name);
  return institutional
    ? { '@type': 'Organization' as const, name, url: 'https://www.medisigma.pt/' }
    : { '@type': 'Person' as const, name };
}

export function getBlogTitle(title: string) {
  const base = title.trim().replace(/(?:\s*[|\-–]\s*Medisigma)+\s*$/i, '').trim();
  return /medisigma/i.test(base) ? base : `${base} - Medisigma`;
}

export function getBlogCanonical(slug: string) {
  return `https://www.medisigma.pt/blog/${BLOG_ALIASES[slug] || slug}/`;
}

const adjacentTopics: Record<Topic, Topic[]> = {
  medicine: ['sst', 'training'], sst: ['medicine', 'training', 'fire'],
  training: ['sst', 'fire', 'medicine'], food: ['pests', 'legionella'],
  legionella: ['sst', 'food'], pests: ['food', 'sst'],
  fire: ['sst', 'training'], institutional: ['sst', 'medicine', 'food'],
};

export function selectRelatedArticles<T extends { slug: string; date: string; status: string }>(currentSlug: string, articles: T[]): T[] {
  const available = new Map(articles.filter(article => article.slug !== currentSlug && article.status === 'published').map(article => [article.slug, article]));
  const topic = BLOG_EDITORIAL[currentSlug]?.topic;
  const selected: T[] = [];
  if (topic) {
    for (const candidateTopic of [topic, ...adjacentTopics[topic]]) {
      for (const [slug, entry] of Object.entries(BLOG_EDITORIAL)) {
        if (entry.topic === candidateTopic && available.has(slug)) {
          selected.push(available.get(slug)!);
          available.delete(slug);
          if (selected.length === 3) return selected;
        }
      }
    }
  }
  const timestamp = (date: string) => Date.parse(date) || 0;
  return [...selected, ...Array.from(available.values()).sort((a, b) => timestamp(b.date) - timestamp(a.date))].slice(0, 3);
}
