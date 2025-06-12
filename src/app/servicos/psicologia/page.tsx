import React from 'react';
import { Metadata } from 'next';
import { BrainCircuit, HeartHandshake, Users, Smile, ShieldCheck, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Psicologia e Bem-Estar no Trabalho | MediSigma',
  description: 'Serviços de psicologia para promover a saúde mental, o bem-estar e a produtividade no ambiente de trabalho. Avaliação, intervenção e workshops.',
  keywords: 'psicologia do trabalho, saúde mental, bem-estar, stress ocupacional, burnout, MediSigma',
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  'name': 'Psicologia e Bem-Estar no Trabalho',
  'provider': {
    '@type': 'Organization',
    'name': 'MediSigma',
    'url': 'https://medisigma.pt',
  },
  'serviceType': 'Psicologia Ocupacional',
  'description': 'Serviços de psicologia para promover a saúde mental, o bem-estar e a produtividade no ambiente de trabalho.',
};

export default function PsicologiaPage() {
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
                  Psicologia no Trabalho
                </h1>
                <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed">
                  O nosso serviço de Psicologia do Trabalho promove o bem-estar e a saúde mental dos colaboradores, 
                  criando ambientes de trabalho mais saudáveis e produtivos. Oferecemos intervenções 
                  personalizadas para prevenir riscos psicossociais.
                </p>
              </div>
              <div className="text-center">
                <img src="/images/psicologia-trabalho.png" alt="Psicologia no Trabalho" className="max-w-full h-auto" />
              </div>
            </div>
          </div>
        </section>

        {/* What is Work Psychology Section */}
        <section className="py-16 md:py-20 mx-4 md:mx-0">
          <div className="container mx-auto px-6 md:px-8 max-w-6xl">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4 md:mb-6">
                O que é a Psicologia do Trabalho?
              </h2>
              <p className="text-base md:text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
                A Psicologia do Trabalho é uma especialidade que se foca na promoção da saúde mental e bem-estar dos trabalhadores. 
                Através de avaliações e intervenções especializadas, contribuímos para a melhoria das condições psicossociais no ambiente laboral.
              </p>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="bg-accent py-16 md:py-20 mx-4 md:mx-8 rounded-3xl mb-8">
          <div className="container mx-auto px-6 md:px-8 max-w-6xl">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4 md:mb-6">
                Os Nossos Serviços
              </h2>
              <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
                Oferecemos um conjunto abrangente de serviços especializados em psicologia do trabalho, 
                adaptados às necessidades específicas de cada organização.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {[
                { icon: BrainCircuit, title: "Avaliação de Riscos Psicossociais", description: "Diagnóstico dos níveis de stress e burnout na sua organização." },
                { icon: Users, title: "Workshops e Formação", description: "Sessões sobre gestão de stress, inteligência emocional e comunicação." },
                { icon: HeartHandshake, title: "Apoio Psicológico Individual", description: "Consultas confidenciais para colaboradores, focadas em desafios profissionais ou pessoais." },
              ].map((service) => {
                const Icon = service.icon;
                return (
                  <div key={service.title} className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-border text-center">
                    <div className="w-16 h-16 bg-secondary/10 rounded-lg flex items-center justify-center mx-auto mb-6">
                      <Icon className="w-8 h-8 text-secondary" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.title}</h3>
                    <p className="text-muted-foreground">{service.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 md:py-20 mx-4 md:mx-0">
          <div className="container mx-auto px-6 md:px-8 max-w-6xl">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4 md:mb-6">
                Benefícios da Psicologia no Trabalho
              </h2>
              <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
                Investir na saúde mental dos colaboradores traz benefícios tangíveis para toda a organização.
              </p>
            </div>
            <div className="space-y-4">
              {[
                { icon: TrendingUp, text: "Aumento da Produtividade" },
                { icon: Smile, text: "Melhoria do Clima Organizacional" },
                { icon: Users, text: "Redução do Absentismo" },
                { icon: ShieldCheck, text: "Retenção de Talentos" }
              ].map(point => {
                const Icon = point.icon;
                return (
                  <div key={point.text} className="bg-white p-4 rounded-lg flex items-center gap-4 border border-border shadow-sm">
                    <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-secondary" />
                    </div>
                    <span className="font-semibold">{point.text}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative z-10 bg-secondary py-16 md:py-20 mx-4 md:mx-8 rounded-3xl mb-8">
          <div className="container mx-auto px-6 md:px-8 max-w-5xl text-center">
            <h2 className="text-2xl md:text-4xl font-bold text-primary-foreground mb-4 md:mb-6">
              Promova o Bem-estar na Sua Empresa
            </h2>
            <p className="text-base md:text-lg text-primary-foreground/90 max-w-3xl mx-auto mb-8">
              Colaboradores com boa saúde mental são mais produtivos, criativos e comprometidos. 
              Contacte-nos para descobrir como podemos ajudar a sua organização.
            </p>
            <Link href="/contact" className="bg-white text-secondary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-center">
              Agendar Consulta
            </Link>
          </div>
        </section>
      </main>
    </>
  );
} 