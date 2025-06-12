import React from 'react';
import Image from 'next/image';
import { Metadata } from 'next';
import { HeartPulse, Shield, Users, CheckCircle, FileText, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Formação Certificada DGERT | Cursos de Segurança e Saúde | MediSigma',
  description: 'Formação certificada pela DGERT. Cursos em Segurança no Trabalho, Saúde, Proteção de Pessoas e Bens. Planos de formação à medida para empresas. Qualifique a sua equipa.',
  keywords: 'formação certificada, DGERT, cursos segurança no trabalho, cursos primeiros socorros, formação HACCP, segurança e higiene no trabalho, medidas de autoproteção, MediSigma',
  openGraph: {
    title: 'Formação Certificada DGERT | MediSigma',
    description: 'Formação profissional certificada e à medida das necessidades da sua empresa.',
    type: "website",
    locale: "pt_PT",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/servicos/formacao-certificada",
  }
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "name": "MediSigma - Formação Certificada",
  "url": "https://medisigma.pt/servicos/formacao-certificada",
  "description": "O Grupo MEDISIGMA elabora ações de formação específicas, de acordo com as necessidades de formação apresentadas pelas entidades solicitadoras.",
  "knowsAbout": [
    "Segurança no Trabalho",
    "Primeiros Socorros",
    "Proteção de Pessoas e Bens",
    "Higiene no Trabalho"
  ]
};

export default function FormacaoCertificadaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <main className="min-h-screen bg-white flex flex-col divide-y divide-border">
        {/* Hero Section */}
        <section className="relative py-16 md:py-24 mx-4 md:mx-8 rounded-3xl mb-8">
          <div className="absolute inset-0">
            <div className="animated-hero-background absolute inset-0 -z-10 h-full w-full [background:radial-gradient(125%_125%_at_50%_10%,var(--background)_40%,var(--secondary)_100%)] rounded-3xl"></div>
          </div>
          <div className="container mx-auto px-6 md:px-8 max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
              <div>
                <div className="inline-block bg-white text-secondary font-semibold py-1 px-3 rounded-full text-sm mb-4 border border-border">
                    Entidade Formadora Certificada DGERT
                </div>
                <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                  Formação Certificada à Medida
                </h1>
                <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed">
                  Elaboramos ações de formação específicas de acordo com as necessidades da sua empresa. Para além dos cursos previstos no nosso plano, desenhamos programas para ir ao encontro das suas metas.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/contact" className="bg-secondary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-secondary/90 transition-colors text-center">
                    Pedir Proposta
                  </Link>
                  <button className="border-2 border-secondary text-secondary px-8 py-3 rounded-lg font-semibold hover:bg-secondary/10 transition-colors">
                    Ver Cursos
                  </button>
                </div>
              </div>
              <div className="flex justify-center">
                <Image 
                  src="https://images.unsplash.com/photo-1543269865-cbf427effbad?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                  alt="Sessão de formação profissional numa empresa" 
                  width={500} 
                  height={400} 
                  className="rounded-lg shadow-xl"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* Certified Areas Section */}
        <section className="py-16 md:py-20 mx-4 md:mx-0">
          <div className="container mx-auto px-6 md:px-8 max-w-6xl">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4 md:mb-6">
                Áreas de Formação Certificadas pela DGERT
              </h2>
              <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
                Somos certificados em 3 áreas fundamentais para a saúde e segurança de qualquer organização. A nossa formação é um complemento essencial para serviços como a <Link href="/servicos/seguranca-no-trabalho" className="text-secondary font-semibold hover:underline">Segurança no Trabalho</Link> e a <Link href="/servicos/seguranca-alimentar" className="text-secondary font-semibold hover:underline">Segurança Alimentar</Link>, garantindo a máxima qualidade e reconhecimento.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6 md:gap-8">
              {[
                { icon: HeartPulse, area: "729", title: "Saúde", description: "Formações essenciais para a resposta a emergências médicas e promoção do bem-estar." },
                { icon: Users, area: "861", title: "Proteção de Pessoas e Bens", description: "Cursos focados na prevenção de riscos e na organização de equipas de emergência." },
                { icon: Shield, area: "862", title: "Segurança e Higiene", description: "O mais vasto leque de cursos para garantir a conformidade e um ambiente de trabalho seguro." },
              ].map((area) => {
                const Icon = area.icon;
                return (
                  <div key={area.title} className="group bg-white rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-secondary/20">
                    <div className="flex items-center justify-center w-16 h-16 bg-secondary/10 rounded-2xl mb-6 group-hover:bg-secondary/20 transition-colors duration-300">
                      <Icon className="w-8 h-8 text-secondary group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <span className="block text-sm font-semibold text-secondary mb-2">Área {area.area}</span>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">{area.title}</h3>
                    <p className="text-gray-600">{area.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Detailed Courses Section */}
        <section className="bg-accent py-16 md:py-20 mx-4 md:mx-8 rounded-3xl mb-8">
          <div className="container mx-auto px-6 md:px-8 max-w-7xl">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4 md:mb-6">
                O Nosso Catálogo de Cursos
              </h2>
              <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
                Explore a nossa oferta formativa. As formações assinaladas com * podem ser ajustadas às necessidades específicas da sua empresa.
              </p>
            </div>
            <div className="space-y-8 md:space-y-12">
              {/* Area 729 */}
              <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-border">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Área 729 – Saúde</h3>
                <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-3">
                  {["Primeiros Socorros*", "Primeiros Socorros Pediátricos*", "Prevenção de Riscos Psicossociais: Comunicação"].map(course => (
                    <li key={course} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-secondary mr-3 mt-1 flex-shrink-0" />
                      <span>{course.replace('*', '')}{course.endsWith('*') && <span className="text-secondary">*</span>}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Area 861 */}
              <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-border">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Área 861 – Proteção de Pessoas e Bens</h3>
                <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-3">
                  {["Ergonomia do Trabalho", "Organização de Emergência*"].map(course => (
                    <li key={course} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-secondary mr-3 mt-1 flex-shrink-0" />
                      <span>{course.replace('*', '')}{course.endsWith('*') && <span className="text-secondary">*</span>}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Area 862 */}
              <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-border">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Área 862 – Segurança e Higiene</h3>
                <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-3">
                  {[
                    "Introdução à Higiene e Segurança no Trabalho", "Trabalho em Altura*", "Como Evitar e Combater um Incêndio no Local de Trabalho*",
                    "Avaliação de Riscos no Local de Trabalho", "Movimentação Manual e/ou Mecânica de Cargas", "Álcool e Tabagismo",
                    "Acidentes de Trabalho", "Stress no Trabalho", "Segurança Contra Incêndio em Edifícios",
                    "Segurança na Manipulação e Armazenagem de Substâncias Químicas Perigosas", "Sinalização de Segurança",
                    "Exposição ao Ruído no Local de Trabalho", "Equipamento de Proteção Individual", "Exposição à Sílica no Local de Trabalho",
                    "Segurança na Construção Civil", "Segurança na Montagem e Utilização de Andaimes*"
                  ].map(course => (
                    <li key={course} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-secondary mr-3 mt-1 flex-shrink-0" />
                      <span>{course.replace('*', '')}{course.endsWith('*') && <span className="text-secondary">*</span>}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 md:py-20 mx-4 md:mx-0">
          <div className="container mx-auto px-6 md:px-8 max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
              <div>
                <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4 md:mb-6">
                  Vantagens da Formação Certificada
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <FileText className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Cumprimento da Legislação</h3>
                      <p className="text-gray-600">Garanta que a sua empresa cumpre as obrigações legais de formação dos trabalhadores.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <TrendingUp className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Aumento da Produtividade</h3>
                      <p className="text-gray-600">Colaboradores mais qualificados são mais eficientes e contribuem para a redução de acidentes.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <Shield className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Flexibilidade Total</h3>
                      <p className="text-gray-600">As ações de formação podem ser realizadas nas nossas instalações ou nas da sua empresa.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-center">
                <Image 
                  src="https://images.unsplash.com/photo-1573496130407-57329f01f769?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                  alt="Equipa de trabalho a celebrar sucesso após formação" 
                  width={500} 
                  height={400} 
                  className="rounded-lg shadow-xl"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative z-10 bg-secondary py-16 md:py-20 mx-4 md:mx-8 rounded-3xl mb-8">
          <div className="container mx-auto px-6 md:px-8 max-w-5xl">
            <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
              <div className="text-white">
                <h2 className="text-2xl md:text-4xl font-bold mb-4 md:mb-6">
                  Vamos Criar o Seu Plano de Formação?
                </h2>
                <p className="text-base md:text-xl text-blue-100 mb-8 leading-relaxed">
                  Com base no nosso plano ou em necessidades específicas, apresentamos uma proposta concreta que inclui programa, duração e custos.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a 
                    href="https://wa.me/351938698260?text=Olá%2C%20estava%20no%20vosso%20website%20e%20gostaria%20de%20ter%20mais%20informações%20sobre%20Formação%20Certificada." 
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
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">Peça uma Proposta</h3>
                <form className="space-y-4">
                  <div>
                    <label htmlFor="empresa-formacao" className="block text-sm font-medium text-gray-700 mb-2">Nome da Empresa *</label>
                    <input type="text" id="empresa-formacao" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent" placeholder="A sua empresa" />
                  </div>
                  <div>
                    <label htmlFor="email-formacao" className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                    <input type="email" id="email-formacao" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent" placeholder="empresa@exemplo.pt" />
                  </div>
                  <div>
                    <label htmlFor="mensagem-formacao" className="block text-sm font-medium text-gray-700 mb-2">Áreas de Interesse</label>
                    <textarea id="mensagem-formacao" rows={3} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent" placeholder="Ex: Primeiros socorros, Trabalho em altura..."></textarea>
                  </div>
                  <button type="submit" className="w-full bg-secondary text-white py-3 px-6 rounded-lg font-semibold hover:bg-secondary/90 transition-colors">Enviar Pedido</button>
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
                <summary className="font-semibold text-gray-900 cursor-pointer text-lg">A MediSigma é uma entidade formadora certificada?</summary>
                <p className="mt-4 text-gray-600">Sim, o Grupo MEDISIGMA é uma entidade formadora certificada pela DGERT (Direção-Geral do Emprego e das Relações de Trabalho) nas áreas de Saúde (729), Proteção de Pessoas e Bens (861) e Segurança e Higiene (862).</p>
              </details>
              <details className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <summary className="font-semibold text-gray-900 cursor-pointer text-lg">A formação pode ser realizada na minha empresa?</summary>
                <p className="mt-4 text-gray-600">Sim. As ações de formação poderão ser realizadas tanto nas nossas instalações como nas instalações das empresas clientes, oferecendo total flexibilidade.</p>
              </details>
              <details className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <summary className="font-semibold text-gray-900 cursor-pointer text-lg">É possível criar um curso que não está na vossa lista?</summary>
                <p className="mt-4 text-gray-600">Com certeza. Para além dos cursos previstos no nosso Plano, o Grupo MEDISIGMA elabora ações de formação específicas, de acordo com as necessidades de formação apresentadas pelos clientes. Contacte-nos para desenvolvermos uma solução à medida.</p>
              </details>
            </div>
          </div>
        </section>
      </main>
    </>
  );
} 