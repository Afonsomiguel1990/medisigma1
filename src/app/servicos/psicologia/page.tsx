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
        <section className="relative py-16 md:py-24 mx-6 md:mx-8 rounded-3xl mb-8">
          <div className="absolute inset-0">
            <div className="animated-hero-background absolute inset-0 -z-10 h-full w-full [background:radial-gradient(125%_125%_at_50%_10%,var(--background)_40%,var(--secondary)_100%)] rounded-3xl"></div>
          </div>
          <div className="container mx-auto px-6 max-w-6xl text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
              Psicologia e Bem-Estar no Trabalho
            </h1>
            <p className="text-xl text-muted-foreground mx-auto max-w-3xl">
              Promovemos a saúde mental e o bem-estar dos seus colaboradores como pilar para uma organização mais saudável, resiliente e produtiva.
            </p>
          </div>
        </section>

        {/* Areas Section */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                As Nossas Áreas de Intervenção
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Oferecemos um conjunto de serviços de psicologia adaptados às necessidades de cada organização. A avaliação dos riscos psicossociais é uma componente crucial da <Link href="/servicos/medicina-no-trabalho" className="text-secondary font-semibold hover:underline">Medicina no Trabalho</Link>, promovendo um ambiente laboral mais seguro e saudável.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { icon: BrainCircuit, title: "Avaliação de Riscos Psicossociais", description: "Diagnóstico dos níveis de stress e burnout na sua organização." },
                { icon: Users, title: "Workshops e Formação", description: "Sessões sobre gestão de stress, inteligência emocional e comunicação." },
                { icon: HeartHandshake, title: "Apoio Psicológico Individual", description: "Consultas confidenciais para colaboradores, focadas em desafios profissionais ou pessoais." },
              ].map((service) => {
                const Icon = service.icon;
                return (
                  <div key={service.title} className="bg-white p-8 rounded-xl shadow-lg border border-border text-center">
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

        {/* Importance Section */}
        <section className="bg-accent py-16 md:py-20 mx-6 md:mx-8 rounded-3xl mb-8">
            <div className="container mx-auto px-6 max-w-6xl">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">A Importância da Saúde Mental</h2>
                        <p className="text-muted-foreground leading-relaxed mb-6">
                            Investir no bem-estar psicológico dos colaboradores não só melhora a qualidade de vida, como também se traduz em benefícios concretos para a empresa.
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
            </div>
        </section>

        {/* CTA Section */}
        <section className="bg-secondary py-16 md:py-20 mx-6 md:mx-8 rounded-3xl mb-8">
          <div className="container mx-auto px-6 max-w-4xl text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Invista no Bem-Estar da Sua Equipa
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Descubra como os nossos serviços de psicologia podem transformar o seu ambiente de trabalho.
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