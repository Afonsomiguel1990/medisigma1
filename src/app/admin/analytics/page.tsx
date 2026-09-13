'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import type { AnalyticsGroup, LeadAnalytics } from '@/lib/leads/types';
const dateInput = (date: Date) => date.toISOString().slice(0,10);
const labels: Record<string, string> = { unknown: 'Sem atribuição', partial: 'Atribuição parcial', pending: 'A aguardar', pending_intervention: 'Aguardar intervenção', sending: 'A enviar', sent: 'Enviada', failed: 'Falhou', uncertain: 'Entrega incerta', phone: 'Telefone', email: 'Email', whatsapp: 'WhatsApp' };
function Breakdown({ title, rows }: { title: string; rows: AnalyticsGroup[] }) {
  return <section className="rounded-lg border p-5"><h2 className="text-lg font-semibold mb-4">{title}</h2>{rows.length ? <table className="w-full text-sm"><thead><tr className="border-b text-left"><th className="pb-2">Origem</th><th className="pb-2 text-right">Total</th></tr></thead><tbody>{rows.map(row => <tr key={row.key} className="border-b last:border-0"><td className="py-2 break-all">{labels[row.key] || row.key}</td><td className="py-2 text-right tabular-nums">{row.count}</td></tr>)}</tbody></table> : <p className="text-sm text-muted-foreground">Sem registos neste período.</p>}</section>;
}
export default function AdminAnalyticsPage() {
  const [from, setFrom] = useState(dateInput(new Date(Date.now() - 28 * 86400000)));
  const [to, setTo] = useState(dateInput(new Date(Date.now() - 86400000)));
  const [data, setData] = useState<LeadAnalytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  useEffect(() => {
    const abort = new AbortController();
    setLoading(true); setError(''); setData(null);
    const end = new Date(`${to}T00:00:00Z`); end.setUTCDate(end.getUTCDate()+1);
    if (!from || !to || !Number.isFinite(end.getTime())) { setError('Escolha as datas.'); setLoading(false); return; }
    fetch(`/api/admin/analytics?from=${encodeURIComponent(`${from}T00:00:00Z`)}&to=${encodeURIComponent(end.toISOString())}`, { signal: abort.signal, cache: 'no-store' })
      .then(async response => { const result = await response.json(); if (!response.ok) throw new Error(result.error || 'Não foi possível carregar os dados.'); return result as LeadAnalytics; })
      .then(setData).catch(e => { if (!abort.signal.aborted) setError(e instanceof Error ? e.message : 'Não foi possível carregar os dados.'); })
      .finally(() => { if (!abort.signal.aborted) setLoading(false); });
    return () => abort.abort();
  }, [from,to]);
  return <main className="px-8 py-16"><div className="mb-8"><h1 className="text-3xl font-bold mb-3">Pedidos e contactos</h1><p className="text-muted-foreground">Pedidos guardados e cliques de contacto, por período. A atribuição começa quando existe consentimento e pode ser parcial.</p><Link className="inline-block mt-3 underline" href="/admin/forms/">Consultar formulários</Link></div>
    <div className="flex flex-wrap gap-5 mb-8"><label className="text-sm">De<input className="ml-3 rounded border p-2" type="date" value={from} onChange={e => setFrom(e.target.value)} /></label><label className="text-sm">Até<input className="ml-3 rounded border p-2" type="date" value={to} onChange={e => setTo(e.target.value)} /></label><p className="text-sm self-center text-muted-foreground">Dias em UTC. Máximo de 366 dias.</p></div>
    {loading && <p role="status">A carregar dados...</p>}{error && <p role="alert" className="rounded border border-red-300 p-4 text-red-700">{error}</p>}
    {data && <><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">{[['Pedidos de serviço',data.serviceRequests],['Pedidos de recurso',data.resourceRequests],['Total de pedidos',data.submissions],['Cliques de contacto',data.clicks]].map(([label,count]) => <div key={label} className="rounded-lg border p-5"><p className="text-sm mb-2">{label}</p><p className="text-3xl font-semibold tabular-nums">{count}</p></div>)}</div>
      <p className="mb-6 text-sm">Registos anteriores ou sem ligação ao novo sistema neste período: {data.legacyUnattributed.contacts} contactos e {data.legacyUnattributed.clicks} cliques. Estes valores ficam separados dos pedidos e cliques acima.</p>
      <div className="grid gap-5 md:grid-cols-2"><Breakdown title="Pedidos de serviço: serviço" rows={data.byService}/><Breakdown title="Pedidos de serviço: setor de atividade" rows={data.bySector}/><Breakdown title="Pedidos de serviço: origem atribuída" rows={data.bySource}/><Breakdown title="Pedidos de serviço: página de entrada" rows={data.byEntryPage}/><Breakdown title="Pedidos de serviço: página do pedido" rows={data.byPage}/><Breakdown title="Pedidos de serviço: artigos visitados antes do pedido" rows={data.assistedArticles}/><Breakdown title="Pedidos de serviço: estado da atribuição" rows={data.attributionStatus}/><Breakdown title="Notificações" rows={data.notifications}/><Breakdown title="Pedidos de recurso por ficheiro" rows={data.resourcesByResource}/><Breakdown title="Cliques por página" rows={data.clicksByPage}/><Breakdown title="Canal de contacto" rows={data.clicksByChannel}/></div>
      <p className="mt-6 text-sm text-muted-foreground">Cada artigo conta no máximo uma vez por pedido. Um pedido pode ter vários artigos anteriores. Os cliques não representam contactos confirmados.</p></>}
  </main>;
}
