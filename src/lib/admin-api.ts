'use client';

const ADMIN_TOKEN_KEY = 'medisigma.adminToken';

function getStoredToken() {
  if (typeof window === 'undefined') return '';
  return window.sessionStorage.getItem(ADMIN_TOKEN_KEY) || '';
}

function setStoredToken(token: string) {
  if (typeof window === 'undefined') return;
  window.sessionStorage.setItem(ADMIN_TOKEN_KEY, token);
}

function clearStoredToken() {
  if (typeof window === 'undefined') return;
  window.sessionStorage.removeItem(ADMIN_TOKEN_KEY);
}

function requestToken() {
  if (typeof window === 'undefined') return '';
  const token = window.prompt('Token de administracao');
  const trimmed = token?.trim() || '';
  if (trimmed) setStoredToken(trimmed);
  return trimmed;
}

export async function adminFetch(input: RequestInfo | URL, init: RequestInit = {}) {
  const token = getStoredToken() || requestToken();
  const headers = new Headers(init.headers);

  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  let response = await fetch(input, { ...init, headers });

  if (response.status === 401) {
    clearStoredToken();
    const retryToken = requestToken();

    if (retryToken) {
      const retryHeaders = new Headers(init.headers);
      retryHeaders.set('Authorization', `Bearer ${retryToken}`);
      response = await fetch(input, { ...init, headers: retryHeaders });
    }
  }

  return response;
}
