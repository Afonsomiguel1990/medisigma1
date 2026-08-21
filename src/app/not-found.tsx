import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-16">
      <div className="max-w-2xl mx-auto text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary mb-3">
          Erro 404
        </p>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Página não encontrada
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-xl mx-auto">
          A página que procura não existe ou foi movida. Consulte os serviços,
          o blog ou os índices abaixo para continuar.
        </p>
        <div className="flex flex-wrap gap-3 justify-center mb-8">
          <Link
            href="/"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Voltar ao início
          </Link>
          <Link
            href="/blog"
            className="px-6 py-3 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            Ver blog
          </Link>
          <Link
            href="/servicos/"
            className="px-6 py-3 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            Ver serviços
          </Link>
          <Link
            href="/contact/"
            className="px-6 py-3 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            Contactar
          </Link>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Índices para pessoas e agentes: {" "}
          <Link href="/sitemap.xml" className="underline hover:text-foreground">
            sitemap.xml
          </Link>{" "}
          e {" "}
          <Link href="/llms.txt" className="underline hover:text-foreground">
            llms.txt
          </Link>
          .
        </p>
      </div>
    </main>
  );
}








