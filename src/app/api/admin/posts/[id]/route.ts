import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getPostById, updatePost, deletePost, UpdatePostData } from '@/lib/posts';

export const runtime = 'nodejs';

/**
 * GET /api/admin/posts/[id]
 * Retorna um post específico
 */
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const post = await getPostById(id);

    if (!post) {
      return NextResponse.json(
        { error: 'Post não encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json({ post }, { status: 200 });
  } catch (error) {
    console.error('Erro ao obter post:', error);
    return NextResponse.json(
      { error: 'Erro ao obter post' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/admin/posts/[id]
 * Atualiza um post existente
 */
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();

    const updateData: UpdatePostData = {
      id,
      title: body.title,
      slug: body.slug,
      content_mdx: body.content_mdx,
      excerpt: body.excerpt,
      description: body.description,
      author: body.author,
      imagem_destaque: body.imagem_destaque,
      meta_title: body.meta_title,
      meta_description: body.meta_description,
      og_image: body.og_image,
      status: body.status,
      published_at: body.published_at,
      scheduled_for: body.scheduled_for,
      tags: body.tags,
    };

    const post = await updatePost(updateData);

    revalidatePath('/blog');
    revalidatePath(`/blog/${post.slug}`);
    revalidatePath('/');

    return NextResponse.json({ post }, { status: 200 });
  } catch (error) {
    console.error('Erro ao atualizar post:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Erro ao atualizar post' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/posts/[id]
 * Elimina um post
 */
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await deletePost(id);

    revalidatePath('/blog');
    revalidatePath('/');

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Erro ao eliminar post:', error);
    return NextResponse.json(
      { error: 'Erro ao eliminar post' },
      { status: 500 }
    );
  }
}













