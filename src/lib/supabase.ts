export const runtime = 'node';

import { createClient } from '@supabase/supabase-js';

export function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE as string;
  if (!url || !serviceKey) {
    throw new Error('Supabase URL/Service key em falta nas envs');
  }
  return createClient(url, serviceKey, { auth: { persistSession: false } });
}

export function getSupabaseAnon() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;
  if (!url || !anon) {
    throw new Error('Supabase URL/Anon key em falta nas envs');
  }
  return createClient(url, anon, { auth: { persistSession: false } });
}

export function getSupabaseServer() {
  const hasService = Boolean(process.env.SUPABASE_SERVICE_ROLE);
  try {
    return hasService ? getSupabaseAdmin() : getSupabaseAnon();
  } catch (e) {
    // Re-lançar erro original
    throw e;
  }
}
