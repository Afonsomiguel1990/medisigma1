import Link from 'next/link';
import { getSortedPostsData } from '@/lib/mdx';

export const metadata = {
  title: 'Blog',
  description: 'Leia os nossos últimos posts.',
};

export default function BlogPage() {
  const allPosts = getSortedPostsData();

  return (
    <section className="py-12 md:py-20">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">Blog</h1>
        <ul className="space-y-6 max-w-2xl mx-auto">
          {allPosts.map(({ slug, date, title }: { slug: string; date: string; title: string }) => (
            <li key={slug} className="border p-4 rounded-lg hover:bg-accent transition-colors">
              <Link href={`/blog/${slug}`} className="block">
                <h2 className="text-xl font-semibold mb-1">{title}</h2>
                <p className="text-sm text-muted-foreground mb-2">
                  {new Date(date).toLocaleDateString('pt-PT', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
                {/* Poderíamos adicionar uma descrição curta aqui se tivéssemos no frontmatter */}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
} 