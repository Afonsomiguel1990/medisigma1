import type { Resource } from './catalog';
export const RESOURCE_ACCESS_WINDOW_MS = 24 * 60 * 60 * 1000;
export const SIGNED_LINK_SECONDS = 10 * 60;
export interface ResourceSigner { (resource: Resource, expiresIn: number): Promise<string> }
export async function createResourceAccess(resource: Resource, createdAt: string | undefined, signer: ResourceSigner, now = Date.now()) {
  const created = createdAt ? Date.parse(createdAt) : NaN;
  if (!Number.isFinite(created) || created > now + 60000) return { download_error: 'Não foi possível confirmar a data do pedido.' };
  const secondsLeft = Math.floor((created + RESOURCE_ACCESS_WINDOW_MS - now) / 1000);
  if (secondsLeft <= 0) return { download_expired: true, download_error: 'Este pedido tem mais de 24 horas. Faça um novo pedido para obter o recurso.' };
  const expiresIn = SIGNED_LINK_SECONDS;
  try {
    const downloadUrl = await signer(resource, expiresIn);
    return { download_url: downloadUrl, download_expires_at: new Date(now + expiresIn * 1000).toISOString() };
  } catch {
    return { download_error: 'O pedido ficou guardado, mas o ficheiro está temporariamente indisponível. Tente obter a ligação novamente.' };
  }
}
