'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import PostEditor from '@/components/admin/PostEditor';
import { PostWithTags, UpdatePostData } from '@/lib/posts';

export default function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [post, setPost] = useState<PostWithTags | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
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
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar post');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (data: UpdatePostData) => {
    if (!resolvedParams) return;
    
    setSaving(true);
    setError(null);

    try {
      const response = await fetch(`/api/admin/posts/${resolvedParams.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...data, id: resolvedParams.id }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erro ao atualizar post');
      }

      const { post: updatedPost } = await response.json();
      setPost(updatedPost);
      alert('Post atualizado com sucesso!');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao atualizar post');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <p>A carregar post...</p>
      </div>
    );
  }

  if (error && !post) {
    return (
      <div className="container mx-auto py-8 px-4">
        <p className="text-red-500">Erro: {error}</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container mx-auto py-8 px-4">
        <p>Post não encontrado.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Editar Post</h1>
      
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded">
          {error}
        </div>
      )}

      <PostEditor post={post} onSave={handleSave} saving={saving} />
    </div>
  );
}

