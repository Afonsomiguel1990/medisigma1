import { Metadata } from "next";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Medicina do Trabalho em Portugal | Medisigma - Segurança e Saúde",
  description: siteConfig.description,
  keywords: [
    "Medisigma",
    "Medicina do Trabalho Portugal",
    "Saúde Ocupacional",
    "Exames Médicos Laborais",
    "Exames de Admissão",
    "Exames Médicos Periódicos",
    "Exames Médicos Ocasionais",
    "Unidade Móvel Medicina do Trabalho",
    "Ficha de Aptidão Médica",
    "Legislação SST Portugal",
    "Lei 102/2009",
    "Segurança no Trabalho",
    "Manutenção de Extintores",
    "Controlo de Pragas Urbanas",
    "Análises Legionella",
    "Formação Profissional Certificada",
    "Psicologia no Trabalho",
    "Compliance Medicina do Trabalho",
    "Serviços SST Portugal",
    "Empresas de Medicina do Trabalho"
  ],
  authors: [
    {
      name: "Dra. Ana Simões",
      url: siteConfig.url,
    },
  ],
  creator: "Dra. Ana Simões",
  openGraph: {
    type: "website",
    locale: "pt_PT",
    url: siteConfig.url,
    title: "Medicina do Trabalho em Portugal | Medisigma - Segurança e Saúde",
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  alternates: {
    canonical: siteConfig.url,
  },
  twitter: {
    card: "summary_large_image",
    title: "Medicina do Trabalho em Portugal | Medisigma - Segurança e Saúde",
    description: siteConfig.description,
    creator: "Dra. Ana Simões",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};
