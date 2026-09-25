import publication from '@/content/service-media-publication.json';
import transcripts from '@/content/service-media-transcripts.json';

const base = '/media/servicos';
export type ServiceMediaId = 'sofalca-ruido' | 'herdade-amarela' | 'seguranca-alimentar' | 'ramiro' | 'benfica-abrantes' | 'extintores' | 'sinaletica' | 'pragas';
export interface ServicePhoto { src: string; alt: string; caption: string; width: number; height: number }
export interface ServiceVideoData {
  id: ServiceMediaId; src: string; poster: string; captions: string;
  title: string; description: string; duration: string; durationLabel: string;
  transcript: string; publishedAt: string | null;
}
export interface ServiceMediaEntry {
  id: ServiceMediaId; anchor: string; title: string; eyebrow: string;
  paragraphs: string[]; serviceKey: string; serviceLabel: string; servicePath: string;
  cta: string; photos: ServicePhoto[]; video?: ServiceVideoData;
  article?: { href: string; label: string };
}
const photo = (file: string, alt: string, caption: string, width = 900, height = 1600): ServicePhoto => ({ src: `${base}/${file}.webp`, alt, caption, width, height });
function video(id: keyof typeof transcripts, title: string, description: string, duration: string, durationLabel: string): ServiceVideoData {
  return { id, src: `${base}/${id}.mp4`, poster: `${base}/${id}-capa.webp`, captions: `${base}/${id}.pt.vtt`, title, description, duration, durationLabel, transcript: transcripts[id], publishedAt: publication.publishedAt };
}
export const serviceMedia: Record<ServiceMediaId, ServiceMediaEntry> = {
  'sofalca-ruido': {
    id: 'sofalca-ruido', anchor: 'avaliacao-ruido-no-terreno', eyebrow: 'Avaliação de ruído',
    title: 'O ruído avalia-se no local de trabalho.',
    paragraphs: ['Na Sofalca, em Bemposta, Abrantes, a equipa Medisigma mostra o trabalho de avaliação de ruído e os equipamentos utilizados.', 'As medições ajudam a conhecer a exposição dos trabalhadores e a orientar as medidas de prevenção adequadas a cada atividade.'],
    serviceKey: 'seguranca-no-trabalho', serviceLabel: 'Segurança no Trabalho', servicePath: '/servicos/seguranca-no-trabalho/', cta: 'Pedir avaliação de ruído',
    photos: [photo('avaliacao-ruido-sofalca', 'Equipa Medisigma junto do equipamento de medição na Sofalca', 'Preparação do equipamento na Sofalca.'), photo('medicao-ruido-industria', 'Técnica Medisigma com equipamento de medição num espaço industrial', 'Medição em ambiente industrial.', 1200, 1600)],
    video: video('sofalca-ruido', 'Avaliação de ruído na Sofalca', 'A equipa Medisigma apresenta o trabalho de avaliação de ruído na Sofalca, em Abrantes.', 'PT32.07S', '32 s'),
  },
  'herdade-amarela': {
    id: 'herdade-amarela', anchor: 'seguranca-no-alojamento', eyebrow: 'Herdade Amarela', title: 'Medidas de autoproteção num alojamento.',
    paragraphs: ['Na Herdade Amarela, em Abrantes, a equipa de segurança contra incêndios realiza o levantamento necessário à implementação das medidas de autoproteção.', 'O vídeo mostra este acompanhamento num espaço de alojamento. Fale connosco sobre as necessidades do seu estabelecimento.'],
    serviceKey: 'seguranca-incendios', serviceLabel: 'Segurança Contra Incêndios', servicePath: '/servicos/seguranca-incendios/', cta: 'Pedir apoio em medidas de autoproteção',
    photos: [photo('herdade-amarela-capa', 'Técnico Medisigma num espaço exterior da Herdade Amarela', 'Acompanhamento no terreno, na Herdade Amarela.', 720, 1280)],
    video: video('herdade-amarela', 'Segurança contra incêndios na Herdade Amarela', 'Levantamento para a implementação de medidas de autoproteção pela Medisigma na Herdade Amarela, em Abrantes.', 'PT18.22S', '18 s'),
  },
  'seguranca-alimentar': {
    id: 'seguranca-alimentar', anchor: 'seguranca-alimentar-no-terreno', eyebrow: 'Segurança alimentar no terreno', title: 'O trabalho que acompanha cada serviço à mesa.',
    paragraphs: ['Uma visita ao estabelecimento permite observar as condições de trabalho, consultar registos e acompanhar os procedimentos de segurança alimentar.', 'Veja a equipa Medisigma em atividade e fale connosco sobre o apoio de que precisa na implementação e no acompanhamento do HACCP.'],
    serviceKey: 'seguranca-alimentar', serviceLabel: 'Segurança Alimentar', servicePath: '/servicos/seguranca-alimentar/', cta: 'Pedir apoio em segurança alimentar',
    photos: [photo('tecnica-seguranca-alimentar', 'Técnica Medisigma a consultar registos num estabelecimento de restauração', 'Consulta de registos durante uma visita técnica.', 904, 1600)],
    video: video('seguranca-alimentar', 'Segurança alimentar no dia a dia', 'Uma visita da equipa Medisigma a um estabelecimento de restauração, com acompanhamento de registos e procedimentos.', 'PT22.29S', '22 s'),
  },
  ramiro: {
    id: 'ramiro', anchor: 'testemunho-restauracao', eyebrow: 'Restaurante O Ramiro', title: 'A experiência de quem trabalha connosco.',
    paragraphs: ['Ramiro conta a sua relação com a Medisigma e a importância do acompanhamento no dia a dia da restauração.', 'Veja a entrevista e conheça o apoio que podemos prestar ao seu restaurante.'],
    serviceKey: 'seguranca-alimentar', serviceLabel: 'Segurança Alimentar', servicePath: '/servicos/seguranca-alimentar/', cta: 'Pedir apoio para o meu restaurante', photos: [],
    video: video('ramiro', 'O testemunho do Restaurante O Ramiro', 'Ramiro partilha a sua experiência com a Medisigma e fala sobre atendimento, acompanhamento e segurança na restauração.', 'PT2M30.75S', '2 min 31 s'),
    article: { href: '/blog/seguranca-restauracao-testemunho-restaurante-o-ramiro/', label: 'Ler o artigo sobre o Restaurante O Ramiro' },
  },
  'benfica-abrantes': {
    id: 'benfica-abrantes', anchor: 'exames-desportivos-no-terreno', eyebrow: 'Benfica de Abrantes', title: 'A avaliação acompanha quem pratica desporto.',
    paragraphs: ['A equipa Medisigma realiza avaliações de medicina desportiva a atletas do Benfica de Abrantes.', 'O vídeo mostra momentos do atendimento e dos exames. Atletas e clubes podem contactar-nos para conhecer as condições de marcação.'],
    serviceKey: 'medicina-desportiva', serviceLabel: 'Medicina Desportiva', servicePath: '/servicos/medicina-desportiva/', cta: 'Pedir informações sobre exames desportivos',
    photos: [photo('avaliacao-medicina-desportiva', 'Profissional de saúde a acompanhar uma avaliação de medicina desportiva', 'Um dos momentos da avaliação em medicina desportiva.', 893, 1600)],
    video: video('benfica-abrantes', 'Medicina desportiva com o Benfica de Abrantes', 'Momentos do atendimento e dos exames de medicina desportiva realizados pela Medisigma a atletas do Benfica de Abrantes.', 'PT30.5S', '31 s'),
  },
  extintores: {
    id: 'extintores', anchor: 'manutencao-extintores-no-terreno', eyebrow: 'Meios de intervenção', title: 'Equipados para acompanhar os seus extintores.',
    paragraphs: ['A viatura equipada e os meios de trabalho acompanham os técnicos Medisigma nas intervenções de manutenção.', 'Partilhe connosco os locais e os equipamentos a verificar para prepararmos o acompanhamento adequado.'],
    serviceKey: 'manutencao-extintores', serviceLabel: 'Manutenção de Extintores', servicePath: '/servicos/manutencao-extintores/', cta: 'Pedir proposta de manutenção de extintores',
    photos: [photo('manutencao-extintores-viatura', 'Técnico Medisigma a trabalhar na viatura equipada para manutenção de extintores', 'Viatura equipada para o trabalho de manutenção.'), photo('equipamento-manutencao-extintores', 'Equipamento de trabalho na viatura Medisigma', 'Pormenor dos meios de trabalho.', 1200, 1511)],
  },
  sinaletica: {
    id: 'sinaletica', anchor: 'sinaletica-no-terreno', eyebrow: 'Sinalização de segurança', title: 'Sinalética aplicada onde faz falta.',
    paragraphs: ['Um técnico do Grupo Medisigma aplica um sinal de perigo elétrico junto de uma área técnica.', 'A escolha e a colocação dos sinais devem acompanhar os riscos e as características de cada espaço. Conheça as soluções da SinalSigma.'],
    serviceKey: 'sinaletica', serviceLabel: 'Sinalética de Segurança', servicePath: '/signalsigma/', cta: 'Pedir orçamento de sinalética',
    photos: [photo('instalacao-sinaletica', 'Técnico do Grupo Medisigma a aplicar um sinal de perigo elétrico', 'Aplicação de sinalização de perigo elétrico.')],
  },
  pragas: {
    id: 'pragas', anchor: 'controlo-pragas-no-terreno', eyebrow: 'Acompanhamento técnico', title: 'O controlo de pragas começa no terreno.',
    paragraphs: ['A equipa Medisigma desloca-se ao estabelecimento para acompanhar os pontos de controlo e as condições do espaço.', 'Cada intervenção deve responder ao problema identificado. Descreva-nos a situação para avaliarmos o acompanhamento necessário.'],
    serviceKey: 'controlo-pragas', serviceLabel: 'Controlo de Pragas', servicePath: '/servicos/controlo-pragas/', cta: 'Pedir apoio no controlo de pragas',
    photos: [photo('tecnico-controlo-pragas', 'Técnico Medisigma a intervir junto de um ponto de controlo no interior de um estabelecimento', 'Intervenção de um técnico Medisigma num estabelecimento.', 903, 1600)],
  },
};

export const locationMedia = {
  lisboa: 'seguranca-alimentar', santarem: 'seguranca-alimentar', 'castelo-branco': 'seguranca-alimentar', coimbra: 'seguranca-alimentar', tomar: 'seguranca-alimentar', fatima: 'seguranca-alimentar',
  covilha: 'sofalca-ruido', leiria: 'sofalca-ruido', 'torres-novas': 'sofalca-ruido', entroncamento: 'sofalca-ruido',
  'rio-maior': 'benfica-abrantes', portalegre: 'herdade-amarela',
} as const satisfies Record<string, ServiceMediaId>;

export function getServiceMedia(id: unknown): ServiceMediaEntry | undefined {
  return typeof id === 'string' && Object.hasOwn(serviceMedia, id) ? serviceMedia[id as ServiceMediaId] : undefined;
}
export function videoJsonLd(media: ServiceVideoData) {
  if (!media.publishedAt) return null;
  const origin = 'https://www.medisigma.pt';
  return { '@context': 'https://schema.org', '@type': 'VideoObject', '@id': `${origin}${media.src}#video`, name: media.title, description: media.description, thumbnailUrl: `${origin}${media.poster}`, uploadDate: media.publishedAt, duration: media.duration, contentUrl: `${origin}${media.src}`, inLanguage: 'pt-PT', transcript: media.transcript };
}
