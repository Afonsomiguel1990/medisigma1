import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Política de Privacidade | Medisigma',
  description: 'Consulte a nossa Política de Privacidade para saber como tratamos os seus dados.',
};

export default function PoliticaDePrivacidadePage() {
  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-6">
        Política de Privacidade
      </h1>
      <div className="prose dark:prose-invert max-w-none">
        <p>
          [O conteúdo da Política de Privacidade da Medisigma será apresentado aqui...]
        </p>
        {/* Adicionar aqui o texto completo da política de privacidade */}
      </div>
    </div>
  );
} 