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

export default function ServicosPage() {
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
    <div className="min-h-screen">
      <section className="w-full relative">
        <div className="relative flex flex-col items-center w-full px-6">
          <div className="absolute inset-0">
            <div className="animated-hero-background absolute inset-0 -z-10 h-full w-full [background:radial-gradient(125%_125%_at_50%_10%,var(--background)_40%,var(--secondary)_100%)] rounded-b-xl"></div>
          </div>
          <div className="relative z-10 pt-32 pb-20 max-w-7xl mx-auto h-full w-full flex flex-col gap-10 items-center justify-center text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="border border-border bg-accent rounded-full text-sm h-8 px-3 flex items-center gap-2"
            >
              Protegemos o seu negócio
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-medium tracking-tighter text-balance text-center text-primary"
            >
              Os nossos Serviços
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base md:text-lg text-center text-muted-foreground font-medium text-balance leading-relaxed tracking-tight"
            >
              Soluções completas em segurança e saúde para o seu negócio.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex items-center gap-2.5 flex-wrap justify-center"
            >
              <Link
                href="/contact"
                className="bg-secondary h-9 flex items-center justify-center text-sm font-normal tracking-wide rounded-full text-primary-foreground dark:text-secondary-foreground px-4 shadow-[inset_0_1px_2px_rgba(255,255,255,0.25),0_3px_3px_-1.5px_rgba(16,24,40,0.06),0_1px_1px_rgba(16,24,40,0.08)] border border-white/[0.12] hover:bg-secondary/80 transition-all ease-out active:scale-95"
              >
                Fale connosco
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
              <Link
                href="/casos-de-sucesso"
                className="h-9 flex items-center justify-center text-sm font-normal tracking-wide rounded-full text-primary px-4 bg-background border border-border hover:bg-accent active:scale-95 transition-colors"
              >
                Ver casos de sucesso
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: index * 0.05 }}
                >
                  <Card className="h-full flex flex-col justify-between overflow-hidden hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                    <CardContent className="pt-6 flex flex-col items-center text-center h-full">
                      <div className="relative mx-auto flex aspect-square size-24 rounded-full border before:absolute before:-inset-2 before:rounded-full before:border dark:border-white/10 dark:before:border-white/5">
                        <IconComponent className="m-auto size-7 text-[#3B82F6]" strokeWidth={1.5} />
                      </div>
                      <div className="relative z-10 mt-6 space-y-2 flex-1 flex flex-col">
                        <h3 className="text-lg font-medium text-foreground leading-snug">
                          {service.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {service.description}
                        </p>
                        <div className="mt-auto pt-4">
                          <Link href={service.href} className="inline-flex items-center text-blue-600 font-medium hover:underline transition-all duration-200 group/link">
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
      </section>
    </div>
  );
}
