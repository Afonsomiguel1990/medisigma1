import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bolsa de Recrutamento | Medisigma',
  description: 'Consulte as oportunidades de carreira e junte-se à equipa Medisigma.',
};

export default function RecrutamentoPage() {
  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-6">
        Bolsa de Recrutamento
      </h1>
      <p className="text-lg leading-8 text-muted-foreground">
        [Informações sobre oportunidades de carreira e como se candidatar serão apresentadas aqui...]
      </p>
      {/* Adicionar aqui formulário de candidatura ou lista de vagas */}
    </div>
  );
} 