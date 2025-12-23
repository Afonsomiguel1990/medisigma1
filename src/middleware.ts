import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Lista de padrões suspeitos que devem ser bloqueados
const SUSPICIOUS_PATTERNS = [
  /^\/zootopia/i,
  /^\/product\//i,
  /^\/beast/i,
  /torrent/i,
  /download/i,
  /\.php$/i,
  /\.asp$/i,
  /\.jsp$/i,
  /wp-admin/i,
  /wp-content/i,
  /wp-includes/i,
  /administrator/i,
  /\.env$/i,
  /config\.php/i,
  /phpmyadmin/i,
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Permitir rotas de API e assets estáticos
  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/favicon.ico') ||
    pathname.startsWith('/images') ||
    pathname.startsWith('/public') ||
    pathname.match(/\.(ico|png|jpg|jpeg|svg|gif|webp|css|js|woff|woff2|ttf|eot)$/i)
  ) {
    return NextResponse.next();
  }

  // Verificar padrões suspeitos
  for (const pattern of SUSPICIOUS_PATTERNS) {
    if (pattern.test(pathname)) {
      // Retornar 404 imediatamente sem processar
      return new NextResponse(null, {
        status: 404,
        headers: {
          'X-Robots-Tag': 'noindex, nofollow',
        },
      });
    }
  }

  // Verificar se é uma rota de blog válida (formato /blog/[slug])
  if (pathname.startsWith('/blog/')) {
    const slug = pathname.replace('/blog/', '');
    // Se o slug contém caracteres suspeitos, bloquear
    if (
      slug.includes('..') ||
      slug.includes('//') ||
      slug.length > 200 ||
      /[<>"']/.test(slug)
    ) {
      return new NextResponse(null, {
        status: 404,
        headers: {
          'X-Robots-Tag': 'noindex, nofollow',
        },
      });
    }
    // Deixar passar para a página do blog que fará a validação na base de dados
    return NextResponse.next();
  }

  // Verificar se é uma rota de serviços válida
  if (pathname.startsWith('/servicos/')) {
    const serviceSlug = pathname.replace('/servicos/', '');
    const validServices = [
      'medicina-no-trabalho',
      'seguranca-no-trabalho',
      'seguranca-alimentar',
      'formacao-certificada',
      'psicologia',
      'controlo-pragas',
      'seguranca-incendios',
      'legionella',
      'medicina-desportiva',
      'nutricao',
      'manutencao-extintores',
    ];

    if (!validServices.includes(serviceSlug)) {
      return new NextResponse(null, {
        status: 404,
        headers: {
          'X-Robots-Tag': 'noindex, nofollow',
        },
      });
    }
  }

  // Permitir outras rotas válidas
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
