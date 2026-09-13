export const RESOURCE_BUCKET = 'web-resources';
export const RESOURCES = [
  { slug: 'preparacao-exames', title: 'Preparação para os exames de saúde no trabalho', description: 'Uma lista para organizar documentos e informação antes da consulta de medicina do trabalho.', format: 'PDF', serviceKey: 'medicina-no-trabalho' },
  { slug: 'dossier-legionella', title: 'Organizar o dossier de prevenção de Legionella', description: 'Uma lista de documentos e registos para preparar a avaliação técnica da instalação.', format: 'PDF', serviceKey: 'legionella' },
  { slug: 'preparacao-act', title: 'Preparação dos documentos de segurança no trabalho', description: 'Uma lista para localizar documentos, identificar o que falta e preparar o acompanhamento técnico.', format: 'PDF', serviceKey: 'seguranca-no-trabalho' },
  { slug: 'matriz-formacao', title: 'Matriz de formação da equipa', description: 'Uma folha editável para reunir necessidades, ações e registos de formação.', format: 'XLSX', serviceKey: 'formacao-certificada' },
  { slug: 'inventario-primeiros-socorros', title: 'Inventário de primeiros socorros', description: 'Uma folha editável para registar materiais, quantidades, validades e reposições.', format: 'XLSX', serviceKey: 'seguranca-no-trabalho' },
  { slug: 'controlo-incendios', title: 'Registo de acompanhamento dos equipamentos de incêndio', description: 'Uma folha editável para organizar equipamentos, verificações e necessidades de acompanhamento.', format: 'XLSX', serviceKey: 'seguranca-incendios' },
] as const;
export type Resource = typeof RESOURCES[number];
export function getResource(slug: string) { return RESOURCES.find(resource => resource.slug === slug); }
export function resourceObjectPath(resource: Resource) { return `${resource.slug}.${resource.format.toLowerCase()}`; }
