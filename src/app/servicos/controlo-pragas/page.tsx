import React from 'react';
import { Metadata } from 'next';
import {
  BadgeCheck,
  Bird,
  Bug,
  Building,
  CheckCircle,
  ClipboardCheck,
  Eye,
  Factory,
  FileText,
  Hotel,
  MapPinned,
  MessageCircle,
  Phone,
  Rat,
  Search,
  Shield,
  ShieldCheck,
  SprayCan,
  Store,
  Utensils,
  Warehouse,
} from 'lucide-react';
import Link from 'next/link';
import { siteConfig } from "@/lib/config";
import { ContactLink } from "@/components/custom/contact-link";
import ContactForm from '@/components/ContactForm';

const pageUrl = 'https://www.medisigma.pt/servicos/controlo-pragas/';
const pageTitle = 'Controlo de Pragas para Empresas e HACCP | MediSigma';
const pageDescription = 'Controlo de pragas para empresas, restauração, hotelaria e indústria alimentar. Desratização, desbaratização, monitorização e registos para HACCP.';

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  keywords: [
    'controlo de pragas',
    'controlo de pragas empresas',
    'controlo de pragas HACCP',
    'desratização',
    'desbaratização',
    'controlo de baratas',
    'controlo de ratos',
    'desinfestação',
    'pragas urbanas',
    'Medisigma',
  ],
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: pageUrl,
    type: 'website',
    locale: 'pt_PT',
    images: [
      {
        url: 'https://www.medisigma.pt/images/uploads/servicos/tecnico-de-pragas.png',
        width: 1200,
        height: 800,
        alt: 'Técnico especializado em controlo de pragas',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: pageTitle,
    description: pageDescription,
    images: ['https://www.medisigma.pt/images/uploads/servicos/tecnico-de-pragas.png'],
  },
  alternates: {
    canonical: pageUrl,
  },
};

const faqItems = [
  {
    question: 'O controlo de pragas é obrigatório para empresas alimentares?',
    answer:
      'Sim. No setor alimentar, o controlo de pragas é considerado um pré-requisito do sistema HACCP. Estabelecimentos onde se manipulam, confecionam, armazenam, conservam ou expõem alimentos devem ter procedimentos que previnam a contaminação por pragas.',
  },
  {
    question: 'Que documentos devo ter no dossiê HACCP?',
    answer:
      'O dossiê deve incluir o mapa das estações de isco ou deteção, o programa de manutenção, relatórios de visitas, fichas técnicas, fichas de dados de segurança dos produtos utilizados e registos de ações corretivas quando existe atividade detetada.',
  },
  {
    question: 'A Medisigma faz desratização e desbaratização?',
    answer:
      'Sim. O serviço inclui avaliação, identificação da praga, plano de intervenção, desratização, desbaratização, controlo de insetos e monitorização preventiva, ajustados ao tipo de instalação.',
  },
  {
    question: 'Com que frequência deve ser feita a monitorização?',
    answer:
      'Depende do risco do local, do histórico de atividade, do setor e da exigência documental. Restauração, hotelaria, indústria alimentar e armazéns alimentares tendem a exigir acompanhamento regular e registos atualizados.',
  },
  {
    question: 'Os produtos utilizados são seguros em zonas alimentares?',
    answer:
      'Os produtos e métodos são selecionados de acordo com o local, a praga e o risco de contaminação. Em zonas alimentares, a intervenção deve proteger os géneros alimentícios, respeitar as fichas técnicas, fichas de dados de segurança e autorizações aplicáveis; a aplicação de inseticidas nessas zonas não é aconselhada.',
  },
  {
    question: 'O que acontece se houver sinais de atividade?',
    answer:
      'A intervenção passa por confirmar a espécie, localizar pontos de entrada ou abrigo, aplicar medidas corretivas e registar a ocorrência. Quando necessário, o plano é revisto para reduzir a probabilidade de reincidência.',
  },
  {
    question: 'O serviço serve apenas restaurantes?',
    answer:
      'Não. Atuamos em restaurantes, cafés, pastelarias, hotéis, cantinas, clínicas, condomínios, armazéns, indústria alimentar e outras empresas que precisam de prevenção, controlo ou documentação para auditorias.',
  },
  {
    question: 'Que sinais indicam que devo pedir uma avaliação?',
    answer:
      'Fezes, roeduras, embalagens danificadas, odores, insetos vivos ou mortos, ninhos, ruídos em tetos ou paredes, atividade junto a resíduos e reclamações de colaboradores ou clientes são sinais que justificam avaliação técnica.',
  },
  {
    question: 'O controlo de pragas substitui a higiene diária?',
    answer:
      'Não. O controlo de pragas funciona melhor quando está ligado ao plano de higienização, gestão de resíduos, manutenção das instalações, receção de matérias-primas e boas práticas operacionais.',
  },
  {
    question: 'A Medisigma pode integrar este serviço com Segurança Alimentar?',
    answer:
      'Sim. O plano pode ser articulado com o serviço de Segurança Alimentar e HACCP, para que a empresa tenha prevenção, registos e evidências consistentes em auditorias ou fiscalizações.',
  },
];

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      '@id': `${pageUrl}#service`,
      name: 'Controlo de Pragas para Empresas e HACCP',
      serviceType: 'Controlo integrado de pragas urbanas',
      url: pageUrl,
      description: pageDescription,
      areaServed: {
        '@type': 'Country',
        name: 'Portugal',
      },
      provider: {
        '@type': 'Organization',
        name: 'MediSigma',
        url: 'https://www.medisigma.pt',
        logo: 'https://www.medisigma.pt/logomedisigma.svg',
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: '+351241331504',
          contactType: 'customer service',
          areaServed: 'PT',
          availableLanguage: 'Portuguese',
        },
      },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Serviços de controlo de pragas',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Desratização',
              description: 'Controlo de ratos e ratazanas com diagnóstico, medidas corretivas e monitorização.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Desbaratização',
              description: 'Controlo de baratas e insetos rastejantes em empresas e zonas técnicas.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Controlo de insetos voadores',
              description: 'Avaliação e posicionamento de medidas de controlo para moscas, mosquitos e traças.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Monitorização e registos HACCP',
              description: 'Mapa de dispositivos, relatórios de visita, fichas técnicas e ações corretivas.',
            },
          },
        ],
      },
    },
    {
      '@type': 'FAQPage',
      '@id': `${pageUrl}#faq`,
      mainEntity: faqItems.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${pageUrl}#breadcrumb`,
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Início',
          item: 'https://www.medisigma.pt/',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Serviços',
          item: 'https://www.medisigma.pt/servicos/',
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Controlo de Pragas',
          item: pageUrl,
        },
      ],
    },
  ],
};

const pestTypes = [
  {
    icon: Rat,
    title: 'Desratização',
    description: 'Controlo de ratos e ratazanas, identificação de acessos, iscos ou dispositivos e registos de monitorização.',
  },
  {
    icon: Bug,
    title: 'Desbaratização',
    description: 'Intervenção sobre baratas e outros insetos rastejantes, com foco em cozinhas, áreas técnicas e zonas de resíduos.',
  },
  {
    icon: SprayCan,
    title: 'Insetos voadores',
    description: 'Medidas para moscas, mosquitos e traças, incluindo avaliação da localização de equipamentos e pontos de atração sem criar risco de contaminação alimentar.',
  },
  {
    icon: Bird,
    title: 'Aves urbanas',
    description: 'Medidas de exclusão, dissuasão e prevenção quando a presença de aves cria risco de sujidade ou contaminação.',
  },
];

const sectors = [
  {
    icon: Utensils,
    title: 'Restauração e cafetaria',
    description: 'Planos adaptados a cozinhas, copas, armazéns, zonas de resíduos e receção de matérias-primas.',
  },
  {
    icon: Hotel,
    title: 'Hotelaria e alojamento',
    description: 'Prevenção discreta para áreas comuns, cozinhas, lavandarias, arrumos e espaços exteriores.',
  },
  {
    icon: Factory,
    title: 'Indústria alimentar',
    description: 'Monitorização documentada para linhas de produção, embalamento, armazéns e cais de carga.',
  },
  {
    icon: Warehouse,
    title: 'Armazéns e distribuição',
    description: 'Controlo de pontos de entrada, embalagens, paletes, rotas de circulação e zonas de carga.',
  },
  {
    icon: Building,
    title: 'Clínicas e empresas',
    description: 'Planos preventivos para instalações com exigência de higiene, conforto e continuidade operacional.',
  },
  {
    icon: Store,
    title: 'Retalho e condomínios',
    description: 'Resposta a sinais de atividade e manutenção preventiva em lojas, garagens, lixos e áreas comuns.',
  },
];

const methodology = [
  'Inspeção dos locais afetados e pontos críticos',
  'Identificação da espécie e fatores de atração',
  'Plano de intervenção com medidas preventivas e corretivas',
  'Implementação, registo e monitorização dos resultados',
];

const haccpDocuments = [
  'Mapa de estações de isco, deteção ou equipamentos de controlo',
  'Programa de manutenção e periodicidade de visitas',
  'Relatórios de controlo preventivo e intervenções corretivas',
  'Fichas técnicas e fichas de dados de segurança dos produtos',
  'Registo de ocorrências, recomendações e ações corretivas',
  'Integração com plano de higienização, resíduos e manutenção',
];

export default function ControloPragasPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <main className="min-h-screen bg-white flex flex-col divide-y divide-border">
        <section className="relative py-16 md:py-24 mx-4 md:mx-8 rounded-3xl">
          <div className="absolute inset-0 -z-10">
            <div className="animated-hero-background absolute inset-0 h-full w-full [background:radial-gradient(125%_125%_at_50%_10%,var(--background)_40%,var(--secondary)_100%)] rounded-3xl"></div>
          </div>
          <div className="container mx-auto px-6 md:px-8 max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-secondary/20 bg-white/80 px-4 py-2 text-sm font-medium text-secondary mb-6">
                  <BadgeCheck className="h-4 w-4" />
                  Planos para empresas, HACCP e auditorias
                </div>
                <h1 className="text-3xl md:text-5xl font-bold text-primary mb-6">
                  Controlo de Pragas para Empresas e HACCP
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
                  Prevenção, desratização, desbaratização e monitorização com registos organizados para proteger instalações, alimentos, colaboradores e clientes.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <a
                    href="#cta-section"
                    className="bg-secondary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-secondary/90 transition-colors text-center cursor-pointer"
                  >
                    Pedir orçamento
                  </a>
                  <ContactLink href="tel:241331504" type="phone" pagina="Serviço Controlo de Pragas" className="border border-secondary text-secondary px-8 py-3 rounded-lg font-semibold hover:bg-secondary hover:text-white transition-colors text-center">
                    241 331 504
                  </ContactLink>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm text-muted-foreground">
                  {['Desratização', 'Desbaratização', 'Registos HACCP'].map((item) => (
                    <div key={item} className="flex items-center gap-2 rounded-lg bg-white/80 px-3 py-2 border border-border">
                      <CheckCircle className="h-4 w-4 text-secondary" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="lg:text-right">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/uploads/servicos/tecnico-de-pragas.png"
                  alt="Técnico especializado em controlo de pragas a realizar inspeção"
                  width={600}
                  height={400}
                  className="rounded-xl shadow-2xl"
                  loading="eager"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20 mx-4 md:mx-0">
          <div className="container mx-auto px-6 md:px-8 max-w-6xl">
            <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-10 md:gap-14 items-start">
              <div>
                <h2 className="text-2xl md:text-4xl font-bold text-primary mb-5">
                  Um plano de pragas não é só uma intervenção pontual
                </h2>
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-6">
                  No setor alimentar, o controlo de pragas é um pré-requisito do HACCP. O plano deve prevenir contaminações, reduzir riscos e deixar evidências documentadas para auditorias, fiscalizações e gestão interna.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  A Medisigma combina inspeção técnica, controlo integrado, documentação e acompanhamento para empresas que precisam de uma solução prática, discreta e verificável.
                </p>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {methodology.map((item, index) => (
                  <div key={item} className="bg-white border border-border rounded-xl p-5 shadow-sm">
                    <div className="w-10 h-10 rounded-lg bg-secondary/10 text-secondary flex items-center justify-center font-bold mb-4">
                      {index + 1}
                    </div>
                    <p className="font-medium text-primary">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-accent py-16 md:py-20 mx-4 md:mx-8 rounded-3xl">
          <div className="container mx-auto px-6 md:px-8 max-w-6xl">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-2xl md:text-4xl font-bold text-primary mb-4">
                Onde Atuamos
              </h2>
              <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
                Cada instalação tem riscos diferentes. O plano é ajustado ao tipo de atividade, aos circuitos internos, aos pontos de entrada e ao histórico de ocorrências.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sectors.map((sector) => {
                const Icon = sector.icon;
                return (
                  <div key={sector.title} className="bg-white p-6 rounded-xl shadow-sm border border-border">
                    <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-secondary" />
                    </div>
                    <h3 className="text-lg font-semibold text-primary mb-2">{sector.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{sector.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20 mx-4 md:mx-0">
          <div className="container mx-auto px-6 md:px-8 max-w-6xl">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-2xl md:text-4xl font-bold text-primary mb-4">
                Pragas que Controlamos
              </h2>
              <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
                A intervenção começa pela identificação da espécie e pela análise das condições que favorecem a sua presença.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {pestTypes.map((praga) => {
                const Icon = praga.icon;
                return (
                  <div key={praga.title} className="bg-white p-6 md:p-7 rounded-xl shadow-sm border border-border">
                    <div className="w-14 h-14 bg-secondary/10 rounded-lg flex items-center justify-center mb-5">
                      <Icon className="w-7 h-7 text-secondary" />
                    </div>
                    <h3 className="text-xl font-semibold text-primary mb-3">{praga.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{praga.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="bg-primary py-12 md:py-14 mx-4 md:mx-8 rounded-3xl">
          <div className="container mx-auto px-6 md:px-8 max-w-5xl">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="text-white">
                <h2 className="text-2xl md:text-3xl font-bold mb-3">
                  Tem sinais de pragas ou precisa de atualizar o dossiê HACCP?
                </h2>
                <p className="text-white/80 max-w-3xl">
                  Envie-nos o contexto da instalação e indicamos os próximos passos para avaliação, controlo e documentação.
                </p>
              </div>
              <a
                href="#cta-section"
                className="inline-flex items-center justify-center gap-2 bg-white text-primary px-7 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors whitespace-nowrap"
              >
                <MessageCircle className="h-5 w-5" />
                Falar com a equipa
              </a>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20 mx-4 md:mx-0">
          <div className="container mx-auto px-6 md:px-8 max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-10 md:gap-14 items-center">
              <div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/uploads/servicos/tecnico-de-pragas-2.png"
                  alt="Técnico especializado a realizar controlo integrado de pragas"
                  width={500}
                  height={400}
                  className="rounded-xl shadow-lg w-full"
                  loading="lazy"
                />
              </div>
              <div>
                <h2 className="text-2xl md:text-4xl font-bold text-primary mb-5">
                  Documentação para HACCP e auditorias
                </h2>
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-6">
                  A intervenção deve ficar clara no papel: o que foi verificado, onde estão os dispositivos, que produtos ou métodos foram usados e que ações corretivas foram recomendadas.
                </p>
                <div className="space-y-4">
                  {haccpDocuments.map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <ClipboardCheck className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{item}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-8">
                  <Link href="/servicos/seguranca-alimentar" className="inline-flex items-center gap-2 text-secondary font-semibold hover:underline">
                    Integrar com Segurança Alimentar (HACCP)
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20 mx-4 md:mx-8 rounded-3xl bg-accent">
          <div className="container mx-auto px-6 md:px-8 max-w-6xl">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-2xl md:text-4xl font-bold text-primary mb-4">
                Medidas que Reduzem o Risco
              </h2>
              <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
                O controlo eficaz junta medidas físicas, boas práticas de higiene, gestão de resíduos, manutenção e intervenção técnica quando necessário.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: Eye,
                  title: 'Inspeção visual',
                  description: 'Avaliação de acessos, abrigos, resíduos, humidade, armazenamento e sinais de atividade.',
                },
                {
                  icon: MapPinned,
                  title: 'Mapa de dispositivos',
                  description: 'Localização clara de estações de isco, deteção ou equipamentos de controlo.',
                },
                {
                  icon: Search,
                  title: 'Identificação da espécie',
                  description: 'Escolha do método de controlo com base na praga, comportamento e zona afetada.',
                },
                {
                  icon: Shield,
                  title: 'Prevenção',
                  description: 'Recomendações sobre vedação, redes, resíduos, limpeza, armazenamento e manutenção.',
                },
                {
                  icon: ShieldCheck,
                  title: 'Ações corretivas',
                  description: 'Intervenções específicas quando há atividade, infestação ou falha de barreiras preventivas.',
                },
                {
                  icon: FileText,
                  title: 'Relatórios',
                  description: 'Registos de visita, recomendações e evidências para consulta interna ou auditoria.',
                },
              ].map((service) => {
                const Icon = service.icon;
                return (
                  <div key={service.title} className="bg-white p-6 rounded-xl shadow-sm border border-border">
                    <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-secondary" />
                    </div>
                    <h3 className="text-lg font-semibold text-primary mb-2">{service.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{service.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20 mx-4 md:mx-0">
          <div className="container mx-auto px-6 md:px-8 max-w-6xl">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-2xl md:text-4xl font-bold text-primary mb-4">
                Porque Escolher a Medisigma?
              </h2>
              <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
                Uma equipa habituada a trabalhar com empresas que precisam de higiene, conformidade e continuidade operacional.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  title: 'Técnicos Qualificados',
                  description: 'Profissionais com experiência em controlo de pragas urbanas e contexto empresarial.',
                },
                {
                  title: 'Produtos e Métodos Adequados',
                  description: 'Seleção de soluções ajustadas ao local, ao risco de contaminação e à praga identificada.',
                },
                {
                  title: 'Abordagem Integrada',
                  description: 'Ligação entre pragas, higiene, resíduos, manutenção e segurança alimentar.',
                },
                {
                  title: 'Acompanhamento Contínuo',
                  description: 'Monitorização regular, registos e recomendações para reduzir reincidências.',
                },
              ].map((benefit, index) => (
                <div key={benefit.title} className="text-center">
                  <div className="w-16 h-16 bg-secondary text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-semibold text-primary mb-3">{benefit.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20 bg-accent mx-4 md:mx-8 rounded-3xl">
          <div className="container mx-auto px-6 md:px-8 max-w-4xl">
            <h2 className="text-2xl md:text-4xl font-bold text-primary mb-8 md:mb-12 text-center">
              Perguntas Frequentes sobre Controlo de Pragas
            </h2>

            <div className="space-y-4">
              {faqItems.map((item) => (
                <details key={item.question} className="bg-white p-6 rounded-lg shadow-sm border border-border">
                  <summary className="font-semibold text-primary cursor-pointer text-lg">
                    {item.question}
                  </summary>
                  <p className="mt-4 text-muted-foreground leading-relaxed">
                    {item.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section id="cta-section" className="relative z-10 bg-secondary py-16 md:py-20 mx-4 md:mx-8 rounded-3xl">
          <div className="container mx-auto px-6 md:px-8 max-w-5xl">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="text-white">
                <h2 className="text-2xl md:text-4xl font-bold mb-4 md:mb-6">
                  Proteja o seu Espaço de Pragas
                </h2>
                <p className="text-base md:text-lg text-primary-foreground/90 max-w-3xl mx-auto mb-8">
                  Ambientes livres de pragas são essenciais para a saúde e segurança de todos. A nossa equipa especializada está pronta para criar um plano de controlo à medida das suas necessidades.
                </p>

                <div className="space-y-4 mb-8 text-blue-100">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-white" />
                    <span>Registos úteis para HACCP e auditorias</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-white" />
                    <span>Técnicos qualificados e acompanhamento regular</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-white" />
                    <span>Medidas preventivas e corretivas adaptadas ao local</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href={`https://wa.me/${siteConfig.links.whatsapp}?text=Olá%2C%20estava%20no%20vosso%20website%20e%20gostaria%20de%20ter%20mais%20informações%20sobre%20Controlo%20de%20Pragas.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white text-secondary px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-5 h-5" />
                    WhatsApp
                  </a>
                  <ContactLink href="tel:241331504" type="phone" pagina="Serviço Controlo de Pragas" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-secondary transition-colors text-center flex items-center justify-center gap-2">
                    <Phone className="w-5 h-5" />
                    241 331 504
                  </ContactLink>
                </div>
              </div>

              <ContactForm
                pagina="Serviço Controlo de Pragas"
                fonte="servicos/controlo-pragas"
                servicoDefault="Controlo de Pragas"
              />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
