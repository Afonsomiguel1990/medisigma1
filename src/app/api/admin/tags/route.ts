import { NextResponse } from 'next/server';
import { getAllTags, createOrGetTag } from '@/lib/posts';

export const runtime = 'nodejs';

/**
 * GET /api/admin/tags
 * Retorna todas as tags
 */
export async function GET() {
  try {
    const tags = await getAllTags();
    return NextResponse.json({ tags }, { status: 200 });
  } catch (error) {
    console.error('Erro ao obter tags:', error);
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
export async function POST(req: Request) {
  try {
    const { name } = await req.json();
    
    if (!name) {
      return NextResponse.json(
        { error: 'Nome da tag é obrigatório' },
        { status: 400 }
      );
    }

    const tag = await createOrGetTag(name);
    
    return NextResponse.json({ tag }, { status: 201 });
  } catch (error) {
    console.error('Erro ao criar tag:', error);
    return NextResponse.json(
      { error: 'Erro ao criar tag' },
      { status: 500 }
    );
  }
}




