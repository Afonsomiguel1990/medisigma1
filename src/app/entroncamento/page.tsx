import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
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
    title: "Medicina do Trabalho no Entroncamento | Segurança e Saúde | Grupo Medisigma",
    description: "Medicina e Segurança no Trabalho adaptada à zona do Entroncamento. Exames Médicos, HACCP e serviços de HST para ferrovia, serviços e comércio.",
    keywords: "medicina no trabalho entroncamento, segurança no trabalho entroncamento, sst estroncamento, exames médicos empresas, segurança industrial, haccp",
    openGraph: {
        title: "Medicina do Trabalho no Entroncamento | Grupo Medisigma",
        description: "Serviços certificados de Saúde e Segurança no Trabalho, Segurança Alimentar e Formação no concelho do Entroncamento e parque industrial.",
        type: "website",
        locale: "pt_PT",
        url: "https://www.medisigma.pt/entroncamento/",
        siteName: "Grupo Medisigma",
    },
    alternates: {
        canonical: "https://www.medisigma.pt/entroncamento/",
    }
};

const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Grupo Medisigma Entroncamento",
    "image": "https://medisigma.pt/logos/logomedisigma.svg",
    "description": "Apoio a empresas em Medicina e Segurança no Trabalho, Controlo de Pragas e Segurança contra Incêndios na região do Entroncamento.",
    "url": "https://medisigma.pt/entroncamento",
    "telephone": "+351 241 331 504",
    "address": {
        "@type": "PostalAddress",
        "addressLocality": "Entroncamento",
        "addressRegion": "Santarém",
        "addressCountry": "PT"
    },
    "areaServed": {
        "@type": "City",
        "name": "Entroncamento"
    },
    "serviceArea": {
        "@type": "GeoCircle",
        "geoMidpoint": {
            "@type": "GeoCoordinates",
            "latitude": 39.4674,
            "longitude": -8.4688
        },
        "geoRadius": "20000"
    },
    "priceRange": "$$"
};

const services = [
    {
        title: "Medicina no Trabalho",
        description: "Realização atempada de exames médicos de aptidão, sem prejudicar o normal funcionamento e os turnos da empresa.",
        icon: Stethoscope,
        href: "/servicos/medicina-no-trabalho"
    },
    {
        title: "Segurança no Trabalho",
        description: "Avaliação da iluminação, sinalética, riscos mecânicos e ergonómicos nos postos laborais, sejam eles armazéns ou escritórios.",
        icon: Shield,
        href: "/servicos/seguranca-no-trabalho"
    },
    {
        title: "Segurança Alimentar (HACCP)",
        description: "Serviços de consultoria em higiene alimentar e plano de autocontrolo obrigatórios para restauração local (ASAE).",
        icon: Utensils,
        href: "/servicos/seguranca-alimentar"
    },
    {
        title: "Formação em Segurança",
        description: "Elevação da qualificação da equipa com formações DGERT de primeiros socorros ou combate a sinistros iniciais.",
        icon: GraduationCap,
        href: "/servicos/formacao-certificada"
    },
    {
        title: "Prevenção de Fatores Psicosociais",
        description: "Mitigação do desgaste do trabalho, rotatividade (turnos) e redução eficaz do absentismo por motivos da área da saúde associada.",
        icon: Activity,
        href: "/servicos/psicologia"
    },
    {
        title: "Desinfestação e Controlo de Pragas",
        description: "Tratamento eficaz com sistemas autorizados na eliminação de formigas, baratas, roedores entre outros agentes de saúde pública.",
        icon: Bug,
        href: "/servicos/controlo-pragas"
    },
    {
        title: "Manutenção de Incêndios",
        description: "Fiscalização ativa e recargas legais da sinalética, projeto de deteção e verificação de bocas (SCIE).",
        icon: Flame,
        href: "/servicos/seguranca-incendios"
    },
    {
        title: "Auditoria Microbiológica",
        description: "Rastreio e desinfeção cirúrgica de sistemas AVAC que concentram partículas infetantes, em especial redes que causem perigo.",
        icon: Droplets,
        href: "/servicos/legionella"
    },
    {
        title: "Extintores Oficiais (NP 4413)",
        description: "Revisão e registo obrigatório da pressão contínua pela manutenção dos agentes e manómetros de acordo com o código da Proteção Civil.",
        icon: FireExtinguisher,
        href: "/servicos/manutencao-extintores"
    }
];

export default function EntroncamentoPage() {
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
                                        <MapPin className="w-4 h-4 mr-1" /> Entroncamento
                                    </div>
                                    <span className="text-gray-500 text-sm">Coração Ribatejano</span>
                                </div>

                                <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                                    Segurança e Medicina Ocupacional no <span className="text-secondary">Entroncamento</span>
                                </h1>

                                <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
                                    Soluções unificadas e ágeis de saúde e prevenção. Reduza horas dispersas e marque o rastreio da sua equipa local num serviço integrado perante os regulamentos em vigor.
                                </p>

                                <div className="flex flex-col sm:flex-row gap-4">
                                    <a href="#contact-form" className="bg-secondary text-white px-8 py-4 rounded-xl font-semibold hover:bg-secondary/90 transition-all shadow-lg hover:shadow-xl text-center">
                                        Falar com Especialista
                                    </a>
                                    <Link href="/servicos" className="px-8 py-4 rounded-xl font-semibold border border-gray-200 hover:bg-gray-50 transition-all text-center flex items-center justify-center gap-2">
                                        Descobrir Áreas <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </div>
                            </div>

                            <div className="relative">
                                <div className="aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl relative">
                                    <Image
                                        src="/images/uploads/servicos/medicina-trabalho-hero.png"
                                        alt="Apoio na SST Industrial e Agrícola no Entroncamento"
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                                    <div className="absolute bottom-6 left-6 text-white">
                                        <p className="font-bold text-lg">Suporte de Base Flexível</p>
                                        <p className="text-sm opacity-90">Entroncamento, Vila Nova da Barquinha, Golegã</p>
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
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Garantia Técnica Integrada</h2>
                            <p className="text-gray-600 text-lg">
                                Centralize a sua burocracia connosco. Elaboração célere da documentação e rastreios anuais em conformidade para responder a qualquer verificação dos órgãos inspetivos locais.
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
                                                Ver Resumo do Serviço <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
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
                                    Vasta Experiência Organizacional Local
                                </h2>
                                <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                                    Damos resposta ativa ao dinamismo do Entroncamento, caracterizado pelas infraestruturas de transportes, serviços partilhados, retalho e comércio local de porta aberta. Avaliamos turnos complexos e postos de repetição de processos laborais.
                                </p>

                                <div className="space-y-6">
                                    <div className="flex gap-4">
                                        <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center flex-shrink-0">
                                            <Truck className="w-5 h-5 text-secondary" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900 mb-1">Rotatividade e Logística</h4>
                                            <p className="text-sm text-gray-600">Encaixamos na perfeição a disponibilidade dos colaboradores e turnos de trabalho na elaboração de mapas e agendamentos de exames de Medicina no Trabalho com o apoio das Clínicas Móveis.</p>
                                        </div>
                                    </div>

                                    <div className="flex gap-4">
                                        <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center flex-shrink-0">
                                            <Utensils className="w-5 h-5 text-secondary" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900 mb-1">Restauração e Serviços</h4>
                                            <p className="text-sm text-gray-600">Acompanhamento e organização dos cadernos e pré-requisitos HACCP e de controlo obrigatório de Higiene para evitar constrangimentos, pragas ou contra-ordenações gravosas.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="relative h-full min-h-[400px] rounded-2xl overflow-hidden shadow-2xl">
                                <Image
                                    src="/images/uploads/servicos/tecnico-de-pragas.png"
                                    alt="Visita Médica de Enfermagem do Entroncamento"
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm p-6 m-6 rounded-xl shadow-lg border border-gray-100">
                                    <p className="font-semibold text-gray-900 mb-2">&quot;A enorme flexibilidade logística que nos deram na gestão dos exames médicos libertou muita pressão à área administrativa da nossa entidade.&quot;</p>
                                    <div className="flex items-center gap-2 text-sm text-gray-500">
                                        <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                                        Gerente Comercial (Entroncamento)
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
                                    Simplifique com a Medisigma
                                </h2>
                                <p className="text-blue-100 text-lg mb-8 leading-relaxed">
                                    Proteja atempadamente a sua rede empresarial da obrigatoriedade do artigo e minimize os riscos do dia à dia sem burocracias.
                                    Envie este formulário rápido.
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
                                    <h4 className="font-semibold mb-2">Presença Regular e Resposta Rápida</h4>
                                    <p className="text-sm text-blue-100">
                                        Entroncamento, Torres Novas, Golegã, Vila Nova da Barquinha e zona do Médio Tejo.
                                    </p>
                                </div>
                            </div>

                            <div className="lg:w-full">
                                <ContactForm
                                    pagina="Página Entroncamento"
                                    fonte="Landing Page Entroncamento"
                                    servicoDefault="HST Integrada"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* FAQ Section */}
                <section className="py-20 bg-gray-50">
                    <div className="container mx-auto px-6 md:px-8 max-w-4xl">
                        <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">Perguntas Comuns (Entroncamento)</h2>

                        <div className="space-y-4">
                            <details className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 group">
                                <summary className="font-semibold text-lg text-gray-900 cursor-pointer flex justify-between items-center">
                                    <span>Efetuam exames a funcionários e motoristas nas instalações através da Clínica Móvel?</span>
                                    <span className="text-secondary group-open:rotate-180 transition-transform">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                                    </span>
                                </summary>
                                <div className="mt-4 text-gray-600 leading-relaxed">
                                    Claramente. As nossas unidades e clínicas móveis adaptam facilmente o horário à porta dos armazéns, garagens logísticas e serviços situados no tecido económico do Entroncamento, agilizando exames complementares e audiogramas no instante.
                                </div>
                            </details>

                            <details className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 group">
                                <summary className="font-semibold text-lg text-gray-900 cursor-pointer flex justify-between items-center">
                                    <span>Garantem o plano para a SCIE e as suas Medidas de Autoproteção?</span>
                                    <span className="text-secondary group-open:rotate-180 transition-transform">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                                    </span>
                                </summary>
                                <div className="mt-4 text-gray-600 leading-relaxed">
                                    Certamente. Quer a legislação predial dos edifícios urbanos, quer zonas industriais ou de retalho comercial beneficiam da verificação integrada da rede de incêndios que propomos, assegurando assim o plano perante as autoridades competentes (ANPC).
                                </div>
                            </details>

                            <details className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 group">
                                <summary className="font-semibold text-lg text-gray-900 cursor-pointer flex justify-between items-center">
                                    <span>São capazes de intervir pontualmente no Controlo de Pragas para Restaurantes e Lojas?</span>
                                    <span className="text-secondary group-open:rotate-180 transition-transform">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                                    </span>
                                </summary>
                                <div className="mt-4 text-gray-600 leading-relaxed">
                                    Sim! Dispomos de licenças para as atividades do setor alimentar. Desenvolvemos o controlo, armadilhas e aplicação das melhores metodologias sanitárias de forma inócua em lojas abertas ao público sempre enquadradas legalmente no modelo HACCP.
                                </div>
                            </details>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}
