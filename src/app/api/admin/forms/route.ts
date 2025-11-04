import { NextRequest, NextResponse } from 'next/server';
import { getAllForms, getAllContacts, getAllCandidaturas, getAllApplications } from '@/lib/forms';

export const runtime = 'nodejs';

/**
 * GET /api/admin/forms
 * Retorna todos os formulários ou um tipo específico
 * Query params: ?type=contacts|candidaturas|applications
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get('type');

    // Verifica se SUPABASE_SERVICE_ROLE está configurada
    if (!process.env.SUPABASE_SERVICE_ROLE) {
      return NextResponse.json(
        { 
          error: 'SUPABASE_SERVICE_ROLE não está configurada. É necessária para aceder aos formulários devido às políticas RLS. Adicione-a ao ficheiro .env.local' 
        },
        { status: 500 }
      );
    }

    // Se especificar um tipo, retorna apenas esse tipo
    if (type === 'contacts') {
      const contacts = await getAllContacts();
      return NextResponse.json({ contacts }, { status: 200 });
    }

    if (type === 'candidaturas') {
      const candidaturas = await getAllCandidaturas();
      return NextResponse.json({ candidaturas }, { status: 200 });
    }

    if (type === 'applications') {
      const applications = await getAllApplications();
      return NextResponse.json({ applications }, { status: 200 });
    }

    // Caso contrário, retorna todos
    const forms = await getAllForms();
    return NextResponse.json(forms, { status: 200 });
  } catch (error) {
    console.error('Erro ao obter formulários:', error);
    const errorMessage = error instanceof Error ? error.message : 'Erro ao obter formulários';
    
    // Mensagem mais útil se for erro de autenticação
    if (errorMessage.includes('Service key') || errorMessage.includes('em falta')) {
      return NextResponse.json(
        { 
          error: 'SUPABASE_SERVICE_ROLE não está configurada. Adicione-a ao ficheiro .env.local com a service role key do projeto Supabase.' 
        },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}

