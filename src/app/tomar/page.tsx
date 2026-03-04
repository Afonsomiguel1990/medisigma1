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
    FireExtinguisher
} from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import ContactForm from '@/components/ContactForm';

export const metadata: Metadata = {
    title: "Medicina do Trabalho em Tomar | Segurança e Saúde | Grupo Medisigma",
    description: "Serviços de Medicina e Segurança no Trabalho em Tomar. Apoio à hotelaria, comércio e indústria do Médio Tejo. Exames médicos e HACCP.",
    keywords: "medicina no trabalho tomar, segurança no trabalho tomar, haccp tomar, segurança alimentar tomar, HST turismo tomar, serviços sst tomar",
    openGraph: {
        title: "Medicina do Trabalho em Tomar | Segurança e Saúde | Grupo Medisigma",
        description: "Referência em Segurança e Saúde no Trabalho em Tomar. Conformidade e segurança para empresas e hotelaria do Médio Tejo.",
        type: "website",
        locale: "pt_PT",
        url: "https://www.medisigma.pt/tomar/",
        siteName: "Grupo Medisigma",
    },
    alternates: {
        canonical: "https://www.medisigma.pt/tomar/",
    }
};

const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Grupo Medisigma Tomar",
    "image": "https://medisigma.pt/logos/logomedisigma.svg",
    "description": "Serviços de Medicina e Segurança no Trabalho, HACCP, Segurança contra Incêndios e Formação na região de Tomar e Médio Tejo.",
    "url": "https://medisigma.pt/tomar",
    "telephone": "+351 241 331 504",
    "address": {
        "@type": "PostalAddress",
        "addressLocality": "Tomar",
        "addressRegion": "Santarém",
        "addressCountry": "PT"
    },
    "areaServed": {
        "@type": "City",
        "name": "Tomar"
    },
    "serviceArea": {
        "@type": "GeoCircle",
        "geoMidpoint": {
            "@type": "GeoCoordinates",
            "latitude": 39.6012,
            "longitude": -8.4116
        },
        "geoRadius": "30000"
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
        description: "Prevenção de acidentes e controlo de riscos profissionais para proteger os seus colaboradores em Tomar.",
        icon: Shield,
        href: "/servicos/seguranca-no-trabalho"
    },
    {
        title: "Segurança Alimentar",
        description: "Implementação de sistemas HACCP e auditorias rigorosas para hotelaria, restauração e indústria alimentar.",
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
        title: "Psicologia Ocupacional",
        description: "Promovemos o bem-estar mental e a produtividade através da prevenção de riscos psicossociais.",
        icon: Activity,
        href: "/servicos/psicologia"
    },
    {
        title: "Controlo de Pragas",
        description: "Sistema integrado de controlo de pragas com medidas preventivas e corretivas certificadas.",
        icon: Bug,
        href: "/servicos/controlo-pragas"
    },
    {
        title: "Segurança Contra Incêndios",
        description: "Projetos SCIE e Medidas de Autoproteção essenciais para o licenciamento de espaços comerciais e hotéis.",
        icon: Flame,
        href: "/servicos/seguranca-incendios"
    },
    {
        title: "Prevenção de Legionella",
        description: "Elaboração de Planos de Prevenção e Controlo de Legionella (PPCL) cruciais para a área do turismo e serviços.",
        icon: Droplets,
        href: "/servicos/legionella"
    },
    {
        title: "Manutenção de Extintores",
        description: "Manutenção certificada pela NP 4413 para garantir a total operacionalidade dos equipamentos do seu edifício.",
        icon: FireExtinguisher,
        href: "/servicos/manutencao-extintores"
    }
];

export default function TomarPage() {
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
                                        <MapPin className="w-4 h-4 mr-1" /> Tomar
                                    </div>
                                    <span className="text-gray-500 text-sm">Médio Tejo</span>
                                </div>

                                <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                                    Segurança e Saúde Ocupacional em <span className="text-secondary">Tomar</span>
                                </h1>

                                <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
                                    Soluções completas para a hotelaria, restauração, comércio e indústria da região ribatejana.
                                    Apoio técnico experiente e unidades de medicina móvel prontas a ir até à sua empresa.
                                </p>

                                <div className="flex flex-col sm:flex-row gap-4">
                                    <a href="#contact-form" className="bg-secondary text-white px-8 py-4 rounded-xl font-semibold hover:bg-secondary/90 transition-all shadow-lg hover:shadow-xl text-center">
                                        Pedir Orçamento
                                    </a>
                                    <Link href="/servicos" className="px-8 py-4 rounded-xl font-semibold border border-gray-200 hover:bg-gray-50 transition-all text-center flex items-center justify-center gap-2">
                                        Conhecer Serviços <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </div>
                            </div>

                            <div className="relative">
                                <div className="aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl relative">
                                    <Image
                                        src="/images/uploads/servicos/medicina-trabalho-hero.png"
                                        alt="Medicina no trabalho em Tomar"
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                                    <div className="absolute bottom-6 left-6 text-white">
                                        <p className="font-bold text-lg">Próximos do seu Negócio</p>
                                        <p className="text-sm opacity-90">Tomar, Entroncamento, Ourém, Ferreira do Zêzere</p>
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
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Serviços Obrigatórios para Empresas</h2>
                            <p className="text-gray-600 text-lg">
                                Garantimos que o seu negócio em Tomar cumpre as exigências da ACT, ASAE e Lei n.º 102/2009. Evite coimas e proteja a sua equipa.
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
                                    Apoio Sólido no Coração do Médio Tejo
                                </h2>
                                <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                                    Operamos em estreita proximidade com o tecido empresarial de Tomar. Temos uma vasta experiência
                                    nas exigências de segurança e bem-estar do turismo, da restauração, agricultura e serviços locais.
                                </p>

                                <div className="space-y-6">
                                    <div className="flex gap-4">
                                        <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center flex-shrink-0">
                                            <Utensils className="w-5 h-5 text-secondary" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900 mb-1">Hotelaria e Restauração</h4>
                                            <p className="text-sm text-gray-600">Planos de segurança alimentar (HACCP) rigorosos e Prevenção de Legionella para garantir a conformidade das operações turísticas.</p>
                                        </div>
                                    </div>

                                    <div className="flex gap-4">
                                        <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center flex-shrink-0">
                                            <Factory className="w-5 h-5 text-secondary" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900 mb-1">Agroindústria e Manufactura</h4>
                                            <p className="text-sm text-gray-600">Auditorias de segurança em máquinas, prevenção de acidentes e medicina no trabalho dedicada à produção primária e transformação.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="relative h-full min-h-[400px] rounded-2xl overflow-hidden shadow-2xl">
                                <Image
                                    src="/images/uploads/servicos/tecnico-de-pragas.png"
                                    alt="SST do Grupo Medisigma em Tomar"
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm p-6 m-6 rounded-xl shadow-lg border border-gray-100">
                                    <p className="font-semibold text-gray-900 mb-2">&quot;O Grupo Medisigma compreende as exigentes normas e obrigações da hotelaria. A flexibilidade nos exames ajudou muito a nossa gestão de turnos.&quot;</p>
                                    <div className="flex items-center gap-2 text-sm text-gray-500">
                                        <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                                        Diretor de Hotel, Tomar
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
                                    Simplifique a HST da sua empresa em Tomar
                                </h2>
                                <p className="text-blue-100 text-lg mb-8 leading-relaxed">
                                    Conte com a nossa equipa para um licenciamento seguro e uma operação livre de coimas.
                                    Preencha o formulário para agendar o serviço adaptado às suas necessidades.
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
                                            <p className="font-bold text-xl">info@medisigma.pt</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20">
                                    <h4 className="font-semibold mb-2">Área de Atuação Permanente</h4>
                                    <p className="text-sm text-blue-100">
                                        Tomar, Entroncamento, Ferreira do Zêzere, Ourém, Torres Novas e Vila de Rei.
                                    </p>
                                </div>
                            </div>

                            <div className="lg:w-full">
                                <ContactForm
                                    pagina="Página Tomar"
                                    fonte="Landing Page Tomar"
                                    servicoDefault="Medicina no Trabalho"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* FAQ Section */}
                <section className="py-20 bg-gray-50">
                    <div className="container mx-auto px-6 md:px-8 max-w-4xl">
                        <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">Perguntas Frequentes (FAQs)</h2>

                        <div className="space-y-4">
                            <details className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 group">
                                <summary className="font-semibold text-lg text-gray-900 cursor-pointer flex justify-between items-center">
                                    <span>Cobrem todo o concelho de Tomar?</span>
                                    <span className="text-secondary group-open:rotate-180 transition-transform">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                                    </span>
                                </summary>
                                <div className="mt-4 text-gray-600 leading-relaxed">
                                    Sim, a nossa equipa desloca-se a todas as freguesias do concelho de Tomar, e também a municípios vizinhos como Entroncamento e Ferreira do Zêzere para prestar serviços como Segurança no Trabalho, HACCP e Medicina do Trabalho.
                                </div>
                            </details>

                            <details className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 group">
                                <summary className="font-semibold text-lg text-gray-900 cursor-pointer flex justify-between items-center">
                                    <span>Realizam auditorias de segurança alimentar ou HACCP no centro da cidade?</span>
                                    <span className="text-secondary group-open:rotate-180 transition-transform">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                                    </span>
                                </summary>
                                <div className="mt-4 text-gray-600 leading-relaxed">
                                    Sim! Focamo-nos na conformidade legal HACCP exigida pela ASAE para toda a teia de restauração, cafés e hotéis presentes no centro histórico e envolvente turística de Tomar. Elaboramos planos adaptados à especificidade da operação alimentar local.
                                </div>
                            </details>

                            <details className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 group">
                                <summary className="font-semibold text-lg text-gray-900 cursor-pointer flex justify-between items-center">
                                    <span>As Vistorias e Medidas de Autoproteção (MAPs) incluem-se nos serviços prestados?</span>
                                    <span className="text-secondary group-open:rotate-180 transition-transform">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                                    </span>
                                </summary>
                                <div className="mt-4 text-gray-600 leading-relaxed">
                                    Absolutamente. Os nossos engenheiros credenciados realizam o projeto SCIE (Segurança Contra Incêndios em Edifícios) e gerem dossiers de Medidas de Autoproteção necessárias tanto a espaços comerciais como industriais em Tomar e na zona do Médio Tejo.
                                </div>
                            </details>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}
