import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'; // Assumindo que os componentes Card estão aqui
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
    <Card className="flex flex-col h-full overflow-hidden transition-shadow duration-300 hover:shadow-lg">
      <CardHeader className="p-0">
        <Link href={`/blog/${slug}`} className="block aspect-video relative">
          {/* Usar next/image para otimização */}
          <Image
            src={image}
            alt={`Imagem de capa para ${title}`}
            fill // Faz a imagem preencher o container
            className="object-cover" // Garante que a imagem cubra a área sem distorcer
            // Adicionar sizes para otimização responsiva, se necessário
            // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={false} // Marcar como false, apenas imagens acima da dobra devem ser priority
          />
        </Link>
      </CardHeader>
      <CardContent className="p-4 flex-grow"> {/* flex-grow para empurrar o footer para baixo */}
        <CardTitle className="mb-2 text-lg font-semibold leading-tight">
          <Link href={`/blog/${slug}`} className="hover:text-primary transition-colors">
            {title}
          </Link>
        </CardTitle>
        <p className="text-sm text-muted-foreground mb-3">{formattedDate}</p>
        <p className="text-sm text-muted-foreground line-clamp-3"> {/* line-clamp limita o excerto a 3 linhas */}
          {excerpt}
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0"> {/* Remover padding-top para colar ao content */}
        <Button asChild variant="link" className="p-0 h-auto">
          <Link href={`/blog/${slug}`}>
            Ler Mais <span aria-hidden="true" className="ml-1">→</span>
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
} 