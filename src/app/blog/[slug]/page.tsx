import React from 'react';
import { getPostData, getAllPostSlugs } from '@/lib/mdx'; // Importar as funções reais
import { notFound } from 'next/navigation'; // Para caso o post não exista
import { Metadata } from 'next';

// Tipagem para o frontmatter esperado, incluindo a futura imagem_destaque
interface PostFrontmatter {
  title: string;
  date: string;
  description?: string;
  author?: string; // Adicionado, caso queiras usar
  imagem_destaque?: string; // Campo para a imagem de destaque
}

export default async function PostPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params; // Await params aqui
  
  let post;
  try {
    post = await getPostData(params.slug); // Agora params.slug deve ser seguro
  } catch (error) {
    // Se getPostData lançar um erro (ex: ficheiro não encontrado), tratar como notFound
    console.error(`Erro ao carregar o post ${params.slug}:`, error);
    notFound();
  }

  if (!post || !post.frontmatter) {
    notFound();
  }

  const { content, frontmatter } = post;
  const typedFrontmatter = frontmatter as PostFrontmatter; // Aplicar a tipagem

  return (
    <article className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Imagem de Destaque */}
      {typedFrontmatter.imagem_destaque && (
        <div className="mb-8 -mx-4 sm:mx-0">
          <img 
            src={typedFrontmatter.imagem_destaque} 
            alt={typedFrontmatter.title} 
            className="w-full h-auto rounded-lg shadow-lg object-cover max-h-[500px]" 
          />
        </div>
      )}
      
      <header className="mb-8 border-b pb-6">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-gray-100 leading-tight">
          {typedFrontmatter.title}
        </h1>
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
          {typedFrontmatter.author && (
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              {typedFrontmatter.author}
            </span>
          )}
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {new Date(typedFrontmatter.date).toLocaleDateString('pt-PT', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </span>
        </div>
        {typedFrontmatter.description && (
          <p className="mt-4 text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            {typedFrontmatter.description}
          </p>
        )}
      </header>
      
      <div className="prose prose-lg dark:prose-invert max-w-none
                      prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-gray-100
                      prose-h2:text-3xl prose-h2:mt-8 prose-h2:mb-4
                      prose-h3:text-2xl prose-h3:mt-6 prose-h3:mb-3
                      prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:leading-relaxed prose-p:mb-4
                      prose-ul:my-4 prose-ul:list-disc prose-ul:pl-6
                      prose-li:text-gray-700 dark:prose-li:text-gray-300 prose-li:mb-2
                      prose-strong:text-gray-900 dark:prose-strong:text-gray-100 prose-strong:font-semibold
                      prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:pl-4 prose-blockquote:italic">
        {content}
      </div>
    </article>
  );
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const params = await props.params; // Await params aqui

  try {
    const post = await getPostData(params.slug); // Agora params.slug deve ser seguro
    if (!post || !post.frontmatter) {
      return {
        title: 'Post Não Encontrado',
        description: 'O post que procuras não foi encontrado.',
      };
    }
    const typedFrontmatter = post.frontmatter as PostFrontmatter;
    return {
      title: `${typedFrontmatter.title} | Blog Medisigma`,
      description: typedFrontmatter.description || 'Leia este artigo do blog da Medisigma.',
      // OpenGraph metadata para partilha (incluindo imagem de destaque se existir)
      openGraph: {
        title: typedFrontmatter.title,
        description: typedFrontmatter.description,
        type: 'article',
        publishedTime: typedFrontmatter.date,
        authors: typedFrontmatter.author ? [typedFrontmatter.author] : undefined,
        // TODO: Adicionar aqui a URL completa da imagem de destaque quando disponível
        // images: typedFrontmatter.imagem_destaque ? [
        //   {
        //     url: new URL(typedFrontmatter.imagem_destaque, siteConfig.url).toString(), // Assumindo que siteConfig.url está definido
        //     width: 1200, // Ajustar conforme necessário
        //     height: 630, // Ajustar conforme necessário
        //     alt: typedFrontmatter.title,
        //   },
        // ] : undefined,
      },
    };
  } catch (error) {
    return {
      title: 'Erro ao Carregar Post',
      description: 'Ocorreu um erro ao carregar este post.',
    };
  }
}

export async function generateStaticParams() {
  const posts = getAllPostSlugs(); // getAllPostSlugs de @/lib/mdx
  return posts.map((post) => ({
    slug: post.params.slug,
  }));
} 