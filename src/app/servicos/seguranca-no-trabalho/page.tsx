import React from "react";
import Image from "next/image";
import { Metadata } from "next";
import { ClipboardList, Users, AlertTriangle, CheckCircle, BarChart, Wrench, Search, Activity, TrendingUp, Eye, FileText, Building2 } from 'lucide-react';
import Link from "next/link";

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
        <section className="relative py-16 md:py-24 mx-6 md:mx-8 rounded-3xl mb-8">
          <div className="absolute inset-0 -z-10 pointer-events-none">
            <div className="animated-hero-background absolute inset-0 -z-10 h-full w-full [background:radial-gradient(125%_125%_at_50%_10%,var(--background)_40%,var(--secondary)_100%)] rounded-3xl"></div>
          </div>
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                  Segurança no Trabalho
                </h1>
                <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                  O objetivo principal da Segurança do Trabalho é a prevenção de acidentes 
                  de trabalho e de doenças profissionais. A MediSigma assegura um serviço 
                  personalizado, altamente especializado e direcionado para as necessidades 
                  dos seus clientes.
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
                  src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
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

        {/* Key Factors Section */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Fatores Chave para o Sucesso
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                A identificação, análise, avaliação e gestão dos riscos nos locais de trabalho 
                constituem o fator chave para prevenir acidentes e doenças profissionais.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center p-6 bg-white rounded-xl shadow-lg border border-border">
                <div className="w-16 h-16 bg-secondary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-secondary" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Identificação</h3>
                <p className="text-gray-600 text-sm">Identificação precisa de todos os riscos presentes</p>
              </div>

              <div className="text-center p-6 bg-white rounded-xl shadow-lg border border-border">
                <div className="w-16 h-16 bg-secondary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <BarChart className="w-8 h-8 text-secondary" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Análise</h3>
                <p className="text-gray-600 text-sm">Análise detalhada dos riscos identificados</p>
              </div>

              <div className="text-center p-6 bg-white rounded-xl shadow-lg border border-border">
                <div className="w-16 h-16 bg-secondary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-secondary" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Avaliação</h3>
                <p className="text-gray-600 text-sm">Avaliação sistemática de cada risco</p>
              </div>

              <div className="text-center p-6 bg-white rounded-xl shadow-lg border border-border">
                <div className="w-16 h-16 bg-secondary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Wrench className="w-8 h-8 text-secondary" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Gestão</h3>
                <p className="text-gray-600 text-sm">Gestão eficaz e controlo contínuo</p>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="bg-accent py-16 md:py-20 mx-6 md:mx-8 rounded-3xl mb-8">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Serviços de Segurança no Trabalho
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                No âmbito da Segurança no Trabalho, a MediSigma presta um conjunto 
                abrangente de serviços especializados para garantir a máxima proteção dos trabalhadores.
              </p>
            </div>

            {/* Avaliação e Análise */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                Avaliação e Análise de Riscos
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="group bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-border hover:border-secondary/20">
                  <div className="flex items-center justify-center w-12 h-12 bg-secondary/10 rounded-xl mb-4 group-hover:bg-secondary/20 transition-colors duration-300">
                    <Wrench className="w-6 h-6 text-secondary group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Apoio Técnico</h4>
                  <p className="text-gray-600 text-sm">
                    Assessoria técnica especializada para implementação de medidas de segurança e prevenção de acidentes de trabalho.
                  </p>
                </div>

                <div className="group bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-border hover:border-secondary/20">
                  <div className="flex items-center justify-center w-12 h-12 bg-secondary/10 rounded-xl mb-4 group-hover:bg-secondary/20 transition-colors duration-300">
                    <Search className="w-6 h-6 text-secondary group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Vistorias Técnicas</h4>
                  <p className="text-gray-600 text-sm">
                    Inspeções técnicas detalhadas de instalações, equipamentos e processos para identificação de perigos.
                  </p>
                </div>

                <div className="group bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-border hover:border-secondary/20">
                  <div className="flex items-center justify-center w-12 h-12 bg-secondary/10 rounded-xl mb-4 group-hover:bg-secondary/20 transition-colors duration-300">
                    <AlertTriangle className="w-6 h-6 text-secondary group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Avaliação de Riscos</h4>
                  <p className="text-gray-600 text-sm">
                    Análise sistemática e documentada de todos os riscos presentes nos locais de trabalho.
                  </p>
                </div>

                <div className="group bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-border hover:border-secondary/20">
                  <div className="flex items-center justify-center w-12 h-12 bg-secondary/10 rounded-xl mb-4 group-hover:bg-secondary/20 transition-colors duration-300">
                    <FileText className="w-6 h-6 text-secondary group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Planos de Emergência</h4>
                  <p className="text-gray-600 text-sm">
                    Desenvolvimento de procedimentos de emergência e planos de evacuação adequados às instalações.
                  </p>
                </div>
              </div>
            </div>

            {/* Monitorização e Medição */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                Monitorização e Medição
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="group bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-border">
                  <div className="flex items-center justify-center w-12 h-12 bg-secondary/10 rounded-xl mb-4 group-hover:bg-secondary/20 transition-colors duration-300">
                    <Activity className="w-6 h-6 text-secondary group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Medição de Ruído</h4>
                  <p className="text-gray-600 text-sm">
                    Avaliação dos níveis de exposição ao ruído conforme legislação aplicável e normas técnicas.
                  </p>
                </div>

                <div className="group bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-border">
                  <div className="flex items-center justify-center w-12 h-12 bg-secondary/10 rounded-xl mb-4 group-hover:bg-secondary/20 transition-colors duration-300">
                    <TrendingUp className="w-6 h-6 text-secondary group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Medição de Vibrações</h4>
                  <p className="text-gray-600 text-sm">
                    Monitorização da exposição a vibrações transmitidas ao sistema mão-braço e corpo inteiro.
                  </p>
                </div>

                <div className="group bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-border">
                  <div className="flex items-center justify-center w-12 h-12 bg-secondary/10 rounded-xl mb-4 group-hover:bg-secondary/20 transition-colors duration-300">
                    <Eye className="w-6 h-6 text-secondary group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Avaliação da Iluminação</h4>
                  <p className="text-gray-600 text-sm">
                    Medição dos níveis de iluminância nos postos de trabalho e verificação da qualidade luminosa.
                  </p>
                </div>
              </div>
            </div>

            {/* Formação e Consultoria */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                Formação e Consultoria
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="group bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-border">
                  <div className="flex items-center justify-center w-12 h-12 bg-secondary/10 rounded-xl mb-4 group-hover:bg-secondary/20 transition-colors duration-300">
                    <Users className="w-6 h-6 text-secondary group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Formação de Trabalhadores</h4>
                  <p className="text-gray-600 text-sm">
                    Ações de formação à medida sobre riscos específicos, procedimentos de segurança e utilização de EPIs.
                  </p>
                </div>

                <div className="group bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-border">
                  <div className="flex items-center justify-center w-12 h-12 bg-secondary/10 rounded-xl mb-4 group-hover:bg-secondary/20 transition-colors duration-300">
                    <ClipboardList className="w-6 h-6 text-secondary group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Auditorias de Segurança</h4>
                  <p className="text-gray-600 text-sm">
                    Realização de auditorias internas para verificar a conformidade do sistema de gestão de segurança.
                  </p>
                </div>

                <div className="group bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-border">
                  <div className="flex items-center justify-center w-12 h-12 bg-secondary/10 rounded-xl mb-4 group-hover:bg-secondary/20 transition-colors duration-300">
                    <Building2 className="w-6 h-6 text-secondary group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Consultoria Especializada</h4>
                  <p className="text-gray-600 text-sm">
                    Apoio na implementação de políticas de segurança, legislação e melhores práticas do setor.
                  </p>
                </div>
              </div>
            </div>
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
        <section id="cta-section" className="bg-secondary py-16 md:py-20 mx-6 md:mx-8 rounded-3xl mb-8">
          <div className="container mx-auto px-6 max-w-5xl">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="text-white">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Pedido de Proposta
                </h2>
                <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                  Peça já uma proposta à medida das necessidades da sua empresa e garanta 
                  a segurança e bem-estar dos seus colaboradores. Confie na MediSigma para 
                  todos os serviços de segurança no trabalho.
                </p>
                
                <div className="space-y-4 mb-8 text-blue-100">
                  <div className="flex items-center space-x-3">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Proposta personalizada sem compromisso</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Resposta em 24 horas úteis</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Soluções adaptadas ao seu setor</span>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <a 
                    href="https://wa.me/351938698260?text=Olá%2C%20estava%20no%20vosso%20website%20e%20gostaria%20de%20ter%20mais%20informações%20sobre%20Segurança%20no%20Trabalho." 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-white text-secondary px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.515z"/>
                    </svg>
                    WhatsApp
                  </a>
                  <a href="tel:241331504" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-secondary transition-colors text-center">
                    241 331 504
                  </a>
                </div>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-2xl">
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">Contacto Rápido</h3>
                <form className="space-y-4">
                  <div>
                    <label htmlFor="empresa" className="block text-sm font-medium text-gray-700 mb-2">
                      Nome da Empresa *
                    </label>
                    <input 
                      type="text" 
                      id="empresa"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                      placeholder="A sua empresa"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="responsavel" className="block text-sm font-medium text-gray-700 mb-2">
                      Nome do Responsável *
                    </label>
                    <input 
                      type="text" 
                      id="responsavel"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                      placeholder="O seu nome"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input 
                      type="email" 
                      id="email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                      placeholder="empresa@exemplo.pt"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="funcionarios" className="block text-sm font-medium text-gray-700 mb-2">
                      Número de Funcionários
                    </label>
                    <select 
                      id="funcionarios"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                    >
                      <option>Selecione...</option>
                      <option>1-10 funcionários</option>
                      <option>11-50 funcionários</option>
                      <option>51-100 funcionários</option>
                      <option>101-500 funcionários</option>
                      <option>Mais de 500 funcionários</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="mensagem" className="block text-sm font-medium text-gray-700 mb-2">
                      Mensagem (opcional)
                    </label>
                    <textarea 
                      id="mensagem"
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                      placeholder="Descreva brevemente as suas necessidades..."
                    ></textarea>
                  </div>
                  
                  <button 
                    type="submit"
                    className="w-full bg-secondary text-white py-3 px-6 rounded-lg font-semibold hover:bg-secondary/90 transition-colors"
                  >
                    Enviar Pedido de Proposta
                  </button>
                  
                  <p className="text-xs text-gray-500 text-center">
                    * Campos obrigatórios. Os seus dados serão tratados com confidencialidade.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
} 