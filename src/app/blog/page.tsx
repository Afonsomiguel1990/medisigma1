import { getSortedPostsData } from '@/lib/mdx';
import BlogCard from '@/components/blog-card';

export const metadata = {
  title: 'Blog',
  description: 'Leia os nossos últimos posts.',
};

export default function BlogPage() {
  const allPosts = getSortedPostsData();

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12">
          {allPosts.map(({ slug, date, title, excerpt, imagem_destaque }: { slug: string; date: string; title: string; excerpt: string; imagem_destaque: string | null }) => (
            <BlogCard
              key={slug}
              slug={slug}
              title={title}
              date={date}
              image={imagem_destaque || placeholderImage}
              excerpt={excerpt}
            />
          ))}
        </div>
      </div>
    </section>
  );
} 