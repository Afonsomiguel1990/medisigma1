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
    title: "Medicina do Trabalho em Leiria | Segurança na Indústria | Grupo Medisigma",
    description: "Serviços HST para as indústrias de moldes, plásticos e vidro em Leiria e Marinha Grande. Exames laborais, controlo de ruído e poeiras.",
    keywords: "medicina no trabalho leiria, hst leiria, segurança no trabalho marinha grande, medicina ocupacional leiria, exames medicos moldes indústria",
    openGraph: {
        title: "Medicina do Trabalho em Leiria | Grupo Medisigma",
        description: "Apoiamos as operações fabris e serviços de Leiria com medicina e segurança ocupacional contínua, prevenindo as coimas do ACT no eixo Leiria-Pombal-Batalha.",
        type: "website",
        locale: "pt_PT",
        url: "https://www.medisigma.pt/leiria/",
        siteName: "Grupo Medisigma",
    },
    alternates: {
        canonical: "https://www.medisigma.pt/leiria/",
    }
};

const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Grupo Medisigma Leiria",
    "image": "https://medisigma.pt/logos/logomedisigma.svg",
    "description": "Proteção ativa em Medicina e Segurança no Trabalho especializada na indústria de moldes e setor comercial no distrito de Leiria.",
    "url": "https://medisigma.pt/leiria",
    "telephone": "+351 241 331 504",
    "address": {
        "@type": "PostalAddress",
        "addressLocality": "Leiria",
        "addressRegion": "Leiria",
        "addressCountry": "PT"
    },
    "areaServed": {
        "@type": "City",
        "name": "Leiria"
    },
    "serviceArea": {
        "@type": "GeoCircle",
        "geoMidpoint": {
            "@type": "GeoCoordinates",
            "latitude": 39.7436,
            "longitude": -8.8071
        },
        "geoRadius": "45000"
    },
    "priceRange": "$$"
};

const services = [
    {
        title: "Exames de Medicina Ocupacional",
        description: "Realização na própria indústria de audiogramas, visão, testes de destreza fundamentais aos operadores da indústria do vidro e dos moldes.",
        icon: Stethoscope,
        href: "/servicos/medicina-no-trabalho"
    },
    {
        title: "Controlo do Risco Operacional",
        description: "Identificação formal dos perigos nas linhas retalhistas e de montagem mecânica e térmica para mitigar amputações ou esmagamentos acidentais.",
        icon: Shield,
        href: "/servicos/seguranca-no-trabalho"
    },
    {
        title: "Sistemas HACCP (Alimentação)",
        description: "Análise da microbiologia rigorosa e elaboração dos guias adaptados às cozinhas, super-mercados e unidades de embalamento do setor primário.",
        icon: Utensils,
        href: "/servicos/seguranca-alimentar"
    },
    {
        title: "Manobradores Certificados",
        description: "Registo e condução pedagógica e habilitária obrigatória aos controlos de guindastes industriais e porta-cargas entre pisos no local de trabalho.",
        icon: GraduationCap,
        href: "/servicos/formacao-certificada"
    },
    {
        title: "Análise Ergonómica e Stress",
        description: "Regulação do desgaste físico e medição do stress crónico associados a trabalho mecânico duro por turnos alargados.",
        icon: Activity,
        href: "/servicos/psicologia"
    },
    {
        title: "Isolamento de Pragas (Biocidas)",
        description: "Monitorização e mitigação por aplicação perimetral química nos arredores dos espaços comerciais, evitando infestações nas existências e armazéns.",
        icon: Bug,
        href: "/servicos/controlo-pragas"
    },
    {
        title: "Redes Contra Fogo Reais",
        description: "Atualização vital das Medidas de Autoproteção frente à inflamáveis presentes da injeção de pó plásticos e diluentes de resina de Leiria.",
        icon: Flame,
        href: "/servicos/seguranca-incendios"
    },
    {
        title: "Vistorias Técnicas Avac (Legionella)",
        description: "Avaliação da rede de frios do concelho e certificações em análises de choque biológico para os permutadores de ar/água perigosos.",
        icon: Droplets,
        href: "/servicos/legionella"
    },
    {
        title: "Sinalização e Extintores (NP)",
        description: "Alinhamento das guias iluminativas e das pesagens normativas dos CO2 para suster origens técnicas precoces.",
        icon: FireExtinguisher,
        href: "/servicos/manutencao-extintores"
    }
];

export default function LeiriaPage() {
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
                                        <MapPin className="w-4 h-4 mr-1" /> Leiria
                                    </div>
                                    <span className="text-gray-500 text-sm">Coração Industrial do Litoral</span>
                                </div>

                                <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                                    Segurança Ativa em Moldes, Serviços e Plásticos em <span className="text-secondary">Leiria</span>
                                </h1>

                                <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
                                    Os serviços de base da avaliação do ambiente de trabalho (ruído, poeiras) à assistência médica in loco com as nossas frotas móveis para a densa mancha fabril e de serviços da Região de Leiria.
                                </p>

                                <div className="flex flex-col sm:flex-row gap-4">
                                    <a href="#contact-form" className="bg-secondary text-white px-8 py-4 rounded-xl font-semibold hover:bg-secondary/90 transition-all shadow-lg hover:shadow-xl text-center">
                                        Planear Visitas Técnicas
                                    </a>
                                    <Link href="/servicos" className="px-8 py-4 rounded-xl font-semibold border border-gray-200 hover:bg-gray-50 transition-all text-center flex items-center justify-center gap-2">
                                        Enquadramento dos Serviços <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </div>
                            </div>

                            <div className="relative">
                                <div className="aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl relative">
                                    <Image
                                        src="/images/uploads/servicos/medicina-trabalho-hero.png"
                                        alt="Condução da Medicina e Segurança de Risco em Leiria"
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                                    <div className="absolute bottom-6 left-6 text-white">
                                        <p className="font-bold text-lg">Suporte ao Maior Polo Produtivo</p>
                                        <p className="text-sm opacity-90">Marinha Grande, Batalha, Pombal e Leiria Centro</p>
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
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Múltipla Defesa Preventiva e Laboral</h2>
                            <p className="text-gray-600 text-lg">
                                Centralizamos os riscos num só fornecedor, apoiados num plano de ação (Medicina e HST) que evita inspecções e suspensões dispendiosas pela sua adequação contínua.
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
                                                Exigências Aplicáveis <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
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
                                    Perfeita Articulação entre a Matéria-Prima e o Homem
                                </h2>
                                <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                                    Conhecemos rigorosamente as particularidades do tecido moldador da Marinha Grande e as altas dinâmicas do eixo logístico de Pombal.
                                </p>

                                <div className="space-y-6">
                                    <div className="flex gap-4">
                                        <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center flex-shrink-0">
                                            <Factory className="w-5 h-5 text-secondary" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900 mb-1">Moldes, Vidros e Polímeros Base</h4>
                                            <p className="text-sm text-gray-600">Equipamentos auditivos especializados analisam a poluição sonora de tornos, e os técnicos gerem as fichas analistas focada em pós cerâmicos causadores das pneumonioses da indústria pesada.</p>
                                        </div>
                                    </div>

                                    <div className="flex gap-4">
                                        <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center flex-shrink-0">
                                            <Truck className="w-5 h-5 text-secondary" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900 mb-1">Rotatividade no Setor e Construção</h4>
                                            <p className="text-sm text-gray-600">Verificação obrigatória dos fatores de perigo à queda e avaliações à carga dorsal durante a exportação logística inerente aos portos com medicina laborada pela rapidez orgânica exigida.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="relative h-full min-h-[400px] rounded-2xl overflow-hidden shadow-2xl">
                                <Image
                                    src="/images/uploads/servicos/tecnico-de-pragas.png"
                                    alt="Controlo de Inconformidades Técnicas Industriais em Leiria"
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm p-6 m-6 rounded-xl shadow-lg border border-gray-100">
                                    <p className="font-semibold text-gray-900 mb-2">&quot;O Grupo Medisigma, ao assegurar os testes audiológicos regulares e a emissão célere das aptidões aos operários, reduziu a nossa despesa operacional e elevou o acompanhamento em toda as 3 fábricas.&quot;</p>
                                    <div className="flex items-center gap-2 text-sm text-gray-500">
                                        <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                                        Administrador Fabril Metalo-Mecânica (Leiria/Marinha Grande)
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
                                    Gira o Maior Capital da Indústria
                                </h2>
                                <p className="text-blue-100 text-lg mb-8 leading-relaxed">
                                    Estamos presentes para garantir aos gestores e equipas laborais os melhores resultados na eficiência perante a lei e minimização dos perigos nos turnos sem paragens. Registe o vosso contacto interno:
                                </p>

                                <div className="space-y-4 mb-10">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                                            <Phone className="w-5 h-5 text-white" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-blue-200">Apoio Telefónico TSH</p>
                                            <p className="font-bold text-xl">241 331 504</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                                            <Mail className="w-5 h-5 text-white" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-blue-200">Receba A Proforma Para Adjudicar</p>
                                            <p className="font-bold text-xl">info@medisigma.pt</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20">
                                    <h4 className="font-semibold mb-2">Locais E Polos De Assistência:</h4>
                                    <p className="text-sm text-blue-100">
                                        Garantia constante e presente na Cidade de Leiria, Batalha, zona da Marinha Grande, Pombal e Porto de Mós e rede regional da A8 à A1.
                                    </p>
                                </div>
                            </div>

                            <div className="lg:w-full">
                                <ContactForm
                                    pagina="Página Leiria"
                                    fonte="Landing Page Leiria"
                                    servicoDefault="Medicina no Trabalho"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* FAQ Section */}
                <section className="py-20 bg-gray-50">
                    <div className="container mx-auto px-6 md:px-8 max-w-4xl">
                        <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">Encontre Aqui Respostas Rápidas Para a Indústria e Serviços (Leiria)</h2>

                        <div className="space-y-4">
                            <details className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 group">
                                <summary className="font-semibold text-lg text-gray-900 cursor-pointer flex justify-between items-center">
                                    <span>Prestamos apoio à indústria de moldes e plásticos em Leiria e arredores?</span>
                                    <span className="text-secondary group-open:rotate-180 transition-transform">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                                    </span>
                                </summary>
                                <div className="mt-4 text-gray-600 leading-relaxed">
                                    Sim, a equipa tem grande enquadramento regulatório nas dinâmicas mecânicas e laborais, assegurando a vigilância ocupacional focada no despiste das ameaças criadas pela injeção, polimentos técnicos e ambientes com cargas periculásticas e tóxicas características da expansão destas empresas fabris da orla costeira.
                                </div>
                            </details>

                            <details className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 group">
                                <summary className="font-semibold text-lg text-gray-900 cursor-pointer flex justify-between items-center">
                                    <span>Realizamos avaliações de ruído ocupacional?</span>
                                    <span className="text-secondary group-open:rotate-180 transition-transform">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                                    </span>
                                </summary>
                                <div className="mt-4 text-gray-600 leading-relaxed">
                                    Absolutamente! A base dos Técnicos Avançados executa um levantamento certificado por luxímetros calibrados ou sonómetros que atestam perante os regulamentos (ACT) se o pavilhão ou fábrica exige alterações preventivas face às perturbações das máquinas rotativas dos processos de transformação de molde ou chapa metálica.
                                </div>
                            </details>

                            <details className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 group">
                                <summary className="font-semibold text-lg text-gray-900 cursor-pointer flex justify-between items-center">
                                    <span>São capazes de verificar e limpar perigos relativos às frentes frias ou aquecimentos do AVAC (Legionella)?</span>
                                    <span className="text-secondary group-open:rotate-180 transition-transform">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                                    </span>
                                </summary>
                                <div className="mt-4 text-gray-600 leading-relaxed">
                                    É essencial realizar as análises laboratoriais nos sistemas dispersores de condensação local (Torres de Arrefecimento, balneários gerais das fábricas de turno). Promovemos recolhas seguras, geramos laudos com certificações acreditadas nacionalmente das Análises, implementando medidas rápidas contra surtos patológicos desta tipologia de bactéria mortal nos meses propensos nas águas municipais quentes paradas em pontos da rede interior de forma incisiva.
                                </div>
                            </details>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}
