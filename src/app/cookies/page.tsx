import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Política de Cookies | Medisigma',
  description: 'Consulte a nossa Política de Cookies para saber como utilizamos cookies no nosso site.',
};

export default function PoliticaDeCookiesPage() {
  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-6">
        Política de Cookies
      </h1>
      <div className="prose dark:prose-invert max-w-none">
        <p>
          [O conteúdo da Política de Cookies da Medisigma será apresentado aqui...]
        </p>
        {/* Adicionar aqui o texto completo da política de cookies */}
      </div>
    </div>
  );
} 