import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Testemunhos de Clientes | Medisigma',
  description: 'Veja o que os nossos clientes dizem sobre os serviços da Medisigma.',
};

export default function TestemunhosPage() {
  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-6">
        Testemunhos de Clientes
      </h1>
      <p className="text-lg leading-8 text-muted-foreground">
        [Testemunhos de clientes da Medisigma serão apresentados aqui...]
      </p>
      {/* Adicionar aqui os testemunhos */}
    </div>
  );
} 