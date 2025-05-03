import React from 'react';
// import { getAllPostSlugs, getPostData as getMdxPostData } from '@/lib/mdx'; // Comentado ou removido
// import { MDXRemote } from 'next-mdx-remote/rsc'; // Comentado ou removido
// import { notFound } from 'next/navigation'; // Comentado ou removido
import Link from 'next/link';

// Esta função pode ser usada para buscar dados do post com base no slug
// Por agora, vamos apenas usar o slug para mostrar no exemplo
async function getPostData(slug: string) {
  // No futuro, aqui farias fetch dos dados do post (ex: de um CMS ou base de dados)
  // const res = await fetch(`https://api.example.com/posts/${slug}`);
  // const post = await res.json();
  // return post;

  // Mock data por agora:
  return {
    title: "O Meu Primeiro Post Incrível!",
    author: "Afonso Silva",
    date: "25 de Julho de 2024",
    content: `
      <p>Bem-vindo ao meu primeiro post! Este é um conteúdo de exemplo para vermos como a página fica.</p>
      <h2 class="text-2xl font-semibold mt-6 mb-3">Introdução ao Assunto</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
      <p class="mt-4">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      <h2 class="text-2xl font-semibold mt-6 mb-3">Desenvolvimento</h2>
      <p>Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris. Integer in mauris eu nibh euismod gravida.</p>
      <ul class="list-disc list-inside my-4 pl-4">
        <li>Item de exemplo número 1</li>
        <li>Outro item interessante</li>
        <li>Mais um ponto a considerar</li>
      </ul>
      <p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante.</p>
      <pre class="bg-gray-100 dark:bg-gray-800 p-4 rounded-md my-4 overflow-x-auto"><code>function greet(name) {
  console.log('Olá, ' + name + '!');
}

greet('Mundo');</code></pre>
      <h2 class="text-2xl font-semibold mt-6 mb-3">Conclusão</h2>
      <p>Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, commodo vitae, ornare sit amet, wisi.</p>
    `,
  };
}

interface PostPageProps {
  params: {
    slug: string;
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await getPostData(params.slug);

  // Simples verificação caso a função getPostData falhe ou não encontre o post
  if (!post) {
    return <div>Post não encontrado.</div>;
  }

  return (
    <article className="container mx-auto px-4 py-8 max-w-3xl">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-2">{post.title}</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Por {post.author} em {post.date}
        </p>
         <p className="text-sm text-gray-500 mt-1">Slug: {params.slug}</p>
      </header>
      {/* Usar dangerouslySetInnerHTML para renderizar o HTML do mock. Cuidado com XSS em produção! */}
      <div
        className="prose dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </article>
  );
}

// Opcional: Gerar metadados dinâmicos para SEO
export async function generateMetadata({ params }: PostPageProps) {
  const post = await getPostData(params.slug);
  return {
    title: post?.title || 'Post de Blog',
    description: `Leia o post ${post?.title || params.slug}`,
  };
}

// Função generateStaticParams removida ou comentada, pois não é necessária para o mock
/*
export async function generateStaticParams() {
  const paths = getAllPostSlugs(); // getAllPostSlugs também viria de @/lib/mdx
  return paths;
}
*/ 