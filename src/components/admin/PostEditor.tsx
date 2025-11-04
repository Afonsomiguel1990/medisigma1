'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PostWithTags, CreatePostData, UpdatePostData, generateSlug } from '@/lib/posts';
import { compileMDX } from 'next-mdx-remote/rsc';
import Image from 'next/image';

interface PostEditorProps {
  post?: PostWithTags;
  onSave: (data: CreatePostData | UpdatePostData) => Promise<void>;
  saving: boolean;
}

export default function PostEditor({ post, onSave, saving }: PostEditorProps) {
  const [title, setTitle] = useState(post?.title || '');
  const [slug, setSlug] = useState(post?.slug || '');
  const [contentMdx, setContentMdx] = useState(post?.content_mdx || '');
  const [excerpt, setExcerpt] = useState(post?.excerpt || '');
  const [description, setDescription] = useState(post?.description || '');
  const [author, setAuthor] = useState(post?.author || 'Equipa Medisigma');
  const [imagemDestaque, setImagemDestaque] = useState(post?.imagem_destaque || '');
  const [metaTitle, setMetaTitle] = useState(post?.meta_title || '');
  const [metaDescription, setMetaDescription] = useState(post?.meta_description || '');
  const [ogImage, setOgImage] = useState(post?.og_image || '');
  const [status, setStatus] = useState<'draft' | 'scheduled' | 'published'>(post?.status || 'draft');
  const [publishedAt, setPublishedAt] = useState(post?.published_at || '');
  const [scheduledFor, setScheduledFor] = useState(post?.scheduled_for || '');
  const [tags, setTags] = useState<string>(post?.tags?.map(t => t.name).join(', ') || '');
  const [previewContent, setPreviewContent] = useState<React.ReactElement | null>(null);
  const [uploading, setUploading] = useState(false);
  const [autoSlug, setAutoSlug] = useState(!post); // Auto-gerar slug apenas para posts novos

  // Auto-gerar slug a partir do título
  useEffect(() => {
    if (autoSlug && title) {
      const newSlug = generateSlug(title);
      setSlug(newSlug);
    }
  }, [title, autoSlug]);

  // Atualizar preview quando o conteúdo mudar
  useEffect(() => {
    if (contentMdx) {
      updatePreview();
    }
  }, [contentMdx]);

  const updatePreview = async () => {
    try {
      const { content } = await compileMDX({
        source: contentMdx,
        options: {
          parseFrontmatter: false,
        },
      });
      setPreviewContent(content);
    } catch (error) {
      console.error('Erro ao compilar preview:', error);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Erro ao fazer upload');
      }

      const { url } = await response.json();
      setImagemDestaque(url);
      if (!ogImage) setOgImage(url); // Auto-preencher OG image se vazio
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Erro ao fazer upload');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data: CreatePostData | UpdatePostData = {
      title,
      slug,
      content_mdx: contentMdx,
      excerpt: excerpt || undefined,
      description: description || undefined,
      author,
      imagem_destaque: imagemDestaque || undefined,
      meta_title: metaTitle || undefined,
      meta_description: metaDescription || undefined,
      og_image: ogImage || undefined,
      status,
      published_at: publishedAt || undefined,
      scheduled_for: scheduledFor || undefined,
      tags: tags ? tags.split(',').map(t => t.trim()).filter(Boolean) : undefined,
    };

    if (post) {
      (data as UpdatePostData).id = post.id;
    }

    await onSave(data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Tabs defaultValue="content" className="w-full">
        <TabsList>
          <TabsTrigger value="content">Conteúdo</TabsTrigger>
          <TabsTrigger value="seo">SEO</TabsTrigger>
          <TabsTrigger value="settings">Configurações</TabsTrigger>
        </TabsList>

        <TabsContent value="content" className="space-y-4">
          <div>
            <Label htmlFor="title">Título *</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="Título do post"
            />
          </div>

          <div>
            <Label htmlFor="slug">Slug (URL) *</Label>
            <div className="flex gap-2">
              <Input
                id="slug"
                value={slug}
                onChange={(e) => {
                  setSlug(e.target.value);
                  setAutoSlug(false);
                }}
                required
                placeholder="slug-do-post"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setSlug(generateSlug(title));
                  setAutoSlug(false);
                }}
              >
                Gerar
              </Button>
            </div>
          </div>

          <div>
            <Label htmlFor="excerpt">Resumo</Label>
            <Textarea
              id="excerpt"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="Resumo curto para listagens (150-200 caracteres)"
              rows={3}
            />
            <p className="text-sm text-gray-500 mt-1">{excerpt.length} caracteres</p>
          </div>

          <div>
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descrição mais longa para SEO"
              rows={2}
            />
          </div>

          <div>
            <Label htmlFor="image">Imagem de Destaque</Label>
            <div className="space-y-2">
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={uploading}
              />
              {uploading && <p className="text-sm text-gray-500">A fazer upload...</p>}
              {imagemDestaque && (
                <div className="relative w-full h-48 mt-2">
                  <Image
                    src={imagemDestaque}
                    alt="Preview"
                    fill
                    className="object-cover rounded"
                  />
                </div>
              )}
              <Input
                value={imagemDestaque}
                onChange={(e) => setImagemDestaque(e.target.value)}
                placeholder="Ou cole a URL da imagem"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="content">Conteúdo (Markdown) *</Label>
            <Tabs defaultValue="edit" className="w-full">
              <TabsList>
                <TabsTrigger value="edit">Editar</TabsTrigger>
                <TabsTrigger value="preview">Preview</TabsTrigger>
              </TabsList>
              <TabsContent value="edit">
                <Textarea
                  id="content"
                  value={contentMdx}
                  onChange={(e) => setContentMdx(e.target.value)}
                  required
                  placeholder="Escreva o conteúdo em Markdown..."
                  rows={20}
                  className="font-mono"
                />
              </TabsContent>
              <TabsContent value="preview">
                <div className="border rounded p-4 min-h-[400px] prose max-w-none">
                  {previewContent || <p className="text-gray-400">Preview aparecerá aqui...</p>}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <div>
            <Label htmlFor="tags">Tags</Label>
            <Input
              id="tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="medicina, trabalho, sst (separadas por vírgula)"
            />
          </div>
        </TabsContent>

        <TabsContent value="seo" className="space-y-4">
          <div>
            <Label htmlFor="meta-title">Meta Título</Label>
            <Input
              id="meta-title"
              value={metaTitle}
              onChange={(e) => setMetaTitle(e.target.value)}
              placeholder="Título para SEO (deixe vazio para usar o título do post)"
              maxLength={60}
            />
            <p className="text-sm text-gray-500 mt-1">{metaTitle.length}/60 caracteres</p>
          </div>

          <div>
            <Label htmlFor="meta-description">Meta Descrição</Label>
            <Textarea
              id="meta-description"
              value={metaDescription}
              onChange={(e) => setMetaDescription(e.target.value)}
              placeholder="Descrição para motores de busca"
              rows={3}
              maxLength={160}
            />
            <p className="text-sm text-gray-500 mt-1">{metaDescription.length}/160 caracteres</p>
          </div>

          <div>
            <Label htmlFor="og-image">Open Graph Image URL</Label>
            <Input
              id="og-image"
              value={ogImage}
              onChange={(e) => setOgImage(e.target.value)}
              placeholder="URL da imagem para redes sociais"
            />
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <div>
            <Label htmlFor="author">Autor</Label>
            <Input
              id="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Nome do autor"
            />
          </div>

          <div>
            <Label htmlFor="status">Status</Label>
            <Select value={status} onValueChange={(v: 'draft' | 'scheduled' | 'published') => setStatus(v)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Rascunho</SelectItem>
                <SelectItem value="scheduled">Agendado</SelectItem>
                <SelectItem value="published">Publicado</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {status === 'published' && (
            <div>
              <Label htmlFor="published-at">Data de Publicação</Label>
              <Input
                id="published-at"
                type="datetime-local"
                value={publishedAt ? new Date(publishedAt).toISOString().slice(0, 16) : ''}
                onChange={(e) => setPublishedAt(e.target.value ? new Date(e.target.value).toISOString() : '')}
              />
            </div>
          )}

          {status === 'scheduled' && (
            <div>
              <Label htmlFor="scheduled-for">Agendar Para</Label>
              <Input
                id="scheduled-for"
                type="datetime-local"
                value={scheduledFor ? new Date(scheduledFor).toISOString().slice(0, 16) : ''}
                onChange={(e) => setScheduledFor(e.target.value ? new Date(e.target.value).toISOString() : '')}
              />
            </div>
          )}
        </TabsContent>
      </Tabs>

      <div className="flex justify-between items-center pt-6 border-t">
        <Button type="button" variant="outline" onClick={() => window.history.back()}>
          Cancelar
        </Button>
        <Button type="submit" disabled={saving || uploading}>
          {saving ? 'A guardar...' : post ? 'Atualizar Post' : 'Criar Post'}
        </Button>
      </div>
    </form>
  );
}

