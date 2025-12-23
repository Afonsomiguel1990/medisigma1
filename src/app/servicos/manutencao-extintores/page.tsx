import React from 'react';
import { Metadata } from 'next';
import { ShieldCheck, Calendar, CheckCircle, Flame, FileText } from 'lucide-react';
import ContactForm from '@/components/ContactForm';

export const metadata: Metadata = {
    title: 'Manutenção de Extintores | Certificação NP 4413 | MediSigma',
    description: 'Serviço certificado de manutenção de extintores. Garantimos a operacionalidade e conformidade com a NP 4413:2019. Técnicos especializados.',
    keywords: 'manutenção extintores, recarga extintores, NP 4413, segurança contra incêndios, medisigma',
    openGraph: {
        title: 'Manutenção de Extintores | Certificação NP 4413 | MediSigma',
        description: 'Serviço certificado de manutenção de extintores. Garantimos a operacionalidade e conformidade com a NP 4413:2019.',
        type: 'website',
        locale: 'pt_PT',
    },
    alternates: {
        canonical: 'https://medisigma.pt/servicos/manutencao-extintores',
    },
};

const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    'name': 'Manutenção de Extintores',
    'provider': {
        '@type': 'Organization',
        'name': 'MediSigma',
        'url': 'https://medisigma.pt',
    },
    'serviceType': 'Segurança Contra Incêndios',
    'description': 'Serviço de manutenção preventiva e corretiva de extintores de incêndio, certificado segundo a norma NP 4413:2019.',
};

export default function ManutencaoExtintoresPage() {
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
                                    Manutenção de Extintores
                                </h1>
                                <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed">
                                    Garantimos que os seus equipamentos de combate a incêndio estão operacionais e em conformidade legal. Serviço certificado e executado por técnicos qualificados.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <a
                                        href="#cta-section"
                                        className="bg-secondary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-secondary/90 transition-colors text-center cursor-pointer"
                                    >
                                        Pedir Orçamento
                                    </a>
                                </div>
                            </div>
                            <div className="lg:text-right">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src="/images/uploads/tecnico.jpg"
                                    alt="Técnico a realizar manutenção de extintor"
                                    width={600}
                                    height={400}
                                    className="rounded-xl shadow-2xl object-cover h-[400px] w-full"
                                    loading="eager"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Content Section */}
                <section className="py-16 md:py-20 mx-4 md:mx-0">
                    <div className="container mx-auto px-6 md:px-8 max-w-6xl">

                        {/* Intro Text */}
                        <div className="max-w-3xl mx-auto text-center mb-16">
                            <h2 className="text-2xl md:text-4xl font-bold text-primary mb-6">
                                Porquê realizar a Manutenção?
                            </h2>
                            <p className="text-muted-foreground leading-relaxed text-lg">
                                Como qualquer outro meio de combate ao incêndio, torna-se necessário que os extintores estejam operacionais quando têm que ser utilizados, o que implica a existência de ações periódicas de Inspeção, de Manutenção e recarga.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-12 items-start">
                            <div>
                                <h3 className="text-2xl font-bold text-primary mb-6 flex items-center gap-3">
                                    <CheckCircle className="text-secondary w-6 h-6" />
                                    O que inclui a manutenção?
                                </h3>
                                <p className="mb-6 text-muted-foreground">
                                    A manutenção dos extintores é composta por 10 testes essenciais e inclui a verificação minuciosa de todos os componentes:
                                </p>
                                <ul className="space-y-3 mb-8">
                                    {[
                                        "Do selo e do manómetro",
                                        "Do exterior do corpo do extintor",
                                        "Do exterior do conjunto da válvula",
                                        "Da mangueira",
                                        "Do difusor",
                                        "Das instruções de utilização",
                                        "Da pressão, através do manómetro",
                                        "Do extintor, para averiguar possíveis danos interiores",
                                        "Do local de instalação do extintor",
                                        "Da etiquetagem de manutenção"
                                    ].map((item, index) => (
                                        <li key={index} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 border border-border">
                                            <ShieldCheck className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                                            <span className="text-sm font-medium text-gray-700">{item}</span>
                                        </li>
                                    ))}
                                </ul>

                                <div className="bg-accent/50 p-6 rounded-xl border border-secondary/20">
                                    <h4 className="font-semibold text-primary mb-2 flex items-center gap-2">
                                        <FileText className="w-5 h-5 text-secondary" />
                                        Certificação de Qualidade
                                    </h4>
                                    <p className="text-sm text-muted-foreground mb-4">
                                        A <strong>Medisigma</strong> é uma empresa especializada, com instalações técnicas equipadas para a execução do Serviço de Manutenção de Extintores segundo a <strong>NP 4413:2019</strong>. Esta norma atesta a qualidade do serviço fornecido, a competência dos nossos técnicos e o cumprimento rigoroso das exigências legais.
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        Garantimos que em todas as etapas da prestação do serviço são cumpridos os requisitos da NP 4413:2019, em oficinas fixas e móveis devidamente certificadas.
                                    </p>
                                </div>


                            </div>

                            <div className="space-y-6 sticky top-24">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src="/images/uploads/seloextintores.jpg"
                                    alt="Selo de manutenção de extintores"
                                    width={500}
                                    height={600}
                                    className="rounded-xl shadow-lg border border-border w-full object-cover"
                                    loading="lazy"
                                />
                                <div className="bg-primary text-primary-foreground p-8 rounded-xl relative overflow-hidden">
                                    <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-secondary/20 rounded-full blur-2xl"></div>
                                    <h3 className="text-xl font-bold mb-4 relative z-10">Precisa de ajuda?</h3>
                                    <p className="mb-6 opacity-90 relative z-10">
                                        Não deixe a segurança da sua empresa ao acaso. Fale com os nossos especialistas.
                                    </p>
                                    <a href="#cta-section" className="inline-block w-full bg-white text-primary font-bold py-3 px-6 rounded-lg text-center hover:bg-gray-100 transition-colors relative z-10">
                                        Falar com Especialista
                                    </a>
                                </div>
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
                                    Agende a Manutenção Hoje
                                </h2>
                                <p className="text-base md:text-lg text-primary-foreground/90 max-w-3xl mx-auto mb-8">
                                    Evite coimas e garanta a segurança das suas instalações. Peça já o seu orçamento gratuito.
                                </p>

                                <div className="space-y-4 mb-8 text-blue-100">
                                    <div className="flex items-center space-x-3">
                                        <CheckCircle className="w-5 h-5 text-white" />
                                        <span>Orçamento em 24h</span>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <CheckCircle className="w-5 h-5 text-white" />
                                        <span>Deslocação incluída na zona centro</span>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <CheckCircle className="w-5 h-5 text-white" />
                                        <span>Relatório técnico detalhado</span>
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4">
                                    <a
                                        href="https://wa.me/351966979226?text=Olá%2C%20gostaria%20de%20saber%20mais%20sobre%20a%20manutenção%20de%20extintores."
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
                                pagina="Manutenção de Extintores"
                                fonte="servicos/manutencao-extintores"
                                servicoDefault="Segurança Contra Incêndios"
                            />
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
} 
