"use client";

import { useState } from "react";
import { Icons } from "@/components/icons";
import { FlickeringGrid } from "@/components/ui/flickering-grid";
import { useMediaQuery } from "@/hooks/use-media-query";
import { siteConfig } from "@/lib/config";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { NewsletterModal } from "@/components/newsletter-modal";

export function FooterSection() {
  const tablet = useMediaQuery("(max-width: 1024px)");
  const [isNewsletterModalOpen, setIsNewsletterModalOpen] = useState(false);

  const handleLinkClick = (url: string, e: React.MouseEvent) => {
    if (url === "#newsletter") {
      e.preventDefault();
      setIsNewsletterModalOpen(true);
    }
  };

  return (
    <footer id="footer" className="w-full">
      {/* Seção Principal do Footer */}
      <div className="relative bg-background border-t border-border">
        <div className="container mx-auto px-6 py-12">
          {/* Logo e Links */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12 lg:items-center">
            {/* Coluna do Logo */}
            <div className="lg:col-span-1 flex items-start">
              <Link href="/" className="inline-block">
                <Icons.logo className="h-[32rem] w-auto" />
              </Link>
            </div>

            {/* Colunas de Links */}
            <div className="lg:col-span-3">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {siteConfig.footerLinks.map((column, columnIndex) => (
                  <div key={columnIndex} className="space-y-4">
                    <h4 className="text-sm font-semibold text-foreground pl-2 md:pl-0">
                      {column.title}
                    </h4>
                    <ul className="space-y-3">
                      {column.links.map((link) => (
                        <li key={link.id}>
                          {link.url.startsWith("#") ? (
                            <button
                              onClick={(e) => handleLinkClick(link.url, e)}
                              className="group inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 pl-2 md:pl-0"
                            >
                              <span>{link.title}</span>
                              <div className="flex h-4 w-4 items-center justify-center rounded border border-border opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-1">
                                <ChevronRightIcon className="h-3 w-3" />
                              </div>
                            </button>
                          ) : (
                            <Link
                              href={link.url}
                              className="group inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 pl-2 md:pl-0"
                            >
                              <span>{link.title}</span>
                              <div className="flex h-4 w-4 items-center justify-center rounded border border-border opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-1">
                                <ChevronRightIcon className="h-3 w-3" />
                              </div>
                            </Link>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Certificações Centralizadas */}
          <div className="mt-12 flex items-center justify-center gap-8 border-t border-border pt-12 px-4 md:px-0">
            <Icons.svgCertificadosGeral className="h-10 w-auto flex-shrink-0" />
          </div>
        </div>
      </div>

      {/* Seção do FlickeringGrid */}
      <div className="relative h-32 md:h-48 overflow-hidden">
        {/* Gradiente de fundo */}
        <div className="absolute inset-0 -z-10 h-full w-full [background:radial-gradient(125%_125%_at_50%_10%,transparent_40%,#97bd28_100%)] opacity-20" />
        
        {/* Overlay para suavizar a transição */}
        <div className="absolute inset-0 bg-gradient-to-t from-transparent to-background z-10 from-40%" />
        
        {/* Grid animado */}
        <div className="absolute inset-0 mx-6">
          <FlickeringGrid
            text={tablet ? "Medisigma" : "Medisigma"}
            fontSize={tablet ? 60 : 80}
            className="h-full w-full"
            squareSize={2}
            gridGap={tablet ? 2 : 3}
            color="#97bd28"
            maxOpacity={0.2}
            flickerChance={0.08}
          />
        </div>

        {/* Copyright */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 w-full max-w-xs">
          <div className="border-t border-border/30 pt-3">
            <p className="text-xs text-muted-foreground text-center">
              © {new Date().getFullYear()} Medisigma. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </div>

      {/* Newsletter Modal */}
      <NewsletterModal 
        isOpen={isNewsletterModalOpen} 
        onClose={() => setIsNewsletterModalOpen(false)} 
      />
    </footer>
  );
}
