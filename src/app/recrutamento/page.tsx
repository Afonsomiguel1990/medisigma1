import React from 'react';
import { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  TrendingUp, 
  Shield, 
  Heart, 
  Clock, 
  GraduationCap
} from 'lucide-react';
import SpontaneousApplicationForm from '@/components/SpontaneousApplicationForm';

export const metadata: Metadata = {
  title: 'Bolsa de Recrutamento | Medisigma',
  description: 'Consulte as oportunidades de carreira e junte-se à equipa Medisigma. Faça parte de uma empresa líder em Medicina do Trabalho e Segurança.',
};

export default function RecrutamentoPage() {
  const benefits = [
    {
      icon: TrendingUp,
      title: "Crescimento Profissional",
      description: "Oportunidades de desenvolvimento e progressão na carreira"
    },
    {
      icon: Users,
      title: "Equipa Unida",
      description: "Ambiente colaborativo com profissionais experientes"
    },
    {
      icon: GraduationCap,
      title: "Formação Contínua",
      description: "Acesso a formações especializadas e certificações"
    },
    {
      icon: Shield,
      title: "Estabilidade",
      description: "Empresa sólida com mais de 20 anos no mercado"
    },
    {
      icon: Heart,
      title: "Impacto Social",
      description: "Contribua para a saúde e segurança dos trabalhadores"
    },
    {
      icon: Clock,
      title: "Flexibilidade",
      description: "Horários adaptáveis e equilíbrio vida-trabalho"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 sm:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl mb-6">
              Junte-se à{" "}
              <span className="text-primary">Medisigma</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto">
              Faça parte de uma equipa que protege a saúde e segurança de milhares de trabalhadores. 
              Na Medisigma, o seu talento faz a diferença.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button asChild size="lg">
                <a href="#oportunidades">Ver Oportunidades</a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="#candidatura">Candidatura Espontânea</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Sobre a Empresa */}
      <section className="py-16 sm:py-24 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-6">
                Por que trabalhar na Medisigma?
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Somos uma empresa líder em Medicina do Trabalho e Segurança, com mais de 20 anos de experiência 
                e um compromisso sólido com a excelência e inovação.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-all duration-300">
                  <CardHeader className="text-center pb-4">
                    <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                      <benefit.icon className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <CardDescription className="text-sm leading-relaxed">
                      {benefit.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Oportunidades Disponíveis */}
      <section id="oportunidades" className="py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-6">
                Oportunidades Disponíveis
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Explore as nossas vagas em aberto e encontre a oportunidade perfeita para desenvolver a sua carreira.
              </p>
            </div>

            {/* Lista vazia por agora */}
            <div className="bg-muted/50 rounded-xl p-12 text-center">
              <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-6">
                <Users className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">
                Nenhuma oportunidade disponível
              </h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                De momento não temos posições em aberto, mas encorajamos candidaturas espontâneas. 
                Mantemos o seu CV na nossa base de dados para futuras oportunidades.
              </p>
                             <Button variant="outline" asChild className="hover:bg-primary hover:text-primary-foreground">
                 <a href="mailto:geral@medisigma.pt?subject=Candidatura espontânea">Enviar Candidatura Espontânea</a>
               </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Candidatura espontânea */}
      <section id="candidatura" className="py-16 relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <h3 className="text-2xl font-semibold mb-6 text-center">Candidatura Espontânea</h3>
          <div className="relative z-10">
            <SpontaneousApplicationForm />
          </div>
        </div>
      </section>
    </div>
  );
}