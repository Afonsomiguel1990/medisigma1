'use client';
import { useState } from 'react';
import { adminFetch } from '@/lib/admin-client';
type TokenInfo = { id:string; expires_at:string; revoked_at:string | null };
export function CvAccess({ value }: { value:string }) {
  const id = /^\/cv\/([a-f0-9-]{36})\/?$/.exec(value)?.[1];
  const [opened,setOpened] = useState(false);
  const [download,setDownload] = useState('');
  const [link,setLink] = useState('');
  const [tokens,setTokens] = useState<TokenInfo[]>([]);
  const [message,setMessage] = useState('');
  const [busy,setBusy] = useState(false);
  if (!id) {
    let url:URL;
    try { url = new URL(value); if (url.protocol !== 'https:') throw new Error(); }
    catch { return <span>Ligação indisponível</span>; }
    const historical = url.hostname === 'jtulxclahsgowmfrifwf.supabase.co' && url.pathname.startsWith('/storage/v1/object/public/os-cv/');
    return <span><a className="text-blue-600 underline" href={value} target="_blank" rel="noopener noreferrer">Ver CV</a>{!historical && <small className="block">{url.hostname}: Ligação externa não verificada</small>}</span>;
  }
  async function load() {
    setBusy(true); setMessage('');
    try {
      const response = await adminFetch(`/api/admin/cv/${id}`); const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      setDownload(data.url); setTokens(data.tokens); setOpened(true);
    } catch (error) { setMessage(error instanceof Error ? error.message : 'Consulta indisponível.'); }
    finally { setBusy(false); }
  }
  async function action(action:string,token_id?:string) {
    setBusy(true); setMessage('');
    try {
      const response = await adminFetch(`/api/admin/cv/${id}`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({action,token_id})});
      const data = await response.json(); if (!response.ok) throw new Error(data.error);
      if (data.url) setLink(data.url); else setLink('');
      await load();
    } catch (error) { setMessage(error instanceof Error ? error.message : 'Operação indisponível.'); }
    finally { setBusy(false); }
  }
  return <div className="space-y-2 min-w-48">
    <button type="button" disabled={busy} className="text-blue-600 underline" onClick={load}>{busy ? 'A carregar...' : 'Consultar CV privado'}</button>
    {opened && <div className="space-y-2">
      <a href={download} target="_blank" rel="noreferrer" className="block text-blue-600 underline">Abrir documento (5 minutos)</a>
      <button type="button" disabled={busy} className="block underline" onClick={()=>action('create')}>Criar ligação de 90 dias</button>
      {link && <label className="block text-sm">Nova ligação, válida por 90 dias<textarea readOnly value={link} className="block w-full border rounded p-2" onFocus={e=>e.target.select()} /></label>}
      {tokens.map(token=><div key={token.id} className="text-xs">{token.revoked_at ? 'Revogada' : `Válida até ${new Date(token.expires_at).toLocaleDateString('pt-PT')}`}{!token.revoked_at && <button type="button" disabled={busy} className="ml-2 underline" onClick={()=>action('revoke',token.id)}>Revogar</button>}</div>)}
    </div>}
    {message && <p role="status" className="text-sm text-red-700">{message}</p>}
  </div>;
}
