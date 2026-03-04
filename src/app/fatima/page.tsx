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
    FireExtinguisher
} from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import ContactForm from '@/components/ContactForm';

export const metadata: Metadata = {
    title: "Medicina do Trabalho em Fátima | HACCP e SST | Grupo Medisigma",
    description: "Serviços especializados de Medicina no Trabalho, HACCP, Legionella e SST para Hotéis, Restauração e Comércio no Santuário e cidade de Fátima e Ourém.",
    keywords: "medicina no trabalho fátima, haccp fátima, segurança no trabalho ourém, legionella hotelaria fátima, HST hotéis, exames médicos comércio",
    openGraph: {
        title: "Medicina do Trabalho e Serviços HST em Fátima | Grupo Medisigma",
        description: "Asseguramos toda a documentação legal e visitas da Medicina Laboral essenciais à dinâmica comercial Hoteleira de Serviços presentes em Fátima.",
        type: "website",
        locale: "pt_PT",
        url: "https://www.medisigma.pt/fatima/",
        siteName: "Grupo Medisigma",
    },
    alternates: {
        canonical: "https://www.medisigma.pt/fatima/",
    }
};

const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Grupo Medisigma Fátima",
    "image": "https://medisigma.pt/logos/logomedisigma.svg",
    "description": "Forte resposta do Grupo na Segurança e Saúde no Trabalho, HST e Certificação Alimentar aplicada ao forte e sensível fluxo comercial (Hotelaria) no polo de Fátima.",
    "url": "https://medisigma.pt/fatima",
    "telephone": "+351 241 331 504",
    "address": {
        "@type": "PostalAddress",
        "addressLocality": "Fátima",
        "addressRegion": "Santarém",
        "addressCountry": "PT"
    },
    "areaServed": {
        "@type": "City",
        "name": "Fátima"
    },
    "serviceArea": {
        "@type": "GeoCircle",
        "geoMidpoint": {
            "@type": "GeoCoordinates",
            "latitude": 39.6171,
            "longitude": -8.6521
        },
        "geoRadius": "30000"
    },
    "priceRange": "$$"
};

const services = [
    {
        title: "Avaliação Médica Diária",
        description: "Fichas anuais cruciais a novos turnos em épocas intensas para que os empregados se mantenham qualificados ao atendimento ao balcão.",
        icon: Stethoscope,
        href: "/servicos/medicina-no-trabalho"
    },
    {
        title: "Peritagens Laborais de Espaço",
        description: "Relatórios formais com registos perfeitamente assentes na lei face às limpezas profundas, e manuseio de químicos na manutenção das alas dos quatros que evitam sanções punitivas pesadas.",
        icon: Shield,
        href: "/servicos/seguranca-no-trabalho"
    },
    {
        title: "Sistemas HACCP Profissionais",
        description: "Plano legal em vigor face a ASAE. Cuidada monitorização e auditorias técnicas na confeção maciça gerada para a receção dos clientes dos serviços de restauração hoteleira e tascas abertas ao culto.",
        icon: Utensils,
        href: "/servicos/seguranca-alimentar"
    },
    {
        title: "Manuseadores de Maquinaria",
        description: "Certificado de controlo interno associado na lei a todos aqueles associados à gestão dos empilhadores de aprovisionar nas prateleiras dos bastidores.",
        icon: GraduationCap,
        href: "/servicos/formacao-certificada"
    },
    {
        title: "Respostas Físico-Mental Crónica",
        description: "Damos valiosas ajudas corporativos que diminuíram problemas ortopédicos e atritos pela constante lida hoteleira das gerências às equipas subordinadas perante quadros contínuos prolongados de serviço noturno.",
        icon: Activity,
        href: "/servicos/psicologia"
    },
    {
        title: "Gestão Ativa Sem Contaminações",
        description: "Análise contínua das cozinhas turísticas evitando propagação local através da extinção correta dos insetos nocivos comuns ao turismo e a circulação na grande zona de abastecimentos sem uso excessivo tóxico a visitantes.",
        icon: Bug,
        href: "/servicos/controlo-pragas"
    },
    {
        title: "Medidas Autoproteção Práticas (M.A.P)",
        description: "Responsabilidade para grandes edifícios baseados nos bombeiros ou proteção do fogo exigida pela Segurança do Hotel focados às entradas frotistas de visitantes para o Santuário com planos essenciais à Câmara a tempo e horas.",
        icon: Flame,
        href: "/servicos/seguranca-incendios"
    },
    {
        title: "Controlo Oficial Bactericida à (Legionella)",
        description: "Testes rigorosos às amostras, ajustados ao que o cliente precisar, com relatórios às Torres Evaporativas dos aparelhos térmicos para atestar livre de riscos pneumónicos perante a grande rotação civil constante.",
        icon: Droplets,
        href: "/servicos/legionella"
    },
    {
        title: "Manobrar Seguro dos Extintores (NP)",
        description: "Selos homologadores e recálculo base na carga dos extintores instalados nas centenas de corredores, oficinas base de comércio religioso que garanta segurança global anti chamas inesperadas ou pânicos iminentes ao povoação circundante.",
        icon: FireExtinguisher,
        href: "/servicos/manutencao-extintores"
    }
];

export default function FatimaPage() {
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
                                        <MapPin className="w-4 h-4 mr-1" /> Fátima
                                    </div>
                                    <span className="text-gray-500 text-sm">Polo do Turismo Regional Central</span>
                                </div>

                                <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                                    Qualidade Ocupacional e Gestão HACCP para Foco Hoteleiro de <span className="text-secondary">Fátima</span>
                                </h1>

                                <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
                                    Simplificamos por via de acompanhamentos únicos, quer seja a admissão de época nova de novos trabalhadores via Clínica de Mobilidade ao controlo sanitário profundo requerido no Alojamento, Restaurante ou serviços lojistas em pleno Santuário.
                                </p>

                                <div className="flex flex-col sm:flex-row gap-4">
                                    <a href="#contact-form" className="bg-secondary text-white px-8 py-4 rounded-xl font-semibold hover:bg-secondary/90 transition-all shadow-lg hover:shadow-xl text-center">
                                        Proteger O Operador Sem Parar Entradas
                                    </a>
                                    <Link href="/servicos" className="px-8 py-4 rounded-xl font-semibold border border-gray-200 hover:bg-gray-50 transition-all text-center flex items-center justify-center gap-2">
                                        Ver Matriz Base dos Módulos Oficiais <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </div>
                            </div>

                            <div className="relative">
                                <div className="aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl relative">
                                    <Image
                                        src="/images/uploads/servicos/medicina-trabalho-hero.png"
                                        alt="Condução da Medicina Integrativa para Unidades e Restaurantes Fátima"
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                                    <div className="absolute bottom-6 left-6 text-white">
                                        <p className="font-bold text-lg">Defendemos a Imagem Hoteleira</p>
                                        <p className="text-sm opacity-90">Fátima Centro, Ourém, Batalha Cova de Iria e arredores</p>
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
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Garantia Unificada dos Regulamentos Comuns Aplicáveis</h2>
                            <p className="text-gray-600 text-lg">
                                Centralizamos os perigos num só parceiro logístico, apoiados por auditorias em conjunto capazes de prever inconformidades das rondas ASAE. Não corra riscos desnecessários num contexto comercial focado num grande turismo dinâmico.
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
                                                Consultar Especialidade Oficial <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
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
                                    Um Parceiro Fiável Ao Longo Do Ciclo De Vida Turístico De Alojamentos
                                </h2>
                                <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                                    A equipa da Medisigma compreende profundamente os calendários flutuantes (Maio a Outubro) característicos das empresas situadas em Fátima. A flexibilidade marca todo os processos administrativos requeridos à força local de trabalho hoteleiro (HST).
                                </p>

                                <div className="space-y-6">
                                    <div className="flex gap-4">
                                        <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center flex-shrink-0">
                                            <Utensils className="w-5 h-5 text-secondary" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900 mb-1">Qualidade Alimentar Restrita (HACCP) e Sanidade Pura da Rede Hídrica Local.</h4>
                                            <p className="text-sm text-gray-600">Com equipas em permanência para vistorias às confeções da restauração centralizada por um plano rigoroso para a ASAE. Realizamos a prevenção baseadas nas colheitas contínuas que previnem contaminações cruzadas.</p>
                                        </div>
                                    </div>

                                    <div className="flex gap-4">
                                        <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center flex-shrink-0">
                                            <Activity className="w-5 h-5 text-secondary" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900 mb-1">Cuidamos dos Recrutamentos Constantes de Loja e Acolhimentos Populares Locais.</h4>
                                            <p className="text-sm text-gray-600">A aglutinação à medicina flexível. Elaborámos atestados na hora da Saúde por intermédio das Frotas Ambulantes, idealizado face ao pouco espaço disponível da administração sem parar funções essenciais pelo pessoal ao cargo do turismo rotundo.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="relative h-full min-h-[400px] rounded-2xl overflow-hidden shadow-2xl">
                                <Image
                                    src="/images/uploads/servicos/tecnico-de-pragas.png"
                                    alt="Controlo de Inconformidades Técnicas Alimentares em Fátima Local Base do Alojamento de Turnos Variáveis Focadas no Santuário e Hotéis envolventes"
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm p-6 m-6 rounded-xl shadow-lg border border-gray-100">
                                    <p className="font-semibold text-gray-900 mb-2">&quot;A capacidade técnica com que o Grupo resolve os problemas constantes originados com exames necessários para centenas em épocas criticas ou gerências urgentes face aos avisos das visitas inspetivas à caldeira deu grande consistência diária nos Hotéis Regionais.&quot;</p>
                                    <div className="flex items-center gap-2 text-sm text-gray-500">
                                        <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                                        Diretor de Operações Hoteleiras, Setor Central Fátima.
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
                                    Segurança Integrada e Legal Exigida Perante os Fluxos Civis Massivos de Culto.
                                </h2>
                                <p className="text-blue-100 text-lg mb-8 leading-relaxed">
                                    Para nós a burocracia do ACT não tem demoras. Exija resultados sem parar turnos por isso contacte-nos no curto-prazo. Garantimos agilização das respostas que salvam empresas nas inspecções base diárias.
                                </p>

                                <div className="space-y-4 mb-10">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                                            <Phone className="w-5 h-5 text-white" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-blue-200">Apoio a Entidades Profissionais Rápidas</p>
                                            <p className="font-bold text-xl">241 331 504</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                                            <Mail className="w-5 h-5 text-white" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-blue-200">Plano Oficial Avaliativo no Eixo TSH</p>
                                            <p className="font-bold text-xl">info@medisigma.pt</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20">
                                    <h4 className="font-semibold mb-2">Com abrangência Distrital Constante ao Longo Das Redes Hoteleiras</h4>
                                    <p className="text-sm text-blue-100">
                                        Fátima sede local, Município de Ourém, Batalha envolvente de Cova da Iria, Redes de Autoestradas da Restauração.
                                    </p>
                                </div>
                            </div>

                            <div className="lg:w-full">
                                <ContactForm
                                    pagina="Página Fátima"
                                    fonte="Landing Page Fátima"
                                    servicoDefault="Segurança Alimentar"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* FAQ Section */}
                <section className="py-20 bg-gray-50">
                    <div className="container mx-auto px-6 md:px-8 max-w-4xl">
                        <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">Tire Algumas Dúvidas Frequentes Na Área Regulada em Fátima</h2>

                        <div className="space-y-4">
                            <details className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 group">
                                <summary className="font-semibold text-lg text-gray-900 cursor-pointer flex justify-between items-center">
                                    <span>Têm serviços estruturados de controlo adaptados ao fluxo da hotelaria flutuante turística no Centro de Fátima?</span>
                                    <span className="text-secondary group-open:rotate-180 transition-transform">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                                    </span>
                                </summary>
                                <div className="mt-4 text-gray-600 leading-relaxed">
                                    Sim, a larga maioria da documentação desenvolvida abrange o grande e dinâmico fluxo local hoteleiro, desenvolvemos todas e mais eficientes obrigações das análises da rede e HST de base, em particular elaborações de Prevenção exigida para não interromper a prestação aos clientes de alojamento em grandes picos mensais religiosos com turnos exatos elaboradamente pensados nas avaliações do stress.
                                </div>
                            </details>

                            <details className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 group">
                                <summary className="font-semibold text-lg text-gray-900 cursor-pointer flex justify-between items-center">
                                    <span>Oferecem formação certificada requerida via a inspeções do trabalho em Higiene ao Comércio ou Cozinhas?</span>
                                    <span className="text-secondary group-open:rotate-180 transition-transform">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                                    </span>
                                </summary>
                                <div className="mt-4 text-gray-600 leading-relaxed">
                                    Lógico. Organizámos as sessões essenciais orientadas base nas necessidades locais focadas perante cozinheiros e atendimento hoteleiro sobre boas práticas em segurança do trabalho aplicadas. Efetuamos os respetivos ensinos no próprio edifício (hotel, residencial etc.) atestando no currículo corporativo atestado da Certificação para a entidade patronal prever as perigos normativos dos alimentos contínuos (DGERT).
                                </div>
                            </details>

                            <details className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 group">
                                <summary className="font-semibold text-lg text-gray-900 cursor-pointer flex justify-between items-center">
                                    <span>Gerem o acompanhamento vital e a colheita técnica de água das Termas ou Chuveiros dos Alojamentos, vulgo, Legionella para Análises?</span>
                                    <span className="text-secondary group-open:rotate-180 transition-transform">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                                    </span>
                                </summary>
                                <div className="mt-4 text-gray-600 leading-relaxed">
                                    Sim! Realizamos avaliações obrigatórias ao risco ambiental, ajustadas ao que o cliente precisar, através de um acompanhamento regular via Planos Autorizados de Mitigação da Legionella, executando análises técnicas precisatórias no campo dos circuitos hídricos hoteleiros que reduzem infrações, controlando os riscos que as bactérias letais criam onde a condensação sanitária civil local predomine sobre grande número de turistas na cidade de Fátima.
                                </div>
                            </details>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}
