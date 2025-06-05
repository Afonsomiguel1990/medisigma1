import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Casos de Sucesso | Medisigma',
  description: 'Conheça os casos de sucesso da Medisigma e como ajudamos os nossos clientes.',
};

export default function CasosDeSucessoPage() {
  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-6">
        Casos de Sucesso
      </h1>
      <p className="text-lg leading-8 text-muted-foreground">
        [Detalhes sobre os casos de sucesso da Medisigma serão apresentados aqui...]
      </p>
      {/* Adicionar aqui exemplos de casos de sucesso */}
    </div>
  );
} 