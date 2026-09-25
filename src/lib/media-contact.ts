// The contact form only needs these small identifiers, not transcripts or media metadata.
export const mediaContactServices = {
  'sofalca-ruido': { serviceKey: 'seguranca-no-trabalho', serviceLabel: 'Segurança no Trabalho' },
  'herdade-amarela': { serviceKey: 'seguranca-incendios', serviceLabel: 'Segurança Contra Incêndios' },
  'seguranca-alimentar': { serviceKey: 'seguranca-alimentar', serviceLabel: 'Segurança Alimentar' },
  ramiro: { serviceKey: 'seguranca-alimentar', serviceLabel: 'Segurança Alimentar' },
  'benfica-abrantes': { serviceKey: 'medicina-desportiva', serviceLabel: 'Medicina Desportiva' },
  extintores: { serviceKey: 'manutencao-extintores', serviceLabel: 'Manutenção de Extintores' },
  sinaletica: { serviceKey: 'sinaletica', serviceLabel: 'Sinalética de Segurança' },
  pragas: { serviceKey: 'controlo-pragas', serviceLabel: 'Controlo de Pragas' },
} as const;
export function mediaContactIntent(id: unknown) {
  if (typeof id !== 'string' || !Object.hasOwn(mediaContactServices, id)) return;
  return { mediaId: id, ...mediaContactServices[id as keyof typeof mediaContactServices] };
}
