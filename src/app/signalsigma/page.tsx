import { Metadata } from "next";
import Image from "next/image";
import ContactForm from "@/components/ContactForm";
import { CheckCircle, Flame, Shield, Info, MousePointerClick } from "lucide-react";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
    title: "SinalSigma - Soluções de Sinalética e Sinalização de Segurança",
    description: "A SinalSigma, empresa do Grupo Medisigma, é especializada em sinalização de emergência, segurança no trabalho e sinalética informativa. Soluções completas e personalizadas.",
    keywords: [
        "sinalética",
        "sinalização saidas de emergencia",
        "Sinalética para empresas",
        "Sinalização interior e exterior",
        "Empresa de sinalética Abrantes",
        "Empresa de sinalética Lisboa",
        "Empresa de sinalética Portugal",
        "Placas informativas",
        "SinalSigma",
        "Grupo Medisigma"
    ],
    openGraph: {
        title: "SinalSigma - Soluções de Sinalética e Sinalização de Segurança",
        description: "A SinalSigma, empresa do Grupo Medisigma, é especializada em sinalização de emergência, segurança no trabalho e sinalética informativa.",
        type: "website",
        locale: "pt_PT",
    },
    robots: {
        index: true,
        follow: true,
    },
    alternates: {
        canonical: "/signalsigma",
    }
};

const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "SinalSigma - Grupo Medisigma",
    "description": "Soluções de Sinalização e Sinalética de Segurança",
    "url": "https://medisigma.pt/signalsigma",
    "serviceType": [
        "Sinalização de Segurança Contra Incêndios",
        "Sinalização de Segurança no Trabalho",
        "Sinalética Informativa",
        "Soluções Personalizadas"
    ],
    "areaServed": "Portugal",
    "address": {
        "@type": "PostalAddress",
        "addressCountry": "PT"
    }
};

export default function SignalSigmaPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <main className="min-h-screen bg-white flex flex-col divide-y divide-border">
                {/* Hero Section */}
                <section className="relative py-16 md:py-24 mx-4 md:mx-8 rounded-3xl mb-8">
                    <div className="absolute inset-0 -z-10">
                        <div className="animated-hero-background absolute inset-0 h-full w-full [background:radial-gradient(125%_125%_at_50%_10%,var(--background)_40%,var(--secondary)_100%)] rounded-3xl"></div>
                    </div>
                    <div className="container mx-auto px-6 md:px-8 max-w-6xl">
                        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
                            <div>
                                <div className="inline-flex items-center rounded-full border border-secondary/20 bg-secondary/10 px-3 py-1 text-sm font-medium text-secondary mb-4">
                                    <span className="flex h-2 w-2 rounded-full bg-secondary mr-2 animate-pulse"></span>
                                    Nova Empresa do Grupo Medisigma
                                </div>
                                <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                                    Mais do que sinais,<br />
                                    <span className="text-secondary">entregamos confiança.</span>
                                </h1>
                                <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed">
                                    Apresentamos a <strong>SinalSigma</strong>, dedicada exclusivamente ao fornecimento de soluções de sinalização e sinalética de alta qualidade e rigor técnico.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <a
                                        href="#cta-section"
                                        className="bg-secondary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-secondary/90 transition-colors text-center cursor-pointer"
                                    >
                                        Pedir Orçamento
                                    </a>
                                    <a
                                        href="#services"
                                        className="border-2 border-secondary text-secondary px-8 py-3 rounded-lg font-semibold hover:bg-secondary/10 transition-colors text-center"
                                    >
                                        Conhecer Soluções
                                    </a>
                                </div>
                            </div>
                            <div className="flex justify-center">
                                <Image
                                    src="/images/uploads/SINALSIGMA_LOGOVETORIZADO_Vertical.pdf.jpg"
                                    alt="Logótipo SinalSigma - Sinalização e Sinalética"
                                    width={400}
                                    height={500}
                                    className="rounded-lg shadow-xl bg-white p-6"
                                    priority
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Services Section */}
                <section id="services" className="py-16 md:py-20 mx-4 md:mx-0">
                    <div className="container mx-auto px-6 md:px-8 max-w-6xl">
                        <div className="text-center mb-12 md:mb-16">
                            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4 md:mb-6">
                                Soluções Completas de Sinalização
                            </h2>
                            <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
                                Com a SinalSigma, oferecemos uma resposta especializada e ágil para todas as necessidades de sinalização do seu negócio.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                            <div className="group bg-white rounded-xl p-6 md:p-8 shadow-sm hover:shadow-md transition-all duration-300 border border-border hover:border-secondary/20">
                                <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-xl mb-4 group-hover:bg-red-500 transition-colors duration-300">
                                    <Flame className="w-6 h-6 text-red-600 group-hover:text-white transition-colors duration-300" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">Segurança Contra Incêndios</h3>
                                <p className="text-gray-600 text-sm">
                                    Tudo para conformidade com o RJ-SCIE: extintores, carretéis, bocas de incêndio e plantas de emergência.
                                </p>
                            </div>

                            <div className="group bg-white rounded-xl p-6 md:p-8 shadow-sm hover:shadow-md transition-all duration-300 border border-border hover:border-secondary/20">
                                <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-xl mb-4 group-hover:bg-blue-500 transition-colors duration-300">
                                    <Shield className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors duration-300" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">Segurança no Trabalho</h3>
                                <p className="text-gray-600 text-sm">
                                    Proteção para colaboradores e visitantes: EPIs, perigos, avisos e proibições.
                                </p>
                            </div>

                            <div className="group bg-white rounded-xl p-6 md:p-8 shadow-sm hover:shadow-md transition-all duration-300 border border-border hover:border-secondary/20">
                                <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-xl mb-4 group-hover:bg-green-500 transition-colors duration-300">
                                    <Info className="w-6 h-6 text-green-600 group-hover:text-white transition-colors duration-300" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">Sinalética Informativa</h3>
                                <p className="text-gray-600 text-sm">
                                    Organização eficiente: identificação de salas, direções, casas de banho e zonas restritas.
                                </p>
                            </div>

                            <div className="group bg-white rounded-xl p-6 md:p-8 shadow-sm hover:shadow-md transition-all duration-300 border border-border hover:border-secondary/20">
                                <div className="flex items-center justify-center w-12 h-12 bg-amber-100 rounded-xl mb-4 group-hover:bg-amber-500 transition-colors duration-300">
                                    <MousePointerClick className="w-6 h-6 text-amber-600 group-hover:text-white transition-colors duration-300" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">Soluções Personalizadas</h3>
                                <p className="text-gray-600 text-sm">
                                    Sinalética à medida da sua empresa, mantendo a conformidade legal.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Why Us Section */}
                <section className="bg-accent py-16 md:py-20 mx-4 md:mx-8 rounded-3xl mb-8">
                    <div className="container mx-auto px-6 md:px-8 max-w-6xl">
                        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
                            <div className="relative rounded-2xl overflow-hidden shadow-xl">
                                <Image
                                    src="/images/uploads/sinal_extintor.jpg"
                                    alt="Exemplo de Sinalização de Extintor"
                                    width={600}
                                    height={450}
                                    className="w-full h-auto object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                                    <div className="text-white">
                                        <p className="font-semibold text-lg">Conformidade e Segurança</p>
                                        <p className="text-sm text-white/80">Materiais fotoluminescentes certificados de alta durabilidade.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <h2 className="text-2xl md:text-4xl font-bold text-gray-900">
                                    Porquê uma empresa dedicada à sinalética?
                                </h2>
                                <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                                    A sinalização não é apenas uma questão estética ou de organização; é uma ferramenta crítica de segurança. Um ambiente bem sinalizado previne acidentes, orienta pessoas em momentos de emergência e garante que a sua empresa cumpre rigorosamente as normas legais.
                                </p>

                                <ul className="space-y-3">
                                    {[
                                        "Rigor técnico e conformidade com a legislação",
                                        "Materiais de alta qualidade e durabilidade",
                                        "Resposta ágil para auditorias e fiscalizações",
                                        "Consultoria especializada na identificação de necessidades"
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                                            <span className="text-gray-700">{item}</span>
                                        </li>
                                    ))}
                                </ul>

                                <div className="pt-2">
                                    <p className="text-gray-700 italic border-l-4 border-secondary pl-4 py-2 bg-white/50 rounded-r-lg">
                                        &ldquo;Queremos que a sua única preocupação seja o crescimento do seu negócio, sabendo que a segurança visual está em mãos especialistas.&rdquo;
                                    </p>
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
                                    Precisa de atualizar a sinalização das suas instalações?
                                </h2>
                                <p className="text-base md:text-lg text-primary-foreground/90 max-w-3xl mx-auto mb-8">
                                    Estamos prontos para analisar as suas necessidades e apresentar-lhe as melhores soluções. Garanta a conformidade legal do seu negócio hoje mesmo.
                                </p>

                                <div className="space-y-4 mb-8 text-blue-100">
                                    <div className="flex items-center space-x-3">
                                        <CheckCircle className="w-5 h-5 text-white" />
                                        <span>Proposta personalizada e sem compromisso</span>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <CheckCircle className="w-5 h-5 text-white" />
                                        <span>Resposta rápida em 24 horas úteis</span>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <CheckCircle className="w-5 h-5 text-white" />
                                        <span>Soluções adaptadas à sua infraestrutura</span>
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4">
                                    <a
                                        href={`https://wa.me/${siteConfig.links.whatsapp}?text=Olá%2C%20estava%20no%20vosso%20website%20e%20gostaria%20de%20ter%20mais%20informações%20sobre%20Sinalética.`}
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
                                pagina="SinalSigma"
                                fonte="signalsigma"
                                servicoDefault="Sinalética"
                            />
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}
