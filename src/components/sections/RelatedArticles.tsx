import React from 'react';
import Link from 'next/link';

interface Article {
  slug: string;
  title: string;
  description: string;
  date: string;
  imagem_destaque?: string;
}

interface RelatedArticlesProps {
  currentSlug: string;
  allArticles: Article[];
}

export default function RelatedArticles({ currentSlug, allArticles }: RelatedArticlesProps) {
  // Filtrar artigos excluindo o atual e pegar os 3 mais recentes
  const relatedArticles = allArticles
    .filter(article => article.slug !== currentSlug)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  if (relatedArticles.length === 0) {
    return null;
  }

  return (
    <section className="mt-16 pt-12 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">
          Artigos Relacionados
        </h2>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {relatedArticles.map((article) => (
            <Link 
              key={article.slug} 
              href={`/blog/${article.slug}`}
              className="group block bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700 related-article-card"
            >
              {/* Imagem de destaque */}
              {article.imagem_destaque && (
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={article.imagem_destaque} 
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              
              {/* Conteúdo do card */}
              <div className="p-6">
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-3">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>
                    {new Date(article.date).toLocaleDateString('pt-PT', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </span>
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 line-clamp-2">
                  {article.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3 leading-relaxed">
                  {article.description}
                </p>
                
                <div className="mt-4 inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 text-sm font-medium group-hover:gap-3 transition-all duration-300">
                  <span>Ler artigo</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        {/* Link para ver todos os artigos */}
        <div className="text-center mt-10">
          <Link 
            href="/blog" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-300"
          >
            <span>Ver Todos os Artigos</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
} 