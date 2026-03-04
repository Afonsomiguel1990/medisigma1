import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig } from "@/lib/config";
import { ContactLink } from "@/components/custom/contact-link";
import ContactForm from '@/components/ContactForm';
import { CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Perguntas Frequentes sobre Manutenção de Extintores | Medisigma',
    description: 'Tire todas as dúvidas sobre a obrigatoriedade da Manutenção de Extintores (NP 4413:2019), validade, coimas e os serviços certificados Medisigma.',
    keywords: 'manutenção extintores faq, perguntas frequentes extintores, np 4413, validade extintor, medisigma extintores',
    openGraph: {
        title: 'Perguntas Frequentes sobre Manutenção de Extintores | Medisigma',
        description: 'Tire todas as dúvidas sobre a obrigatoriedade da Manutenção de Extintores (NP 4413:2019), validade, coimas e os serviços.',
        type: 'website',
        locale: 'pt_PT',
    },
    robots: {
        index: true,
        follow: true,
    },
    alternates: {
        canonical: 'https://www.medisigma.pt/faqs/manutencao-extintores/',
    }
};

const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': [
        {
            '@type': 'Question',
            'name': 'A manutenção de extintores é obrigatória por lei em Portugal?',
            'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'Sim. Todos os edifícios e empresas estão obrigados a ter equipamentos de Segurança Contra Incêndios em Edifícios (SCIE) em estado operacional contínuo, impondo-se a sua manutenção regular.'
            }
        },
        {
            '@type': 'Question',
            'name': 'O que dita a norma NP 4413:2019 sobre extintores?',
            'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'Esta norma estabelece as regras e procedimentos técnicos obrigatórios para a manutenção de extintores, garantindo que o serviço é feito com qualidade e por empresas certificadas, com oficinas adequadas.'
            }
        },
        {
            '@type': 'Question',
            'name': 'Qual é a periodicidade legal para a manutenção de um extintor?',
            'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'A lei e a NP 4413 exigem uma inspeção visual trimestral, uma manutenção certificada anual, e testes de pressão (prova hidráulica) de 10 em 10 anos.'
            }
        },
        {
            '@type': 'Question',
            'name': 'Qual a vida útil máxima permitida para um extintor?',
            'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'A vida útil máxima de um extintor em Portugal é de 20 anos a contar do seu ano de fabrico. Terminado esse prazo, o extintor tem obrigatoriamente de ser abatido e substituído.'
            }
        }
    ]
};

export default function FAQExtintoresPage() {
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
                            Perguntas Frequentes: <span className="text-secondary">Extintores</span>
                        </h1>
                        <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed">
                            Esclareça todas as dúvidas sobre a manutenção de extintores (NP 4413:2019), validade, inspeções obrigatórias SCIE e os serviços certificados ao nível nacional da Medisigma.
                        </p>
                    </div>
                </section>

                {/* FAQs Sections - GEO Optimized Structure */}
                <div className="py-12 md:py-16 mx-4 md:mx-8 bg-gray-50 rounded-3xl mb-8">
                    <div className="container mx-auto px-6 max-w-4xl space-y-12">

                        {/* Categoria 1 */}
                        <section aria-labelledby="faq-category-1">
                            <h2 id="faq-category-1" className="text-2xl font-bold text-secondary mb-6 border-b border-gray-200 pb-2">
                                1. Legislação e Obrigatoriedade
                            </h2>
                            <div className="space-y-6">
                                <article className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-3">A manutenção de extintores é obrigatória por lei em Portugal?</h3>
                                    <p className="text-gray-700 leading-relaxed">
                                        Sim. Todos os edifícios e empresas estão obrigados a ter equipamentos de <Link href="/servicos/seguranca-incendios" className="text-secondary hover:underline font-medium">Segurança Contra Incêndios em Edifícios (SCIE)</Link> em estado operacional contínuo, impondo-se a sua manutenção regular para assegurar a proteção de pessoas e bens.
                                    </p>
                                </article>

                                <article className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-3">O que dita a norma NP 4413:2019 sobre extintores?</h3>
                                    <p className="text-gray-700 leading-relaxed">
                                        A norma NP 4413:2019 estabelece as regras e procedimentos técnicos obrigatórios para a manutenção de extintores de incêndio, garantindo que o serviço é feito com qualidade e por empresas certificadas (com quadros técnicos, oficinas e equipamentos adequados).
                                    </p>
                                </article>

                                <article className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Quais são as coimas por falta de manutenção de extintores?</h3>
                                    <p className="text-gray-700 leading-relaxed">
                                        A não manutenção das Medidas de Autoproteção (onde se inserem os extintores de incêndio) constitui contraordenação ao RJSCIE, com coimas que podem chegar a milhares de euros e risco associado de encerramento temporário do espaço ou suspensão da atividade por parte das autoridades competentes.
                                    </p>
                                </article>

                                <article className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-3">O que é o RJSCIE e qual a sua relação com os extintores?</h3>
                                    <p className="text-gray-700 leading-relaxed">
                                        O Regime Jurídico de Segurança Contra Incêndios em Edifícios é o enquadramento legal que obriga à implementação de Medidas de Autoproteção adaptadas ao tipo de risco e utilização de cada instalação. Especifica o número de equipamentos de intervenção e a obrigatoriedade da sua manutenção estrita e regular.
                                    </p>
                                </article>

                                <article className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-3">A minha seguradora pode recusar o pagamento em caso de incêndio?</h3>
                                    <p className="text-gray-700 leading-relaxed">
                                        Sim. Se após um sinistro fôr comprovado através de averiguação que os extintores instalados estavam fora da validade, descarregados, ou sem registo de manutenção certificada (garantia NP 4413), as companhias de seguradoras podem legitimamente recusar cobrir os danos.
                                    </p>
                                </article>

                                <article className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Quem tem autoridade para fiscalizar os extintores nas empresas?</h3>
                                    <p className="text-gray-700 leading-relaxed">
                                        A <a href="https://prociv.gov.pt/" target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline font-medium">Autoridade Nacional de Emergência e Proteção Civil (ANEPC)</a>, a <a href="https://act.gov.pt/" target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline font-medium">Autoridade para as Condições do Trabalho (ACT)</a>, os Serviços Municipalizados e as Forças de Segurança têm competência para fiscalizar o estado de manutenção dos equipamentos e as suas respetivas selagens documentais e validades.
                                    </p>
                                </article>

                                <article className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Que edifícios são obrigados a ter manutenção em extintores?</h3>
                                    <p className="text-gray-700 leading-relaxed">
                                        Por lei (RJSCIE), são abrangidos os estabelecimentos comerciais, indústrias, armazéns logísticos, escritórios e serviços, condomínios habitacionais, escolas e lares (equipamentos de saúde), clínicas e hospitais, hotéis e alojamentos, e em geral qualquer espaço onde se preste trabalho ou exista acesso a pessoas comum.
                                    </p>
                                </article>
                            </div>
                        </section>

                        {/* Categoria 2 */}
                        <section aria-labelledby="faq-category-2">
                            <h2 id="faq-category-2" className="text-2xl font-bold text-secondary mb-6 border-b border-gray-200 pb-2">
                                2. Procedimentos e Periodicidade
                            </h2>
                            <div className="space-y-6">
                                <article className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Qual é a periodicidade legal para a manutenção de um extintor?</h3>
                                    <p className="text-gray-700 leading-relaxed">
                                        A legislação e a NP 4413 exigem: uma inspeção visual trimestral, a manutenção e revisão devidamente certificada com carácter obrigatório <strong>anual</strong>, e testes avançados de suporte de pressão (prova hidráulica) de 10 em 10 anos.
                                    </p>
                                </article>

                                <article className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Qual a vida útil máxima permitida para um extintor?</h3>
                                    <p className="text-gray-700 leading-relaxed">
                                        A vida útil máxima técnica e legal de um extintor em Portugal é limitada a 20 anos a contar do seu ano de fabrico. Quando este prazo se extingue totalmente, o extintor tem obrigatoriamente de ser recolhido para ser abatido e substituído por um modelo novo.
                                    </p>
                                </article>

                                <article className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-3">O que significa a Prova Hidráulica e quando deve ser feita?</h3>
                                    <p className="text-gray-700 leading-relaxed">
                                        De uma forma simples, a prova hidráulica (ou teste e recarregamento profundo) verifica as propriedades mecânicas e a resistência do corpo do extintor, ou válvula, à pressão atmosférica de gás interior, e deve efetuar-se a cada década de existência da garrafa (10 anos e no recarregamento após a sua despressurização mecânica).
                                    </p>
                                </article>

                                <article className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-3">O que incluem as 10 verificações obrigatórias da manutenção?</h3>
                                    <p className="text-gray-700 leading-relaxed">
                                        Na Manutenção de Extintores, a norma NP 4413 dita um checklist de segurança de 10 passos: verificação do selo orgânico, aferição do manómetro de carga, exterior contínuo do corpo (bolsas de ferrugem), desgaste do conjunto da válvula e do difusor escoador, validade da mangueira, visibilidade das instruções operativas de uso e socorro, medição detalhada da pressão retida, averiguar eventuais e possíveis danos interiores nos contentores químicos, validação do local de instalação (se obedece ao RJSCIE) e inserção/assinatura na etiquetagem anual.
                                    </p>
                                </article>

                                <article className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-3">O que acontece se o extintor perder pressão antes da manutenção anual?</h3>
                                    <p className="text-gray-700 leading-relaxed">
                                        Se detetar que o ponteiro não se encontra na zona verde direcional do visor ao lado da alavanca, ou sem a sua cavilha de fixação normalizada, deve <Link href="#cta-section" className="text-secondary hover:underline font-medium">contactar-nos imediatamente</Link> para que a nossa equipa possa efetuar uma visita, recarga e validação pericial atestada.
                                    </p>
                                </article>

                                <article className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Quantos extintores e de que tipo preciso para as minhas instalações?</h3>
                                    <p className="text-gray-700 leading-relaxed">
                                        Tanto o volume dos referidos de garrafas espalhadas pelas suas instalações dimensionais, físicas e áreas, a tipologia legal exigida de contenção de incêndio de resposta imediata ou demorada conforme as características dos agentes, tudo depende primariamente de fatores cruzados como a carga de incêndio geral. O projeto de arquitetura de Segurança Contra Incêndios e o regulamento de Medidas de Autoproteção aprova, elabora e emite toda a listagem oficial necessária dos sistemas.
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
                                    <h3 className="text-xl font-semibold text-gray-900 mb-3">A Medisigma é certificada para a manutenção de extintores?</h3>
                                    <p className="text-gray-700 leading-relaxed">
                                        Sim. A Medisigma possui instalações profissionais e oficinas fixas (e logísticas amovíveis/móveis de intervenção) rigorosamente providenciadas e devidamente avaliadas para exercer de acordo com todas as exigências técnicas da NP 4413:2019 de âmbito de Segurança.
                                    </p>
                                </article>

                                <article className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-3">O que inclui o serviço de manutenção da Medisigma?</h3>
                                    <p className="text-gray-700 leading-relaxed">
                                        Prestamos um serviço completo e integrado ao estilo &quot;chave-na-mão&quot; que engloba o registo visual metódico inicial de identificação, inspeções, a exaustiva execução analítica e técnica prática das 10 verificações ditas de ordem mandatória à norma da certificação (NP 4413), fornecimento logístico rápido e colocação oficial documentada dos novos selos, emissão imediata analítica técnica de Relatório global técnico probatório que tem de servir indubitavelmente num ponto decisivo como um facto e demonstrativo perante Atividades Inspetoras de Registo Operativo.
                                    </p>
                                </article>

                                <article className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Realizam a deslocação e manutenção nas minhas instalações?</h3>
                                    <p className="text-gray-700 leading-relaxed">
                                        Sim. Dispomos de oficinas móveis de frota integrada altamente equipadas que se podem direcionar com marcação atempada para intervenções in-situ com profissionais alocados em praticamente todo o nosso setor nacional para proceder integral e fisicamente nos seus extintores à inspeção, limpeza contígua e manutenção na zona imediata local sem burocracias ou paralisações de longo termo que impeçam o negócio do nosso cliente particular de laborar normalmente.
                                    </p>
                                </article>

                                <article className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-3">A Medisigma fornece extintores novos ou de substituição?</h3>
                                    <p className="text-gray-700 leading-relaxed">
                                        Sim, totalmente. Realizamos não apenas a intervenção em máquinas e cilindros envelhecidos sob intervenção programada, mas comercializamos com a instalação presencial de qualquer género estipulado no projeto estrutural do seu caso de resposta com modelos extintores químicos limpos e novos aos que excedessem irremediavelmente ou tenham decaído fora em insucesso nas reprovações de vida perante as exigências periciais oficiais. Fixamos também devidamente as referidas sinalizações fotoluminescentes adequadas e prescritas pela entidade de gestão normativa perante Proteção Civil em parceria na montagem efetivada (pela nossa subsidiária base <a href="https://www.medisigma.pt/signalsigma" target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline font-medium">SinalSigma</a>).
                                    </p>
                                </article>

                                <article className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-3">A Medisigma elabora as Medidas de Autoproteção (MAP)?</h3>
                                    <p className="text-gray-700 leading-relaxed">
                                        Sim, de forma total e abrangente! Pode englobar tudo ao nosso perito e ao nosso grande departamento oficial validado para Segurança Contra Incêndios onde se encarrega minuciosamente da avaliação legal dos riscos à estruturação, preenchimento, delineamento técnico com a projeção real documentada para a emissão obrigatória oficial nas entidades devidas de base fiscalizadora garantindo na lei 100% de conformidade à operação exata contida na empresa que desenvolva as suas normais funções na segurança total.
                                    </p>
                                </article>

                                <article className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Como pedir um orçamento à Medisigma para a manutenção de extintores?</h3>
                                    <p className="text-gray-700 leading-relaxed">
                                        Basta utilizar o formulário imediato que encontra no final desta página. Pode opcionalmente ligar diretamente e conversar com um dos nossos engenheiros técnicos periciais via contacto telefónico no 241 331 504 no nosso quadro habitual em permanência ou aceder via atendimento dinâmico contíguo na nossa resposta central base via WhatsApp em suporte integrado com o preenchimento prático adaptado para lhe facultar toda a listagem formatada comercial em propostas devidamente formuladas em menos de um par diário operacional num orçamento completo formalizado de viabilidade e fiabilidade.
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
                                    Pedido de Orçamento Rápido
                                </h2>
                                <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                                    Evite coimas da Proteção Civil. Assegure que os seus extintores obedecem à manutenção obrigatória da NP 4413.
                                </p>

                                <div className="space-y-4 mb-8 text-blue-100">
                                    <div className="flex items-center space-x-3">
                                        <CheckCircle className="w-5 h-5 text-white flex-shrink-0" />
                                        <span>Prestação Oficial Certificada segundo NP 4413</span>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <CheckCircle className="w-5 h-5 text-white flex-shrink-0" />
                                        <span>Orçamento focado em menos de 24 horas</span>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <CheckCircle className="w-5 h-5 text-white flex-shrink-0" />
                                        <span>Unidades e Oficinas Móveis ou nas nossas bases Locais</span>
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4">
                                    <a
                                        href={`https://wa.me/${siteConfig.links.whatsapp}?text=Olá%2C%20estava%20na%20página%20de%20FAQ%20sobre%20Manutenção%20de%20Extintores%20e%20gostaria%20de%20saber%20mais`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-white text-secondary px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                                    >
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.515z" />
                                        </svg>
                                        WhatsApp
                                    </a>
                                    <ContactLink href="tel:241331504" type="phone" pagina="FAQ Extintores" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-secondary transition-colors text-center">
                                        241 331 504
                                    </ContactLink>
                                </div>
                            </div>

                            <ContactForm
                                pagina="FAQ Extintores"
                                fonte="faqs/manutencao-extintores"
                                servicoDefault="Segurança Contra Incêndios"
                            />
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}
