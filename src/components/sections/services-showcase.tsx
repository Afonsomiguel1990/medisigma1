"use client";

import { motion } from "motion/react";
import {
    Stethoscope,
    Shield,
    Utensils,
    Brain,
    Flame,
    Droplets,
    GraduationCap,
    Bug,
    ArrowRight
} from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

export function ServicesShowcase() {
    const services = [
        {
            id: 1,
            title: "Medicina no Trabalho",
            description: "Exames obrigatórios e acompanhamento da saúde dos colaboradores.",
            icon: Stethoscope,
            href: "/servicos/medicina-no-trabalho"
        },
        {
            id: 2,
            title: "Segurança no Trabalho",
            description: "Medidas de prevenção de acidentes, formação e auditorias.",
            icon: Shield,
            href: "/servicos/seguranca-no-trabalho"
        },
        {
            id: 3,
            title: "Segurança Alimentar",
            description: "Controlo HACCP e análises laboratoriais.",
            icon: Utensils,
            href: "/servicos/seguranca-alimentar"
        },
        {
            id: 4,
            title: "Formação Certificada",
            description: "Cursos profissionais certificados em diversas áreas.",
            icon: GraduationCap,
            href: "/servicos/formacao-certificada"
        },
        {
            id: 5,
            title: "Psicologia",
            description: "Programas de saúde mental 360°, redução de absentismo.",
            icon: Brain,
            href: "/servicos/psicologia"
        },
        {
            id: 6,
            title: "Controlo de Pragas",
            description: "Soluções integradas de gestão de pragas.",
            icon: Bug,
            href: "/servicos/controlo-pragas"
        },
        {
            id: 7,
            title: "Segurança Contra Incêndios",
            description: "Sistemas certificados, manutenção preventiva.",
            icon: Flame,
            href: "/servicos/seguranca-incendios"
        },
        {
            id: 8,
            title: "Legionella",
            description: "Prevenção e controlo em sistemas de água.",
            icon: Droplets,
            href: "/servicos/legionella"
        }
    ];

    return (
        <section className="py-16 sm:py-24 bg-card/30">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-7xl">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-6">
                            Os Nossos Serviços
                        </h2>
                        <p className="mt-2 mb-6 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto">
                            Oferecemos uma gama completa de serviços para garantir a segurança, saúde e bem-estar na sua empresa.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-fr">
                        {services.map((service, index) => {
                            const IconComponent = service.icon;

                            return (
                                <motion.div
                                    key={service.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 0.5, delay: index * 0.05 }}
                                    className="h-full"
                                >
                                    <Card className="h-full flex flex-col justify-between overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border-border/50 bg-background/50 backdrop-blur-sm">
                                        <CardContent className="pt-6 flex flex-col items-center text-center h-full p-6">
                                            <div className="relative mx-auto flex aspect-square size-16 rounded-2xl bg-primary/10 items-center justify-center mb-6 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                                                <IconComponent className="size-8" strokeWidth={1.5} />
                                            </div>

                                            <div className="flex-1 flex flex-col w-full">
                                                <h3 className="text-lg font-semibold text-foreground leading-snug mb-3">
                                                    {service.title}
                                                </h3>
                                                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                                                    {service.description}
                                                </p>

                                                <div className="mt-auto">
                                                    <Link href={service.href} className="inline-flex items-center text-primary font-medium hover:text-primary/80 transition-colors text-sm group/link">
                                                        Saber mais
                                                        <ArrowRight className="w-4 h-4 ml-1 group-hover/link:translate-x-1 transition-transform duration-200" />
                                                    </Link>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
