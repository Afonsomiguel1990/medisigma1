import { siteConfig } from "@/lib/site";

export const MEDISIGMA = {
  name: "Medisigma",
  legalName: "GRUPO MEDISIGMA, LDA",
  taxId: "516858513",
  email: "info@medisigma.pt",
  telephone: "+351 241 331 504",
  telephoneHref: "+351241331504",
  streetAddress: "Zona Industrial, Via 2, Lote 5",
  postalCode: "2200-293",
  addressLocality: "Abrantes",
  addressRegion: "Santarém",
  addressCountry: "PT",
  linkedin: "https://pt.linkedin.com/company/medisigma",
} as const;

export const MEDISIGMA_POSTAL_ADDRESS = `${MEDISIGMA.streetAddress}, ${MEDISIGMA.postalCode} ${MEDISIGMA.addressLocality}`;

const organizationId = `${siteConfig.url}#organization`;
const websiteId = `${siteConfig.url}#website`;

const services = [
  "Medicina do Trabalho",
  "Segurança no Trabalho",
  "Segurança Alimentar (HACCP)",
  "Formação Certificada",
  "Psicologia Ocupacional",
  "Controlo de Pragas",
  "Prevenção e Controlo de Legionella",
  "Segurança Contra Incêndios",
  "Manutenção de Extintores",
  "Medicina Desportiva",
  "Nutrição",
];

export const organizationAndWebsiteJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": organizationId,
      name: MEDISIGMA.name,
      legalName: MEDISIGMA.legalName,
      description: siteConfig.description,
      url: siteConfig.url,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}logomedisigma.svg`,
      },
      email: MEDISIGMA.email,
      telephone: MEDISIGMA.telephone,
      taxID: MEDISIGMA.taxId,
      vatID: `PT${MEDISIGMA.taxId}`,
      foundingLocation: {
        "@type": "Place",
        name: "Abrantes, Portugal",
      },
      areaServed: {
        "@type": "Country",
        name: "Portugal",
      },
      address: {
        "@type": "PostalAddress",
        streetAddress: MEDISIGMA.streetAddress,
        postalCode: MEDISIGMA.postalCode,
        addressLocality: MEDISIGMA.addressLocality,
        addressRegion: MEDISIGMA.addressRegion,
        addressCountry: MEDISIGMA.addressCountry,
      },
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer service",
        email: MEDISIGMA.email,
        telephone: MEDISIGMA.telephone,
        areaServed: "PT",
        availableLanguage: ["pt-PT"],
      },
      sameAs: [MEDISIGMA.linkedin],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Serviços do Grupo Medisigma",
        itemListElement: services.map((name) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name,
            provider: { "@id": organizationId },
            areaServed: "Portugal",
          },
        })),
      },
    },
    {
      "@type": "WebSite",
      "@id": websiteId,
      name: MEDISIGMA.name,
      alternateName: MEDISIGMA.legalName,
      description: siteConfig.description,
      url: siteConfig.url,
      inLanguage: "pt-PT",
      publisher: { "@id": organizationId },
    },
  ],
};

export function serializeJsonLd(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
