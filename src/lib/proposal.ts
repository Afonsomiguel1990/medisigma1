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
