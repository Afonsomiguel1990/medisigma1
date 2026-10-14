import { CONTACT_SERVICES, contactServiceKey, normalizeContactService } from './contact';

export function proposalService(value = '') {
  return CONTACT_SERVICES.find(service => service.key === value || service.value === normalizeContactService(value))?.value || '';
}

export function proposalQuestions(service: string) {
  const key = contactServiceKey(service);
  return {
    workers: ['medicina-no-trabalho', 'seguranca-no-trabalho', 'sst-integrada'].includes(key),
    sites: ['seguranca-alimentar', 'controlo-pragas', 'seguranca-incendios'].includes(key),
    extinguishers: key === 'manutencao-extintores',
  };
}

export function proposalHelp(service: string) {
  const hints: Record<string, string> = {
    legionella: 'Indique o concelho, o tipo de instalação e os sistemas de água que conhece. Se existir um plano ou análises anteriores, mencione-os.',
    radao: 'Indique o concelho, os pisos ocupados e se já realizou medições. Não precisa de saber quantos detetores serão necessários.',
    'ruido-ocupacional': 'Indique a atividade, a localização, as tarefas e os turnos a avaliar. Pode acrescentar as máquinas ou equipamentos utilizados.',
    'qualidade-do-ar-interior': 'Indique o tipo de edifício, a utilização, os horários e o motivo da avaliação. Não inclua dados de saúde pessoais.',
    'manutencao-extintores': 'Indique o concelho e a quantidade aproximada de extintores, se a conhecer.',
    'seguranca-alimentar': 'Indique a atividade e o número de estabelecimentos. Diga-nos se precisa de implementar ou acompanhar o HACCP.',
  };
  return hints[contactServiceKey(service)] || 'Descreva brevemente o apoio de que precisa. Se faltar algum dado, esclarecemos consigo no contacto seguinte.';
}
