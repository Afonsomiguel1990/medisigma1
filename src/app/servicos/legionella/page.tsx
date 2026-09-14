import React from 'react';
import { Metadata } from 'next';
import { Droplet, ShieldCheck, Microscope, FileText, CheckCircle, Wind, Building, Thermometer, UserCheck } from 'lucide-react';
import Link from 'next/link';
import { siteConfig } from "@/lib/config";
import { ContactLink } from "@/components/custom/contact-link";
import ContactForm from '@/components/ContactForm';

export const metadata: Metadata = {
  title: 'Legionella: avaliação de risco e prevenção',
  description: 'Avaliação de risco, organização de planos e acompanhamento de Legionella conforme os equipamentos e redes da instalação. Peça uma proposta.',
  keywords: 'legionella, controlo legionella, prevenção legionella, análise de água legionella, lei 52/2018, doença dos legionários, planos de prevenção, DL 69/2023, despacho 1547/2022',
  openGraph: {
    title: 'Legionella: avaliação de risco e prevenção',
    description: 'Identificação dos sistemas, avaliação de risco e acompanhamento de medidas de prevenção de Legionella. O âmbito depende da instalação.',
    type: 'website',
    locale: 'pt_PT',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://www.medisigma.pt/servicos/legionella/',
  }
};

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    'serviceType': 'Controlo e Prevenção de Legionella',
    'provider': {
      '@type': 'Organization',
      'name': 'MediSigma',
      'url': 'https://www.medisigma.pt'
    },
    'name': 'Serviço de Prevenção de Legionella (PPCL)',
    'description': 'Avaliação de risco e apoio à prevenção de Legionella, com plano ou programa de manutenção conforme o enquadramento da instalação.',
    'url': 'https://www.medisigma.pt/servicos/legionella',
    'areaServed': {
      '@type': 'Country',
      'name': 'Portugal'
    }
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': [
      {
        '@type': 'Question',
        'name': 'Quem está obrigado a ter um Plano de Prevenção de Legionella?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'A obrigação depende dos equipamentos, redes e sistemas abrangidos pela Lei n.º 52/2018. É necessário distinguir o plano de prevenção e controlo dos programas de manutenção e limpeza aplicáveis a outras situações.'
        }
      },
      {
        '@type': 'Question',
        'name': 'Com que frequência devem ser feitas as análises à água?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'A frequência depende da tipologia do sistema, avaliação de risco e regime aplicável. Os pontos, parâmetros e frequências devem constar do plano ou programa definido para a instalação.'
        }
      },
      {
        '@type': 'Question',
        'name': 'O que acontece se for detetada Legionella na água?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'O resultado deve ser avaliado pelo responsável técnico segundo a classificação de risco e o regime aplicável. As medidas corretivas e comunicações dependem da instalação e dos resultados; devem ficar registadas.'
        }
      },
      {
        '@type': 'Question',
        'name': 'Qual a importância de trabalhar com um laboratório acreditado?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Ao selecionar o laboratório, confirme se o âmbito de acreditação cobre o ensaio e método necessários. A escolha deve corresponder aos requisitos aplicáveis à análise.'
        }
      }
    ]
  }
];

export default function LegionellaPage() {
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
                  Controlo e Prevenção de Legionella
                </h1>
                <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed">
                  A Legionella é um problema de saúde pública com “uma clara relação causa-efeito com a colonização da água pela bactéria em sistemas de água de grandes edifícios”, segundo a Direção-Geral de Saúde. Desenvolvemos planos de prevenção para mitigar este risco.
                </p>
                <div className="flex justify-start">
                  <a
                    href="#cta-section"
                    className="bg-secondary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-secondary/90 transition-colors text-center cursor-pointer"
                  >
                    Fale connosco
                  </a>
                </div>
              </div>
              <div className="flex justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/uploads/servicos/legionella-recolher-amostra.png"
                  alt="Técnico a realizar colheita de água para análise de Legionella"
                  width={500}
                  height={400}
                  className="rounded-lg shadow-xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* What is Legionella Section */}
        <section className="py-16 md:py-20 mx-4 md:mx-0">
          <div className="container mx-auto px-6 md:px-8 max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
              <div>
                <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4 md:mb-6">
                  Onde se Encontra a Bactéria?
                </h2>
                <p className="text-base md:text-lg text-gray-600 mb-6">
                  A Legionella encontra-se em ambientes aquáticos naturais, como rios e lagos, mas pode colonizar sistemas de água artificiais, onde sobrevive por longos meses. A sua inalação através de aerossóis (gotículas de água) pode causar a &quot;Doença dos Legionários&quot;.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Wind className="w-6 h-6 text-secondary flex-shrink-0 mt-1" />
                    <p className="text-gray-600"><strong>Sistemas de Risco:</strong> Sistemas de ar condicionado (torres de arrefecimento, condensadores), água quente sanitária e fontes decorativas.</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Building className="w-6 h-6 text-secondary flex-shrink-0 mt-1" />
                    <p className="text-gray-600"><strong>Redes de Abastecimento:</strong> A bactéria pode isolar-se e sobreviver nas redes de abastecimento de água de edifícios.</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Droplet className="w-6 h-6 text-secondary flex-shrink-0 mt-1" />
                    <p className="text-gray-600"><strong>Pontos de Disseminação:</strong> Os pontos de maior risco de disseminação de aerossóis são as torneiras de água quente/fria e os chuveiros.</p>
                  </div>
                </div>
              </div>
              <div className="flex justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/uploads/servicos/micro-legionella.png"
                  alt="Imagem microscópica da bactéria Legionella"
                  width={500}
                  height={400}
                  className="rounded-lg shadow-xl"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>

        {/* How we act Section */}
        <section className="bg-accent py-16 md:py-20 mx-4 md:mx-8 rounded-3xl mb-8">
          <div className="container mx-auto px-6 md:px-8 max-w-6xl">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4 md:mb-6">
                Como Atuamos? O Nosso Plano de Ação
              </h2>
              <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
                Elaboramos e implementamos o Plano de Prevenção e Controlo de Legionella (PPCL),
                com âmbito definido a partir dos equipamentos e redes existentes e das obrigações aplicáveis à instalação.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              <div className="group bg-white rounded-xl p-6 md:p-8 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-indigo-200">
                <div className="flex items-center justify-center w-12 h-12 bg-secondary/10 rounded-xl mb-4 group-hover:bg-secondary/20 transition-colors duration-300">
                  <FileText className="w-6 h-6 text-secondary group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Elaboração do PPCL</h3>
                <p className="text-gray-600 text-sm">
                  Avaliamos o enquadramento da instalação para definir o plano de prevenção e controlo ou programa de manutenção aplicável.
                </p>
              </div>
              <div className="group bg-white rounded-xl p-6 md:p-8 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-indigo-200">
                <div className="flex items-center justify-center w-12 h-12 bg-secondary/10 rounded-xl mb-4 group-hover:bg-secondary/20 transition-colors duration-300">
                  <ShieldCheck className="w-6 h-6 text-secondary group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Auditoria e Pontos Críticos</h3>
                <p className="text-gray-600 text-sm">
                  Realizamos o levantamento e a monitorização de pontos críticos, classificando o risco para definir medidas preventivas.
                </p>
              </div>
              <div className="group bg-white rounded-xl p-6 md:p-8 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-indigo-200">
                <div className="flex items-center justify-center w-12 h-12 bg-secondary/10 rounded-xl mb-4 group-hover:bg-secondary/20 transition-colors duration-300">
                  <Microscope className="w-6 h-6 text-secondary group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Colheita e Análise de Água</h3>
                <p className="text-gray-600 text-sm">
                  Organizamos a recolha e análise de amostras conforme o programa definido. O método, laboratório e âmbito dos ensaios devem ser confirmados na proposta.
                </p>
              </div>
              <div className="group bg-white rounded-xl p-6 md:p-8 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-indigo-200">
                <div className="flex items-center justify-center w-12 h-12 bg-secondary/10 rounded-xl mb-4 group-hover:bg-secondary/20 transition-colors duration-300">
                  <UserCheck className="w-6 h-6 text-secondary group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Aconselhamento Contínuo</h3>
                <p className="text-gray-600 text-sm">
                  Acompanhamos as atualizações legais para prestar um serviço de aconselhamento coerente e que assegura o cumprimento.
                </p>
              </div>
              <div className="group bg-white rounded-xl p-6 md:p-8 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-indigo-200">
                <div className="flex items-center justify-center w-12 h-12 bg-secondary/10 rounded-xl mb-4 group-hover:bg-secondary/20 transition-colors duration-300">
                  <Thermometer className="w-6 h-6 text-secondary group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Programa de Tratamento</h3>
                <p className="text-gray-600 text-sm">
                  Acompanhamos os procedimentos técnicos de realização do Programa de Monitorização e Tratamento da Qualidade da Água.
                </p>
              </div>
              <div className="group bg-white rounded-xl p-6 md:p-8 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-indigo-200">
                <div className="flex items-center justify-center w-12 h-12 bg-secondary/10 rounded-xl mb-4 group-hover:bg-secondary/20 transition-colors duration-300">
                  <Wind className="w-6 h-6 text-secondary group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Manutenção e Limpeza</h3>
                <p className="text-gray-600 text-sm">
                  Definimos e supervisionamos o programa de manutenção, limpeza e desinfeção dos sistemas de risco.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Legal Framework Section */}
        <section className="py-16 md:py-20 mx-4 md:mx-0">
          <div className="container mx-auto px-6 md:px-8 max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
              <div>
                <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4 md:mb-6">
                  Enquadramento Legal
                </h2>
                <p className="text-base md:text-lg text-gray-600 mb-6">
                  A legislação portuguesa estabelece um regime rigoroso para a prevenção e controlo da Legionella,
                  devendo o responsável confirmar quais as obrigações aplicáveis aos equipamentos e redes da sua instalação.
                </p>

                <div className="space-y-4 mb-6">
                  <div className="flex items-start space-x-3">
                    <FileText className="w-5 h-5 text-secondary flex-shrink-0 mt-1" />
                    <p className="text-gray-600">
                      <strong>Lei n.º 52/2018:</strong> Estabelece o regime de prevenção e controlo da bactéria Legionella.
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <FileText className="w-5 h-5 text-secondary flex-shrink-0 mt-1" />
                    <p className="text-gray-600">
                      <strong>Portaria n.º 25/2021:</strong> Define os critérios para a classificação do risco e as medidas a adotar.
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <FileText className="w-5 h-5 text-secondary flex-shrink-0 mt-1" />
                    <p className="text-gray-600">
                      <strong>Despacho n.º 1547/2022:</strong> Reforça a necessidade de levantamento de pontos críticos e da sua monitorização.
                    </p>
                  </div>
                </div>

                <div className="bg-secondary p-4 rounded-lg border-l-4 border-secondary">
                  <p className="text-sm text-white">
                    <strong>Nota Importante:</strong> As obrigações variam com os equipamentos, redes e sistemas. Confirme o enquadramento antes de definir o plano ou programa de manutenção.
                  </p>
                </div>
              </div>

              <div className="flex justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/uploads/servicos/plano-legionella.png"
                  alt="Plano de Prevenção e Controlo de Legionella"
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
        <section id="cta-section" className="relative z-10 bg-secondary py-16 md:py-20 mx-4 md:mx-8 rounded-3xl mb-8">
          <div className="container mx-auto px-6 max-w-5xl">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="text-white">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Pedido de Proposta
                </h2>
                <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                  Indique o tipo de edifício e os sistemas de água existentes. A informação permite definir a avaliação e a documentação necessárias.
                </p>

                <div className="space-y-4 mb-8 text-blue-100">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-white" />
                    <span>Proposta personalizada e sem compromisso</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-white" />
                    <span>Contacto para avaliar a instalação</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-white" />
                    <span>Soluções adaptadas a edifícios, hotéis, hospitais, e indústria</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <ContactLink type="whatsapp"
                    href={`https://wa.me/${siteConfig.links.whatsapp}?text=Olá%2C%20estava%20no%20vosso%20website%20e%20gostaria%20de%20ter%20mais%20informações%20sobre%20Controlo%20e%20Prevenção%20de%20Legionella.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white text-secondary px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.515z" />
                    </svg>
                    WhatsApp
                  </ContactLink>
                  <ContactLink href="tel:241331504" type="phone" pagina="Serviço Legionella" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-secondary transition-colors text-center">
                    241 331 504
                  </ContactLink>
                </div>
              </div>

              <ContactForm
                pagina="Serviço Legionella"
                fonte="servicos/legionella"
                servicoDefault="Legionella"
              />
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 md:py-20 bg-gray-50 mx-4 md:mx-8 rounded-3xl mb-8">
          <div className="container mx-auto px-6 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
              Perguntas Frequentes
            </h2>

            <div className="space-y-6">
              <details className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <summary className="font-semibold text-gray-900 cursor-pointer text-lg">
                  Quem está obrigado a ter um Plano de Prevenção de Legionella?
                </summary>
                <p className="mt-4 text-gray-600">
                  A obrigação depende dos equipamentos, redes e sistemas abrangidos. O plano de prevenção e controlo e os programas de manutenção não têm o mesmo âmbito. Consulte a <Link href="/#enquadramento-legal" className="text-secondary hover:underline">Lei n.º 52/2018</Link> para mais detalhes.
                </p>
              </details>

              <details className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <summary className="font-semibold text-gray-900 cursor-pointer text-lg">
                  Com que frequência devem ser feitas as análises à água?
                </summary>
                <p className="mt-4 text-gray-600">
                  A frequência depende da tipologia do sistema, avaliação de risco e regime aplicável. Os pontos, parâmetros e frequências devem constar do plano ou programa definido para a instalação.
                </p>
              </details>

              <details className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <summary className="font-semibold text-gray-900 cursor-pointer text-lg">
                  O que acontece se for detetada Legionella na água?
                </summary>
                <p className="mt-4 text-gray-600">
                  O resultado deve ser avaliado pelo responsável técnico segundo a classificação de risco e o regime aplicável. As medidas corretivas e comunicações dependem da instalação e dos resultados; devem ficar registadas.
                </p>
              </details>

              <details className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <summary className="font-semibold text-gray-900 cursor-pointer text-lg">
                  Qual a importância de trabalhar com um laboratório acreditado?
                </summary>
                <p className="mt-4 text-gray-600">
                  Confirme se o âmbito de acreditação do laboratório cobre o ensaio e o método necessários. A avaliação pode articular-se com outros serviços, como a <Link href="/servicos/seguranca-alimentar" className="text-secondary hover:underline">Segurança Alimentar</Link>.
                </p>
              </details>
            </div>
          </div>
        </section>
      </main>
    </>
  );
} 