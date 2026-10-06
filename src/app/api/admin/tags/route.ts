import { readBoundedJson, HttpError } from '@/lib/security/body';
import { NextRequest, NextResponse } from 'next/server';
import { getAllTags, createOrGetTag } from '@/lib/posts';
import { requireAdminAuth } from '@/lib/admin-auth';

export const runtime = 'nodejs';

/**
 * GET /api/admin/tags
 * Retorna todas as tags
 */
export async function GET(req: NextRequest) {
  const authError = await requireAdminAuth(req);
  if (authError) return authError;

  try {
    const tags = await getAllTags();
    return NextResponse.json({ tags }, { status: 200 });
  } catch (error) {
    if (error instanceof HttpError) return NextResponse.json({error:error.message},{status:error.status});
    console.error('Erro ao obter tags:');
    return NextResponse.json(
      { error: 'Erro ao obter tags' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/tags
 * Cria uma nova tag
 */
export async function POST(req: NextRequest) {
  const authError = await requireAdminAuth(req);
  if (authError) return authError;

  try {
    const { name } = await readBoundedJson(req);
    
    if (typeof name !== 'string' || !name.trim() || name.length > 200) {
      return NextResponse.json(
        { error: 'Nome da tag é obrigatório' },
        { status: 400 }
      );
    }

    const tag = await createOrGetTag(name);
    
    return NextResponse.json({ tag }, { status: 201 });
  } catch (error) {
    if (error instanceof HttpError) return NextResponse.json({error:error.message},{status:error.status});
    console.error('Erro ao criar tag:');
    return NextResponse.json(
      { error: 'Erro ao criar tag' },
      { status: 500 }
    );
  }
}













