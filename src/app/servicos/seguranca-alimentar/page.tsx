import Image from 'next/image'
import { Metadata } from 'next'
import { FileText, BookOpen, ClipboardCheck, AlertTriangle, FileWarning, Search, Wrench, ShieldCheck, Award, CheckCircle, Monitor, CheckSquare, Archive } from 'lucide-react'
import Link from 'next/link'
import { siteConfig } from "@/lib/config";
import ContactForm from '@/components/ContactForm'

export const metadata: Metadata = {
  title: "Segurança Alimentar | Sistemas HACCP e Consultoria | MediSigma",
  description: "Serviços especializados de Segurança Alimentar com implementação de sistemas HACCP, auditorias, formação e análises laboratoriais. Cumprimento da legislação obrigatória desde 2006.",
  keywords: "segurança alimentar, HACCP, sistema segurança alimentar, auditoria alimentar, análises microbiológicas, higiene alimentar, controlo qualidade alimentar, formação HACCP, consultoria alimentar",
  openGraph: {
    title: "Segurança Alimentar | Sistemas HACCP e Consultoria | MediSigma",
    description: "Implementação de sistemas HACCP e consultoria em segurança alimentar para empresas do setor alimentar.",
    type: "website",
    locale: "pt_PT",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/servicos/seguranca-alimentar",
  }
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "MediSigma - Segurança Alimentar",
  "description": "Serviços especializados de Segurança Alimentar com implementação de sistemas HACCP",
  "url": "https://medisigma.pt/servicos/seguranca-alimentar",
  "serviceType": [
    "Implementação HACCP",
    "Auditorias Alimentares",
    "Formação em Segurança Alimentar",
    "Análises Microbiológicas",
    "Consultoria Alimentar"
  ],
  "areaServed": "Portugal",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "PT"
  }
};

export default function SegurancaAlimentarPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="min-h-screen bg-white flex flex-col divide-y divide-border">
        {/* Hero Section */}
        <section className="relative py-16 md:py-24 mx-4 md:mx-8 rounded-3xl mb-8">
          <div className="absolute inset-0 -z-10">
            <div className="animated-hero-background absolute inset-0 h-full w-full [background:radial-gradient(125%_125%_at_50%_10%,var(--background)_40%,var(--secondary)_100%)] rounded-3xl"></div>
          </div>
          <div className="container mx-auto px-6 md:px-8 max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
              <div>
                <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                  Segurança Alimentar
                </h1>
                <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed">
                  Implementamos o sistema HACCP (Análise de Perigos e Pontos Críticos de Controlo), um sistema preventivo que dota a sua empresa dos meios e procedimentos adequados para garantir a total segurança e higiene dos produtos alimentares que comercializa.
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
                  src="/images/uploads/servicos/seguranca-alimentar-hero.png"
                  alt="Laboratório de segurança alimentar e controlo de qualidade"
                  width={500}
                  height={400}
                  className="rounded-lg shadow-xl"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* Principles Section */}
        <section className="py-16 md:py-20 mx-4 md:mx-0">
          <div className="container mx-auto px-6 md:px-8 max-w-6xl">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4 md:mb-6">
                O nosso sistema HACCP baseia-se nos 7 princípios fundamentais
                para garantir a máxima segurança em toda a cadeia alimentar.
              </h2>
              <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
                O sistema HACCP (Hazard Analysis and Critical Control Points – Análises de Perigos e
                Controlo de Pontos Críticos) é obrigatório desde 2006 e baseia-se na segurança dos
                alimentos produzidos, identificando perigos específicos e aplicando medidas necessárias.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {[
                { icon: AlertTriangle, title: "Análise de Perigos" },
                { icon: FileWarning, title: "Identificação de PCCs" },
                { icon: Search, title: "Estabelecimento de Limites Críticos" },
                { icon: Monitor, title: "Monitorização dos PCCs" },
                { icon: ClipboardCheck, title: "Estabelecimento de Ações Corretivas" },
                { icon: CheckSquare, title: "Procedimentos de Verificação" },
                { icon: Archive, title: "Documentação e Registos" }
              ].map((principle, index) => {
                const Icon = principle.icon;
                return (
                  <div key={index} className="text-center p-6 bg-white rounded-xl shadow-sm border border-border">
                    <div className="w-16 h-16 bg-secondary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-8 h-8 text-secondary" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{principle.title}</h3>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="bg-accent py-16 md:py-20 mx-4 md:mx-8 rounded-3xl mb-8">
          <div className="container mx-auto px-6 md:px-8 max-w-6xl">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4 md:mb-6">
                Implementação de Sistemas de Autocontrolo/HACCP
              </h2>
              <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
                O nosso serviço cumpre a legislação em vigor, nomeadamente o Regulamento (CE) n.º 852/2004, e inclui um acompanhamento completo em todas as fases do processo:
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              <div className="group bg-white rounded-xl p-6 md:p-8 shadow-sm hover:shadow-md transition-all duration-300 border border-border hover:border-secondary/20">
                <div className="flex items-center justify-center w-12 h-12 bg-secondary/10 rounded-xl mb-4 group-hover:bg-secondary/20 transition-colors duration-300">
                  <Search className="w-6 h-6 text-secondary group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-4">Levantamento Inicial</h4>
                <p className="text-gray-600">
                  Análise detalhada das instalações e entrega de um dossier de apoio com lista de verificação e relatório inicial.
                </p>
              </div>

              <div className="group bg-white rounded-xl p-6 md:p-8 shadow-sm hover:shadow-md transition-all duration-300 border border-border hover:border-secondary/20">
                <div className="flex items-center justify-center w-12 h-12 bg-secondary/10 rounded-xl mb-4 group-hover:bg-secondary/20 transition-colors duration-300">
                  <BookOpen className="w-6 h-6 text-secondary group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-4">Formação aos Funcionários</h4>
                <p className="text-gray-600">
                  Ações de formação em Higiene e Segurança Alimentar para toda a equipa, garantindo as melhores práticas.
                </p>
              </div>

              <div className="group bg-white rounded-xl p-6 md:p-8 shadow-sm hover:shadow-md transition-all duration-300 border border-border hover:border-secondary/20">
                <div className="flex items-center justify-center w-12 h-12 bg-secondary/10 rounded-xl mb-4 group-hover:bg-secondary/20 transition-colors duration-300">
                  <Wrench className="w-6 h-6 text-secondary group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-4">Elaboração de Planos HACCP</h4>
                <p className="text-gray-600">
                  Visitas para recolha de dados e elaboração de planos de HACCP personalizados para a sua realidade.
                </p>
              </div>

              <div className="group bg-white rounded-xl p-6 md:p-8 shadow-sm hover:shadow-md transition-all duration-300 border border-border hover:border-secondary/20">
                <div className="flex items-center justify-center w-12 h-12 bg-secondary/10 rounded-xl mb-4 group-hover:bg-secondary/20 transition-colors duration-300">
                  <ClipboardCheck className="w-6 h-6 text-secondary group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-4">Visitas e Análises</h4>
                <p className="text-gray-600">
                  Realizamos visitas simples de verificação e a recolha de análises para controlo de qualidade.
                </p>
              </div>

              <div className="group bg-white rounded-xl p-6 md:p-8 shadow-sm hover:shadow-md transition-all duration-300 border border-border hover:border-secondary/20">
                <div className="flex items-center justify-center w-12 h-12 bg-secondary/10 rounded-xl mb-4 group-hover:bg-secondary/20 transition-colors duration-300">
                  <ShieldCheck className="w-6 h-6 text-secondary group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-4">Auditoria de Verificação</h4>
                <p className="text-gray-600">
                  Auditoria final para verificação e validação de todo o sistema HACCP implementado.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 md:py-20 mx-4 md:mx-0">
          <div className="container mx-auto px-6 md:px-8 max-w-6xl">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4 md:mb-6">
                Benefícios de um Sistema HACCP Eficaz
              </h2>
              <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
                Implementar um sistema HACCP robusto não só garante a conformidade legal,
                mas também protege a sua marca e a saúde dos seus consumidores. Para uma proteção completa,
                é crucial integrar este sistema com uma <Link href="/servicos/formacao-certificada" className="text-secondary font-semibold hover:underline">Formação Certificada</Link> contínua
                e um plano de <Link href="/servicos/controlo-pragas" className="text-secondary font-semibold hover:underline">Controlo de Pragas</Link> eficaz.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              <div className="group bg-white rounded-xl p-6 md:p-8 shadow-sm hover:shadow-md transition-all duration-300 border border-border">
                <div className="flex items-center justify-center w-12 h-12 bg-secondary/10 rounded-xl mb-4 group-hover:bg-secondary/20 transition-colors duration-300">
                  <ShieldCheck className="w-6 h-6 text-secondary group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Segurança do Consumidor</h4>
                <p className="text-gray-600 text-sm">
                  Garante a produção e fornecimento de alimentos seguros e de alta qualidade.
                </p>
              </div>

              <div className="group bg-white rounded-xl p-6 md:p-8 shadow-sm hover:shadow-md transition-all duration-300 border border-border">
                <div className="flex items-center justify-center w-12 h-12 bg-secondary/10 rounded-xl mb-4 group-hover:bg-secondary/20 transition-colors duration-300">
                  <FileText className="w-6 h-6 text-secondary group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Conformidade Legal</h4>
                <p className="text-gray-600 text-sm">
                  Assegura o cumprimento de toda a legislação nacional e europeia em vigor.
                </p>
              </div>

              <div className="group bg-white rounded-xl p-6 md:p-8 shadow-sm hover:shadow-md transition-all duration-300 border border-border">
                <div className="flex items-center justify-center w-12 h-12 bg-secondary/10 rounded-xl mb-4 group-hover:bg-secondary/20 transition-colors duration-300">
                  <Award className="w-6 h-6 text-secondary group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Reputação da Marca</h4>
                <p className="text-gray-600 text-sm">
                  Melhora a perceção da sua marca junto dos consumidores e parceiros.
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
                  Proteja o Seu Negócio e os Seus Clientes
                </h2>
                <p className="text-base md:text-lg text-primary-foreground/90 max-w-3xl mx-auto mb-8">
                  A segurança alimentar não é uma opção, é uma obrigação. Contacte a MediSigma para uma avaliação completa e descubra como podemos ajudar a sua empresa a implementar um sistema HACCP eficaz e em conformidade com a lei.
                </p>

                <div className="space-y-4 mb-8 text-blue-100">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-white" />
                    <span>Proposta personalizada e sem compromisso</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-white" />
                    <span>Resposta rápida em 24 horas úteis</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-white" />
                    <span>Soluções adaptadas ao seu setor alimentar</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href={`https://wa.me/${siteConfig.links.whatsapp}?text=Olá%2C%20estava%20no%20vosso%20website%20e%20gostaria%20de%20ter%20mais%20informações%20sobre%20Segurança%20Alimentar.`}
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
                pagina="Serviço Segurança Alimentar"
                fonte="servicos/seguranca-alimentar"
                servicoDefault="Segurança Alimentar"
              />
            </div>
          </div>
        </section>
      </main>
    </>
  );
} 