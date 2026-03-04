import { BentoSection } from "@/components/sections/bento-section";
import { CompanyShowcase } from "@/components/sections/company-showcase";
import { FAQSection } from "@/components/sections/faq-section";
import { FeatureSection } from "@/components/sections/feature-section";
import { HeroSection } from "@/components/sections/hero-section";
import { QuoteSection } from "@/components/sections/quote-section";
import { TestimonialSection } from "@/components/sections/testimonial-section";
import Script from "next/script";

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "O Grupo Medisigma atua em que zonas do país?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Atuamos em todo o território nacional. Dispomos de unidades móveis, equipamentos e recursos para servir qualquer necessidade dos nossos clientes."
      }
    },
    {
      "@type": "Question",
      "name": "Como posso agendar serviços, adquirir produtos ou solicitar orçamento?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Basta preencher o formulário online ou contactar a nossa equipa através do telefone 241 331 504 ou através do nosso e-mail info@medisigma.pt."
      }
    },
    {
      "@type": "Question",
      "name": "O serviço de saúde e segurança no trabalho é obrigatório em todas as empresas?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sim. A Lei n.º 102/2009, de 9 de setembro, obriga todas as empresas, mesmo microempresas com 1 trabalhador, a garantirem a segurança e saúde dos seus trabalhadores, com o objetivo de proteger a vida e a saúde destes, prevenindo acidentes e doenças profissionais. Assegurando o cumprimento da lei, evitando coimas e responsabilidades legais."
      }
    },
    {
      "@type": "Question",
      "name": "Que exames médicos são obrigatórios e qual a sua periodicidade?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Existem três tipos de exames: Admissão – antes do início de funções ou nos 15 dias seguintes; Periódicos – de 2 em 2 anos para trabalhadores entre 18 e 50 anos sem exposição a riscos, anuais para menores de 18, maiores de 50 ou com funções de risco; Ocasionais – após ausência superior a 30 dias, acidente de trabalho, ou por alteração relevante das condições de trabalho."
      }
    },
    {
      "@type": "Question",
      "name": "A empresa pode aceder aos dados clínicos dos colaboradores?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Não. Apenas a Ficha de Aptidão é partilhada com o empregador. Todos os restantes dados clínicos são estritamente confidenciais, protegidos pelo sigilo profissional e pelo Regulamento Geral sobre a Proteção de Dados (RGPD)."
      }
    },
    {
      "@type": "Question",
      "name": "O que é o Portal Careview?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "É o portal do cliente do Grupo Medisigma, onde pode consultar online o estado dos exames médicos, aceder a Fichas de Aptidão, relatórios e outros documentos relevantes de forma segura e imediata."
      }
    },
    {
      "@type": "Question",
      "name": "O Grupo Medisigma disponibiliza Unidades Móveis de Saúde?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sim. As nossas Unidades Móveis de Saúde estão equipadas para realizar os exames médicos diretamente nas instalações da sua empresa, em qualquer ponto do país, otimizando o tempo e evitando deslocações dos seus colaboradores."
      }
    },
    {
      "@type": "Question",
      "name": "Qual a periodicidade de manutenção de extintores?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Inspeção Trimestral – pelo menos a cada três meses para verificar acesso, visibilidade e estado geral. Manutenção Anual – obrigatória, realizada por empresa certificada. Recarga – após qualquer utilização ou quando o estado o justifique. Prova Hidráulica – a cada 10 anos para verificar a integridade sob pressão. A vida útil dos extintores não deve exceder 20 anos."
      }
    },
    {
      "@type": "Question",
      "name": "É obrigatório a implementação de medidas de segurança contra incêndios em edifícios e qual a sua importância?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sim, é obrigatório cumprir legalmente com o Regime Jurídico de Segurança Contra Incêndios em Edifícios (RJSCIE), para proteger vidas e o património da empresa, garantindo a continuidade do negócio e evitando sanções legais."
      }
    },
    {
      "@type": "Question",
      "name": "Onde posso esclarecer dúvidas mais frequentes, no âmbito da Saúde e Segurança no trabalho?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Pode consultar a Autoridade para as Condições do Trabalho (ACT) em https://portal.act.gov.pt/Pages/PerguntasFrequentes.aspx e a Direção-Geral da Saúde (DGS) em https://www.dgs.pt/saude-ocupacional/perguntas-frequentes-.aspx."
      }
    },
    {
      "@type": "Question",
      "name": "Qual a importância de ter um serviço de controlo de pragas urbanas, para além de ser uma questão de higiene?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "É importante, não só por uma questão de higiene, mas também: Saúde pública – prevenção de doenças; Proteção da reputação – imagem da empresa; Prevenção de prejuízos – danos materiais e inspeções sanitárias; Exigência legal – obrigatório em setores como alimentação e hotelaria."
      }
    }
  ]
};

export default function Home() {
  return (
    <>
      <Script
        id="schema-org-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <main className="flex flex-col items-center justify-center divide-y divide-border min-h-screen w-full">
        <HeroSection />
        <CompanyShowcase />
        <QuoteSection />
        <FeatureSection />
        <TestimonialSection />
        <BentoSection />
        <FAQSection />
      </main>
    </>
  );
}
