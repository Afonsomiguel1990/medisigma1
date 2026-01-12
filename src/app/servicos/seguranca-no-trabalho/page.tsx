import React from "react";
import Image from "next/image";
import { Metadata } from "next";
import { ClipboardList, Users, AlertTriangle, CheckCircle, BarChart, Wrench, Search, Activity, TrendingUp, Eye, FileText, Building2 } from 'lucide-react';
import Link from "next/link";
import { siteConfig } from "@/lib/config";
import ContactForm from '@/components/ContactForm';

export const metadata: Metadata = {
  title: "Segurança no Trabalho | Prevenção de Acidentes e Avaliação de Riscos | MediSigma",
  description: "Serviços especializados de segurança no trabalho em Portugal. Prevenção de acidentes, avaliação de riscos, vistorias técnicas e formação. Cumprimento integral da legislação SST.",
  keywords: "segurança no trabalho, prevenção acidentes trabalho, avaliação riscos, técnico segurança trabalho, higiene trabalho, SST, vistorias técnicas, formação segurança, doenças profissionais",
  openGraph: {
    title: "Segurança no Trabalho | Prevenção de Acidentes e Avaliação de Riscos | MediSigma",
    description: "Serviços especializados de segurança no trabalho. Prevenção de acidentes, avaliação de riscos e formação profissional.",
    type: "website",
    locale: "pt_PT",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/servicos/seguranca-no-trabalho",
  }
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "MediSigma - Segurança no Trabalho",
  "description": "Serviços especializados de segurança e saúde no trabalho, prevenção de acidentes e avaliação de riscos profissionais",
  "serviceType": [
    "Avaliação de Riscos",
    "Prevenção de Acidentes de Trabalho",
    "Vistorias Técnicas",
    "Formação em Segurança no Trabalho",
    "Higiene do Trabalho"
  ],
  "areaServed": "Portugal"
};

export default function SegurancaNoTrabalhoPage() {
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
                  Segurança no Trabalho
                </h1>
                <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed">
                  A Segurança no Trabalho é o conjunto de metodologias adequadas à prevenção de acidentes de trabalho e doenças profissionais. Identificamos e controlamos os riscos associados ao local de trabalho para proteger a saúde e a integridade física dos seus colaboradores.
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
              <div className="flex justify-center">
                <Image
                  src="/images/uploads/servicos/seguranca-trabalho-hero.png"
                  alt="Técnico de segurança no trabalho realizando inspeção"
                  width={500}
                  height={400}
                  className="rounded-lg shadow-xl"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="bg-accent py-16 md:py-20 mx-6 md:mx-8 rounded-3xl mb-8">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Os Nossos Serviços de Segurança
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Em conformidade com a Lei n.º 102/2009, de 10 de Setembro, oferecemos um serviço completo de segurança no trabalho, que inclui:
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {/* Planeamento da Atividade Preventiva */}
              <div className="group bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-border hover:border-secondary/20">
                <div className="flex items-center justify-center w-12 h-12 bg-secondary/10 rounded-xl mb-4 group-hover:bg-secondary/20 transition-colors duration-300">
                  <FileText className="w-6 h-6 text-secondary group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Planeamento da Atividade Preventiva</h3>
                <p className="text-gray-600 text-sm">
                  Definimos um plano estratégico e personalizado para a prevenção de riscos na sua empresa.
                </p>
              </div>

              {/* Auditoria Interna Periódica */}
              <div className="group bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-border hover:border-secondary/20">
                <div className="flex items-center justify-center w-12 h-12 bg-secondary/10 rounded-xl mb-4 group-hover:bg-secondary/20 transition-colors duration-300">
                  <Search className="w-6 h-6 text-secondary group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Auditoria Interna Periódica</h3>
                <p className="text-gray-600 text-sm">
                  Realizamos auditorias para levantar as condições de trabalho e identificar perigos e riscos.
                </p>
              </div>

              {/* Avaliação dos Riscos Profissionais */}
              <div className="group bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-border hover:border-secondary/20">
                <div className="flex items-center justify-center w-12 h-12 bg-secondary/10 rounded-xl mb-4 group-hover:bg-secondary/20 transition-colors duration-300">
                  <AlertTriangle className="w-6 h-6 text-secondary group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Avaliação dos Riscos Profissionais</h3>
                <p className="text-gray-600 text-sm">
                  Avaliamos os riscos em todas as secções e áreas de trabalho da sua empresa.
                </p>
              </div>

              {/* Programa de Prevenção */}
              <div className="group bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-border hover:border-secondary/20">
                <div className="flex items-center justify-center w-12 h-12 bg-secondary/10 rounded-xl mb-4 group-hover:bg-secondary/20 transition-colors duration-300">
                  <ClipboardList className="w-6 h-6 text-secondary group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Programa de Prevenção de Riscos</h3>
                <p className="text-gray-600 text-sm">
                  Elaboramos um programa de prevenção de riscos profissionais à medida das suas necessidades.
                </p>
              </div>

              {/* Formação e Informação */}
              <div className="group bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-border hover:border-secondary/20">
                <div className="flex items-center justify-center w-12 h-12 bg-secondary/10 rounded-xl mb-4 group-hover:bg-secondary/20 transition-colors duration-300">
                  <Users className="w-6 h-6 text-secondary group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Formação e Informação</h3>
                <p className="text-gray-600 text-sm">
                  Promovemos ações de formação e informação para todos os trabalhadores sobre os riscos e medidas de prevenção.
                </p>
              </div>

              {/* Análise e Estatística */}
              <div className="group bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-border hover:border-secondary/20">
                <div className="flex items-center justify-center w-12 h-12 bg-secondary/10 rounded-xl mb-4 group-hover:bg-secondary/20 transition-colors duration-300">
                  <BarChart className="w-6 h-6 text-secondary group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Análise e Estatística</h3>
                <p className="text-gray-600 text-sm">
                  Analisamos os acidentes de trabalho e doenças profissionais, e organizamos os dados estatísticos de segurança.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Complementary Services Section */}
        <section className="py-16 md:py-20 mx-4 md:mx-0">
          <div className="container mx-auto px-6 md:px-8 max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4 md:mb-6">
                Serviços e Ações Complementares
              </h2>
              <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
                Para além dos serviços essenciais, dispomos de um conjunto de avaliações técnicas especializadas para garantir um controlo rigoroso de todos os riscos.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              <div className="text-left p-6 bg-white rounded-xl shadow-sm border border-border">
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                  <Activity className="w-7 h-7 text-secondary" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Avaliações de Ruído Ocupacional</h3>
              </div>
              <div className="text-left p-6 bg-white rounded-xl shadow-sm border border-border">
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                  <Eye className="w-7 h-7 text-secondary" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Avaliação de Níveis de Iluminância</h3>
              </div>
              <div className="text-left p-6 bg-white rounded-xl shadow-sm border border-border">
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                  <Wrench className="w-7 h-7 text-secondary" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Avaliação de Contaminantes Químicos</h3>
              </div>
              <div className="text-left p-6 bg-white rounded-xl shadow-sm border border-border">
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="w-7 h-7 text-secondary" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Avaliação do Conforto/Stress Térmico</h3>
              </div>
              <div className="text-left p-6 bg-white rounded-xl shadow-sm border border-border">
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                  <Building2 className="w-7 h-7 text-secondary" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Medidas de Autoproteção</h3>
              </div>
              <div className="text-left p-6 bg-white rounded-xl shadow-sm border border-border">
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                  <BarChart className="w-7 h-7 text-secondary" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Avaliação dos Níveis de Vibrações</h3>
              </div>
            </div>
            <p className="text-center mt-8 text-gray-600">E ainda... <span className="font-semibold">Coordenação de segurança em obra.</span></p>
          </div>
        </section>

        {/* Importance Section */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                A Importância da Segurança no Trabalho
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Um programa de segurança no trabalho bem estruturado é um investimento estratégico.
                Para uma abordagem completa, é essencial integrar estes serviços com a <Link href="/servicos/medicina-no-trabalho" className="text-secondary font-semibold hover:underline">Medicina no Trabalho</Link> e a <Link href="/servicos/formacao-certificada" className="text-secondary font-semibold hover:underline">Formação Certificada</Link>,
                criando uma cultura de prevenção robusta.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="group bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-border">
                <div className="flex items-center justify-center w-12 h-12 bg-secondary/10 rounded-xl mb-4 group-hover:bg-secondary/20 transition-colors duration-300">
                  <AlertTriangle className="w-6 h-6 text-secondary group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Prevenção de Acidentes</h4>
                <p className="text-gray-600 text-sm">
                  Redução significativa do número de acidentes de trabalho e dos custos associados.
                </p>
              </div>

              <div className="group bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-border">
                <div className="flex items-center justify-center w-12 h-12 bg-secondary/10 rounded-xl mb-4 group-hover:bg-secondary/20 transition-colors duration-300">
                  <CheckCircle className="w-6 h-6 text-secondary group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Melhoria do Ambiente</h4>
                <p className="text-gray-600 text-sm">
                  Promoção de um ambiente de trabalho mais seguro, saudável e motivador para todos os colaboradores.
                </p>
              </div>

              <div className="group bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-border">
                <div className="flex items-center justify-center w-12 h-12 bg-secondary/10 rounded-xl mb-4 group-hover:bg-secondary/20 transition-colors duration-300">
                  <BarChart className="w-6 h-6 text-secondary group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Aumento da Produtividade</h4>
                <p className="text-gray-600 text-sm">
                  Trabalhadores seguros e saudáveis são mais produtivos, focados e eficientes nas suas tarefas.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section id="cta-section" className="relative z-10 bg-secondary py-16 md:py-20 mx-4 md:mx-8 rounded-3xl mb-8">
          <div className="container mx-auto px-6 md:px-8 max-w-5xl">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="text-white">
                <h2 className="text-2xl md:text-4xl font-bold mb-4 md:mb-6">
                  Garanta um Local de Trabalho Seguro
                </h2>
                <p className="text-base md:text-lg text-primary-foreground/90 max-w-3xl mx-auto mb-8">
                  A segurança no trabalho é essencial para proteger os seus colaboradores e garantir o cumprimento legal. Implementamos soluções completas adaptadas à sua empresa.
                </p>

                <div className="space-y-4 mb-8 text-blue-100">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-white" />
                    <span>Cumprimento integral da legislação</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-white" />
                    <span>Redução de acidentes de trabalho</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-white" />
                    <span>Melhoria do ambiente de trabalho</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href={`https://wa.me/${siteConfig.links.whatsapp}?text=Olá%2C%20estava%20no%20vosso%20website%20e%20gostaria%20de%20ter%20mais%20informações%20sobre%20Segurança%20no%20Trabalho.`}
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
                pagina="Serviço Segurança no Trabalho"
                fonte="servicos/seguranca-no-trabalho"
                servicoDefault="Segurança no Trabalho"
              />
            </div>
          </div>
        </section>
      </main>
    </>
  );
} 