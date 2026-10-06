export const TRIAGE_VERSION = '2026-10-06.1';

// This is a signal for the observed multi-field pattern, never a name validator.
export function looksRandom(value: unknown): boolean {
  if (typeof value !== 'string' || !/^[A-Za-z]{10,80}$/.test(value)) return false;
  const upper = [...value].filter(c => /[A-Z]/.test(c)).length;
  const changes = [...value].slice(1).filter((c, i) => /[A-Z]/.test(c) !== /[A-Z]/.test(value[i])).length;
  return upper >= 3 && value.length - upper >= 3 && changes >= 5 && new Set(value.toLowerCase()).size >= 8;
}

function hasDocumentContext(link: string): boolean {
  try {
    const url = new URL(link);
    const host = url.hostname.toLowerCase();
    return /(^|\.)(linkedin\.com|drive\.google\.com|docs\.google\.com|dropbox\.com|onedrive\.live\.com|1drv\.ms|sharepoint\.com)$/.test(host) ||
      /(?:cv|curricul|resume|portfolio|perfil|profile|\.pdf|\.docx?)(?:[./_?#-]|$)/i.test(url.pathname + url.search);
  } catch { return false; }
}

export function triage(kind: 'contact' | 'spontaneous' | 'application', payload: Record<string, unknown>, honeypot = false) {
  const reasons: string[] = [];
  if (honeypot) reasons.push('honeypot');
  if (kind === 'contact') {
    const fields = ['nome', 'empresa', 'localidade', 'concelho', 'mensagem'].filter(key => looksRandom(payload[key]));
    if (fields.length >= 3) reasons.push('random_multiple_fields');
  } else if (looksRandom(payload.nome) && looksRandom(payload.mensagem) && typeof payload.cv_link === 'string' && payload.cv_link && !hasDocumentContext(payload.cv_link)) {
    reasons.push('random_candidate_external_link');
  }
  return { reasons, ruleVersion: TRIAGE_VERSION };
}
