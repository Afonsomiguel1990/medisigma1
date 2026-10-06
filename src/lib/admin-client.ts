'use client';
export async function adminFetch(input: string, init: RequestInit = {}) {
  if (!['GET','HEAD','OPTIONS'].includes((init.method || 'GET').toUpperCase())) {
    const response = await fetch('/api/admin/csrf', { cache:'no-store' });
    if (!response.ok) throw new Error('Não foi possível validar a sessão. Atualize a página.');
    const { token } = await response.json();
    const headers = new Headers(init.headers);
    headers.set('X-CSRF-Token', token);
    init = { ...init, headers };
  }
  return fetch(input, init);
}
