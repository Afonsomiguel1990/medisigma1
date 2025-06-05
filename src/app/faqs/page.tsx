import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FAQs - Perguntas Frequentes | Medisigma',
  description: 'Encontre respostas às perguntas mais frequentes sobre os serviços e a Medisigma.',
};

export default function FAQsPage() {
  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-6">
        Perguntas Frequentes (FAQs)
      </h1>
      <p className="text-lg leading-8 text-muted-foreground">
        [Lista de perguntas e respostas frequentes será apresentada aqui...]
      </p>
      {/* Adicionar aqui a estrutura de FAQs (ex: accordion) */}
    </div>
  );
} 