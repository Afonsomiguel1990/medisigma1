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
    title: "Medicina do Trabalho em Portalegre | HST e HACCP | Grupo Medisigma",
    description: "Referência em Medicina e Segurança no Trabalho no Alto Alentejo. Apoio certificado ao setor agroalimentar e serviços em Portalegre e arredores.",
    keywords: "medicina no trabalho portalegre, segurança no trabalho portalegre, alto alentejo segurança, haccp portalegre, empresas portalegre hst, exames medicina trabalho",
    openGraph: {
        title: "Medicina do Trabalho em Portalegre | Grupo Medisigma",
        description: "Garantimos todos os serviços de HST, Controlo de Pragas e HACCP para empresas no Alto Alentejo, focados na proximidade a Portalegre e concelhos vizinhos.",
        type: "website",
        locale: "pt_PT",
        url: "https://www.medisigma.pt/portalegre/",
        siteName: "Grupo Medisigma",
    },
    alternates: {
        canonical: "https://www.medisigma.pt/portalegre/",
    }
};

const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Grupo Medisigma Portalegre",
    "image": "https://medisigma.pt/logos/logomedisigma.svg",
    "description": "Especialistas em Medicina e Segurança Ocupacional, HACCP e Higiene do Trabalho no distrito de Portalegre e Alto Alentejo.",
    "url": "https://medisigma.pt/portalegre",
    "telephone": "+351 241 331 504",
    "address": {
        "@type": "PostalAddress",
        "addressLocality": "Portalegre",
        "addressRegion": "Portalegre",
        "addressCountry": "PT"
    },
    "areaServed": {
        "@type": "City",
        "name": "Portalegre"
    },
    "serviceArea": {
        "@type": "GeoCircle",
        "geoMidpoint": {
            "@type": "GeoCoordinates",
            "latitude": 39.2938,
            "longitude": -7.4283
        },
        "geoRadius": "40000"
    },
    "priceRange": "$$"
};

const services = [
    {
        title: "Medicina no Trabalho",
        description: "Asseguramos a emissão da ficha de aptidão rigorosa para admissão e consultas de acompanhamento periódico da sua equipa.",
        icon: Stethoscope,
        href: "/servicos/medicina-no-trabalho"
    },
    {
        title: "Segurança Laboral",
        description: "Desenvolvimento do manual deHST, registo de riscos no local físico (exposições ao campo e químicos industriais).",
        icon: Shield,
        href: "/servicos/seguranca-no-trabalho"
    },
    {
        title: "Sistema HACCP (Seg. Alimentar)",
        description: "Consultoria intensiva com base nos regulamentos europeus focados nas produções de queijos, carnes, azeite, enchidos e vinhos locais.",
        icon: Utensils,
        href: "/servicos/seguranca-alimentar"
    },
    {
        title: "Formação Técnica Setorial",
        description: "Promoveção da segurança entre manobradores rurais, motoristas, pessoal fabril e comercial via formações de exigência legal.",
        icon: GraduationCap,
        href: "/servicos/formacao-certificada"
    },
    {
        title: "Vigilância Psicossocial",
        description: "Controlo à sobrecarga humana perante o trabalho para mitigar os impactos na rentabilidade produtiva (ansiedades e stress).",
        icon: Activity,
        href: "/servicos/psicologia"
    },
    {
        title: "Gestão e Controlo de Pragas",
        description: "Prevenção especializada de contaminações provenientes de roedores e insetos, essencial a unidades agrícolas da região.",
        icon: Bug,
        href: "/servicos/controlo-pragas"
    },
    {
        title: "Segurança Contra Incêndios",
        description: "Avaliação cuidada do espaço com Medidas de Autoproteção regulamentadas e Projetos focados no baixo risco e elevado impacto.",
        icon: Flame,
        href: "/servicos/seguranca-incendios"
    },
    {
        title: "Análises de Águas e Legionella",
        description: "Gestão das caldeiras e aquecimentos de zonas hoteleiras ou spas assegurando relatórios que protegem a qualidade do sistema hídrico.",
        icon: Droplets,
        href: "/servicos/legionella"
    },
    {
        title: "Extintores e Manutenção",
        description: "Cumprimento obrigatório da NP 4413 com revisões frequentes pela salvaguarda humana e dos edifícios no combate às chamas.",
        icon: FireExtinguisher,
        href: "/servicos/manutencao-extintores"
    }
];

export default function PortalegrePage() {
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
                                        <MapPin className="w-4 h-4 mr-1" /> Portalegre
                                    </div>
                                    <span className="text-gray-500 text-sm">Alto Alentejo</span>
                                </div>

                                <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                                    Prevenção e Medicina Laboral em <span className="text-secondary">Portalegre</span>
                                </h1>

                                <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
                                    Experiência sólida na segurança integrada de polos do Alto Alentejo, empenhados na defesa legal da agroindústria, produção, hotelaria de charme e retalho da região.
                                </p>

                                <div className="flex flex-col sm:flex-row gap-4">
                                    <a href="#contact-form" className="bg-secondary text-white px-8 py-4 rounded-xl font-semibold hover:bg-secondary/90 transition-all shadow-lg hover:shadow-xl text-center">
                                        Falar com Especialistas
                                    </a>
                                    <Link href="/servicos" className="px-8 py-4 rounded-xl font-semibold border border-gray-200 hover:bg-gray-50 transition-all text-center flex items-center justify-center gap-2">
                                        Ler Sobre Apoio Base <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </div>
                            </div>

                            <div className="relative">
                                <div className="aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl relative">
                                    <Image
                                        src="/images/uploads/servicos/medicina-trabalho-hero.png"
                                        alt="Consultadoria de Saúde Ocupacional em Portalegre"
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                                    <div className="absolute bottom-6 left-6 text-white">
                                        <p className="font-bold text-lg">Parceiro HST Regional Alentejano</p>
                                        <p className="text-sm opacity-90">Portalegre, Castelo de Vide, Marvão, Crato</p>
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
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Solução Completa Obrigatória</h2>
                            <p className="text-gray-600 text-lg">
                                Centralizamos os riscos num só fornecedor, apoiados num plano de ação (Medicina e HST) que evita perdas judiciais e absentismos nocivos às finanças locais.
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
                                                Ver Resumo Legal <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
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
                                    Ao Lado da Força Produtiva do Alto Alentejo
                                </h2>
                                <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                                    O Alto Alentejo tem a sua forte dinâmica nas adegas, explorações de frutos da época, agropecuária e, recentemente, muita projeção do pequeno comércio e alojamento rural. A nossa visão flexível vai ao encontro das suas produções cíclicas.
                                </p>

                                <div className="space-y-6">
                                    <div className="flex gap-4">
                                        <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center flex-shrink-0">
                                            <Utensils className="w-5 h-5 text-secondary" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900 mb-1">Agroindústria Local e Queijos</h4>
                                            <p className="text-sm text-gray-600">Apoio técnico forte nos manuais de Controlo de Qualidade e Segurança Alimentar. Garantimos desinfestações em áreas produtivas para uma higienização impecável na obtenção da matéria-prima.</p>
                                        </div>
                                    </div>

                                    <div className="flex gap-4">
                                        <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center flex-shrink-0">
                                            <Factory className="w-5 h-5 text-secondary" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900 mb-1">Empresas e Turismo Rural</h4>
                                            <p className="text-sm text-gray-600">Verificação obrigatória dos riscos hídricos de spas ou termas e Medicina do Trabalho flexível prestada na Unidade Móvel, para manter a capacidade hoteleira em dias plenos.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="relative h-full min-h-[400px] rounded-2xl overflow-hidden shadow-2xl">
                                <Image
                                    src="/images/uploads/servicos/tecnico-de-pragas.png"
                                    alt="Controlo de Qualidade em Portalegre"
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm p-6 m-6 rounded-xl shadow-lg border border-gray-100">
                                    <p className="font-semibold text-gray-900 mb-2">&quot;Com o Grupo Medisigma, garantimos que todas as exigências anuais estão verificadas sem a burocracia típica.&quot;</p>
                                    <div className="flex items-center gap-2 text-sm text-gray-500">
                                        <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                                        Gerente de Produção Local
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
                                    Dê O Salto Para Uma Equipa Segura
                                </h2>
                                <p className="text-blue-100 text-lg mb-8 leading-relaxed">
                                    Estamos presentes para garantir que as exigências da ACT e ASAE não põem em causa o dia a dia da vida comercial ou de faturação. Contacte agora mesmo!
                                </p>

                                <div className="space-y-4 mb-10">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                                            <Phone className="w-5 h-5 text-white" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-blue-200">Apoio Telefónico Diário</p>
                                            <p className="font-bold text-xl">241 331 504</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                                            <Mail className="w-5 h-5 text-white" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-blue-200">Deixe O Seu Pedido Escrito</p>
                                            <p className="font-bold text-xl">info@medisigma.pt</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20">
                                    <h4 className="font-semibold mb-2">Presença Extensiva:</h4>
                                    <p className="text-sm text-blue-100">
                                        Total resposta local focada nos Municípios de Portalegre, Crato, Marvão, Castelo de Vide e Elvas.
                                    </p>
                                </div>
                            </div>

                            <div className="lg:w-full">
                                <ContactForm
                                    pagina="Página Portalegre"
                                    fonte="Landing Page Portalegre"
                                    servicoDefault="Segurança Alimentar"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* FAQ Section */}
                <section className="py-20 bg-gray-50">
                    <div className="container mx-auto px-6 md:px-8 max-w-4xl">
                        <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">Tire Algumas Dúvidas Frequentes (Portalegre)</h2>

                        <div className="space-y-4">
                            <details className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 group">
                                <summary className="font-semibold text-lg text-gray-900 cursor-pointer flex justify-between items-center">
                                    <span>Prestamos serviço ao abrigo do novo HST a pequenas quintas e explorações rurais?</span>
                                    <span className="text-secondary group-open:rotate-180 transition-transform">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                                    </span>
                                </summary>
                                <div className="mt-4 text-gray-600 leading-relaxed">
                                    Perfeitamente. Enquadramos os planos adaptativos baseados na faturação ou volume de trabalho diário de empresas agrículas reduzidas exigido por regulamentos estatais. As avaliações abarcam máquinas perigosas de corte ou químicos fitorganismos de risco no Alto Alentejo.
                                </div>
                            </details>

                            <details className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 group">
                                <summary className="font-semibold text-lg text-gray-900 cursor-pointer flex justify-between items-center">
                                    <span>Temos de ir a uma clínica presencial para as fichas atuarem?</span>
                                    <span className="text-secondary group-open:rotate-180 transition-transform">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                                    </span>
                                </summary>
                                <div className="mt-4 text-gray-600 leading-relaxed">
                                    Não obrigatoriamente. Nós movimentamos todo o nosso material médico a bordo de carrinhas especializadas designadas de Medicina Integrada e realizamos o diagnóstico aos empregados da restauração, comércio tradicional de forma rápida.
                                </div>
                            </details>

                            <details className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 group">
                                <summary className="font-semibold text-lg text-gray-900 cursor-pointer flex justify-between items-center">
                                    <span>Efetua o Sistema Integrado de Remoção de Pragas e Desinfeção a cozinhas de forma discreta?</span>
                                    <span className="text-secondary group-open:rotate-180 transition-transform">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                                    </span>
                                </summary>
                                <div className="mt-4 text-gray-600 leading-relaxed">
                                    Como especialistas HACCP e no Extermínio legal de pragas na zona em restaurantes exigentes e tradicionais do Alentejo e Elvas o sigilo e segurança, operamos no local apenas em épocas ajustadas e com biológicos de cheiro diluído aprovados pela Saúde Governamental de modo a garantir o turismo forte sem medos.
                                </div>
                            </details>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}
