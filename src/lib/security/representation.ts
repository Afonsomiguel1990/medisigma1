import { siteOrigin } from './origin';
import { readBoundedBytes } from './body';
import { isNegotiablePublicPath, REPRESENTATION_SOURCE_HEADER } from '../public-routes';
export function representationUrl(path:string) {
  const origin = siteOrigin();
  if (!path.startsWith('/') || path.startsWith('//') || /[\\\u0000-\u001f]/.test(path)) throw new Error('Invalid source path');
  const url = new URL(path,origin);
  if (url.origin !== origin || !isNegotiablePublicPath(url.pathname)) throw new Error('Non-public source path');
  return url;
}
export async function fetchRepresentation(url:URL) {
  const response = await fetch(url, {
    redirect:'manual', cache:'no-store', signal:AbortSignal.timeout(10000),
    headers:{ Accept:'text/html', [REPRESENTATION_SOURCE_HEADER]:'1', 'User-Agent':'Medisigma-Renderer/1.0' },
  });
  const bytes = await readBoundedBytes(response, 3 * 1024 * 1024);
  return new Response([204,205,304].includes(response.status) ? null : bytes, { status:response.status,headers:response.headers });
}
