import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
    Trophy,
    MapPin,
    CheckCircle,
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
    Warehouse
} from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import ContactForm from '@/components/ContactForm';

export const metadata: Metadata = {
    title: "Medicina do Trabalho em Rio Maior | Grupo Medisigma",
    description: "Serviços de SST e Medicina no Trabalho em Rio Maior. Parceria com empresas da indústria extrativa, desporto e comércio local.",
    keywords: "medicina no trabalho rio maior, segurança no trabalho rio maior, exames médicos desporto, haccp rio maior, formação segurança",
    openGraph: {
        title: "Medicina do Trabalho em Rio Maior | Grupo Medisigma",
        description: "Saúde e Segurança no Trabalho de excelência em Rio Maior. Soluções para a Cidade do Desporto e indústria local.",
        type: "website",
        locale: "pt_PT",
        url: "https://medisigma.pt/rio-maior",
        siteName: "Grupo Medisigma",
    },
    alternates: {
        canonical: "/rio-maior",
    }
};

const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Grupo Medisigma Rio Maior",
    "image": "https://medisigma.pt/logos/logomedisigma.svg",
    "description": "Serviços de Medicina e Segurança no Trabalho, HACCP e Formação em Rio Maior.",
    "url": "https://medisigma.pt/rio-maior",
    "telephone": "+351 241 331 504",
    "address": {
        "@type": "PostalAddress",
        "addressLocality": "Rio Maior",
        "addressRegion": "Santarém",
        "addressCountry": "PT"
    },
    "areaServed": {
        "@type": "City",
        "name": "Rio Maior"
    },
    "serviceArea": {
        "@type": "GeoCircle",
        "geoMidpoint": {
            "@type": "GeoCoordinates",
            "latitude": 39.3367,
            "longitude": -8.9360
        },
        "geoRadius": "25000"
    },
    "priceRange": "$$"
};

const services = [
    {
        title: "Medicina no Trabalho",
        description: "Exames de admissão, periódicos e de aptidão para garantir a saúde e segurança da sua equipa.",
        icon: Stethoscope,
        href: "/servicos/medicina-no-trabalho"
    },
    {
        title: "Segurança no Trabalho",
        description: "Prevenção de acidentes e controlo de riscos profissionais para proteger os seus colaboradores em Rio Maior.",
        icon: Shield,
        href: "/servicos/seguranca-no-trabalho"
    },
    {
        title: "Segurança Alimentar",
        description: "Implementação de sistemas HACCP e auditorias para garantir a higiene e segurança alimentar.",
        icon: Utensils,
        href: "/servicos/seguranca-alimentar"
    },
    {
        title: "Formação Certificada",
        description: "Cursos certificados pela DGERT com planos de formação à medida das necessidades da sua empresa.",
        icon: GraduationCap,
        href: "/servicos/formacao-certificada"
    },
    {
        title: "Medicina Desportiva",
        description: "Exames médicos desportivos e avaliação de aptidão física para atletas e clubes.",
        icon: Trophy,
        href: "/servicos/medicina-desportiva"
    },
    {
        title: "Controlo de Pragas",
        description: "Sistema integrado de controlo de pragas com medidas preventivas e corretivas certificadas.",
        icon: Bug,
        href: "/servicos/controlo-pragas"
    },
    {
        title: "Segurança Contra Incêndios",
        description: "Projetos SCIE e Medidas de Autoproteção para a segurança do seu edifício e colaboradores.",
        icon: Flame,
        href: "/servicos/seguranca-incendios"
    },
    {
        title: "Prevenção de Legionella",
        description: "Elaboração de Planos de Prevenção e Controlo de Legionella (PPCL) e monitorização de riscos.",
        icon: Droplets,
        href: "/servicos/legionella"
    },
    {
        title: "Manutenção de Extintores",
        description: "Manutenção certificada pela NP 4413 para garantir a total operacionalidade dos seus equipamentos.",
        icon: FireExtinguisher,
        href: "/servicos/manutencao-extintores"
    }
];

export default function RioMaiorPage() {
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
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-50 via-white to-blue-50 opacity-70"></div>
                    </div>

                    <div className="container mx-auto px-6 md:px-8 max-w-7xl">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <div className="flex items-center gap-2 mb-6">
                                    <div className="bg-cyan-100 text-cyan-800 px-3 py-1 rounded-full text-sm font-medium flex items-center">
                                        <MapPin className="w-4 h-4 mr-1" /> Rio Maior
                                    </div>
                                    <span className="text-gray-500 text-sm">Cidade do Desporto</span>
                                </div>

                                <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                                    SST e Medicina do Trabalho em <span className="text-secondary">Rio Maior</span>
                                </h1>

                                <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
                                    Parceiros das empresas locais, desde as Salinas à Zona Industrial.
                                    Conjugamos a performance desportiva com a segurança laboral.
                                </p>

                                <div className="flex flex-col sm:flex-row gap-4">
                                    <a href="#contact-form" className="bg-secondary text-white px-8 py-4 rounded-xl font-semibold hover:bg-secondary/90 transition-all shadow-lg hover:shadow-xl text-center">
                                        Contactar Agora
                                    </a>
                                    <Link href="/servicos" className="px-8 py-4 rounded-xl font-semibold border border-gray-200 hover:bg-gray-50 transition-all text-center flex items-center justify-center gap-2">
                                        Nossos Serviços <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </div>


                            </div>

                            <div className="relative">
                                <div className="aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl relative">
                                    <Image
                                        src="/images/uploads/servicos/medicina-trabalho-hero.png"
                                        alt="Saúde no trabalho Rio Maior"
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                                    <div className="absolute bottom-6 left-6 text-white">
                                        <p className="font-bold text-lg">Suporte à Industria e Desporto</p>
                                        <p className="text-sm opacity-90">Zona Industrial e Centro de Estágios</p>
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
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Serviços para Empresas Locais</h2>
                            <p className="text-gray-600 text-lg">
                                Oferecemos um serviço de proximidade para garantir a segurança dos seus trabalhadores em Rio Maior.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {services.map((service, index) => (
                                <Link key={index} href={service.href} className="group">
                                    <Card className="h-full border-transparent shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden bg-white">
                                        <CardContent className="p-8">
                                            <div className="w-12 h-12 bg-cyan-50 rounded-xl flex items-center justify-center text-secondary mb-6 group-hover:scale-110 transition-transform duration-300">
                                                <service.icon className="w-6 h-6" />
                                            </div>
                                            <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-secondary transition-colors">{service.title}</h3>
                                            <p className="text-gray-600 mb-4">{service.description}</p>
                                            <span className="text-sm font-semibold text-secondary flex items-center">
                                                Saber mais <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
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
                                    Desporto e Indústria de Mãos Dadas
                                </h2>
                                <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                                    Rio Maior destaca-se pela sua forte componente desportiva e industrial. O Grupo Medisigma
                                    compreende esta dualidade, oferecendo desde exames para atletas até planos de segurança para fábricas.
                                </p>

                                <div className="space-y-6">
                                    <div className="flex gap-4">
                                        <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center flex-shrink-0">
                                            <Trophy className="w-5 h-5 text-secondary" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900 mb-1">Entidades Desportivas</h4>
                                            <p className="text-sm text-gray-600">Medicina desportiva e prevenção de lesões para clubes e federações.</p>
                                        </div>
                                    </div>

                                    <div className="flex gap-4">
                                        <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center flex-shrink-0">
                                            <Warehouse className="w-5 h-5 text-secondary" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900 mb-1">Indústria Extrativa e Transformadora</h4>
                                            <p className="text-sm text-gray-600">Monitorização de poeiras e ruído nas indústrias de pedra e sal.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="relative h-full min-h-[400px] rounded-2xl overflow-hidden shadow-2xl">
                                <Image
                                    src="/images/uploads/servicos/psicologia-hero.png"
                                    alt="Bem-estar laboral em Rio Maior"
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm p-6 m-6 rounded-xl shadow-lg border border-gray-100">
                                    <p className="font-semibold text-gray-900 mb-2">"Serviço rápido e eficiente, ideal para a dinâmica da nossa empresa."</p>
                                    <div className="flex items-center gap-2 text-sm text-gray-500">
                                        <span className="w-2 h-2 bg-cyan-500 rounded-full"></span>
                                        Gerente PME, Rio Maior
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
                            <circle cx="50" cy="50" r="50" fill="white" />
                        </svg>
                    </div>

                    <div className="container mx-auto px-6 md:px-8 max-w-7xl relative z-10">
                        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
                            <div className="text-white">
                                <h2 className="text-3xl md:text-5xl font-bold mb-6">
                                    Segurança Garantida em Rio Maior
                                </h2>
                                <p className="text-blue-100 text-lg mb-8 leading-relaxed">
                                    Concentre-se no crescimento do seu negócio enquanto nós tratamos da segurança
                                    da sua equipa. Contacte-nos hoje.
                                </p>

                                <div className="space-y-4 mb-10">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                                            <Phone className="w-5 h-5 text-white" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-blue-200">Ligue-nos agora</p>
                                            <p className="font-bold text-xl">241 331 504</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                                            <Mail className="w-5 h-5 text-white" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-blue-200">Envie um email</p>
                                            <p className="font-bold text-xl">geral@medisigma.pt</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20">
                                    <h4 className="font-semibold mb-2">Na sua Zona</h4>
                                    <p className="text-sm text-blue-100">
                                        Rio Maior, Alcobertas, Asseiceira e Fráguas.
                                    </p>
                                </div>
                            </div>

                            <div className="lg:w-full">
                                <ContactForm
                                    pagina="Página Rio Maior"
                                    fonte="Landing Page Rio Maior"
                                    servicoDefault="Medicina do Trabalho"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* FAQ Section */}
                <section className="py-20 bg-gray-50">
                    <div className="container mx-auto px-6 md:px-8 max-w-4xl">
                        <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">Perguntas Frequentes</h2>

                        <div className="space-y-4">
                            <details className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 group">
                                <summary className="font-semibold text-lg text-gray-900 cursor-pointer flex justify-between items-center">
                                    <span>Fazem exames médicos desportivos?</span>
                                    <span className="text-secondary group-open:rotate-180 transition-transform">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                                    </span>
                                </summary>
                                <div className="mt-4 text-gray-600 leading-relaxed">
                                    Sim, realizamos exames médicos desportivos (EMD) para atletas federados e praticantes amadores, fundamentais na cidade do desporto.
                                </div>
                            </details>

                            <details className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 group">
                                <summary className="font-semibold text-lg text-gray-900 cursor-pointer flex justify-between items-center">
                                    <span>Trabalham com a indústria extrativa (pedreiras e sal)?</span>
                                    <span className="text-secondary group-open:rotate-180 transition-transform">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                                    </span>
                                </summary>
                                <div className="mt-4 text-gray-600 leading-relaxed">
                                    Sim, temos protocolos específicos de vigilância de saúde para trabalhadores expostos a poeiras e riscos específicos deste tipo de indústria.
                                </div>
                            </details>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}
