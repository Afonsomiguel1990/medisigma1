import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardTitle } from '@/components/ui/card'; // Assumindo que os componentes Card estão aqui
import { Button } from '@/components/ui/button'; // Para o botão "Ler Mais"

interface BlogCardProps {
  slug: string;
  title: string;
  date: string;
  image: string; // URL da imagem
  excerpt: string; // Excerto do post
}

export default function BlogCard({ slug, title, date, image, excerpt }: BlogCardProps) {
  const formattedDate = new Date(date).toLocaleDateString('pt-PT', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Card className="flex flex-col h-full overflow-hidden transition-shadow duration-300 hover:shadow-lg border-0 shadow-md rounded-lg p-0">
      <div className="relative aspect-[16/10] overflow-hidden rounded-t-lg">
        <Link href={`/blog/${slug}`} className="block w-full h-full">
          <Image
            src={image}
            alt={`Imagem de capa para ${title}`}
            fill
            className="object-cover transition-transform duration-300 hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={false}
          />
        </Link>
      </div>
      <CardContent className="p-6 flex-grow">
        <CardTitle className="mb-3 text-lg font-semibold leading-tight">
          <Link href={`/blog/${slug}`} className="hover:text-primary transition-colors">
            {title}
          </Link>
        </CardTitle>
        <p className="text-sm text-muted-foreground mb-4">{formattedDate}</p>
        <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
          {excerpt}
        </p>
      </CardContent>
      <CardFooter className="px-6 pb-6 pt-0">
        <Button asChild variant="link" className="p-0 h-auto">
          <Link href={`/blog/${slug}`}>
            Ler Mais <span aria-hidden="true" className="ml-1">→</span>
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
} 