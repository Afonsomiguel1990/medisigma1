import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Livro de Reclamações | Medisigma',
  description: 'Aceda ao Livro de Reclamações Eletrónico.',
};

export default function LivroReclamacoesPage() {
  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-6">
        Livro de Reclamações
      </h1>
      <div className="prose dark:prose-invert max-w-none">
        <p>
          Pode aceder ao Livro de Reclamações Eletrónico através do seguinte link:
        </p>
        <p>
          <a 
            href="https://www.livroreclamacoes.pt/inicio"
            target="_blank" 
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            Aceder ao Livro de Reclamações Eletrónico
          </a>
        </p>
        <p>
          [Mais informações ou instruções podem ser adicionadas aqui...]
        </p>
      </div>
    </div>
  );
} 