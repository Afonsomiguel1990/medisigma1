import React from 'react';
import { getPostBySlug, getAllPublishedPosts } from '@/lib/posts';
import { notFound, permanentRedirect } from 'next/navigation';
import { BLOG_ALIASES, BLOG_RESOURCES, getServiceCta, getBlogAuthor, getBlogTitle, getBlogCanonical } from '@/lib/blog-editorial';
import { Metadata } from 'next';
import RelatedArticles from '@/components/sections/RelatedArticles';
import Image from 'next/image';
import { compileMDX } from 'next-mdx-remote/rsc';
import Link from 'next/link';
import remarkGfm from 'remark-gfm';
import { FacebookVideo } from '@/components/facebook-video';
import { ramiroTestimonial } from '@/lib/testimonials';

export default async function PostPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;

  const alias = BLOG_ALIASES[params.slug];
  if (alias) permanentRedirect(`/blog/${alias}/`);

  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  // Compilar MDX
  let compiledContent = null;
  if (post.content_mdx) {
    try {
      const { content } = await compileMDX({
        source: post.content_mdx,
        components: { FacebookVideo },
        options: {
          parseFrontmatter: false,
          mdxOptions: { remarkPlugins: [remarkGfm] },
        },
      });
      compiledContent = content;
    } catch (error) {
      console.error(`Erro ao compilar MDX para o post ${post.slug}:`, error);
      // Se houver erro na compilação, mostrar mensagem de erro
      compiledContent = (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">Erro ao carregar o conteúdo deste artigo. Por favor, contacte o suporte.</p>
        </div>
      );
    }
  }

  // Determinar serviço relacionado
  const relatedService = getServiceCta(post.slug);
  const resource = BLOG_RESOURCES[post.slug];

  // Obter todos os artigos para a secção de relacionados
  const allArticles = await getAllPublishedPosts();

  const author = getBlogAuthor(post.author);

  // Gerar schema.org JSON-LD
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.description || post.excerpt,
    "image": post.imagem_destaque || post.og_image,
    "datePublished": post.published_at || post.created_at,
    "dateModified": post.updated_at,
    "author": author,
    "publisher": {
      "@type": "Organization",
      "name": "Medisigma",
      "url": "https://www.medisigma.pt",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.medisigma.pt/logomedisigma.svg"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": getBlogCanonical(post.slug)
    }
  };

  return (
    <>
      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }}
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
            {post.imagem_destaque && post.slug !== ramiroTestimonial.slug && (
              <div className="mb-8">
                <Image
                  src={post.imagem_destaque}
                  alt={post.title}
                  width={1200}
                  height={630}
                  sizes="(min-width: 1024px) 896px, calc(100vw - 48px)"
                  className="w-full h-auto rounded-lg shadow-lg object-cover max-h-[160px] sm:max-h-[240px] lg:max-h-[320px]"
                  priority
                />
              </div>
            )}

            <header className="mb-8 border-b pb-6">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-gray-100 leading-tight break-words">
                {post.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                {author.name && (
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span className="break-words">{author.name}</span>
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
                            prose-h1:text-3xl sm:prose-h1:text-4xl prose-h1:mt-12 prose-h1:mb-8 prose-h1:border-b prose-h1:border-gray-200 prose-h1:pb-4
                            prose-h2:text-2xl sm:prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
                            prose-h3:text-xl sm:prose-h3:text-2xl prose-h3:mt-10 prose-h3:mb-4
                            prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:leading-relaxed prose-p:mb-8 prose-p:break-words
                            prose-ul:my-8 prose-ul:list-disc prose-ul:pl-6
                            prose-li:text-gray-700 dark:prose-li:text-gray-300 prose-li:mb-4 prose-li:break-words
                            prose-strong:text-gray-900 dark:prose-strong:text-gray-100 prose-strong:font-semibold
                            prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:break-words
                            prose-a:text-primary prose-a:underline prose-a:decoration-primary/30 prose-a:underline-offset-4 hover:prose-a:decoration-primary prose-a:transition-all
                            prose-table:border-collapse prose-table:w-full
                            prose-th:border prose-th:border-gray-300 prose-th:p-2 prose-th:bg-gray-100
                            prose-td:border prose-td:border-gray-300 prose-td:p-2
                            [&_table_th:first-child]:whitespace-nowrap [&_table_td:first-child]:whitespace-nowrap
                            [&_table_th:first-child]:min-w-12 [&_table_td:first-child]:min-w-12">
              <div className={post.slug === ramiroTestimonial.slug
                ? "overflow-x-auto [&>p]:mb-6 [&>p]:leading-relaxed [&_a]:text-secondary [&_a]:underline [&_a]:underline-offset-4"
                : "overflow-x-auto"}>
                {compiledContent}
              </div>
            </div>

            {/* CTA do Serviço Relacionado */}
            {relatedService && (
              <div className="bg-primary/5 border border-primary/10 rounded-xl p-8 my-12 text-center">
                <h3 className="text-2xl font-bold text-primary mb-4">
                  {relatedService.heading}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
                  {relatedService.description}
                </p>
                <Link
                  href={relatedService.url}
                  className="inline-flex items-center justify-center px-8 py-3 text-base font-semibold rounded-full text-white bg-primary hover:bg-primary/90 transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5"
                >
                  {relatedService.action}
                </Link>
                {resource && <p className="mt-4 text-sm"><Link className="text-primary underline underline-offset-4" href={`/recursos/${resource.slug}/`}>{resource.label}</Link></p>}
              </div>
            )}

            {/* Secção de artigos relacionados */}
            <RelatedArticles
              currentSlug={params.slug}
              allArticles={allArticles.map(p => ({
                slug: p.slug,
                status: p.status,
                title: p.title,
                description: p.description || p.excerpt || '',
                date: p.published_at || p.created_at,
                imagem_destaque: p.imagem_destaque || undefined
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

  const slugToUse = BLOG_ALIASES[params.slug] || params.slug;

  const post = await getPostBySlug(slugToUse);

  if (!post) {
    return {
      title: { absolute: 'Post Não Encontrado - Medisigma' },
      description: 'O post que procura não foi encontrado.',
    };
  }

  const metaTitle = getBlogTitle(post.meta_title || post.title);
  const metaDescription = post.meta_description || post.description || post.excerpt || '';
  const ogImage = post.og_image || post.imagem_destaque;
  const author = getBlogAuthor(post.author);

  return {
    title: { absolute: metaTitle },
    description: metaDescription,
    authors: [{ name: author.name }],
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      type: 'article',
      publishedTime: post.published_at || post.created_at,
      modifiedTime: post.updated_at,
      authors: [author.name],
      url: getBlogCanonical(post.slug),
      siteName: 'Medisigma',
      locale: 'pt_PT',
      images: ogImage ? [
        {
          url: ogImage.startsWith('http') ? ogImage : `https://www.medisigma.pt${ogImage}`,
          width: post.slug === ramiroTestimonial.slug ? 360 : 1200,
          height: post.slug === ramiroTestimonial.slug ? 640 : 630,
          alt: post.title,
        },
      ] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: metaTitle,
      description: metaDescription,
      images: ogImage ? [ogImage.startsWith('http') ? ogImage : `https://www.medisigma.pt${ogImage}`] : undefined,
    },
    alternates: {
      canonical: getBlogCanonical(post.slug),
    },
  };
}

// Desabilitar geração estática para evitar erros durante o build
// As páginas serão geradas dinamicamente quando solicitadas
export const dynamic = 'force-dynamic';
export const revalidate = 3600; // Revalidar a cada hora
