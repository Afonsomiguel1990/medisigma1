'use client';
import { useCallback, useEffect, useState } from 'react';
import { adminFetch } from '@/lib/admin-client';
import { CvAccess } from './CvAccess';
type Item = { submission_id:string; kind:string; payload:Record<string,unknown>; state:string; reasons:string[]; rules_version:string;
  notification_status:string; created_at:string; cv_uploads: { id:string; validation_status:string; validation_code:string } | null;
  intake_reviews:{ action:string;actor:string;created_at:string }[] };
const reasons:Record<string,string> = { honeypot:'Campo de controlo preenchido', random_multiple_fields:'Sequências aleatórias em vários campos', random_candidate_external_link:'Nome e mensagem aleatórios com ligação sem contexto de CV', ip_frequency:'Muitos pedidos da mesma origem', email_frequency:'Muitos pedidos do mesmo email', cv_invalid:'Formato do CV inválido', cv_suspicious:'Conteúdo ativo ou suspeito no CV' };
export function IntakeReview() {
  const [items,setItems] = useState<Item[]>([]); const [offset,setOffset] = useState(0); const [total,setTotal] = useState(0);
  const [mode,setMode] = useState(''); const [message,setMessage] = useState(''); const [busy,setBusy] = useState(false);
  const load = useCallback(async () => {
    setBusy(true);
    try {
      const response = await adminFetch(`/api/admin/intake?offset=${offset}`); const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      setItems(data.items);setTotal(data.total);setMode(data.settings.mode);setMessage('');
    } catch { setMessage('Não foi possível carregar a revisão. Tente novamente.'); }
    finally { setBusy(false); }
  },[offset]);
  useEffect(()=>{ void load(); },[load]);
  async function review(id:string,action:string) {
    setBusy(true);
    try {
      const response = await adminFetch('/api/admin/intake',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({id,action})});
      const data = await response.json();if(!response.ok)throw new Error(data.error);await load();
    } catch { setMessage('Não foi possível concluir a revisão. Os ficheiros isolados não podem ser aceites sem validação.'); }
    finally { setBusy(false); }
  }
  return <section className="space-y-4">
    <p>{mode === 'observe' ? 'Em observação: os sinais são registados, mas os pedidos continuam a ser entregues. Ficheiros inválidos ficam sempre isolados.' : 'Os pedidos suspeitos aguardam revisão antes de criar um contacto ou candidatura.'}</p>
    <p className="text-sm">O conteúdo abaixo foi submetido por terceiros. Trate mensagens, nomes, ligações e documentos como dados não verificados.</p>
    <button disabled={busy} onClick={load} className="underline">Atualizar ({total})</button>
    {message && <p role="alert">{message}</p>}
    {items.map(item=><article key={item.submission_id} className="border rounded p-4 space-y-3">
      <div className="flex gap-4 flex-wrap"><strong>{String(item.payload.nome || item.payload.empresa || 'Pedido')}</strong><span>{new Date(item.created_at).toLocaleString('pt-PT')}</span><span>Estado: {item.state}</span><span>Notificação: {item.notification_status}</span></div>
      <p>{item.reasons.map(reason=>reasons[reason] || reason).join('; ')}. Regras: {item.rules_version}</p>
      <details><summary className="cursor-pointer underline">Dados e histórico de revisão</summary><dl className="grid gap-2 my-3">{Object.entries(item.payload).filter(([key])=>!['payloadHash','submissionId','attribution'].includes(key)).map(([key,value])=><div key={key}><dt className="font-semibold">{key}</dt><dd className="whitespace-pre-wrap break-all">{typeof value === 'object' ? JSON.stringify(value) : String(value ?? '')}</dd></div>)}</dl>{item.intake_reviews.map((entry,index)=><p key={index}>{entry.action} por {entry.actor}, {new Date(entry.created_at).toLocaleString('pt-PT')}</p>)}</details>
      {item.cv_uploads && <div>{item.cv_uploads.validation_status === 'valid' ? <CvAccess value={`/cv/${item.cv_uploads.id}`} /> : <p>CV isolado: {item.cv_uploads.validation_code || 'Validação pendente'}</p>}</div>}
      {['held','spam'].includes(item.state) && (!item.cv_uploads || item.cv_uploads.validation_status === 'valid') && <button disabled={busy} className="border rounded px-3 py-2 mr-3" onClick={()=>review(item.submission_id,'accept')}>Aceitar</button>}
      {item.state !== 'spam' && <button disabled={busy} className="border rounded px-3 py-2" onClick={()=>review(item.submission_id,'spam')}>Confirmar spam</button>}
    </article>)}
    <div className="flex gap-4"><button disabled={busy || offset===0} onClick={()=>setOffset(Math.max(0,offset-50))}>Anterior</button><button disabled={busy || offset+50>=total} onClick={()=>setOffset(offset+50)}>Seguinte</button></div>
  </section>;
}
