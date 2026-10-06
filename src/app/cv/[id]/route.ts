import { randomBytes } from 'node:crypto';
import { UUID_PATTERN } from '@/lib/leads/validation';
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// A route response bypasses the React layout, analytics and agent representations.
export async function GET(_req: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  if (!UUID_PATTERN.test(id)) return new Response('Ligação inválida.', { status:404, headers:{ 'Cache-Control':'no-store' } });
  const nonce = randomBytes(18).toString('base64');
  const html = `<!doctype html><html lang="pt-PT"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow,noarchive"><meta name="referrer" content="no-referrer"><title>Consultar CV | Medisigma</title><script nonce="${nonce}">const cvToken=new URLSearchParams(location.hash.slice(1)).get('token');history.replaceState(null,'',location.pathname);</script></head><body><main><h1>Consultar CV</h1><p id="status" role="status">A verificar a ligação...</p><a id="download" hidden rel="noreferrer">Abrir CV</a><noscript>Ative o JavaScript para usar esta ligação privada. A equipa pode consultar o CV na administração.</noscript></main><script nonce="${nonce}">(async()=>{const message=document.getElementById('status');if(!cvToken){message.textContent='Esta ligação precisa do token enviado com a notificação.';return;}try{const response=await fetch('/api/cv/access',{method:'POST',cache:'no-store',headers:{'Content-Type':'application/json'},body:JSON.stringify({id:'${id}',token:cvToken})});const result=await response.json();if(!response.ok)throw new Error();const link=document.getElementById('download');link.href=result.url;link.hidden=false;message.textContent='O CV está disponível. A ligação abaixo é válida durante 5 minutos.';}catch{message.textContent='A ligação é inválida, expirou ou está temporariamente indisponível. Contacte a equipa para obter uma nova ligação.';}})();</script></body></html>`;
  return new Response(html, { headers: {
    'Content-Type':'text/html; charset=utf-8', 'Cache-Control':'private, no-store, max-age=0', 'CDN-Cache-Control':'no-store', 'Vercel-CDN-Cache-Control':'no-store',
    'X-Robots-Tag':'noindex, nofollow, noarchive', 'Referrer-Policy':'no-referrer', 'X-Content-Type-Options':'nosniff',
    'Content-Security-Policy':`default-src 'none'; script-src 'nonce-${nonce}'; connect-src 'self'; base-uri 'none'; form-action 'none'; frame-ancestors 'none'`,
  } });
}
