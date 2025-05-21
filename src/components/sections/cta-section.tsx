import { siteConfig } from "@/lib/config";
import Link from "next/link";
import { TypingAnimation } from "@/components/magicui/typing-animation";

export function CTASection() {
  const { ctaSection } = siteConfig;

  return (
    <section
      id="cta"
      className="w-full flex flex-col items-center justify-center py-8 md:py-12"
    >
      <div
        className="h-[220px] md:h-[220px] overflow-hidden shadow-xl w-full border border-border rounded-xl relative z-20 flex items-center justify-center"
        style={{ backgroundColor: "#FFE03A" }}
      >
        <div className="flex flex-col items-center justify-center w-full">
          <TypingAnimation
            text={ctaSection.title}
            className="text-white text-4xl md:text-6xl font-medium tracking-tighter max-w-xs md:max-w-xl text-center"
            duration={100}
            startOnView={true}
          />
          <div className="flex flex-col items-center justify-center gap-2 mt-4">
            <Link
              href={ctaSection.button.href}
              className="bg-white text-black font-semibold text-sm h-10 w-fit px-4 rounded-full flex items-center justify-center shadow-md"
            >
              {ctaSection.button.text}
            </Link>
            {/* <span className="text-white text-sm">{ctaSection.subtext}</span> */}
          </div>
        </div>
      </div>
    </section>
  );
}