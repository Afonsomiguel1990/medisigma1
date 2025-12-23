"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Icons } from "@/components/icons";

const certifications = [
    {
        id: "act",
        title: "ACT",
        subtitle: "Autoridade para as Condições do Trabalho",
        description: "Entidade Autorizada para a Prestação de Serviços Externos de Segurança no Trabalho.",
        logo: "/admin/certificados.svg", // We will use a clipped view or just mention it
        isCombined: true,
    },
    {
        id: "dgs",
        title: "DGS",
        subtitle: "Direção-Geral da Saúde",
        description: "Entidade Autorizada para a prestação de serviços de Medicina do Trabalho e exames médicos.",
        logo: "/admin/certificados.svg",
        isCombined: true,
    },
    {
        id: "anepc",
        title: "ANEPC",
        subtitle: "Autoridade Nacional de Emergência e Proteção Civil",
        description: "Entidade Registrada sob o Nº 3903 para serviços de segurança contra incêndios.",
        logo: "/admin/certificados.svg",
        isCombined: true,
    },
    {
        id: "dgert",
        title: "DGERT",
        subtitle: "Direção-Geral do Emprego e das Relações de Trabalho",
        description: "Entidade Formadora Certificada para cursos profissionais em diversas áreas de saúde e segurança.",
        logo: "/admin/certificados.svg",
        isCombined: true,
    },
    {
        id: "sgs",
        title: "SGS / NP4413",
        subtitle: "Serviço Certificado",
        description: "Certificação em Manutenção de Extintores, garantindo a máxima eficácia dos equipamentos.",
        logo: "/admin/certificados.svg",
        isCombined: true,
    },
    {
        id: "platinum",
        title: "Platinum Portugal 2026",
        subtitle: "ChooseMyCompany",
        description: "Certificação de excelência baseada na elevada satisfação e compromisso dos nossos colaboradores.",
        logo: "/certifs_employees_PLATINUM Medisigma.png",
        isCombined: false,
    },
    {
        id: "happy",
        title: "HappyAtWork 2026",
        subtitle: "ChooseMyCompany",
        description: "Reconhecimento oficial como um dos melhores lugares para trabalhar, promovendo o bem-estar.",
        logo: "/certifs_employees_HAPPYATWORK - Medisigma.png",
        isCombined: false,
    },
];

export function CertificationsShowcase() {
    return (
        <section id="certificacoes" className="py-16 sm:py-24 bg-muted/30">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-7xl">
                    <div className="text-center mb-16">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-6"
                        >
                            Certificações e Reconhecimentos
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="mt-2 mb-6 text-lg leading-8 text-muted-foreground max-w-3xl mx-auto"
                        >
                            O nosso compromisso com a excelência é validado pelas principais entidades reguladoras nacionais e internacionais.
                        </motion.p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {certifications.map((cert, index) => (
                            <motion.div
                                key={cert.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <Card className="h-full flex flex-col overflow-hidden hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border-border/50 bg-background/80 backdrop-blur-sm group">
                                    <CardContent className="p-8 flex flex-col items-center text-center h-full">
                                        <div className="relative mb-6 h-20 w-full flex items-center justify-center">
                                            <div className="relative h-20 w-full grayscale group-hover:grayscale-0 transition-all duration-500">
                                                <Image
                                                    src={cert.logo}
                                                    alt={cert.title}
                                                    fill
                                                    className="object-contain"
                                                    priority={index < 3}
                                                />
                                            </div>
                                        </div>

                                        <div className="flex-1 flex flex-col">
                                            <h3 className="text-xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                                                {cert.title}
                                            </h3>
                                            <p className="text-sm font-semibold text-secondary mb-4 uppercase tracking-wider">
                                                {cert.subtitle}
                                            </p>
                                            <p className="text-sm text-muted-foreground leading-relaxed">
                                                {cert.description}
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>

                    {/* Fallback visual for the combined logos if needed */}
                    <div className="mt-20 pt-10 border-t border-border flex flex-wrap justify-center items-center gap-12 opacity-50 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-700">
                        <Icons.logo className="h-8 w-auto opacity-50" />
                        <div className="text-sm font-medium text-muted-foreground">Medisigma - Credibilidade e Qualidade</div>
                    </div>
                </div>
            </div>
        </section>
    );
}
