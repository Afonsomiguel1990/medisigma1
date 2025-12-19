import { NextRequest, NextResponse } from 'next/server';
import { getAllPosts, createPost, CreatePostData } from '@/lib/posts';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * GET /api/admin/posts
 * Retorna todos os posts (incluindo drafts)
 */
export async function GET() {
  try {
    const posts = await getAllPosts();
    return NextResponse.json({ posts }, { status: 200 });
  } catch (error) {
    console.error('Erro ao obter posts:', error);
    return NextResponse.json(
      { error: 'Erro ao obter posts' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/posts
 * Cria um novo post
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validação básica
    if (!body.title || !body.slug || !body.content_mdx) {
      return NextResponse.json(
        { error: 'Campos obrigatórios: title, slug, content_mdx' },
        { status: 400 }
      );
    }

    const postData: CreatePostData = {
      title: body.title,
      slug: body.slug,
      content_mdx: body.content_mdx,
      excerpt: body.excerpt,
      description: body.description,
      author: body.author || 'Equipa Medisigma',
      imagem_destaque: body.imagem_destaque,
      meta_title: body.meta_title,
      meta_description: body.meta_description,
      og_image: body.og_image,
      status: body.status || 'draft',
      published_at: body.published_at,
      scheduled_for: body.scheduled_for,
      tags: body.tags,
    };

    const post = await createPost(postData);

    return NextResponse.json({ post }, { status: 201 });
  } catch (error) {
    console.error('Erro ao criar post:', error);
    return NextResponse.json(
      { error: 'Erro ao criar post' },
      { status: 500 }
    );
  }
}













