import { getSupabaseServer } from './supabase';

/**
 * Interface para Contacto
 */
export interface Contact {
  id: string;
  empresa: string | null;
  email: string | null;
  telefone: string | null;
  servico: string | null;
  mensagem: string | null;
  pagina: string | null;
  url: string | null;
  fonte: string | null;
  created_at: string;
}

/**
 * Interface para Candidatura Espontânea
 */
export interface Candidatura {
  id: string;
  nome: string | null;
  email: string | null;
  telefone: string | null;
  area_interesse: string | null;
  cv_link: string | null;
  mensagem: string | null;
  pagina: string | null;
  url: string | null;
  origem: string | null;
  created_at: string;
}

/**
 * Interface para Candidatura para Vaga Específica
 */
export interface Application {
  id: string;
  job_id: string | null;
  name: string | null;
  email: string | null;
  phone: string | null;
  cv_url: string | null;
  cover_letter: string | null;
  consent: boolean;
  created_at: string;
}

/**
 * Obtém todos os contactos
 * Requer SUPABASE_SERVICE_ROLE devido às políticas RLS
 */
export async function getAllContacts(): Promise<Contact[]> {
  const supabase = getSupabaseServer();
  
  const { data, error } = await supabase
    .schema('web')
    .from('contacts')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Erro ao obter contactos:', error);
    throw error;
  }

  return data as Contact[];
}

/**
 * Obtém todas as candidaturas espontâneas
 * Requer SUPABASE_SERVICE_ROLE devido às políticas RLS
 */
export async function getAllCandidaturas(): Promise<Candidatura[]> {
  const supabase = getSupabaseServer();
  
  const { data, error } = await supabase
    .schema('web')
    .from('candidaturas')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Erro ao obter candidaturas:', error);
    throw error;
  }

  return data as Candidatura[];
}

/**
 * Obtém todas as candidaturas para vagas específicas
 * Requer SUPABASE_SERVICE_ROLE devido às políticas RLS
 */
export async function getAllApplications(): Promise<Application[]> {
  const supabase = getSupabaseServer();
  
  const { data, error } = await supabase
    .schema('web')
    .from('applications')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Erro ao obter candidaturas:', error);
    throw error;
  }

  return data as Application[];
}

/**
 * Obtém todos os formulários organizados por tipo
 */
export async function getAllForms() {
  const [contacts, candidaturas, applications] = await Promise.all([
    getAllContacts(),
    getAllCandidaturas(),
    getAllApplications(),
  ]);

  return {
    contacts,
    candidaturas,
    applications,
  };
}

