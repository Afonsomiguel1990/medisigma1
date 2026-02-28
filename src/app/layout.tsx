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

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "O Grupo Medisigma atua em que zonas do país?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Atuamos em todo o território nacional. Dispomos de unidades móveis, equipamentos e recursos para servir qualquer necessidade dos nossos clientes."
      }
    },
    {
      "@type": "Question",
      "name": "Como posso agendar serviços, adquirir produtos ou solicitar orçamento?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Basta preencher o formulário online ou contactar a nossa equipa através do telefone 241 331 504 ou através do nosso e-mail info@medisigma.pt."
      }
    },
    {
      "@type": "Question",
      "name": "O serviço de saúde e segurança no trabalho é obrigatório em todas as empresas?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sim. A Lei n.º 102/2009, de 9 de setembro, obriga todas as empresas, mesmo microempresas com 1 trabalhador, a garantirem a segurança e saúde dos seus trabalhadores, com o objetivo de proteger a vida e a saúde destes, prevenindo acidentes e doenças profissionais. Assegurando o cumprimento da lei, evitando coimas e responsabilidades legais."
      }
    },
    {
      "@type": "Question",
      "name": "Que exames médicos são obrigatórios e qual a sua periodicidade?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Existem três tipos de exames: Admissão – antes do início de funções ou nos 15 dias seguintes; Periódicos – de 2 em 2 anos para trabalhadores entre 18 e 50 anos sem exposição a riscos, anuais para menores de 18, maiores de 50 ou com funções de risco; Ocasionais – após ausência superior a 30 dias, acidente de trabalho, ou por alteração relevante das condições de trabalho."
      }
    },
    {
      "@type": "Question",
      "name": "A empresa pode aceder aos dados clínicos dos colaboradores?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Não. Apenas a Ficha de Aptidão é partilhada com o empregador. Todos os restantes dados clínicos são estritamente confidenciais, protegidos pelo sigilo profissional e pelo Regulamento Geral sobre a Proteção de Dados (RGPD)."
      }
    },
    {
      "@type": "Question",
      "name": "O que é o Portal Careview?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "É o portal do cliente do Grupo Medisigma, onde pode consultar online o estado dos exames médicos, aceder a Fichas de Aptidão, relatórios e outros documentos relevantes de forma segura e imediata."
      }
    },
    {
      "@type": "Question",
      "name": "O Grupo Medisigma disponibiliza Unidades Móveis de Saúde?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sim. As nossas Unidades Móveis de Saúde estão equipadas para realizar os exames médicos diretamente nas instalações da sua empresa, em qualquer ponto do país, otimizando o tempo e evitando deslocações dos seus colaboradores."
      }
    },
    {
      "@type": "Question",
      "name": "Qual a periodicidade de manutenção de extintores?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Inspeção Trimestral – pelo menos a cada três meses para verificar acesso, visibilidade e estado geral. Manutenção Anual – obrigatória, realizada por empresa certificada. Recarga – após qualquer utilização ou quando o estado o justifique. Prova Hidráulica – a cada 10 anos para verificar a integridade sob pressão. A vida útil dos extintores não deve exceder 20 anos."
      }
    },
    {
      "@type": "Question",
      "name": "É obrigatório a implementação de medidas de segurança contra incêndios em edifícios e qual a sua importância?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sim, é obrigatório cumprir legalmente com o Regime Jurídico de Segurança Contra Incêndios em Edifícios (RJSCIE), para proteger vidas e o património da empresa, garantindo a continuidade do negócio e evitando sanções legais."
      }
    },
    {
      "@type": "Question",
      "name": "Onde posso esclarecer dúvidas mais frequentes, no âmbito da Saúde e Segurança no trabalho?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Pode consultar a Autoridade para as Condições do Trabalho (ACT) em https://portal.act.gov.pt/Pages/PerguntasFrequentes.aspx e a Direção-Geral da Saúde (DGS) em https://www.dgs.pt/saude-ocupacional/perguntas-frequentes-.aspx."
      }
    },
    {
      "@type": "Question",
      "name": "Qual a importância de ter um serviço de controlo de pragas urbanas, para além de ser uma questão de higiene?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "É importante, não só por uma questão de higiene, mas também: Saúde pública – prevenção de doenças; Proteção da reputação – imagem da empresa; Prevenção de prejuízos – danos materiais e inspeções sanitárias; Exigência legal – obrigatório em setores como alimentação e hotelaria."
      }
    }
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
        id="schema-org-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
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
