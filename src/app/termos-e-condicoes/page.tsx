import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Termos e Condições | Medisigma',
  description: 'Consulte os Termos e Condições de utilização do site da Medisigma.',
};

export default function TermosECondicoesPage() {
  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-6">
        Termos e Condições
      </h1>
      <div className="prose dark:prose-invert max-w-none">
        <p>
          [O conteúdo dos Termos e Condições da Medisigma será apresentado aqui...]
        </p>
        {/* Adicionar aqui o texto completo dos termos e condições */}
      </div>
    </div>
  );
} 