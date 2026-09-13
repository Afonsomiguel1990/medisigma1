import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ramiroTestimonial } from "@/lib/testimonials";

export function RestaurantTestimonial() {
  return (
    <section id="testemunho-restauracao" aria-labelledby="testemunho-restauracao-title" className="mx-8 mb-12 border-y border-border py-8 md:mx-12 md:py-10">
      <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-[112px_1fr] sm:items-center md:gap-8">
        <Link href={ramiroTestimonial.articleUrl} tabIndex={-1} aria-hidden="true" className="hidden sm:block">
          <Image src={ramiroTestimonial.poster} alt="" width={112} height={160} className="h-40 w-28 rounded-lg object-cover" />
        </Link>
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-secondary">Testemunho de um cliente da restauração</p>
          <h2 id="testemunho-restauracao-title" className="text-2xl font-semibold tracking-tight text-foreground">O Restaurante O Ramiro conta a sua experiência</h2>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
            Uma relação de longa data com a Medisigma, contada pelo cliente. Veja a entrevista e conheça o nosso apoio à restauração.
          </p>
          <Link href={ramiroTestimonial.articleUrl} className="mt-4 inline-flex min-h-11 items-center gap-2 font-semibold text-secondary underline-offset-4 hover:underline">
            Ver o vídeo e ler o artigo <ArrowUpRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
