import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { FacebookVideo } from "@/components/facebook-video";
import { ramiroTestimonial } from "@/lib/testimonials";
import { serializeJsonLd } from "@/lib/organization";

export const metadata: Metadata = {
  title: 'Testemunhos de clientes',
  description: 'Conheça a experiência dos clientes da Medisigma. Veja o testemunho do Restaurante O Ramiro sobre acompanhamento e segurança na restauração.',
  alternates: {
    canonical: 'https://www.medisigma.pt/testemunhos/',
  },
  openGraph: {
    title: 'Testemunhos de clientes | Medisigma',
    description: ramiroTestimonial.description,
    url: 'https://www.medisigma.pt/testemunhos/',
    locale: 'pt_PT',
    type: 'website',
    images: [{ url: ramiroTestimonial.poster, width: 360, height: 640, alt: 'Entrevista com o Restaurante O Ramiro' }],
  },
};

export default function TestemunhosPage() {
  return (
    <main className="px-8 py-12 md:px-12 md:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd({
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          '@id': 'https://www.medisigma.pt/testemunhos/',
          name: 'Testemunhos de clientes da Medisigma',
          description: ramiroTestimonial.description,
          hasPart: { '@type': 'Article', '@id': `https://www.medisigma.pt${ramiroTestimonial.articleUrl}`, name: 'Segurança na restauração: o testemunho do Restaurante O Ramiro' },
        }) }}
      />
      <header className="mx-auto mb-10 max-w-5xl border-b border-border pb-8 md:mb-12">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">Testemunhos de clientes</h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">A experiência de trabalhar com a Medisigma, contada por quem a conhece.</p>
      </header>
      <article id="restaurante-o-ramiro" className="mx-auto grid max-w-5xl items-center gap-10 lg:grid-cols-[1fr_360px] lg:gap-16">
        <div>
          <p className="mb-5 text-xs font-semibold uppercase tracking-widest text-secondary">{ramiroTestimonial.sector}</p>
          <h2 className="text-2xl font-semibold text-foreground">{ramiroTestimonial.client}</h2>
          <blockquote className="my-7 border-l-2 border-secondary pl-6 text-3xl font-medium leading-tight tracking-tight text-foreground md:text-4xl">
            &quot;{ramiroTestimonial.quote}&quot;
          </blockquote>
          <p className="text-sm font-medium text-muted-foreground">Ramiro, Restaurante O Ramiro</p>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Ramiro recorda a relação com a Medisigma ao longo dos anos e destaca o atendimento e o apoio que recebe. Uma conversa sobre o trabalho diário de quem está na restauração.
          </p>
          <Link href={ramiroTestimonial.articleUrl} className="mt-7 inline-flex min-h-12 items-center gap-2 rounded-lg bg-secondary px-5 py-3 font-semibold text-white transition-colors hover:bg-secondary/90">
            Ler o artigo completo <ArrowUpRight aria-hidden="true" className="size-4" />
          </Link>
        </div>
        <FacebookVideo />
      </article>
      <aside className="mx-auto mt-14 max-w-5xl border-t border-border pt-8 md:mt-16">
        <h2 className="text-xl font-semibold text-foreground">Precisa de apoio no seu restaurante?</h2>
        <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">Conheça os serviços da Medisigma e fale connosco sobre as necessidades da sua equipa e do seu estabelecimento.</p>
        <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium text-secondary">
          <Link href="/servicos/seguranca-no-trabalho/" className="underline underline-offset-4">Segurança no trabalho</Link>
          <Link href="/servicos/medicina-no-trabalho/" className="underline underline-offset-4">Medicina do trabalho</Link>
          <Link href="/servicos/seguranca-alimentar/" className="underline underline-offset-4">Segurança alimentar e HACCP</Link>
          <Link href="/contact/" className="underline underline-offset-4">Pedir proposta</Link>
        </div>
      </aside>
    </main>
  );
}
