import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig } from "@/lib/config";
import { ContactLink } from "@/components/custom/contact-link";
import ContactForm from '@/components/ContactForm';
import { CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Perguntas Frequentes sobre Legionella | Medisigma',
    description: 'Tire todas as dúvidas sobre o Plano de Prevenção e Controlo da Legionella (PPCL). Saiba o que diz a lei, as coimas e os serviços Medisigma.',
    keywords: 'legionella, faq legionella, perguntas frequentes legionella, prevenção legionella, plano de controlo legionella, medisigma',
    openGraph: {
        title: 'Perguntas Frequentes sobre Legionella | Medisigma',
        description: 'Tire todas as dúvidas sobre o Plano de Prevenção e Controlo da Legionella (PPCL). Saiba o que diz a lei, as coimas e os serviços.',
        type: 'website',
        locale: 'pt_PT',
    },
    robots: {
        index: true,
        follow: true,
    },
    alternates: {
        canonical: 'https://www.medisigma.pt/faqs/legionella/',
    }
};

const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': [
        {
            '@type': 'Question',
            'name': 'O que é a Legionella e como se transmite nas empresas?',
            'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'A Legionella é uma bactéria aquática que prolifera entre os 20ºC e 45ºC. Transmite-se pela inalação de aerossóis (gotículas de água) de sistemas como torres de arrefecimento e água quente sanitária (AQS), causando a Doença dos Legionários.'
            }
        },
        {
            '@type': 'Question',
            'name': 'Qual é a legislação em vigor em Portugal sobre a Legionella?',
            'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'A Lei n.º 52/2018 regula a prevenção e controlo da doença em Portugal, aplicada a edifícios públicos e privados, sendo complementada pela Portaria n.º 25/2021.'
            }
        },
        {
            '@type': 'Question',
            'name': 'Quais as empresas obrigadas a ter um Plano de Controlo de Legionella?',
            'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'Hotéis, SPAs, lares, hospitais, fábricas e edifícios com sistemas como torres de arrefecimento e água quente sanitária.'
            }
        },
        {
            '@type': 'Question',
            'name': 'Quanto custa um plano de controlo de Legionella para a minha empresa?',
            'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'O orçamento para prevenção de Legionella é altamente personalizado. O valor varia entre algumas centenas a milhares de euros com base na dimensão da infraestrutura hídrica e número de equipamentos a monitorizar. Solicite orçamento gratuito com a Medisigma.'
            }
        }
    ]
};

export default function FAQLegionellaPage() {
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
                    <div className="container mx-auto px-6 md:px-8 max-w-4xl text-center">
                        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                            Perguntas Frequentes: <span className="text-secondary">Legionella</span>
                        </h1>
                        <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed">
                            Esclareça todas as dúvidas sobre o Plano de Prevenção e Controlo da Legionella (Lei n.º 52/2018), testes laboratoriais, coimas em vigor e os serviços de conformidade da Medisigma.
                        </p>
                    </div>
                </section>

                {/* FAQs Sections - GEO Optimized Structure */}
                <div className="py-12 md:py-16 mx-4 md:mx-8 bg-gray-50 rounded-3xl mb-8">
                    <div className="container mx-auto px-6 max-w-4xl space-y-12">

                        {/* Categoria 1 */}
                        <section aria-labelledby="faq-category-1">
                            <h2 id="faq-category-1" className="text-2xl font-bold text-secondary mb-6 border-b border-gray-200 pb-2">
                                1. O que diz a Lei
                            </h2>
                            <div className="space-y-6">
                                <article className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-3">O que é a Legionella e como se transmite nas empresas?</h3>
                                    <p className="text-gray-700 leading-relaxed">
                                        A Legionella é uma bactéria aquática que prolifera entre os 20ºC e 45ºC. Transmite-se pela inalação de aerossóis (gotículas de água) de sistemas como torres de arrefecimento e água quente sanitária (AQS), causando a Doença dos Legionários. Não se transmite por ingestão de água ou contágio direto de pessoa para pessoa.
                                    </p>
                                </article>

                                <article className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Qual é a legislação em vigor em Portugal sobre a Legionella?</h3>
                                    <p className="text-gray-700 leading-relaxed">
                                        A <Link href="/servicos/legionella" className="text-secondary hover:underline font-medium">Lei n.º 52/2018</Link> regula a prevenção e controlo da doença em Portugal, aplicada a edifícios públicos e privados, sendo complementada pelos critérios técnicos da Portaria n.º 25/2021.
                                    </p>
                                </article>

                                <article className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Quais as empresas obrigadas a ter um Plano de Controlo de Legionella?</h3>
                                    <p className="text-gray-700 leading-relaxed">
                                        Hotéis, SPAs, lares de idosos, hospitais, fábricas e edifícios com sistemas como torres de arrefecimento e redes de água quente sanitária (AQS) partilhada.
                                    </p>
                                </article>

                                <article className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Quais são as coimas por falta de plano de prevenção da Legionella?</h3>
                                    <p className="text-gray-700 leading-relaxed">
                                        As coimas para pessoas coletivas (empresas) que incumpram a Lei n.º 52/2018 podem ascender a <strong className="text-gray-900">44.890€</strong>, além de possível suspensão de atividade ou criminalização em caso de surto ativo provocado por negligência.
                                    </p>
                                </article>

                                <article className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Onde se desenvolve a bactéria com mais facilidade nas instalações?</h3>
                                    <p className="text-gray-700 leading-relaxed">
                                        Os focos críticos são locais de água estagnada ou aquecida entre 20ºC e 45ºC: reservatórios de água quente, condensadores evaporativos, chuveiros pouco usados, balneários e fontes decorativas.
                                    </p>
                                </article>

                                <article className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-3">A minha empresa pode ser fechada se houver um surto de Legionella?</h3>
                                    <p className="text-gray-700 leading-relaxed">
                                        Sim. A autoridade de saúde pode suspender total ou parcialmente a utilização das instalações e equipamentos em caso de risco iminente para a saúde pública ou incumprimento das diretrizes estatais.
                                    </p>
                                </article>
                            </div>
                        </section>

                        {/* Categoria 2 */}
                        <section aria-labelledby="faq-category-2">
                            <h2 id="faq-category-2" className="text-2xl font-bold text-secondary mb-6 border-b border-gray-200 pb-2">
                                2. Prevenção e Procedimentos
                            </h2>
                            <div className="space-y-6">
                                <article className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-3">O que é e o que deve constar no Plano de Prevenção e Controlo da Legionella (PPCL)?</h3>
                                    <p className="text-gray-700 leading-relaxed">
                                        O PPCL é o documento legal obrigatório que inclui a análise de risco das instalações, o cadastro técnico de compressores/redes, e o programa calendarizado de manutenção, recolha de amostras da água e procedimentos preventivos específicos para cada sistema.
                                    </p>
                                </article>

                                <article className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Como é feito o teste ou análise de Legionella nas instalações?</h3>
                                    <p className="text-gray-700 leading-relaxed">
                                        Técnicos especializados da Medisigma recolhem amostras de água de pontos críticos definidos no plano (ex: chuveiros, depósitos) que são depois enviadas e testadas num laboratório parceiro acreditado (ISO 17025) através do método cultural normalizado ou PCR.
                                    </p>
                                </article>

                                <article className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Com que regularidade a empresa tem de fazer análises à água?</h3>
                                    <p className="text-gray-700 leading-relaxed">
                                        A periodicidade varia (trimestral a anual) consoante a complexidade da rede e a classe de risco, definida na auditoria e análise de risco inicial do sistema. A gestão e o acompanhamento deste calendário são assegurados no nosso serviço de Controlo.
                                    </p>
                                </article>

                                <article className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-3">É obrigatório o registo dos equipamentos na plataforma do governo?</h3>
                                    <p className="text-gray-700 leading-relaxed">
                                        Sim, a lei dita a obrigatoriedade de registo dos equipamentos de risco (como torres de arrefecimento) numa plataforma eletrónica centralizada pelas autoridades de saúde e ambientais competentes.
                                    </p>
                                </article>

                                <article className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Quem tem competência legal para elaborar e assinar o Plano de Prevenção?</h3>
                                    <p className="text-gray-700 leading-relaxed">
                                        O plano deve ser elaborado e subscrito por técnicos com formação específica reconhecida na prevenção e controlo da bactéria, sendo da inteira responsabilidade final implementá-lo por parte da empresa proprietária ou gestora da instalação.
                                    </p>
                                </article>

                                <article className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-3">O que fazer se for detetada Legionella nas análises de rotina?</h3>
                                    <p className="text-gray-700 leading-relaxed">
                                        Deve-se interditar imediatamente os pontos afetados, reportar às autoridades locais de saúde caso os limites máximos sejam excedidos, e iniciar os protocolos de desinfeção (choque térmico ou choque químico), seguidos de nova recolha para re-avaliação laboratorial.
                                    </p>
                                </article>

                                <article className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-3">O que significa a classificação de risco (baixo, médio, alto) no sistema?</h3>
                                    <p className="text-gray-700 leading-relaxed">
                                        Resulta de uma matriz que cruza o resultado laboratorial (quantidade de bactérias medidas em UFC/L) com a vulnerabilidade das pessoas no local, determinando se a ação deve ser manter apenas vigilância normal, correção imediata (desinfeção) ou o encerramento do equipamento.
                                    </p>
                                </article>
                            </div>
                        </section>

                        {/* Categoria 3 */}
                        <section aria-labelledby="faq-category-3">
                            <h2 id="faq-category-3" className="text-2xl font-bold text-secondary mb-6 border-b border-gray-200 pb-2">
                                3. Serviços Medisigma
                            </h2>
                            <div className="space-y-6">
                                <article className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Quanto custa um plano de controlo de Legionella para a minha empresa?</h3>
                                    <p className="text-gray-700 leading-relaxed">
                                        O orçamento para prevenção de Legionella é altamente personalizado. O valor varia entre algumas centenas a milhares de euros com base na dimensão da infraestrutura hídrica e no número de equipamentos a auditar e monitorizar. Solicite um orçamento gratuito detalhado junto das nossas equipas comerciais.
                                    </p>
                                </article>

                                <article className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-3">O que inclui o serviço de Controlo de Legionella do Grupo Medisigma?</h3>
                                    <p className="text-gray-700 leading-relaxed">
                                        Prestamos um serviço completo &quot;chave-na-mão&quot; que inclui: o diagnóstico in-loco inicial, elaboração e assinatura legal do PPCL, auditorias periódicas aos pontos críticos identificados, ações preventivas calendarizadas, recolhas presenciais de água e fornecimento de relatórios formais suportados por laboratório acreditado.
                                    </p>
                                </article>

                                <article className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-3">A Medisigma realiza a recolha de amostras de água com laboratório acreditado?</h3>
                                    <p className="text-gray-700 leading-relaxed">
                                        Sim, garantimos o cumprimento das mais rígidas cadeias de recolha, métodos padronizados, e a testagem das amostras de água é sempre efetuada em laboratório associado com Acreditação Oficial Portuguesa (certificado IPAC / ISO 17025), conferindo-lhe a validade legal inquestionável exigida pelas Autoridades de Saúde.
                                    </p>
                                </article>

                                <article className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Como posso pedir um orçamento à Medisigma para o controlo de Legionella?</h3>
                                    <p className="text-gray-700 leading-relaxed">
                                        Pode <Link href="#cta-section" className="text-secondary hover:underline font-medium">preencher o formulário no final desta página</Link>, ligar diretamente para o nosso número de contacto permanente ou enviar mensagem via WhatsApp. Garantimos uma resposta de qualificação comercial em menos de 24 horas úteis.
                                    </p>
                                </article>

                                <article className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-3">A auditoria de Legionella obrigatória a cada 3 anos está incluída?</h3>
                                    <p className="text-gray-700 leading-relaxed">
                                        De acordo com a Lei 52/2018, as entidades estão sujeitas a serem escrutinadas por metodologias de auditorias independentes regulares a cada 3 anos aos seus planos. Apoiamos integralmente a gestão e a compilação de todo o processo documental gerado pelo PPCL para facilitar substancialmente a aprovação em vistoria local, sem preocupações para o cliente.
                                    </p>
                                </article>

                                <article className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-3">A Medisigma acompanha as vistorias das autoridades de saúde pública?</h3>
                                    <p className="text-gray-700 leading-relaxed">
                                        Sim, oferecemos o acompanhamento técnico e operacional em qualquer momento, especialmente no caso de visitas inspectivas não anunciadas ou solicitadas da Entidade Reguladora da Saúde ou delegados centrais de saúde pública, respondendo a exigências legais em seu nome.
                                    </p>
                                </article>

                                <article className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Porquê escolher o Grupo Medisigma para a prevenção de Legionella?</h3>
                                    <p className="text-gray-700 leading-relaxed">
                                        A Medisigma tem um historial comprovado a integrar todos os pilares da Segurança, Ambiente e Saúde no Trabalho num único e consolidado parceiro empresarial em Portugal continental. Centraliza a burocracia do seu cumprimento legal connosco, evite o risco efetivo de pesadas coimas setoriais e garanta que o coração do seu edifício mantém segurança de excelência 24/7.
                                    </p>
                                </article>
                            </div>
                        </section>
                    </div>
                </div>

                {/* CTA Section */}
                <section id="cta-section" className="relative z-10 bg-secondary py-16 md:py-20 mx-4 md:mx-8 rounded-3xl mb-8">
                    <div className="container mx-auto px-6 max-w-5xl">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <div className="text-white">
                                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                                    Pedido de Proposta
                                </h2>
                                <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                                    Garanta a conformidade legal e a segurança das suas instalações. Peça já um orçamento para o Plano de Prevenção e Controlo de Legionella.
                                </p>

                                <div className="space-y-4 mb-8 text-blue-100">
                                    <div className="flex items-center space-x-3">
                                        <CheckCircle className="w-5 h-5 text-white flex-shrink-0" />
                                        <span>Orçamento personalizado num prazo de 24 horas</span>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <CheckCircle className="w-5 h-5 text-white flex-shrink-0" />
                                        <span>Equipas e técnicos especializados e qualificados</span>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <CheckCircle className="w-5 h-5 text-white flex-shrink-0" />
                                        <span>Serviço em parceria com laboratório NP EN ISO/IEC 17025 (IPAC)</span>
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4">
                                    <a
                                        href={`https://wa.me/${siteConfig.links.whatsapp}?text=Olá%2C%20estava%20na%20página%20de%20FAQ%20sobre%20Legionella%20e%20gostaria%20de%20ter%20mais%20informações`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-white text-secondary px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                                    >
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.515z" />
                                        </svg>
                                        WhatsApp
                                    </a>
                                    <ContactLink href="tel:241331504" type="phone" pagina="FAQ Legionella" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-secondary transition-colors text-center">
                                        241 331 504
                                    </ContactLink>
                                </div>
                            </div>

                            <ContactForm
                                pagina="FAQ Legionella"
                                fonte="faqs/legionella"
                                servicoDefault="Legionella"
                            />
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}
