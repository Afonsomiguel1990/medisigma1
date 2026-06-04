import type { Metadata } from "next";
import SimuladorCaixasPrimeirosSocorrosClient from "./SimuladorCaixasPrimeirosSocorrosClient";
import { COPY, PAGE_METADATA } from "./copy";

export const metadata: Metadata = {
  title: PAGE_METADATA.title,
  description: PAGE_METADATA.description,
  keywords:
    "simulador caixas primeiros socorros, caixa primeiros socorros empresa, mala primeiros socorros, kit primeiros socorros, DGS primeiros socorros trabalho, segurança no trabalho",
  openGraph: {
    title: PAGE_METADATA.title,
    description: PAGE_METADATA.description,
    type: "website",
    locale: "pt_PT",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://www.medisigma.pt/ferramentas/simulador-caixas-primeiros-socorros/",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Simulador de caixas de primeiros socorros",
      url: "https://www.medisigma.pt/ferramentas/simulador-caixas-primeiros-socorros/",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      description: PAGE_METADATA.description,
      provider: {
        "@type": "Organization",
        name: "Grupo Medisigma",
        url: "https://www.medisigma.pt",
      },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: COPY.breadcrumb.home,
          item: "https://www.medisigma.pt/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: COPY.breadcrumb.blog,
          item: "https://www.medisigma.pt/blog/kit-primeiros-socorros-empresa/",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: COPY.breadcrumb.current,
          item: "https://www.medisigma.pt/ferramentas/simulador-caixas-primeiros-socorros/",
        },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: COPY.faq.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    },
  ],
};

export default function SimuladorCaixasPrimeirosSocorrosPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SimuladorCaixasPrimeirosSocorrosClient />
    </>
  );
}
