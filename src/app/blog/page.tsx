import { getAllPublishedPosts } from '@/lib/posts';
import BlogCard from '@/components/blog-card';

export const metadata = {
  title: 'Blog | Medisigma',
  description: 'Guias completos sobre medicina do trabalho, segurança ocupacional, Legionella e conformidade legal em Portugal.',
};

export default async function BlogPage() {
  const allPosts = await getAllPublishedPosts();

  const placeholderImage = "/logomedisigma.svg";

  return (
    <section className="py-12 md:py-20">
      <div className="w-full px-8 md:px-12 lg:px-16 xl:px-20">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">Blog</h1>

        {/* Introdução do Blog */}
        <div className="max-w-4xl mx-auto mb-12">
          <p className="text-lg text-gray-600 text-center leading-relaxed">
            <span className="font-semibold text-gray-800">A sua empresa está realmente protegida?</span> Descubra as tendências, regulamentações e melhores práticas que estão a transformar o panorama da segurança no trabalho em Portugal. Do cumprimento legal à excelência operacional exploramos os desafios reais que os gestores enfrentam todos os dias e as soluções que fazem a diferença.
          </p>
        </div>

        {allPosts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Ainda não existem posts publicados.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12">
            {allPosts.map((post) => (
              <BlogCard
                key={post.slug}
                slug={post.slug}
                title={post.title}
                date={post.published_at || post.created_at}
                image={post.imagem_destaque || placeholderImage}
                excerpt={post.excerpt || post.description || ''}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
} 