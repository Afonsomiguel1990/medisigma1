import { MetadataRoute } from 'next';
import { getAllPublishedPosts } from '@/lib/posts';

export const dynamic = 'force-dynamic';

const baseUrl = 'https://www.medisigma.pt';
const staticLastModified = new Date('2026-05-13T00:00:00.000Z');
const controloPragasLastModified = new Date('2026-05-13T22:58:43.000Z');

function route(
  path: string,
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'],
  priority: number,
  lastModified: Date = staticLastModified,
): MetadataRoute.Sitemap[number] {
  return {
    url: `${baseUrl}${path}`,
    lastModified,
    changeFrequency,
    priority,
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const mainRoutes: MetadataRoute.Sitemap = [
    route('/', 'monthly', 1.0),
    route('/sobre-nos/', 'monthly', 0.8),
    route('/servicos/', 'monthly', 0.9),
    route('/blog/', 'weekly', 0.8),
    route('/contact/', 'monthly', 0.7),
    route('/recrutamento/', 'monthly', 0.7),
    route('/casos-de-sucesso/', 'monthly', 0.7),
    route('/testemunhos/', 'monthly', 0.7),
    route('/signalsigma/', 'monthly', 0.7),
  ];

  const serviceRoutes: MetadataRoute.Sitemap = [
    route('/servicos/medicina-no-trabalho/', 'monthly', 0.8),
    route('/servicos/seguranca-no-trabalho/', 'monthly', 0.8),
    route('/servicos/seguranca-alimentar/', 'monthly', 0.8),
    route('/servicos/formacao-certificada/', 'monthly', 0.8),
    route('/servicos/psicologia/', 'monthly', 0.8),
    route('/servicos/controlo-pragas/', 'monthly', 0.8, controloPragasLastModified),
    route('/servicos/seguranca-incendios/', 'monthly', 0.8),
    route('/servicos/legionella/', 'monthly', 0.8),
    route('/servicos/medicina-desportiva/', 'monthly', 0.8),
    route('/servicos/nutricao/', 'monthly', 0.8),
    route('/servicos/manutencao-extintores/', 'monthly', 0.8),
  ];

  const supportRoutes: MetadataRoute.Sitemap = [
    route('/ferramentas/simulador-caixas-primeiros-socorros/', 'monthly', 0.7),
    route('/newsletter/', 'monthly', 0.5),
    route('/faqs/', 'monthly', 0.5),
    route('/faqs/legionella/', 'monthly', 0.6),
    route('/faqs/manutencao-extintores/', 'monthly', 0.6),
    route('/politica-de-privacidade/', 'monthly', 0.3),
    route('/termos-e-condicoes/', 'monthly', 0.3),
    route('/cookies/', 'monthly', 0.3),
    route('/resolucao-litigios/', 'monthly', 0.3),
    route('/livro-reclamacoes/', 'monthly', 0.3),
  ];

  const locationRoutes: MetadataRoute.Sitemap = [
    route('/lisboa/', 'monthly', 0.8),
    route('/covilha/', 'monthly', 0.8),
    route('/abrantes/', 'monthly', 0.8),
    route('/santarem/', 'monthly', 0.8),
    route('/rio-maior/', 'monthly', 0.8),
    route('/castelo-branco/', 'monthly', 0.8),
    route('/coimbra/', 'monthly', 0.8),
    route('/tomar/', 'monthly', 0.8),
    route('/torres-novas/', 'monthly', 0.8),
    route('/entroncamento/', 'monthly', 0.8),
    route('/portalegre/', 'monthly', 0.8),
    route('/leiria/', 'monthly', 0.8),
    route('/fatima/', 'monthly', 0.8),
  ];

  let blogRoutes: MetadataRoute.Sitemap = [];

  try {
    const posts = await getAllPublishedPosts();
    blogRoutes = posts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}/`,
      lastModified: new Date(post.updated_at || post.published_at || post.created_at),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }));
  } catch (error) {
    console.error('Erro ao gerar sitemap dos posts:', error);
  }

  return [
    ...mainRoutes,
    ...serviceRoutes,
    ...locationRoutes,
    ...supportRoutes,
    ...blogRoutes,
  ];
}
