import React from 'react';
import { Metadata } from 'next';
import { Droplet, Stethoscope, GraduationCap, Flame, Bug } from 'lucide-react';

export const metadata: Metadata = {
  title: 'FAQs - Perguntas Frequentes | Medisigma',
  description: 'Encontre respostas às perguntas mais frequentes sobre os serviços de saúde ocupacional, segurança no trabalho, formação certificada e outros serviços da Medisigma.',
};

export default function FAQsPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 mx-6 md:mx-8 rounded-3xl mb-8">
        <div className="absolute inset-0">
          <div className="animated-hero-background absolute inset-0 -z-10 h-full w-full [background:radial-gradient(125%_125%_at_50%_10%,var(--background)_40%,var(--secondary)_100%)] rounded-3xl"></div>
        </div>
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Perguntas Frequentes
          </h1>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Encontre aqui respostas para as dúvidas mais comuns sobre os serviços da Medisigma. Se não encontrar o que procura, não hesite em nos contactar.
          </p>
        </div>
      </section>

      {/* FAQ Categories */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-6 max-w-6xl">
          
          {/* Legionella */}
          <div className="mb-16">
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                <Droplet className="w-6 h-6 text-blue-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Controlo e Prevenção de Legionella</h2>
            </div>
            <div className="space-y-6">
              <details className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <summary className="font-semibold text-gray-900 cursor-pointer text-lg">
                  Quem está obrigado a ter um Plano de Prevenção de Legionella?
                </summary>
                <p className="mt-4 text-gray-600">
                  Todas as entidades com edifícios de acesso ao público que possuam sistemas de risco, como hotéis, centros comerciais, hospitais, termas, complexos desportivos e estruturas residenciais para pessoas idosas. Consulte a Lei n.º 52/2018 para mais detalhes.
                </p>
              </details>

              <details className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <summary className="font-semibold text-gray-900 cursor-pointer text-lg">
                  Com que frequência devem ser feitas as análises à água?
                </summary>
                <p className="mt-4 text-gray-600">
                  A frequência das análises depende da avaliação de risco. Para redes prediais, a periodicidade é, no mínimo, anual. Para torres de arrefecimento e sistemas de maior risco, a frequência é trimestral ou definida de acordo com o plano específico.
                </p>
              </details>

              <details className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <summary className="font-semibold text-gray-900 cursor-pointer text-lg">
                  O que acontece se for detetada Legionella na água?
                </summary>
                <p className="mt-4 text-gray-600">
                  Em caso de deteção, devem ser implementadas medidas corretivas imediatas, que podem incluir um choque térmico ou químico (desinfeção) no sistema. A situação deve ser comunicada às autoridades de saúde competentes.
                </p>
              </details>

              <details className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <summary className="font-semibold text-gray-900 cursor-pointer text-lg">
                  Qual a importância de trabalhar com um laboratório acreditado?
                </summary>
                <p className="mt-4 text-gray-600">
                  Trabalhar com um laboratório acreditado garante que as análises são realizadas segundo normas de qualidade rigorosas e reconhecidas, assegurando a fiabilidade e validade dos resultados, aspeto fundamental para o cumprimento legal e para a eficácia das medidas de controlo.
                </p>
              </details>
            </div>
          </div>

          {/* Medicina no Trabalho */}
          <div className="mb-16">
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                <Stethoscope className="w-6 h-6 text-green-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Medicina no Trabalho</h2>
            </div>
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

          {/* Formação Certificada */}
          <div className="mb-16">
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                <GraduationCap className="w-6 h-6 text-purple-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Formação Certificada</h2>
            </div>
            <div className="space-y-6">
              <details className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <summary className="font-semibold text-gray-900 cursor-pointer text-lg">
                  A Medisigma é uma entidade formadora certificada?
                </summary>
                <p className="mt-4 text-gray-600">
                  Sim, o Grupo MEDISIGMA é uma entidade formadora certificada pela DGERT (Direção-Geral do Emprego e das Relações de Trabalho) nas áreas de Saúde (729), Proteção de Pessoas e Bens (861) e Segurança e Higiene (862).
                </p>
              </details>

              <details className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <summary className="font-semibold text-gray-900 cursor-pointer text-lg">
                  A formação pode ser realizada na minha empresa?
                </summary>
                <p className="mt-4 text-gray-600">
                  Sim. As ações de formação poderão ser realizadas tanto nas nossas instalações como nas instalações das empresas clientes, oferecendo total flexibilidade.
                </p>
              </details>

              <details className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <summary className="font-semibold text-gray-900 cursor-pointer text-lg">
                  É possível criar um curso que não está na vossa lista?
                </summary>
                <p className="mt-4 text-gray-600">
                  Com certeza. Para além dos cursos previstos no nosso Plano, o Grupo MEDISIGMA elabora ações de formação específicas, de acordo com as necessidades de formação apresentadas pelos clientes. Contacte-nos para desenvolvermos uma solução à medida.
                </p>
              </details>
            </div>
          </div>

          {/* Segurança Contra Incêndios */}
          <div className="mb-16">
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mr-4">
                <Flame className="w-6 h-6 text-red-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Segurança Contra Incêndios</h2>
            </div>
            <div className="space-y-6">
              <details className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <summary className="font-semibold text-gray-900 cursor-pointer text-lg">
                  O que são Medidas de Autoproteção?
                </summary>
                <p className="mt-4 text-gray-600">
                  São procedimentos de organização e gestão da segurança que garantem a manutenção das condições de segurança do projeto e uma estrutura de resposta a emergências.
                </p>
              </details>

              <details className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <summary className="font-semibold text-gray-900 cursor-pointer text-lg">
                  A manutenção de extintores é obrigatória?
                </summary>
                <p className="mt-4 text-gray-600">
                  Sim. A norma NP 4413:2019 estabelece a obrigatoriedade da manutenção anual dos extintores para garantir a sua operacionalidade.
                </p>
              </details>

              <details className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <summary className="font-semibold text-gray-900 cursor-pointer text-lg">
                  O que faço se não tiver as plantas do meu edifício?
                </summary>
                <p className="mt-4 text-gray-600">
                  Caso não possua as plantas em formato digital (AutoCAD), o Grupo MEDISIGMA dispõe de desenhadores qualificados para fazer o levantamento e a sua criação.
                </p>
              </details>

              <details className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <summary className="font-semibold text-gray-900 cursor-pointer text-lg">
                  De quanto em quanto tempo preciso de recarregar os extintores?
                </summary>
                <p className="mt-4 text-gray-600">
                  A recarga dos extintores de Pó Químico ABC e CO2 deve ser efetuada de 5 em 5 anos.
                </p>
              </details>
            </div>
          </div>

          {/* Controlo de Pragas */}
          <div className="mb-16">
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mr-4">
                <Bug className="w-6 h-6 text-orange-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Controlo de Pragas</h2>
            </div>
            <div className="space-y-6">
              <details className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <summary className="font-semibold text-gray-900 cursor-pointer text-lg">
                  O que é o Controlo Integrado de Pragas?
                </summary>
                <p className="mt-4 text-gray-600">
                  É um sistema que inclui medidas preventivas e correctivas para manter as espécies que causam pragas em níveis que não conduzem à ocorrência de problemas significativos, considerando critérios ecológicos, económicos e toxicológicos.
                </p>
              </details>

              <details className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <summary className="font-semibold text-gray-900 cursor-pointer text-lg">
                  Os produtos utilizados são seguros?
                </summary>
                <p className="mt-4 text-gray-600">
                  Sim, todos os produtos utilizados nas desinfestações são autorizados pela Direção-Geral da Saúde, garantindo segurança para pessoas, animais e ambiente.
                </p>
              </details>

              <details className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <summary className="font-semibold text-gray-900 cursor-pointer text-lg">
                  Com que frequência deve ser feita a monitorização?
                </summary>
                <p className="mt-4 text-gray-600">
                  A frequência de monitorização depende do tipo de estabelecimento, nível de risco e regulamentações específicas. Definimos um plano personalizado para cada cliente.
                </p>
              </details>

              <details className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <summary className="font-semibold text-gray-900 cursor-pointer text-lg">
                  É necessário para cumprimento do HACCP?
                </summary>
                <p className="mt-4 text-gray-600">
                  Sim, o controlo de pragas é um dos pré-requisitos fundamentais para a implementação e funcionamento eficaz do plano HACCP em estabelecimentos alimentares.
                </p>
              </details>
            </div>
          </div>

        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-secondary py-16 md:py-20 mx-6 md:mx-8 rounded-3xl mb-8">
        <div className="container mx-auto px-6 max-w-5xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Não encontrou a resposta que procurava?
          </h2>
          <p className="text-lg text-blue-100 max-w-3xl mx-auto mb-8">
            A nossa equipa está disponível para esclarecer qualquer dúvida sobre os nossos serviços. 
            Entre em contacto connosco e obtenha o apoio personalizado que necessita.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="https://wa.me/351938698260?text=Olá%2C%20estava%20na%20página%20de%20FAQs%20e%20tenho%20uma%20dúvida%20adicional." 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white text-secondary px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors inline-flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.515z"/>
              </svg>
              Contactar via WhatsApp
            </a>
            <a href="tel:241331504" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-secondary transition-colors text-center">
              241 331 504
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}