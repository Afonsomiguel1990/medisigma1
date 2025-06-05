import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Resolução Amigável de Litígios | Medisigma',
  description: 'Informações sobre a Resolução Alternativa de Litígios de Consumo (RAL).',
};

export default function ResolucaoLitigiosPage() {
  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-6">
        Resolução Amigável de Litígios
      </h1>
      <div className="prose dark:prose-invert max-w-none">
        <p>
          [Informações sobre a Resolução Alternativa de Litígios de Consumo (RAL) serão apresentadas aqui...]
        </p>
        {/* Adicionar aqui o texto completo sobre RAL */}
      </div>
    </div>
  );
} 