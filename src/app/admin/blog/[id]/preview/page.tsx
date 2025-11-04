'use client';

import { useEffect, useState } from 'react';
import { PostWithTags } from '@/lib/posts';
import { compileMDX } from 'next-mdx-remote/rsc';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default function PreviewPostPage({ params }: { params: Promise<{ id: string }> }) {
  const [post, setPost] = useState<PostWithTags | null>(null);
  const [content, setContent] = useState<React.ReactElement | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [resolvedParams, setResolvedParams] = useState<{ id: string } | null>(null);

  useEffect(() => {
    params.then(setResolvedParams);
  }, [params]);

  useEffect(() => {
    if (resolvedParams) {
      fetchPost();
    }
  }, [resolvedParams]);

  const fetchPost = async () => {
    if (!resolvedParams) return;
    
    try {
      const response = await fetch(`/api/admin/posts/${resolvedParams.id}`);
      if (!response.ok) throw new Error('Erro ao carregar post');
      const data = await response.json();
      setPost(data.post);

      // Compilar MDX
      if (data.post.content_mdx) {
        const { content: compiledContent } = await compileMDX({
          source: data.post.content_mdx,
          options: {
            parseFrontmatter: false,
          },
        });
        setContent(compiledContent);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar post');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <p>A carregar preview...</p>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="container mx-auto py-8 px-4">
        <p className="text-red-500">Erro: {error || 'Post não encontrado'}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b py-4 sticky top-0 z-10">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">Preview: {post.title}</h1>
          <div className="space-x-2">
            <Link href={`/admin/blog/${post.id}/edit`}>
              <Button variant="outline">Voltar ao Editor</Button>
            </Link>
            <Link href="/admin/blog">
              <Button variant="outline">Voltar à Listagem</Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto py-8 px-4 max-w-4xl">
        <article className="bg-white p-8 rounded-lg shadow">
          {post.imagem_destaque && (
            <div className="mb-8">
              <Image
                src={post.imagem_destaque}
                alt={post.title}
                width={1200}
                height={630}
                className="w-full h-auto rounded-lg"
              />
            </div>
          )}

          <header className="mb-8 border-b pb-6">
            <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              {post.author && <span>Por {post.author}</span>}
              {post.published_at && (
                <span>
                  {new Date(post.published_at).toLocaleDateString('pt-PT', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
              )}
            </div>
            {post.description && (
              <p className="mt-4 text-lg text-gray-700">{post.description}</p>
            )}
          </header>

          <div className="prose prose-lg max-w-none">
            {content}
          </div>

          {post.tags && post.tags.length > 0 && (
            <div className="mt-8 pt-8 border-t">
              <h3 className="text-sm font-semibold mb-2">Tags:</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag.id}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                  >
                    {tag.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </article>
      </div>
    </div>
  );
}

