export const CONTACT_SUCCESS_MESSAGE = 'Mensagem recebida. Obrigado! Respondemos em até 48 horas úteis.';

export const CONTACT_SERVICES = [
  { value: 'Medicina do Trabalho', key: 'medicina-no-trabalho' },
  { value: 'Segurança no Trabalho', label: 'Segurança no Trabalho', key: 'seguranca-no-trabalho' },
  { value: 'Segurança Alimentar', label: 'Segurança Alimentar (HACCP)', key: 'seguranca-alimentar' },
  { value: 'Formação Certificada', key: 'formacao-certificada' },
  { value: 'Psicologia', key: 'psicologia' },
  { value: 'Controlo de Pragas', key: 'controlo-pragas' },
  { value: 'Legionella', key: 'legionella' },
  { value: 'Segurança Contra Incêndios', label: 'Segurança Contra Incêndios (SCIE)', key: 'seguranca-incendios' },
  { value: 'Manutenção de Extintores', key: 'manutencao-extintores' },
  { value: 'Medicina Desportiva', key: 'medicina-desportiva' },
  { value: 'Nutrição', key: 'nutricao' },
  { value: 'Sinalética', key: 'signalsigma' },
  { value: 'SST integrada', key: 'sst-integrada' },
  { value: 'Caixas de Primeiros Socorros', key: 'caixas-primeiros-socorros' },
  { value: 'Outros', key: 'outros' },
] as const;

export function normalizeContactService(value = '') {
  const aliases: Record<string, string> = {
    'Medicina no Trabalho': 'Medicina do Trabalho',
    'HST Integrada': 'SST integrada',
    'Segurança Alimentar (HACCP)': 'Segurança Alimentar',
    HACCP: 'Segurança Alimentar',
    SCIE: 'Segurança Contra Incêndios',
  };
  return aliases[value] || value;
}

export function contactServiceKey(value: string) {
  return CONTACT_SERVICES.find(service => service.value === normalizeContactService(value))?.key || '';
}
