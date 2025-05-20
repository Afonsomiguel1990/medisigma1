import Link from 'next/link';
import { getSortedPostsData } from '@/lib/mdx';
import BlogCard from '@/components/blog-card';

export const metadata = {
  title: 'Blog',
  description: 'Leia os nossos últimos posts.',
};

export default function BlogPage() {
  const allPosts = getSortedPostsData();

  const placeholderImage = "/placeholder-image.jpg";
  const placeholderExcerpt = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";

  return (
    <section className="py-12 md:py-20">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-bold mb-12 text-center">Blog</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allPosts.map(({ slug, date, title }: { slug: string; date: string; title: string }) => (
            <BlogCard
              key={slug}
              slug={slug}
              title={title}
              date={date}
              image={placeholderImage}
              excerpt={placeholderExcerpt}
            />
          ))}
        </div>
      </div>
    </section>
  );
} 