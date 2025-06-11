import React from "react";
import Image from "next/image";
import { Metadata } from "next";
import { Calendar, CheckCircle, Activity, Eye, Heart, Zap, UserCheck, Clipboard, Microscope, Headphones } from 'lucide-react'
import Link from "next/link";

export const metadata: Metadata = {
  title: "Medicina no Trabalho | Exames Médicos Profissionais | MediSigma",
  description: "Serviços especializados de medicina no trabalho em Portugal. Exames médicos admissionais, periódicos e ocasionais. Vigilância da saúde dos trabalhadores conforme legislação.",
  keywords: "medicina no trabalho, exames médicos profissionais, vigilância saúde trabalhadores, exames admissionais, exames periódicos, medicina ocupacional, saúde ocupacional, médico do trabalho",
  openGraph: {
    title: "Medicina no Trabalho | Exames Médicos Profissionais | MediSigma",
    description: "Serviços especializados de medicina no trabalho em Portugal. Exames médicos admissionais, periódicos e ocasionais.",
    type: "website",
    locale: "pt_PT",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/servicos/medicina-no-trabalho",
  }
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  "name": "MediSigma - Medicina no Trabalho",
  "description": "Serviços especializados de Medicina no Trabalho e exames médicos ocupacionais",
  "url": "https://medisigma.pt/servicos/medicina-no-trabalho",
  "medicalSpecialty": "Occupational Medicine",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "PT"
  },
  "serviceType": [
    "Exames Médicos Admissionais",
    "Exames Médicos Periódicos",
    "Exames Médicos Ocasionais",
    "Medicina Ocupacional"
  ]
};

export default function MedicinaNoTrabalhoPage() {
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
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                  Medicina no Trabalho
                </h1>
                <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                  Prevenir os riscos ocupacionais significa desenvolver locais de trabalho saudáveis 
                  e contribuir ativamente para a proteção e promoção da saúde, valorizando os fatores 
                  individuais e psicossociais dos trabalhadores. A MediSigma assegura o cumprimento 
                  integral da legislação portuguesa em medicina do trabalho.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a 
                    href="#cta-section" 
                    className="bg-secondary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-secondary/90 transition-colors text-center cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById('cta-section')?.scrollIntoView({ 
                        behavior: 'smooth' 
                      });
                    }}
                  >
                    Fale connosco
                  </a>
                </div>
              </div>
              <div className="flex justify-center">
                <Image 
                  src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                  alt="Médico realizando exame médico no trabalho" 
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
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Os nossos Serviços de Medicina no Trabalho
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                A MediSigma oferece serviços completos de medicina do trabalho com uma equipa 
                altamente qualificada, constituída por médicos especializados, enfermeiros, 
                psicólogos e técnicos especializados, garantindo a vigilância da saúde dos 
                trabalhadores conforme as características específicas de cada atividade profissional.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {/* Exames Admissionais */}
              <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200">
                <div className="flex items-center justify-center w-16 h-16 bg-secondary/10 rounded-2xl mb-6 group-hover:bg-secondary/20 transition-colors duration-300">
                  <UserCheck className="w-8 h-8 text-secondary group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Exames Admissionais</h3>
                <p className="text-gray-600 mb-6">
                  Avaliação médica completa antes do início da atividade laboral, 
                  garantindo a aptidão do trabalhador para a função específica.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                    História clínica e profissional
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                    Exame físico completo
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                    Exames complementares necessários
                  </li>
                </ul>
              </div>

              {/* Exames Periódicos */}
              <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200">
                <div className="flex items-center justify-center w-16 h-16 bg-secondary/10 rounded-2xl mb-6 group-hover:bg-secondary/20 transition-colors duration-300">
                  <Calendar className="w-8 h-8 text-secondary group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Exames Periódicos</h3>
                <p className="text-gray-600 mb-6">
                  Vigilância médica regular para monitorização contínua do estado 
                  de saúde e prevenção de doenças profissionais.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                    Frequência adaptada aos riscos
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                    Monitorização específica
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                    Relatórios detalhados
                  </li>
                </ul>
              </div>

              {/* Exames Ocasionais */}
              <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200">
                <div className="flex items-center justify-center w-16 h-16 bg-secondary/10 rounded-2xl mb-6 group-hover:bg-secondary/20 transition-colors duration-300">
                  <Activity className="w-8 h-8 text-secondary group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Exames Ocasionais</h3>
                <p className="text-gray-600 mb-6">
                  Avaliações médicas extraordinárias motivadas por alterações 
                  nas condições de trabalho ou estado de saúde do trabalhador.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                    Regresso após ausência
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                    Mudança de função
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                    Novos riscos profissionais
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Exams Section */}
        <section className="bg-accent py-16 md:py-20 mx-6 md:mx-8 rounded-3xl mb-8">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Exames Complementares Disponíveis
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Dispondo de equipamentos médicos de última geração, oferecemos uma vasta gama 
                de exames complementares para uma avaliação médica completa e rigorosa.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* ECG */}
              <div className="group bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-indigo-200">
                <div className="flex items-center justify-center w-12 h-12 bg-secondary/10 rounded-xl mb-4 group-hover:bg-secondary/20 transition-colors duration-300">
                  <Heart className="w-6 h-6 text-secondary group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Eletrocardiograma (ECG)</h3>
                <p className="text-gray-600 text-sm">
                  Avaliação da atividade elétrica do coração para deteção de arritmias 
                  e outras patologias cardiovasculares.
                </p>
              </div>

              {/* Oftalmologia */}
              <div className="group bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-indigo-200">
                <div className="flex items-center justify-center w-12 h-12 bg-secondary/10 rounded-xl mb-4 group-hover:bg-secondary/20 transition-colors duration-300">
                  <Eye className="w-6 h-6 text-secondary group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Rastreio Oftalmológico</h3>
                <p className="text-gray-600 text-sm">
                  Avaliação da acuidade visual, campo visual e rastreio de patologias 
                  oculares relacionadas com a atividade profissional.
                </p>
              </div>

              {/* Análises */}
              <div className="group bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-indigo-200">
                <div className="flex items-center justify-center w-12 h-12 bg-secondary/10 rounded-xl mb-4 group-hover:bg-secondary/20 transition-colors duration-300">
                  <Microscope className="w-6 h-6 text-secondary group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Glicemia e Colesterol</h3>
                <p className="text-gray-600 text-sm">
                  Análises sanguíneas para monitorização de parâmetros metabólicos 
                  e prevenção de doenças cardiovasculares.
                </p>
              </div>

              {/* Espirometria */}
              <div className="group bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-indigo-200">
                <div className="flex items-center justify-center w-12 h-12 bg-secondary/10 rounded-xl mb-4 group-hover:bg-secondary/20 transition-colors duration-300">
                  <Zap className="w-6 h-6 text-secondary group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Espirometria</h3>
                <p className="text-gray-600 text-sm">
                  Avaliação da função pulmonar através de testes de capacidade 
                  e fluxo respiratório, essencial para exposições ocupacionais.
                </p>
              </div>

              {/* Audiometria */}
              <div className="group bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-indigo-200">
                <div className="flex items-center justify-center w-12 h-12 bg-secondary/10 rounded-xl mb-4 group-hover:bg-secondary/20 transition-colors duration-300">
                  <Headphones className="w-6 h-6 text-secondary group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Audiometria</h3>
                <p className="text-gray-600 text-sm">
                  Teste auditivo para avaliação da capacidade auditiva e prevenção 
                  de surdez profissional em ambientes ruidosos.
                </p>
              </div>

              {/* Urina */}
              <div className="group bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-indigo-200">
                <div className="flex items-center justify-center w-12 h-12 bg-secondary/10 rounded-xl mb-4 group-hover:bg-secondary/20 transition-colors duration-300">
                  <Clipboard className="w-6 h-6 text-secondary group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Urina Tipo II</h3>
                <p className="text-gray-600 text-sm">
                  Análise completa da urina para deteção de alterações renais 
                  e metabólicas relacionadas com exposições profissionais.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Ficha de Aptidão Section */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  Ficha de Aptidão
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  A Ficha de Aptidão é o documento que evidencia a aptidão do trabalhador 
                  para o desempenho das suas funções. De acordo com o art.º 110 da Lei n.º 102/2009, 
                  de 10 de setembro, face aos resultados dos exames médicos, o Médico do Trabalho 
                  preenche e assina a respetiva ficha de aptidão.
                </p>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-secondary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-gray-600">
                      <strong>Apto:</strong> Pode exercer a função sem restrições
                    </p>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.864-.833-2.634 0L4.18 16.5c-.77.833.192 2.5 1.732 2.5z" />
                      </svg>
                    </div>
                    <p className="text-gray-600">
                      <strong>Apto com restrições:</strong> Pode trabalhar com certas limitações
                    </p>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </div>
                    <p className="text-gray-600">
                      <strong>Inapto:</strong> Não pode exercer a função específica
                    </p>
                  </div>
                </div>

                <div className="bg-secondary p-4 rounded-lg border-l-4 border-secondary">
                  <p className="text-sm text-white">
                    <strong>Nota Legal:</strong> Se o resultado do exame revelar inaptidão, 
                    o médico do trabalho deve indicar, se justificado, outras funções que 
                    o trabalhador possa desempenhar.
                  </p>
                </div>
              </div>
              
              <div className="flex justify-center">
                <div className="bg-white p-8 rounded-xl shadow-2xl border border-gray-200 max-w-md">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">Ficha de Aptidão</h3>
                    <p className="text-sm text-gray-500">Documento oficial obrigatório</p>
                  </div>
                  
                  <div className="space-y-3 text-sm text-gray-600">
                    <div className="flex justify-between border-b pb-2">
                      <span>Trabalhador:</span>
                      <span className="font-medium">João Silva</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span>Empresa:</span>
                      <span className="font-medium">Exemplo Lda.</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span>Exame:</span>
                      <span className="font-medium">Periódico</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span>Resultado:</span>
                      <span className="font-medium text-green-600">APTO</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Próximo Exame:</span>
                      <span className="font-medium">Janeiro 2026</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mobile Health Section */}
        <section className="bg-gray-50 py-16 md:py-20 mx-6 md:mx-8 rounded-3xl mb-8">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  Flexibilidade e Conveniência
                </h2>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  A MediSigma oferece soluções flexíveis para atender às necessidades da sua empresa,
                  disponibilizando modernas unidades móveis de saúde para efetuar consultas e exames
                  diretamente no seu local de trabalho, em qualquer ponto do país.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span>Redução de custos e tempo de deslocação</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span>Minimização do impacto na produção</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span>Cobertura nacional de Norte a Sul do país</span>
                  </li>
                </ul>
              </div>
              <div className="flex justify-center">
                <Image 
                  src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                  alt="Unidade móvel de medicina do trabalho MediSigma" 
                  width={500} 
                  height={400} 
                  className="rounded-lg shadow-xl"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  Vantagens da Medicina no Trabalho
                </h2>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  Investir na saúde ocupacional é fundamental para o sucesso e sustentabilidade 
                  de qualquer empresa. Um serviço de medicina do trabalho eficaz, em conjunto com a <Link href="/servicos/seguranca-no-trabalho" className="text-secondary font-semibold hover:underline">Segurança no Trabalho</Link>, oferece inúmeros benefícios.
                </p>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Cumprimento Legal</h3>
                      <p className="text-gray-600">Garantimos o cumprimento de todas as obrigações legais em matéria de vigilância da saúde dos trabalhadores.</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Redução do Absentismo</h3>
                      <p className="text-gray-600">A deteção precoce de problemas de saúde contribui para a redução significativa das ausências por doença.</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Melhoria da Produtividade</h3>
                      <p className="text-gray-600">Trabalhadores saudáveis são mais produtivos e apresentam melhor desempenho profissional.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-center">
                <Image 
                  src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                  alt="Benefícios da medicina no trabalho para empresas" 
                  width={500} 
                  height={400} 
                  className="rounded-lg shadow-xl"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Como Funciona o Nosso Processo
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Um processo estruturado e eficiente para garantir a melhor vigilância 
                da saúde dos seus colaboradores.
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-secondary text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  1
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Avaliação Inicial</h3>
                <p className="text-gray-600 text-sm">Análise das necessidades da empresa e identificação dos riscos profissionais.</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-secondary text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  2
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Planeamento</h3>
                <p className="text-gray-600 text-sm">Desenvolvimento de um programa personalizado de vigilância da saúde.</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-secondary text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  3
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Execução</h3>
                <p className="text-gray-600 text-sm">Realização dos exames médicos conforme plano estabelecido.</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-secondary text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  4
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Relatório</h3>
                <p className="text-gray-600 text-sm">Entrega de relatórios detalhados e recomendações de melhoria.</p>
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
                  todos os serviços de medicina do trabalho.
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
                    href="https://wa.me/351938698260?text=Olá%2C%20estava%20no%20vosso%20website%20e%20gostaria%20de%20ter%20mais%20informações%20sobre%20Medicina%20no%20Trabalho." 
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

        {/* FAQ Section */}
        <section className="py-16 md:py-20 bg-gray-50 mx-6 md:mx-8 rounded-3xl mb-8">
          <div className="container mx-auto px-6 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
              Perguntas Frequentes
            </h2>
            
            <div className="space-y-6">
              <details className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <summary className="font-semibold text-gray-900 cursor-pointer text-lg">
                  Quem deve realizar exames de medicina no trabalho?
                </summary>
                <p className="mt-4 text-gray-600">
                  Todos os trabalhadores por conta de outrem devem realizar exames de medicina no trabalho, 
                  conforme estabelecido no Código do Trabalho e na Lei n.º 102/2009.
                </p>
              </details>

              <details className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <summary className="font-semibold text-gray-900 cursor-pointer text-lg">
                  Com que frequência devem ser realizados os exames periódicos?
                </summary>
                <p className="mt-4 text-gray-600">
                  A periodicidade varia conforme o tipo de atividade e riscos profissionais, 
                  podendo ser anual, bienal ou com intervalos específicos definidos pelo médico do trabalho.
                </p>
              </details>

              <details className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <summary className="font-semibold text-gray-900 cursor-pointer text-lg">
                  O que acontece se um trabalhador for considerado inapto?
                </summary>
                <p className="mt-4 text-gray-600">
                  Em caso de inaptidão, o médico do trabalho emite recomendações que podem incluir 
                  adaptação do posto de trabalho, mudança de função ou outras medidas adequadas.
                </p>
              </details>

              <details className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <summary className="font-semibold text-gray-900 cursor-pointer text-lg">
                  Os exames são obrigatórios para a empresa?
                </summary>
                <p className="mt-4 text-gray-600">
                  Sim, é obrigação legal da entidade empregadora assegurar a vigilância da saúde 
                  dos trabalhadores através de exames de medicina no trabalho.
                </p>
              </details>
            </div>
          </div>
        </section>
      </main>
    </>
  );
} 