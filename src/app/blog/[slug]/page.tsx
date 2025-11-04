import React from 'react';
import { getPostBySlug, getAllPublishedPosts } from '@/lib/posts';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import RelatedArticles from '@/components/sections/RelatedArticles';
import Image from 'next/image';
import { compileMDX } from 'next-mdx-remote/rsc';
import Link from 'next/link';

export default async function PostPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  // Compilar MDX
  let compiledContent = null;
  if (post.content_mdx) {
    const { content } = await compileMDX({
      source: post.content_mdx,
      options: {
        parseFrontmatter: false,
      },
    });
    compiledContent = content;
  }
  
  // Obter todos os artigos para a secção de relacionados
  const allArticles = await getAllPublishedPosts();

  // Gerar schema.org JSON-LD
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.description || post.excerpt,
    "image": post.imagem_destaque || post.og_image,
    "datePublished": post.published_at || post.created_at,
    "dateModified": post.updated_at,
    "author": {
      "@type": "Organization",
      "name": post.author || "Medisigma",
      "url": "https://medisigma.pt"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Medisigma",
      "url": "https://medisigma.pt",
      "logo": {
        "@type": "ImageObject",
        "url": "https://medisigma.pt/logomedisigma.svg"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://medisigma.pt/blog/${post.slug}`
    }
  };

  return (
    <>
      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <section className="w-full relative">
        <div className="w-full px-6">
          {/* Breadcrumbs */}
          <nav className="max-w-4xl mx-auto pt-6 pb-4" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2 text-sm text-gray-600">
              <li>
                <Link href="/" className="hover:text-gray-900">
                  Home
                </Link>
              </li>
              <li>
                <span className="mx-2">/</span>
              </li>
              <li>
                <Link href="/blog" className="hover:text-gray-900">
                  Blog
                </Link>
              </li>
              <li>
                <span className="mx-2">/</span>
              </li>
              <li className="text-gray-900 font-medium truncate max-w-md" title={post.title}>
                {post.title}
              </li>
            </ol>
          </nav>

          <article className="max-w-4xl mx-auto py-8">
            {/* Imagem de Destaque */}
            {post.imagem_destaque && (
              <div className="mb-8">
                <Image 
                  src={post.imagem_destaque} 
                  alt={post.title}
                  width={1200}
                  height={630}
                  className="w-full h-auto rounded-lg shadow-lg object-cover max-h-[500px]"
                  priority
                />
              </div>
            )}
          
            <header className="mb-8 border-b pb-6">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-gray-100 leading-tight break-words">
                {post.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                {post.author && (
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span className="break-words">{post.author}</span>
                  </span>
                )}
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="break-words">
                    {new Date(post.published_at || post.created_at).toLocaleDateString('pt-PT', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                </span>
              </div>
              {post.description && (
                <p className="mt-4 text-lg text-gray-700 dark:text-gray-300 leading-relaxed break-words">
                  {post.description}
                </p>
              )}
            </header>
            
            <div className="prose prose-sm sm:prose-base lg:prose-lg dark:prose-invert max-w-none overflow-hidden
                            prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-gray-100 prose-headings:break-words
                            prose-h1:text-3xl sm:prose-h1:text-4xl prose-h1:mt-12 prose-h1:mb-6 prose-h1:border-b prose-h1:border-gray-200 prose-h1:pb-4
                            prose-h2:text-2xl sm:prose-h2:text-3xl prose-h2:mt-8 prose-h2:mb-4
                            prose-h3:text-xl sm:prose-h3:text-2xl prose-h3:mt-6 prose-h3:mb-3
                            prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:leading-relaxed prose-p:mb-4 prose-p:break-words
                            prose-ul:my-4 prose-ul:list-disc prose-ul:pl-6
                            prose-li:text-gray-700 dark:prose-li:text-gray-300 prose-li:mb-2 prose-li:break-words
                            prose-strong:text-gray-900 dark:prose-strong:text-gray-100 prose-strong:font-semibold
                            prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:break-words
                            prose-table:border-collapse prose-table:w-full
                            prose-th:border prose-th:border-gray-300 prose-th:p-2 prose-th:bg-gray-100
                            prose-td:border prose-td:border-gray-300 prose-td:p-2">
              <div className="overflow-x-auto">
                {compiledContent}
              </div>
            </div>
            
            {/* Secção de artigos relacionados */}
            <RelatedArticles 
              currentSlug={params.slug} 
              allArticles={allArticles.map(p => ({
                slug: p.slug,
                title: p.title,
                description: p.description || p.excerpt || '',
                date: p.published_at || p.created_at,
                imagem_destaque: p.imagem_destaque
              }))} 
            />
          </article>
        </div>
      </section>
    </>
  );
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const params = await props.params;

  const post = await getPostBySlug(params.slug);
  
  if (!post) {
    return {
      title: 'Post Não Encontrado | Medisigma',
      description: 'O post que procura não foi encontrado.',
    };
  }

  const metaTitle = post.meta_title || post.title;
  const metaDescription = post.meta_description || post.description || post.excerpt || '';
  const ogImage = post.og_image || post.imagem_destaque;

  return {
    title: metaTitle,
    description: metaDescription,
    authors: post.author ? [{ name: post.author }] : undefined,
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      type: 'article',
      publishedTime: post.published_at || post.created_at,
      modifiedTime: post.updated_at,
      authors: post.author ? [post.author] : undefined,
      url: `https://medisigma.pt/blog/${post.slug}`,
      siteName: 'Medisigma',
      locale: 'pt_PT',
      images: ogImage ? [
        {
          url: ogImage.startsWith('http') ? ogImage : `https://medisigma.pt${ogImage}`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: metaTitle,
      description: metaDescription,
      images: ogImage ? [ogImage.startsWith('http') ? ogImage : `https://medisigma.pt${ogImage}`] : undefined,
    },
    alternates: {
      canonical: `https://medisigma.pt/blog/${post.slug}`,
    },
  };
}

export async function generateStaticParams() {
  const posts = await getAllPublishedPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
} 