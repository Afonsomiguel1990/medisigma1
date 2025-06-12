import React from 'react';
import { Metadata } from 'next';
import { ShieldCheck, FileText, Users, Zap, DoorOpen, DraftingCompass, CheckCircle, Calendar, RefreshCw } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Segurança Contra Incêndios (SCIE) | Medidas e Extintores | MediSigma',
  description: 'Serviços completos de SCIE: elaboração de Medidas de Autoproteção, Projetos de Segurança, e comércio e manutenção de extintores. Conformidade com a Lei n.º 123/2019.',
  keywords: 'segurança contra incêndios, SCIE, medidas de autoproteção, projetos de segurança, manutenção de extintores, NP 4413, Lei 123/2019, MediSigma',
  openGraph: {
    title: 'Segurança Contra Incêndios (SCIE) | Medidas e Extintores | MediSigma',
    description: 'Serviços completos de SCIE: Medidas de Autoproteção, Projetos de Segurança, e manutenção de extintores.',
    type: 'website',
    locale: 'pt_PT',
  },
  alternates: {
    canonical: 'https://medisigma.pt/servicos/seguranca-incendios',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  'name': 'Segurança Contra Incêndios em Edifícios (SCIE)',
  'provider': {
    '@type': 'Organization',
    'name': 'MediSigma',
    'url': 'https://medisigma.pt',
  },
  'serviceType': 'Segurança Contra Incêndios',
  'description': 'Serviços completos de SCIE, incluindo Medidas de Autoproteção, Projetos de Segurança, e comércio e manutenção de extintores de acordo com a legislação em vigor.',
  'hasOfferCatalog': {
    '@type': 'OfferCatalog',
    'name': 'Serviços de SCIE',
    'itemListElement': [
      {
        '@type': 'Offer',
        'itemOffered': {
          '@type': 'Service',
          'name': 'Projetos de Segurança e Medidas de Autoproteção'
        }
      },
      {
        '@type': 'Offer',
        'itemOffered': {
          '@type': 'Service',
          'name': 'Comércio e Manutenção de Extintores e Carretéis'
        }
      },
    ]
  }
};

export default function SegurancaIncendiosPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <main className="min-h-screen bg-white flex flex-col divide-y divide-border">
        {/* Hero Section */}
        <section className="relative py-16 md:py-24 mx-4 md:mx-8 rounded-3xl mb-8">
          <div className="absolute inset-0 -z-10 pointer-events-none">
            <div className="animated-hero-background absolute inset-0 -z-10 h-full w-full [background:radial-gradient(125%_125%_at_50%_10%,var(--background)_40%,var(--secondary)_100%)] rounded-3xl"></div>
          </div>
          <div className="container mx-auto px-6 md:px-8 max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
              <div>
                <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                  Segurança Contra Incêndios
                </h1>
                <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed">
                  Protegemos vidas e património através de soluções integrais de segurança contra incêndios. 
                  Desde a conceção até à manutenção, garantimos o cumprimento de todas as normas 
                  de segurança e a máxima proteção das suas instalações.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a 
                    href="https://wa.me/351938698260?text=Olá%2C%20estava%20no%20vosso%20website%20e%20gostaria%20de%20ter%20mais%20informações%20sobre%20Segurança%20Contra%20Incêndios." 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-secondary text-white px-8 py-3 rounded-lg font-semibold hover:bg-secondary/90 transition-colors flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.515z"/>
                    </svg>
                    WhatsApp
                  </a>
                  <button className="border border-secondary text-secondary px-8 py-3 rounded-lg font-semibold hover:bg-secondary/5 transition-colors">
                    Saber Mais
                  </button>
                </div>
              </div>
              <div className="lg:text-right">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/seguranca-incendios-hero.jpg"
                  alt="Equipamentos de segurança contra incêndios, incluindo extintores e sinalização"
                  width={600}
                  height={400}
                  className="rounded-xl shadow-2xl"
                  loading="eager"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Projetos e Medidas Section */}
        <section className="py-16 md:py-20 mx-4 md:mx-0">
          <div className="container mx-auto px-6 md:px-8 max-w-6xl">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4 md:mb-6">
                Os Nossos Serviços
              </h2>
              <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
                Oferecemos soluções completas de segurança contra incêndios, abrangendo todas as fases do projeto.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                    <h2 className="text-3xl font-bold text-primary mb-6">
                        Projetos de Segurança e Medidas de Autoproteção
                    </h2>
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                        Elaboramos Medidas de Autoproteção e Projetos de SCIE para qualquer estabelecimento, conforme a Lei n.º 123/2019. O nosso objetivo é garantir a manutenção das condições de segurança e uma estrutura mínima de resposta a emergências. Uma abordagem integrada com a <Link href="/servicos/seguranca-no-trabalho" className="text-secondary font-semibold hover:underline">Segurança no Trabalho</Link> e a <Link href="/servicos/formacao-certificada" className="text-secondary font-semibold hover:underline">Formação Certificada</Link> é essencial para uma prevenção completa.
                    </p>
                    <div className="space-y-4">
                        {[
                            { icon: ShieldCheck, text: "Garantia da manutenção das condições de segurança" },
                            { icon: Users, text: "Estrutura de resposta a emergências" },
                            { icon: Zap, text: "Operacionalidade permanente dos equipamentos de segurança" },
                            { icon: DoorOpen, text: "Evacuação segura dos ocupantes em caso de emergência" },
                        ].map((item, index) => {
                            const Icon = item.icon;
                            return(
                            <div key={index} className="flex items-center gap-3">
                                <Icon className="w-5 h-5 text-secondary flex-shrink-0" />
                                <span className="text-muted-foreground">{item.text}</span>
                            </div>
                        )})}
                    </div>
                </div>
              <div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/medidas-autoprotecao.jpg"
                  alt="Técnico a inspecionar um plano de evacuação de incêndio"
                  width={500}
                  height={400}
                  className="rounded-xl shadow-lg"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Processo Section */}
        <section className="bg-accent py-16 md:py-20 mx-4 md:mx-8 rounded-3xl">
            <div className="container mx-auto px-6 max-w-6xl">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-primary">O Nosso Processo</h2>
                    <p className="text-lg text-muted-foreground mt-4 max-w-3xl mx-auto">A MEDISIGMA responsabiliza-se pela execução de todo o processo para a concretização dos trabalhos.</p>
                </div>
                <div className="grid md:grid-cols-3 gap-8 text-center">
                    <div>
                        <div className="w-16 h-16 bg-secondary/10 text-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                            <DraftingCompass className="w-8 h-8"/>
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Levantamento e Desenho</h3>
                        <p className="text-muted-foreground">Levantamento das instalações e equipamentos. Se não possuir plantas digitais, os nossos desenhadores tratam da sua criação.</p>
                    </div>
                    <div>
                        <div className="w-16 h-16 bg-secondary/10 text-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                            <FileText className="w-8 h-8"/>
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Conceção Documental</h3>
                        <p className="text-muted-foreground">Elaboração de toda a documentação necessária para as Medidas de Autoproteção e Projetos de SCIE.</p>
                    </div>
                    <div>
                        <div className="w-16 h-16 bg-secondary/10 text-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                           <CheckCircle className="w-8 h-8"/>
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Entrega e Implementação</h3>
                        <p className="text-muted-foreground">Entrega da documentação final e apoio na implementação das medidas de segurança.</p>
                    </div>
                </div>
            </div>
        </section>

        {/* Manutenção de Extintores Section */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/extintores-manutencao.jpg"
                  alt="Extintores de incêndio alinhados e prontos para manutenção"
                  width={500}
                  height={400}
                  className="rounded-xl shadow-lg"
                  loading="lazy"
                />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-primary mb-6">
                  Comércio e Manutenção de Extintores
                </h2>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                    Os extintores são equipamentos de primeira intervenção, cruciais para combater incêndios na sua fase inicial. Oferecemos um serviço de comercialização e manutenção em conformidade com as normas NP 4413:2019 e NP EN 671.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-xl shadow-lg border border-border">
                        <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                            <Calendar className="w-6 h-6 text-secondary" />
                        </div>
                        <h3 className="text-lg font-semibold text-primary mb-2">Manutenção Anual</h3>
                        <p className="text-muted-foreground text-sm">Ações técnicas para conservar o equipamento, efetuadas em intervalos de 12 meses.</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-lg border border-border">
                        <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                            <RefreshCw className="w-6 h-6 text-secondary" />
                        </div>
                        <h3 className="text-lg font-semibold text-primary mb-2">Carregamento</h3>
                        <p className="text-muted-foreground text-sm">Substituição do agente extintor de 5 em 5 anos, ou sempre que o seu estado o justifique.</p>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 md:py-20 bg-accent mx-6 md:mx-8 rounded-3xl">
          <div className="container mx-auto px-6 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-12 text-center">
              Perguntas Frequentes
            </h2>
            
            <div className="space-y-6">
              <details className="bg-white p-6 rounded-lg shadow-sm border border-border">
                <summary className="font-semibold text-primary cursor-pointer text-lg">
                  O que são Medidas de Autoproteção?
                </summary>
                <p className="mt-4 text-muted-foreground">
                  São procedimentos de organização e gestão da segurança que garantem a manutenção das condições de segurança do projeto e uma estrutura de resposta a emergências.
                </p>
              </details>
              <details className="bg-white p-6 rounded-lg shadow-sm border border-border">
                <summary className="font-semibold text-primary cursor-pointer text-lg">
                  A manutenção de extintores é obrigatória?
                </summary>
                <p className="mt-4 text-muted-foreground">
                  Sim. A norma NP 4413:2019 estabelece a obrigatoriedade da manutenção anual dos extintores para garantir a sua operacionalidade.
                </p>
              </details>
              <details className="bg-white p-6 rounded-lg shadow-sm border border-border">
                <summary className="font-semibold text-primary cursor-pointer text-lg">
                  O que faço se não tiver as plantas do meu edifício?
                </summary>
                <p className="mt-4 text-muted-foreground">
                  Caso não possua as plantas em formato digital (AutoCAD), o Grupo MEDISIGMA dispõe de desenhadores qualificados para fazer o levantamento e a sua criação.
                </p>
              </details>
              <details className="bg-white p-6 rounded-lg shadow-sm border border-border">
                <summary className="font-semibold text-primary cursor-pointer text-lg">
                  De quanto em quanto tempo preciso de recarregar os extintores?
                </summary>
                <p className="mt-4 text-muted-foreground">
                  A recarga dos extintores de Pó Químico ABC e CO2 deve ser efetuada de 5 em 5 anos.
                </p>
              </details>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="relative z-10 bg-secondary py-16 md:py-20 mx-4 md:mx-8 rounded-3xl mb-8">
          <div className="container mx-auto px-6 md:px-8 max-w-5xl text-center">
            <h2 className="text-2xl md:text-4xl font-bold text-primary-foreground mb-4 md:mb-6">
              Proteja o Seu Património
            </h2>
            <p className="text-base md:text-lg text-primary-foreground/90 max-w-3xl mx-auto mb-8">
              A segurança contra incêndios não é uma opção, é uma necessidade. Contacte-nos para uma 
              avaliação completa e descubra como podemos proteger as suas instalações.
            </p>
            <a 
              href="https://wa.me/351938698260?text=Olá%2C%20estava%20no%20vosso%20website%20e%20gostaria%20de%20ter%20mais%20informações%20sobre%20Segurança%20Contra%20Incêndios." 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-primary text-secondary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors inline-flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.515z"/>
              </svg>
              WhatsApp
            </a>
          </div>
        </section>
      </main>
    </>
  );
} 