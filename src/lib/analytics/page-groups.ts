import type { AnalyticsGroup } from '../leads/types';
import { serviceAreas } from '../service-areas';

export function acquisitionPageGroup(value: string): string {
  const page = value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  if (/careview/.test(page)) return 'Careview';
  if (/sistema-volta|sistema volta/.test(page)) return 'Sistema Volta';
  if (/recrutamento|candidatura/.test(page)) return 'Recrutamento';
  if (/^servico:|\/servicos\//.test(page)) return 'Páginas comerciais';
  if (/^area de servico:|^localidade:/.test(page) || Object.keys(serviceAreas).some(key => page.replace(/^https?:\/\/[^/]+/, '').replace(/\/$/, '') === `/${key}`)) return 'Páginas locais';
  if (/\/setores\//.test(page)) return 'Páginas de setor';
  if (/\/blog\//.test(page)) return 'Artigos';
  if (/pedir.proposta/.test(page)) return 'Pedido de proposta';
  if (!page || page === 'unknown') return 'Sem classificação';
  return 'Outras páginas';
}
export function groupAcquisitionPages(rows: AnalyticsGroup[]): AnalyticsGroup[] {
  const totals = new Map<string,number>();
  for (const row of rows) {
    const key = acquisitionPageGroup(row.key || '');
    totals.set(key, (totals.get(key) || 0) + row.count);
  }
  return [...totals].map(([key,count])=>({key,count})).sort((a,b)=>b.count-a.count || a.key.localeCompare(b.key));
}
