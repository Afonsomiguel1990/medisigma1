import { readPostBody } from '@/lib/security/admin-body';
import { HttpError } from '@/lib/security/body';
import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { publishPost } from '@/lib/posts';
import { requireAdminAuth } from '@/lib/admin-auth';

export const runtime = 'nodejs';

/**
 * POST /api/admin/posts/[id]/publish
 * Publica um post (altera status para published)
 */
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authError = await requireAdminAuth(req);
  if (authError) return authError;

  try {
    const { id } = await params;
    const body = await readPostBody(req);
    
    const publishedAt = body.published_at || new Date().toISOString();
    const post = await publishPost(id, publishedAt);

    revalidatePath('/blog');
    revalidatePath(`/blog/${post.slug}`);
    revalidatePath('/');
    
    return NextResponse.json({ post }, { status: 200 });
  } catch (error) {
    if (error instanceof HttpError) return NextResponse.json({error:error.message},{status:error.status});
    console.error('Erro ao publicar post:');
    return NextResponse.json(
      { error: 'Erro ao publicar post' },
      { status: 500 }
    );
  }
}













