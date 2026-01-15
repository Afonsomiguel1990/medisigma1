import React from 'react';
import { Metadata } from 'next';
import { getSupabaseServer } from '@/lib/supabase';
import { Job } from './JobsList';
import RecrutamentoClient from './RecrutamentoClient';

export const metadata: Metadata = {
  title: 'Bolsa de Recrutamento | Medisigma',
  description: 'Consulte as oportunidades de carreira e junte-se à equipa Medisigma. Faça parte de uma empresa líder em Medicina do Trabalho e Segurança.',
};

export default async function RecrutamentoPage() {
  const supabase = getSupabaseServer();

  const { data: jobs } = await supabase
    .schema('web')
    .from('jobs')
    .select('*')
    .eq('status', 'published')
    .order('published_at', { ascending: false });

  return <RecrutamentoClient jobs={(jobs as unknown as Job[]) || []} />;
}
