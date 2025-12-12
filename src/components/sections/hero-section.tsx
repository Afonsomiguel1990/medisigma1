import { siteConfig } from "@/lib/config";
import Link from "next/link";
import { HeroVideoDialog } from "@/components/ui/hero-video-dialog";

export function HeroSection() {
  const { hero } = siteConfig;

  return (
    <section id="hero" className="w-full relative">
      {/* Seção principal com fundo azul */}
      <div className="relative flex flex-col items-center w-full px-6">
        <div className="absolute inset-0">
          <div className="animated-hero-background absolute inset-0 -z-10 h-full w-full [background:radial-gradient(125%_125%_at_50%_10%,var(--background)_40%,var(--secondary)_100%)] rounded-b-xl"></div>
        </div>
        <div className="relative z-10 pt-24 md:pt-32 pb-40 md:pb-40 max-w-5xl mx-auto h-full w-full flex flex-col gap-8 md:gap-10 items-center justify-center">
          {/* <p className="border border-border bg-accent rounded-full text-sm h-8 px-3 flex items-center gap-2">
            {hero.badgeIcon}
            {hero.badge}
          </p> */}
          <div className="flex flex-col items-center justify-center gap-4 md:gap-5">
            <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-medium tracking-tighter text-balance text-center text-primary">
              {hero.title}
            </h1>
            <p className="text-sm md:text-base lg:text-lg text-center text-muted-foreground font-medium text-balance leading-relaxed tracking-tight">
              {hero.description}
            </p>
          </div>
          <div className="flex items-center gap-2.5 flex-wrap justify-center">
            <Link
              href={hero.cta.primary.href}
              className="bg-secondary h-9 flex items-center justify-center text-sm font-normal tracking-wide rounded-full text-primary-foreground dark:text-secondary-foreground px-4 shadow-[inset_0_1px_2px_rgba(255,255,255,0.25),0_3px_3px_-1.5px_rgba(16,24,40,0.06),0_1px_1px_rgba(16,24,40,0.08)] border border-white/[0.12] hover:bg-secondary/80 transition-all ease-out active:scale-95"
            >
              {hero.cta.primary.text}
            </Link>
            <Link
              href="/servicos"
              className="h-9 flex items-center justify-center text-sm font-normal tracking-wide rounded-full text-primary px-4 bg-background border border-border hover:bg-accent active:scale-95 transition-colors"
            >
              Ver Serviços
            </Link>
          </div>
        </div>
      </div>

      {hero.showVideo && (
        <>
          {/* Vídeo com espaçamento correto - não sobreposto */}
          <div className="relative -mt-32 md:-mt-32 z-20 px-6">
            <div className="max-w-4xl mx-auto">
              <HeroVideoDialog
                animationStyle="from-center"
                videoSrc="https://www.youtube.com/embed/QcaxHAlYiTk"
                thumbnailSrc="/images/uploads/imagem-para-usar-no-hero.jpg?v=2"
                thumbnailAlt="Equipa MediSigma em formação culinária"
                className="rounded-xl overflow-hidden shadow-2xl"
              />
            </div>
          </div>
          {/* Espaçamento para compensar o overlap */}
          <div className="h-32 md:h-32"></div>
        </>
      )}
    </section>
  );
}
