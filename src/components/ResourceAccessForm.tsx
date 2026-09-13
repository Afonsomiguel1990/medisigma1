'use client';
import { useRef, useState } from 'react';
import Link from 'next/link';
import type { Resource } from '@/lib/resources/catalog';
import { submitContactIntent, type SavedLeadReceipt, type SubmissionIntent } from '@/lib/leads/client-submission';
interface ResourceReceipt extends SavedLeadReceipt { download_url?: string; download_error?: string; download_expired?: boolean }
export default function ResourceAccessForm({ resource }: { resource: Resource }) {
  const intent = useRef<SubmissionIntent>({});
  const busy = useRef(false);
  const [sending, setSending] = useState(false);
  const [receipt, setReceipt] = useState<ResourceReceipt | null>(null);
  const [error, setError] = useState('');
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy.current) return;
    busy.current = true;
    setSending(true);
    setError('');
    const form = new FormData(event.currentTarget);
    const read = (key: string) => form.get(key)?.toString().trim() || '';
    try {
      // Keep the same intent on a network or storage failure so retries cannot create another lead.
      const result = await submitContactIntent({ empresa: read('empresa'), email: read('email'), telefone: '',
        mensagem: '', servico: resource.title, service_key: resource.serviceKey, company_sector: '',
        lead_kind: 'resource_request', resource_id: resource.slug, pagina: resource.title,
        fonte: 'Pedido de recurso', url: window.location.href, confirm_mail: read('confirm_mail') }, intent.current,
        undefined, (_url, init) => fetch(`/api/resources/${resource.slug}/access`, init));
      setReceipt(result as ResourceReceipt);
    } catch { setError('Não foi possível confirmar o pedido. Tente novamente.'); }
    finally { busy.current = false; setSending(false); }
  }
  const inputClass = 'w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-secondary';
  return <section className="bg-white p-8 rounded-xl shadow-lg text-gray-900"><h2 className="text-2xl font-semibold mb-6">Obter o recurso</h2><form onSubmit={submit} className="space-y-4">
    <div><label htmlFor="resource-company" className="block text-sm font-medium mb-2">Empresa *</label><input id="resource-company" name="empresa" required maxLength={200} className={inputClass} autoComplete="organization" /></div>
    <div><label htmlFor="resource-email" className="block text-sm font-medium mb-2">Email *</label><input id="resource-email" name="email" type="email" required maxLength={254} className={inputClass} autoComplete="email" /></div>
    <div className="hidden" aria-hidden="true"><label htmlFor="resource-confirm">Não preencha este campo</label><input id="resource-confirm" name="confirm_mail" tabIndex={-1} autoComplete="off" /></div>
    <p className="text-xs text-gray-600">Usamos estes dados para responder ao seu pedido. Não inclua informação clínica. Consulte a <Link className="underline" href="/politica-de-privacidade/">política de privacidade</Link>.</p>
    <button className="w-full rounded-lg bg-secondary px-6 py-3 font-semibold text-white disabled:opacity-60" disabled={sending} aria-busy={sending}>{sending ? 'A preparar...' : receipt?.saved ? 'Obter nova ligação' : `Obter ${resource.format}`}</button>
    {error && <p role="alert" className="text-red-700">{error}</p>}
    {receipt?.saved && <div role="status" className="rounded-lg bg-green-50 p-4"><p>O seu pedido ficou guardado.</p>{receipt.download_url ? <><a className="mt-3 inline-block font-semibold underline" href={receipt.download_url}>Descarregar {resource.format}</a><p className="mt-2 text-sm">A ligação é válida durante 10 minutos. Pode obter uma nova ligação com este pedido durante 24 horas.</p></> : <p className="mt-2 text-sm">{receipt.download_error}</p>}{receipt.download_expired && <button type="button" className="mt-3 underline" onClick={() => { intent.current = {}; setReceipt(null); }}>Iniciar novo pedido</button>}</div>}
  </form></section>;
}
