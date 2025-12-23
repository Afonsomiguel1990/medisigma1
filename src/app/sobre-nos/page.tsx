import React from 'react';
import { Metadata } from 'next';
// import HeroVideoDialog from '@/components/magicui/hero-video-dialog';
import { Features } from '@/components/ui/features';
import { ServicesShowcase } from '@/components/sections/services-showcase';
import { CertificationsShowcase } from '@/components/sections/certifications-showcase';


export const metadata: Metadata = {
  title: 'Sobre Nós | Medisigma - Excelência em Medicina do Trabalho',
  description: 'Conheça a Medisigma, líder em Medicina do Trabalho. Nossa história, missão, valores e a jornada que nos tornou referência no setor, com sede em Abrantes.',
};

const timelineEvents = [
  {
    year: "2002",
    title: "Início da Medisigma",
    description: "Início da atividade do Grupo MEDISIGMA em Abrantes, com foco em Medicina do Trabalho e prestação de serviços de elevada qualidade.",
    milestone: true
  },
  {
    year: "2004",
    title: "Primeiras Certificações",
    description: "Implementação das primeiras normas de Saúde e Segurança, estabelecendo os alicerces da nossa qualidade.",
    milestone: false
  },
  {
    year: "2007",
    title: "Expansão Regional",
    description: "Crescimento da base de clientes na região centro, servindo centenas de empresas locais.",
    milestone: false
  },
  {
    year: "2010",
    title: "Cobertura Nacional",
    description: "Expansão para todo o território nacional, com abertura de delegações em Lisboa e Porto.",
    milestone: true
  },
  {
    year: "2013",
    title: "Inovação Tecnológica",
    description: "Lançamento da plataforma digital para gestão de exames e implementação de soluções tecnológicas avançadas.",
    milestone: false
  },
  {
    year: "2015",
    title: "Liderança de Mercado",
    description: "Reconhecimento como empresa líder no mercado, servindo mais de 3.000 empresas em todo o país.",
    milestone: true
  },
  {
    year: "2017",
    title: "Marco de Consolidação",
    description: "Celebração de certificação ISO 45001 e consolidação da posição de liderança.",
    milestone: true
  },
  {
    year: "2020",
    title: "Resposta à Pandemia",
    description: "Adaptação rápida aos protocolos COVID-19, prestando apoio essencial às empresas durante a crise sanitária.",
    milestone: false
  },
  {
    year: "2022",
    title: "Excelência Continuada",
    description: "História de sucesso, servindo mais de 5.000 empresas e realizando centenas de milhares de exames.",
    milestone: true
  },
  {
    year: "2025",
    title: "Futuro Sustentável",
    description: "Implementação de práticas sustentáveis, inovação contínua e preparação para expansão internacional.",
    milestone: true
  }
];



export default function SobreNosPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col divide-y divide-border">
      {/* Hero Section com Video */}
      <section className="relative overflow-hidden py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-2xl text-center mb-6">
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl mb-6">
                Sobre a{" "}
                <span className="text-primary">Medisigma</span>
              </h1>
              <p className="mt-2 mb-6 text-lg leading-8 text-muted-foreground">
                Vasta experiência dedicada à excelência em Medicina do Trabalho e Segurança, com sede em Abrantes, sempre inovando para proteger melhor os trabalhadores portugueses.
              </p>
            </div>

            {/* Hero Video Dialog */}
            {/* <div className="mx-auto max-w-4xl">
              <HeroVideoDialog
                animationStyle="from-center"
                videoSrc="https://www.youtube.com/embed/dQw4w9WgXcQ"
                thumbnailSrc="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
                thumbnailAlt="História da Medisigma"
              />
            </div> */}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary">
                  Vasta
                </div>
                <p className="text-sm text-muted-foreground">Experiência Comprovada</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary">
                  5000+
                </div>
                <p className="text-sm text-muted-foreground">Empresas Servidas</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary">
                  30000+
                </div>
                <p className="text-sm text-muted-foreground">Exames Realizados</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary">
                  98%
                </div>
                <p className="text-sm text-muted-foreground">Taxa de Satisfação</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-foreground mb-6">A Nossa Missão</h3>
              <p className="mt-2 mb-6 text-lg leading-8 text-muted-foreground max-w-4xl mx-auto">
                O Grupo MEDISIGMA é um grupo de empresas prestadoras de serviços,
                em diferentes áreas, sediado em Abrantes. Tem como missão satisfazer os clientes,
                oferecendo-lhes serviços de elevada qualidade, tendo por base as normas de Saúde e
                Segurança, com o empenho individual e coletivo dos colaboradores e ser reconhecida
                como empresa líder no mercado, melhorando e inovando sempre os nossos serviços.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - O que fazemos & Valores */}
      <Features />

      {/* Services Section */}
      <ServicesShowcase />

      {/* Mission, Vision, Values Section Placeholder */}
      {/* <section id="missao-visao-valores" className="py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-6">
                Missão, Visão e Valores
              </h2>
              <p className="mt-2 mb-6 text-lg leading-8 text-muted-foreground">
                [Conteúdo sobre Missão, Visão e Valores da Medisigma será adicionado aqui...]
              </p>
            </div>
          </div>
        </div>
      </section> */}

      {/* Team Section Placeholder */}
      {/* <section id="equipa" className="py-16 sm:py-24 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-6">
                A Nossa Equipa
              </h2>
              <p className="mt-2 mb-6 text-lg leading-8 text-muted-foreground">
                [Informações sobre a equipa da Medisigma serão adicionadas aqui...]
              </p>
            </div>
          </div>
        </div>
      </section> */}

      {/* Timeline Section - Hidden */}
      {false && (
        <section id="timeline" className="py-16 sm:py-24 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
              <div className="text-center mb-6">
                <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-6">
                  A Nossa História
                </h2>
                <p className="mt-2 mb-6 text-lg leading-8 text-muted-foreground">
                  Os momentos que definiram a nossa trajetória rumo à excelência.
                </p>
              </div>

              <div className="relative">
                {/* Timeline Line */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary via-primary/50 to-primary hidden lg:block"></div>

                <div className="space-y-12">
                  {timelineEvents.map((event, index) => (
                    <div
                      key={event.year}
                      className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
                    >
                      {/* Event Card - Alterna entre esquerda e direita */}
                      <div className={`${index % 2 === 0 ? 'lg:pr-8 lg:text-right' : 'lg:pl-8 lg:text-left lg:order-2'}`}>
                        <div className="relative overflow-hidden rounded-lg border bg-card p-6 shadow-sm hover:shadow-md transition-all duration-300 group hover:scale-105">
                          <div className={`${index % 2 === 0 ? 'lg:text-right' : ''}`}>
                            <div className={`flex items-center gap-2 mb-2 ${index % 2 === 0 ? 'lg:justify-end' : ''}`}>
                              <span className="text-2xl font-bold text-primary">{event.year}</span>
                              {event.milestone && (
                                <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                                  Marco
                                </span>
                              )}
                            </div>
                            <h3 className="text-xl font-semibold text-foreground mb-2">
                              {event.title}
                            </h3>
                            <p className="text-muted-foreground">
                              {event.description}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Spacer para manter o layout */}
                      <div className={`hidden lg:block ${index % 2 === 0 ? 'lg:order-2' : 'lg:order-1'}`}>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div >
          </div >
        </section>
      )}

      {/* Certifications & Awards Section */}
      <CertificationsShowcase />

    </div >
  );
} 