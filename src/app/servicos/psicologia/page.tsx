import React from 'react';
import { Metadata } from 'next';
import { BrainCircuit, HeartHandshake, Users, Smile, ShieldCheck, TrendingUp, CheckCircle } from 'lucide-react';
import ContactForm from '@/components/ContactForm';
import Image from 'next/image';

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
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="#cta-section"
                    className="bg-secondary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-secondary/90 transition-colors text-center cursor-pointer"
                  >
                    Fale connosco
                  </a>
                </div>
              </div>
              <div className="text-center">
                <Image src="/images/uploads/Generated Image December 11, 2025 - 3_35PM.jpeg" alt="Psicologia no Trabalho" width={500} height={500} className="max-w-full h-auto rounded-lg shadow-lg" />
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
        <section id="cta-section" className="relative z-10 bg-secondary py-16 md:py-20 mx-4 md:mx-8 rounded-3xl mb-8">
          <div className="container mx-auto px-6 md:px-8 max-w-5xl">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="text-white">
                <h2 className="text-2xl md:text-4xl font-bold mb-4 md:mb-6">
                  Invista na Saúde Mental dos Seus Colaboradores
                </h2>
                <p className="text-base md:text-lg text-primary-foreground/90 max-w-3xl mx-auto mb-8">
                  Promovemos o bem-estar psicológico no trabalho com intervenções especializadas que melhoram o clima organizacional e a produtividade.
                </p>

                <div className="space-y-4 mb-8 text-blue-100">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-white" />
                    <span>Avaliação de riscos psicossociais</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-white" />
                    <span>Apoio psicológico individual e confidencial</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-white" />
                    <span>Workshops sobre gestão de stress</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="https://wa.me/351966979226?text=Olá%2C%20estava%20no%20vosso%20website%20e%20gostaria%20de%20ter%20mais%20informações%20sobre%20Psicologia%20no%20Trabalho."
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
                pagina="Serviço Psicologia"
                fonte="servicos/psicologia"
                servicoDefault="Psicologia"
              />
            </div>
          </div>
        </section>
      </main>
    </>
  );
} 