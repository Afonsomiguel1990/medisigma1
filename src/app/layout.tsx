import { Navbar } from "@/components/sections/navbar";
import { RecruitmentBanner } from "@/components/recruitment-banner";
import { ThemeProvider } from "@/components/theme-provider";
import { siteConfig } from "@/lib/site";
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { FooterSection } from "@/components/sections/footer-section";
import { CTASection } from "@/components/sections/cta-section";
import { CookieConsentComponent } from "@/components/cookie-consent";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "black",
};

import { metadata as baseMetadata } from "./metadata";

export const metadata: Metadata = {
  ...baseMetadata,
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Medicina do Trabalho em Portugal | Medisigma - Segurança e Saúde",
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Grupo Medisigma",
  "url": "https://www.medisigma.pt",
  "logo": "https://www.medisigma.pt/logos/logomedisigma.svg",
  "description": "Grupo empresarial português especializado em Medicina do Trabalho, Segurança no Trabalho, Segurança Alimentar (HACCP), Formação Certificada, Controlo de Pragas, Prevenção de Legionella e Psicologia Ocupacional. Cobertura nacional com sede em Abrantes.",
  "foundingLocation": "Abrantes, Portugal",
  "areaServed": {
    "@type": "Country",
    "name": "Portugal"
  },
  "sameAs": [
    "https://www.facebook.com/GrupoMedisigma",
    "https://www.instagram.com/medisigma.pt/",
    "https://linkedin.com/company/medisigma"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+351 241 331 504",
    "contactType": "customer service",
    "areaServed": "PT",
    "availableLanguage": ["Portuguese"]
  },
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Abrantes",
    "addressRegion": "Santarém",
    "addressCountry": "PT"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Serviços de Segurança e Saúde no Trabalho",
    "itemListElement": [
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Medicina do Trabalho" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Segurança no Trabalho" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Segurança Alimentar (HACCP)" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Formação Certificada" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Psicologia Ocupacional" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Controlo de Pragas" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Prevenção de Legionella" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Segurança Contra Incêndios" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Manutenção de Extintores" } }
    ]
  },
  "knowsAbout": [
    "Medicina do Trabalho",
    "Segurança e Saúde no Trabalho",
    "HACCP",
    "Lei n.º 102/2009",
    "ISO 45001",
    "Prevenção de Riscos Profissionais"
  ]
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt" suppressHydrationWarning>
      <Script
        id="schema-org-organization"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-GB5WGQPXK3"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-GB5WGQPXK3');
        `}
      </Script>
      {/* <head>
        <Script src="https://unpkg.com/react-scan/dist/auto.global.js" />
      </head> */}

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-sans bg-background`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          disableTransitionOnChange
        >
          <div className="max-w-7xl mx-auto border-x relative flex flex-col divide-y divide-border">
            <div className="block w-px h-full border-l border-border absolute top-0 left-6 z-10"></div>
            <div className="block w-px h-full border-r border-border absolute top-0 right-6 z-10"></div>
            <RecruitmentBanner />
            <Navbar />
            {children}
            <CTASection />
            <FooterSection />
          </div>
          <CookieConsentComponent />
        </ThemeProvider>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
