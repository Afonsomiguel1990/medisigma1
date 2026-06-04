"use client";

import { siteConfig } from "@/lib/config";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { TypingAnimation } from "@/components/magicui/typing-animation";

export function CTASection() {
  const pathname = usePathname();
  const { ctaSection } = siteConfig;

  if (
    pathname?.startsWith("/ferramentas/simulador-medicina-no-trabalho") ||
    pathname?.startsWith("/ferramentas/simulador-caixas-primeiros-socorros")
  ) {
    return null;
  }

  return (
    <section
      id="cta"
      className="w-full flex flex-col items-center justify-center py-0"
    >
      <CtaSectionInner ctaSection={ctaSection} />
    </section>
  );
}

function CtaSectionInner({
  ctaSection,
}: {
  ctaSection: (typeof siteConfig)["ctaSection"];
}) {
  return (
    <div
      className="h-[220px] md:h-[220px] overflow-hidden shadow-sm w-full relative z-20 flex items-center justify-center rounded-xl"
      style={{ backgroundColor: "#FFE03A" }}
    >
      <div className="flex flex-col items-center justify-center w-full">
        <TypingAnimation
          text={ctaSection.title}
          className="text-white text-4xl md:text-6xl font-medium tracking-tighter max-w-xs md:max-w-xl text-center"
          duration={100}
          startOnView={true}
        />
        <div className="mt-4 flex flex-col items-center justify-center gap-2">
          <Link
            href={ctaSection.button.href}
            className="flex h-10 w-fit items-center justify-center rounded-full bg-white px-4 text-sm font-semibold text-black shadow-md"
          >
            {ctaSection.button.text}
          </Link>
        </div>
      </div>
    </div>
  );
}
