import { NextRequest, NextResponse } from 'next/server';
import { publishPost } from '@/lib/posts';

export const runtime = 'nodejs';

/**
 * POST /api/admin/posts/[id]/publish
 * Publica um post (altera status para published)
 */
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    
    const publishedAt = body.published_at || new Date().toISOString();
    const post = await publishPost(id, publishedAt);
    
    return NextResponse.json({ post }, { status: 200 });
  } catch (error) {
    console.error('Erro ao publicar post:', error);
    return NextResponse.json(
      { error: 'Erro ao publicar post' },
      { status: 500 }
    );
  }
}




