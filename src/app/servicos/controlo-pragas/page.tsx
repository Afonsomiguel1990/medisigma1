import React from 'react';
import { Metadata } from 'next';
import { ShieldCheck, SprayCan, Building, CheckCircle, Eye, Search, Zap, Target, Shield, FileText, Bug, Rat, Bird, Annoyed } from 'lucide-react';
import Link from 'next/link';
import { siteConfig } from "@/lib/config";
import ContactForm from '@/components/ContactForm';

export const metadata: Metadata = {
  title: 'Controlo de Pragas Urbanas | Serviços Profissionais de Desinfestação | MediSigma',
  description: 'Controlo integrado de pragas urbanas com técnicos qualificados. Acções preventivas, correctivas e de eliminação. Produtos autorizados pela DGS.',
  keywords: 'controlo de pragas urbanas, desinfestação, desratização, controlo integrado pragas, HACCP, segurança alimentar, pragas, MediSigma',
  openGraph: {
    title: 'Controlo de Pragas Urbanas | MediSigma',
    description: 'Serviços profissionais de controlo de pragas para garantir ambientes saudáveis e seguros.',
    type: 'website',
    locale: 'pt_PT',
  },
  alternates: {
    canonical: 'https://medisigma.pt/servicos/controlo-pragas',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  'name': 'Controlo de Pragas Urbanas',
  'provider': {
    '@type': 'Organization',
    'name': 'MediSigma',
    'url': 'https://medisigma.pt',
    'logo': 'https://medisigma.pt/images/logo.png',
    'contactPoint': {
      '@type': 'ContactPoint',
      'telephone': '+351-XXX-XXX-XXX',
      'contactType': 'customer service',
      'availableLanguage': 'Portuguese'
    }
  },
  'serviceType': 'Controlo Integrado de Pragas Urbanas',
  'description': 'Controlo integrado de pragas urbanas com técnicos qualificados. Acções preventivas, correctivas e de eliminação para manter espécies que causam pragas em níveis que não conduzem à ocorrência de problemas significativos.',
  'serviceArea': 'Portugal',
  'hasOfferCatalog': {
    '@type': 'OfferCatalog',
    'name': 'Serviços de Controlo de Pragas',
    'itemListElement': [
      {
        '@type': 'Offer',
        'itemOffered': {
          '@type': 'Service',
          'name': 'Acções Preventivas',
          'description': 'Medidas preventivas para evitar infestações'
        }
      },
      {
        '@type': 'Offer',
        'itemOffered': {
          '@type': 'Service',
          'name': 'Acções Correctivas',
          'description': 'Intervenções correctivas para controlar pragas existentes'
        }
      },
      {
        '@type': 'Offer',
        'itemOffered': {
          '@type': 'Service',
          'name': 'Acções de Eliminação',
          'description': 'Eliminação completa de infestações'
        }
      }
    ]
  }
};

export default function ControloPragasPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="min-h-screen bg-white flex flex-col divide-y divide-border">
        {/* Hero Section */}
        <section className="relative py-16 md:py-24 mx-4 md:mx-8 rounded-3xl">
          <div className="absolute inset-0 -z-10">
            <div className="animated-hero-background absolute inset-0 h-full w-full [background:radial-gradient(125%_125%_at_50%_10%,var(--background)_40%,var(--secondary)_100%)] rounded-3xl"></div>
          </div>
          <div className="container mx-auto px-6 md:px-8 max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
              <div>
                <h1 className="text-3xl md:text-5xl font-bold text-primary mb-6">
                  Controlo de Pragas Urbanas
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
                  Sistema integrado que inclui medidas preventivas e correctivas para manter as espécies que causam pragas em níveis que não conduzem à ocorrência de problemas significativos.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="#cta-section"
                    className="bg-secondary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-secondary/90 transition-colors text-center cursor-pointer"
                  >
                    Fale connosco
                  </a>
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

        {/* O Que É o Controlo Integrado de Pragas */}
        <section className="py-16 md:py-20 mx-4 md:mx-0">
          <div className="container mx-auto px-6 md:px-8 max-w-6xl">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-2xl md:text-4xl font-bold text-primary mb-4 md:mb-6">
                O Que é o Controlo Integrado de Pragas?
              </h2>
              <p className="text-base md:text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed">
                O Controlo Integrado de Pragas é uma abordagem que optimiza as técnicas de controlo tendo em consideração critérios ecológicos, económicos e toxicológicos. Este serviço é um pré-requisito essencial para a implementação de qualquer sistema de <Link href="/servicos/seguranca-alimentar" className="text-secondary font-semibold hover:underline">Segurança Alimentar (HACCP)</Link>.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center mb-12 md:mb-16">
              <div>
                <h3 className="text-xl md:text-2xl font-semibold text-primary mb-4">
                  A Nossa Metodologia
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  A nossa abordagem sistemática garante uma solução eficaz e duradoura para o problema das pragas urbanas.
                </p>
                <div className="space-y-4">
                  {[
                    'Inspecção dos locais afectados',
                    'Identificação e conhecimento detalhado da praga',
                    'Planeamento das actividades a desenvolver',
                    'Implementação de medidas de controlo',
                    'Supervisão e avaliação dos resultados'
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0" />
                      <span className="text-muted-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/uploads/servicos/tecnico-de-pragas-2.png"
                  alt="Técnico especializado realizando controlo integrado de pragas"
                  width={500}
                  height={400}
                  className="rounded-xl shadow-lg"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Tipos de Pragas */}
        <section className="bg-accent py-16 md:py-20 mx-4 md:mx-8 rounded-3xl">
          <div className="container mx-auto px-6 md:px-8 max-w-6xl">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-2xl md:text-4xl font-bold text-primary mb-4">
                Tipos de Pragas que Controlamos
              </h2>
              <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
                As infestações podem ocorrer em locais que favoreçam a sua proliferação. Atuamos sobre os principais tipos de pragas urbanas.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {[
                { icon: Rat, title: "Roedores", description: "Ratos e ratazanas." },
                { icon: Bug, title: "Rastejantes", description: "Baratas, formigas, etc." },
                { icon: Annoyed, title: "Voadores", description: "Moscas, mosquitos, traças." },
                { icon: Bird, title: "Aves", description: "Pombos, pardais, etc." }
              ].map((praga) => {
                const Icon = praga.icon;
                return (
                  <div key={praga.title} className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-border text-center">
                    <div className="w-16 h-16 bg-secondary/10 rounded-lg flex items-center justify-center mx-auto mb-6">
                      <Icon className="w-8 h-8 text-secondary" />
                    </div>
                    <h3 className="text-xl font-semibold text-primary mb-2">{praga.title}</h3>
                    <p className="text-muted-foreground text-sm">{praga.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Níveis de Intervenção */}
        <section className="py-16 md:py-20 mx-4 md:mx-0">
          <div className="container mx-auto px-6 md:px-8 max-w-6xl">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-2xl md:text-4xl font-bold text-primary mb-4">
                Os Nossos Níveis de Intervenção
              </h2>
              <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
                O Controlo Integrado de Pragas do Grupo MEDISIGMA consiste em três níveis de acção para garantir a sua segurança.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6 md:gap-8">
              {[
                {
                  icon: Shield,
                  title: "Acções Preventivas",
                  description: "Medidas proactivas para evitar o aparecimento e desenvolvimento de pragas, incluindo a selagem de entradas e melhoria da higienização."
                },
                {
                  icon: Target,
                  title: "Acções Correctivas",
                  description: "Intervenções específicas para corrigir problemas identificados e controlar pragas existentes de forma eficaz."
                },
                {
                  icon: Zap,
                  title: "Acções de Eliminação",
                  description: "Eliminação completa e eficaz de infestações através de métodos e produtos certificados e autorizados pela DGS."
                }
              ].map((action) => {
                const Icon = action.icon;
                return (
                  <div key={action.title} className="bg-white p-6 md:p-8 rounded-xl shadow-lg border border-border text-center hover:shadow-xl transition-shadow">
                    <div className="w-16 h-16 bg-secondary/10 rounded-lg flex items-center justify-center mx-auto mb-6">
                      <Icon className="w-8 h-8 text-secondary" />
                    </div>
                    <h3 className="text-xl font-semibold text-primary mb-4">{action.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{action.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Principais Serviços */}
        <section className="py-16 md:py-20 mx-4 md:mx-0">
          <div className="container mx-auto px-6 md:px-8 max-w-6xl">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-2xl md:text-4xl font-bold text-primary mb-4">
                Os Nossos Principais Serviços
              </h2>
              <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
                Técnicos qualificados e produtos autorizados pela Direção-Geral da Saúde garantem resultados eficazes.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {[
                {
                  icon: Eye,
                  title: "Inspecção Visual das Instalações",
                  description: "Análise detalhada do ambiente para identificar pontos críticos e vulnerabilidades."
                },
                {
                  icon: Search,
                  title: "Identificação das Espécies",
                  description: "Identificação precisa das pragas para aplicar o tratamento mais adequado."
                },
                {
                  icon: FileText,
                  title: "Diagnóstico Completo",
                  description: "Relatório detalhado da situação e plano de acção personalizado."
                },
                {
                  icon: SprayCan,
                  title: "Controlo Químico / Mecânico",
                  description: "Aplicação de tratamentos químicos e mecânicos certificados e seguros."
                },
                {
                  icon: ShieldCheck,
                  title: "Medidas Preventivas e Correctivas",
                  description: "Implementação de medidas para prevenir futuras infestações."
                },
                {
                  icon: Building,
                  title: "Monitorização Contínua",
                  description: "Acompanhamento regular para garantir a eficácia a longo prazo."
                }
              ].map((service) => {
                const Icon = service.icon;
                return (
                  <div key={service.title} className="bg-white p-6 rounded-xl shadow-sm border border-border">
                    <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-secondary" />
                    </div>
                    <h3 className="text-lg font-semibold text-primary mb-2">{service.title}</h3>
                    <p className="text-muted-foreground text-sm">{service.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Porque Escolher a MEDISIGMA */}
        <section className="py-16 md:py-20 mx-4 md:mx-0">
          <div className="container mx-auto px-6 md:px-8 max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-2xl md:text-4xl font-bold text-primary mb-4">
                Porque Escolher a Medisigma?
              </h2>
              <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
                Experiência, qualificação e compromisso com a excelência em cada intervenção.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  title: "Técnicos Qualificados",
                  description: "Profissionais certificados com formação especializada em controlo de pragas urbanas."
                },
                {
                  title: "Produtos Certificados",
                  description: "Utilizamos apenas produtos autorizados pela Direção-Geral da Saúde."
                },
                {
                  title: "Abordagem Integrada",
                  description: "Metodologia que considera critérios ecológicos, económicos e toxicológicos."
                },
                {
                  title: "Acompanhamento Contínuo",
                  description: "Supervisão e monitorização regular para garantir eficácia a longo prazo."
                }
              ].map((benefit, index) => (
                <div key={index} className="text-center">
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

        {/* FAQ Section */}
        <section className="py-16 md:py-20 bg-accent mx-4 md:mx-8 rounded-3xl">
          <div className="container mx-auto px-6 md:px-8 max-w-4xl">
            <h2 className="text-2xl md:text-4xl font-bold text-primary mb-8 md:mb-12 text-center">
              Perguntas Frequentes
            </h2>

            <div className="space-y-6">
              <details className="bg-white p-6 rounded-lg shadow-sm border border-border">
                <summary className="font-semibold text-primary cursor-pointer text-lg">
                  O que é o Controlo Integrado de Pragas?
                </summary>
                <p className="mt-4 text-muted-foreground">
                  É um sistema que inclui medidas preventivas e correctivas para manter as espécies que causam pragas em níveis que não conduzem à ocorrência de problemas significativos, considerando critérios ecológicos, económicos e toxicológicos.
                </p>
              </details>

              <details className="bg-white p-6 rounded-lg shadow-sm border border-border">
                <summary className="font-semibold text-primary cursor-pointer text-lg">
                  Os produtos utilizados são seguros?
                </summary>
                <p className="mt-4 text-muted-foreground">
                  Sim, todos os produtos utilizados nas desinfestações são autorizados pela Direção-Geral da Saúde, garantindo segurança para pessoas, animais e ambiente.
                </p>
              </details>

              <details className="bg-white p-6 rounded-lg shadow-sm border border-border">
                <summary className="font-semibold text-primary cursor-pointer text-lg">
                  Com que frequência deve ser feita a monitorização?
                </summary>
                <p className="mt-4 text-muted-foreground">
                  A frequência de monitorização depende do tipo de estabelecimento, nível de risco e regulamentações específicas. Definimos um plano personalizado para cada cliente.
                </p>
              </details>

              <details className="bg-white p-6 rounded-lg shadow-sm border border-border">
                <summary className="font-semibold text-primary cursor-pointer text-lg">
                  É necessário para cumprimento do HACCP?
                </summary>
                <p className="mt-4 text-muted-foreground">
                  Sim, o controlo de pragas é um dos pré-requisitos fundamentais para a implementação e funcionamento eficaz do plano HACCP em estabelecimentos alimentares.
                </p>
              </details>
            </div>
          </div>
        </section>

        {/* CTA Section */}
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
                    <span>Produtos autorizados pela Direção-Geral da Saúde</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-white" />
                    <span>Técnicos qualificados e certificados</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-white" />
                    <span>Monitorização contínua e eficaz</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href={`https://wa.me/${siteConfig.links.whatsapp}?text=Olá%2C%20estava%20no%20vosso%20website%20e%20gostaria%20de%20ter%20mais%20informações%20sobre%20Controlo%20de%20Pragas.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white text-secondary px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.515z" />
                    </svg>
                    WhatsApp
                  </a>
                  <a href="tel:241331504" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-secondary transition-colors text-center">
                    241 331 504
                  </a>
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