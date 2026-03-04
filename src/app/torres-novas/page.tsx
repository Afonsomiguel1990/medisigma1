import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
    Factory,
    MapPin,
    Phone,
    Mail,
    ArrowRight,
    Shield,
    Stethoscope,
    Utensils,
    GraduationCap,
    Activity,
    Bug,
    Flame,
    Droplets,
    FireExtinguisher,
    Truck
} from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import ContactForm from '@/components/ContactForm';

export const metadata: Metadata = {
    title: "Medicina do Trabalho em Torres Novas | Segurança Industrial | Grupo Medisigma",
    description: "Medicina e Segurança no Trabalho adaptada à zona industrial de Torres Novas e Riachos. Serviços rápidos de Exames Médicos, HACCP e Prevenção de Riscos.",
    keywords: "medicina no trabalho torres novas, segurança no trabalho torres novas, sst torres novas rincão, serviços sst logística, segurança industrial torres novas, haccp",
    openGraph: {
        title: "Medicina do Trabalho em Torres Novas | Grupo Medisigma",
        description: "Garantimos conformidade legal em HST e Segurança Alimentar para indústrias e empresas de retalho no concelho de Torres Novas e Entroncamento.",
        type: "website",
        locale: "pt_PT",
        url: "https://www.medisigma.pt/torres-novas/",
        siteName: "Grupo Medisigma",
    },
    alternates: {
        canonical: "https://www.medisigma.pt/torres-novas/",
    }
};

const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Grupo Medisigma Torres Novas",
    "image": "https://medisigma.pt/logos/logomedisigma.svg",
    "description": "Especialistas em Medicina e Segurança no Trabalho, HACCP, Segurança contra Incêndios. Parceiros da Indústria em Torres Novas.",
    "url": "https://medisigma.pt/torres-novas",
    "telephone": "+351 241 331 504",
    "address": {
        "@type": "PostalAddress",
        "addressLocality": "Torres Novas",
        "addressRegion": "Santarém",
        "addressCountry": "PT"
    },
    "areaServed": {
        "@type": "City",
        "name": "Torres Novas"
    },
    "serviceArea": {
        "@type": "GeoCircle",
        "geoMidpoint": {
            "@type": "GeoCoordinates",
            "latitude": 39.4816,
            "longitude": -8.5408
        },
        "geoRadius": "25000"
    },
    "priceRange": "$$"
};

const services = [
    {
        title: "Medicina no Trabalho",
        description: "Exames de admissão (antes do início de funções) e periódicos para saúde preventiva da sua equipa.",
        icon: Stethoscope,
        href: "/servicos/medicina-no-trabalho"
    },
    {
        title: "Segurança no Trabalho",
        description: "Identificação, avaliação e controlo de riscos de acidentes em postos fabris, de armazém ou escritório.",
        icon: Shield,
        href: "/servicos/seguranca-no-trabalho"
    },
    {
        title: "Segurança Alimentar",
        description: "Auditorias técnicas, levantamento de inconformidades e plano de segurança dos alimentos (HACCP).",
        icon: Utensils,
        href: "/servicos/seguranca-alimentar"
    },
    {
        title: "Formação de Empilhadores",
        description: "Cursos certificados presencialmente focados em manobradores de máquinas e veículos industriais.",
        icon: GraduationCap,
        href: "/servicos/formacao-certificada"
    },
    {
        title: "Psicologia Ocupacional",
        description: "Avaliação da carga mental, stresse profissional e gestão proativa de bem-estar das equipas.",
        icon: Activity,
        href: "/servicos/psicologia"
    },
    {
        title: "Controlo de Pragas",
        description: "Desratização e desinfeção fundamentais para polos logísticos, centros de armazenagem e retalho.",
        icon: Bug,
        href: "/servicos/controlo-pragas"
    },
    {
        title: "Segurança Contra Incêndios",
        description: "Criação de Projetos de Segurança e registos aprovados na ANPC para licenciamento de edifícios industriais.",
        icon: Flame,
        href: "/servicos/seguranca-incendios"
    },
    {
        title: "Prevenção de Legionella",
        description: "Especializados no controlo de sistemas hídricos, chafarizes, sistemas de rega e torres de refrigeração industrial.",
        icon: Droplets,
        href: "/servicos/legionella"
    },
    {
        title: "Manutenção de Extintores",
        description: "Contrato para reposição e manutenção de fogos, extintores industriais (Pó, CO2 e Água).",
        icon: FireExtinguisher,
        href: "/servicos/manutencao-extintores"
    }
];

export default function TorresNovasPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <main className="min-h-screen bg-white flex flex-col">
                {/* Hero Section */}
                <section className="relative py-20 md:py-32 overflow-hidden">
                    <div className="absolute inset-0 -z-10">
                        <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-blue-50 opacity-70"></div>
                    </div>

                    <div className="container mx-auto px-6 md:px-8 max-w-7xl">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <div className="flex items-center gap-2 mb-6">
                                    <div className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium flex items-center">
                                        <MapPin className="w-4 h-4 mr-1" /> Torres Novas
                                    </div>
                                    <span className="text-gray-500 text-sm">Médio Tejo Central</span>
                                </div>

                                <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                                    Segurança e Medicina no Trabalho em <span className="text-secondary">Torres Novas</span>
                                </h1>

                                <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
                                    Desde as Zonas Industriais até grandes centros de retalho logístico. Proteja legalmente e fisicamente a sua empresa através da prestação externa de serviços HST (Higiene, Segurança e Medicina no Trabalho) em Torres Novas.
                                </p>

                                <div className="flex flex-col sm:flex-row gap-4">
                                    <a href="#contact-form" className="bg-secondary text-white px-8 py-4 rounded-xl font-semibold hover:bg-secondary/90 transition-all shadow-lg hover:shadow-xl text-center">
                                        Falar com um Consultor
                                    </a>
                                    <Link href="/servicos" className="px-8 py-4 rounded-xl font-semibold border border-gray-200 hover:bg-gray-50 transition-all text-center flex items-center justify-center gap-2">
                                        Todos os Serviços <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </div>
                            </div>

                            <div className="relative">
                                <div className="aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl relative">
                                    <Image
                                        src="/images/uploads/servicos/medicina-trabalho-hero.png"
                                        alt="Apoio na SST Industrial e Agrícola em Torres Novas"
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                                    <div className="absolute bottom-6 left-6 text-white">
                                        <p className="font-bold text-lg">Parceiro HST Regional de Torres Novas</p>
                                        <p className="text-sm opacity-90">Entroncamento, Riachos, Meia Via e arredores</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Services Grid */}
                <section className="py-20 bg-gray-50">
                    <div className="container mx-auto px-6 md:px-8 max-w-7xl">
                        <div className="text-center max-w-3xl mx-auto mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Garantia de Legalidade (Lei n.º 102/2009)</h2>
                            <p className="text-gray-600 text-lg">
                                Os nossos clientes de Torres Novas podem descansar com a certeza de que a Medisigma organiza atempadamente as fichas de aptidão, documentação de segurança e resposta a imprevistos laborais, prevenindo coimas.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {services.map((service, index) => (
                                <Link key={index} href={service.href} className="group">
                                    <Card className="h-full border-transparent shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden bg-white">
                                        <CardContent className="p-8">
                                            <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center text-secondary mb-6 group-hover:scale-110 transition-transform duration-300">
                                                <service.icon className="w-6 h-6" />
                                            </div>
                                            <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-secondary transition-colors">{service.title}</h3>
                                            <p className="text-gray-600 mb-4">{service.description}</p>
                                            <span className="text-sm font-semibold text-secondary flex items-center">
                                                Aprofundar Especialidade <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                                            </span>
                                        </CardContent>
                                    </Card>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Local Relevance */}
                <section className="py-20 bg-white">
                    <div className="container mx-auto px-6 md:px-8 max-w-7xl">
                        <div className="grid lg:grid-cols-2 gap-16 items-center">
                            <div>
                                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                                    Forte Presença com Indústria e Transporte
                                </h2>
                                <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                                    As dinâmicas pólos agroindustriais e grandes redes logísticas que existem em redor de Torres Novas trazem riscos laborais ímpares. Seja no apoio à gestão de empilhadores no armazém ou análises a espaços ruidosos na indústria, nós sabemos atuar.
                                </p>

                                <div className="space-y-6">
                                    <div className="flex gap-4">
                                        <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center flex-shrink-0">
                                            <Truck className="w-5 h-5 text-secondary" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900 mb-1">Armazenamento e Logística Central</h4>
                                            <p className="text-sm text-gray-600">Formação legalmente obrigatória (manobrador de empilhadores, porta paletes), marcações eficientes para medicina laboral de motoristas e acompanhamento de cargas e posturas ao volante.</p>
                                        </div>
                                    </div>

                                    <div className="flex gap-4">
                                        <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center flex-shrink-0">
                                            <Factory className="w-5 h-5 text-secondary" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900 mb-1">Indústria Têxtil, Agrícola e Madeiras</h4>
                                            <p className="text-sm text-gray-600">Conduzimos simulações perante emergência (incêndios fabris), identificação de poeiras nocivas (Agentes Químicos e Físicos) e asseguramos exames auditivos audiométricos para quem produz no interior.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="relative h-full min-h-[400px] rounded-2xl overflow-hidden shadow-2xl">
                                <Image
                                    src="/images/uploads/servicos/tecnico-de-pragas.png"
                                    alt="SST Industrial"
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm p-6 m-6 rounded-xl shadow-lg border border-gray-100">
                                    <p className="font-semibold text-gray-900 mb-2">&quot;A resposta rápida e objetiva do Grupo Medisigma é fundamental para gerirmos a rotatividade na nossa operação logística em Torres Novas sem sobressaltos com o ACT.&quot;</p>
                                    <div className="flex items-center gap-2 text-sm text-gray-500">
                                        <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                                        Responsável de Operações e Instalações (Torres Novas)
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section id="contact-form" className="py-20 bg-secondary relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10 pointer-events-none">
                        <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                            <path d="M100 0 C 80 100 50 100 0 0 Z" fill="white" />
                        </svg>
                    </div>

                    <div className="container mx-auto px-6 md:px-8 max-w-7xl relative z-10">
                        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
                            <div className="text-white">
                                <h2 className="text-3xl md:text-5xl font-bold mb-6">
                                    Parceria Técnica Rápida em Torres Novas
                                </h2>
                                <p className="text-blue-100 text-lg mb-8 leading-relaxed">
                                    Otimize o gasto com consultorias demoradas. Resolvemos o licenciamento e a saúde da equipa num serviço agrupado.
                                    Receba o seu orçamento base ao preencher os dados de momento.
                                </p>

                                <div className="space-y-4 mb-10">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                                            <Phone className="w-5 h-5 text-white" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-blue-200">Apoio a Clientes Direto</p>
                                            <p className="font-bold text-xl">241 331 504</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                                            <Mail className="w-5 h-5 text-white" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-blue-200">Consultoria Eletrónica</p>
                                            <p className="font-bold text-xl">info@medisigma.pt</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20">
                                    <h4 className="font-semibold mb-2">Com abrangência Distrital</h4>
                                    <p className="text-sm text-blue-100">
                                        Especial cobertura nos principais polos de Torres Novas (Riachos, Golegã), Tomar, Entroncamento e Vila Nova da Barquinha.
                                    </p>
                                </div>
                            </div>

                            <div className="lg:w-full">
                                <ContactForm
                                    pagina="Página Torres Novas"
                                    fonte="Landing Page Torres Novas"
                                    servicoDefault="Segurança no Trabalho"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* FAQ Section */}
                <section className="py-20 bg-gray-50">
                    <div className="container mx-auto px-6 md:px-8 max-w-4xl">
                        <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">Perguntas Comuns (Torres Novas)</h2>

                        <div className="space-y-4">
                            <details className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 group">
                                <summary className="font-semibold text-lg text-gray-900 cursor-pointer flex justify-between items-center">
                                    <span>Atuam ativamente na zona industrial e logística de Riachos e Torres Novas?</span>
                                    <span className="text-secondary group-open:rotate-180 transition-transform">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                                    </span>
                                </summary>
                                <div className="mt-4 text-gray-600 leading-relaxed">
                                    Correto. Desempenhamos serviços contínuos a dezenas de clientes situados na zona de expansão industrial de Riachos, nos centros logísticos peri-urbanos e oficinas situadas no concelho de Torres Novas, facilitando toda a componente legal.
                                </div>
                            </details>

                            <details className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 group">
                                <summary className="font-semibold text-lg text-gray-900 cursor-pointer flex justify-between items-center">
                                    <span>Pode a Medicina no Trabalho ser feita diretamente na nossa fábrica/armazém?</span>
                                    <span className="text-secondary group-open:rotate-180 transition-transform">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                                    </span>
                                </summary>
                                <div className="mt-4 text-gray-600 leading-relaxed">
                                    Sim! Dispomos da licença e da frota de Unidades Móveis de Saúde compatíveis e equipadas que efetuam deslocações ao parque fabril e zona central, impedindo despesas de deslocações acrescidas aos colaboradores ou perdas de horas de produtividade.
                                </div>
                            </details>

                            <details className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 group">
                                <summary className="font-semibold text-lg text-gray-900 cursor-pointer flex justify-between items-center">
                                    <span>Oferecem a emissão do &quot;Certificado de Formação de Manobradores&quot;?</span>
                                    <span className="text-secondary group-open:rotate-180 transition-transform">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                                    </span>
                                </summary>
                                <div className="mt-4 text-gray-600 leading-relaxed">
                                    Completamente. As nossas formações abrangem condução segura de empilhadores, porta-paletes elétricos (Stucki), ministrados nas instalações com o equipamento em que o prestador laborará para emissão legal do referencial em causa.
                                </div>
                            </details>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}
