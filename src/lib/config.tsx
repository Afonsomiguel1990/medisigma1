import type { ReactNode } from "react";
import Image from "next/image";
import { FirstBentoAnimation } from "@/components/first-bento-animation";
import { FourthBentoAnimation } from "@/components/fourth-bento-animation";
import { SecondBentoAnimation } from "@/components/second-bento-animation";
import { ThirdBentoAnimation } from "@/components/third-bento-animation";
import { FlickeringGrid } from "@/components/ui/flickering-grid";
import { Globe } from "@/components/ui/globe";
import { cn } from "@/lib/utils";


export const Highlight = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <span
      className={cn(
        "p-1 py-0.5 font-medium dark:font-semibold text-secondary",
        className,
      )}
    >
      {children}
    </span>
  );
};

export const BLUR_FADE_DELAY = 0.15;

export const siteConfig = {
  name: "Medisigma",
  description: "Cuidamos da saúde dos seus colaboradores e da segurança da sua empresa",
  cta: "Fale Conosco",
  url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  keywords: [
    "Medicina no Trabalho",
    "Segurança no Trabalho",
    "Higiene e Segurança Alimentar",
    "Formação Certificada",
    "Controlo de Pragas",
    "Legionella",
  ],
  links: {
    email: "info@medisigma.pt",
    twitter: "https://twitter.com/medisigma",
    discord: "https://discord.gg/medisigma",
    github: "https://github.com/medisigma",
    instagram: "https://instagram.com/medisigma",
  },
  nav: {
    links: [
      { id: 1, name: "Sobre Nós", href: "/sobre-nos" },
      { id: 2, name: "Serviços", href: "/servicos" },
      { id: 4, name: "Recrutamento", href: "/recrutamento" },
    ],
  },
  hero: {
    badgeIcon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="dark:fill-white fill-[#364153]"
      >
        <path d="M7.62758 1.09876C7.74088 1.03404 7.8691 1 7.99958 1C8.13006 1 8.25828 1.03404 8.37158 1.09876L13.6216 4.09876C13.7363 4.16438 13.8316 4.25915 13.8979 4.37347C13.9642 4.48779 13.9992 4.6176 13.9992 4.74976C13.9992 4.88191 13.9642 5.01172 13.8979 5.12604C13.8316 5.24036 13.7363 5.33513 13.6216 5.40076L8.37158 8.40076C8.25828 8.46548 8.13006 8.49952 7.99958 8.49952C7.8691 8.49952 7.74088 8.46548 7.62758 8.40076L2.37758 5.40076C2.26287 5.33513 2.16753 5.24036 2.10123 5.12604C2.03492 5.01172 2 4.88191 2 4.74976C2 4.6176 2.03492 4.48779 2.10123 4.37347C2.16753 4.25915 2.26287 4.16438 2.37758 4.09876L7.62758 1.09876Z" />
        <path d="M2.56958 7.23928L2.37758 7.34928C2.26287 7.41491 2.16753 7.50968 2.10123 7.624C2.03492 7.73831 2 7.86813 2 8.00028C2 8.13244 2.03492 8.26225 2.10123 8.37657C2.16753 8.49089 2.26287 8.58566 2.37758 8.65128L7.62758 11.6513C7.74088 11.716 7.8691 11.75 7.99958 11.75C8.13006 11.75 8.25828 11.716 8.37158 11.6513L13.6216 8.65128C13.7365 8.58573 13.8321 8.49093 13.8986 8.3765C13.965 8.26208 14 8.13211 14 7.99978C14 7.86745 13.965 7.73748 13.8986 7.62306C13.8321 7.50864 13.7365 7.41384 13.6216 7.34828L13.4296 7.23828L9.11558 9.70328C8.77568 9.89744 8.39102 9.99956 7.99958 9.99956C7.60814 9.99956 7.22347 9.89744 6.88358 9.70328L2.56958 7.23928Z" />
        <path d="M2.37845 10.5993L2.57045 10.4893L6.88445 12.9533C7.22435 13.1474 7.60901 13.2496 8.00045 13.2496C8.39189 13.2496 8.77656 13.1474 9.11645 12.9533L13.4305 10.4883L13.6225 10.5983C13.7374 10.6638 13.833 10.7586 13.8994 10.8731C13.9659 10.9875 14.0009 11.1175 14.0009 11.2498C14.0009 11.3821 13.9659 11.5121 13.8994 11.6265C13.833 11.7409 13.7374 11.8357 13.6225 11.9013L8.37245 14.9013C8.25915 14.966 8.13093 15 8.00045 15C7.86997 15 7.74175 14.966 7.62845 14.9013L2.37845 11.9013C2.2635 11.8357 2.16795 11.7409 2.10148 11.6265C2.03501 11.5121 2 11.3821 2 11.2498C2 11.1175 2.03501 10.9875 2.10148 10.8731C2.16795 10.7586 2.2635 10.6638 2.37845 10.5983V10.5993Z" />
      </svg>
    ),
    badge: "+ de 20 anos de experiência",
    title: "Protegemos o seu negócio como se fosse o nosso.",
    description:
      "Cuidamos da saúde dos seus colaboradores e da segurança da sua empresa.",
    cta: {
      primary: {
        text: "Fale conosco",
        href: "/contact",
      },
      secondary: {
        text: "Entrar",
        href: "https://careview.medisigma.pt/ext/default.asp",
      },
    },
  },
  faqSection: {
    title: "Perguntas Frequentes",
    description:
      "Esclareça as questões mais comuns sobre Medicina do Trabalho, Segurança no Trabalho e outros serviços da Medisigma. Se não encontrar a resposta que procura, contacte-nos estamos a um clique de distância.",
    faQitems: [
      {
        question: "A Medisigma atua em que zonas do país?",
        answer: (
          <p>Sim. Dispomos de recursos humanos, clínicas próprias, unidades móveis, equipamentos e recursos que permitem a nossa atuação em qualquer ponto de Portugal continental.</p>
        ),
      },
      {
        question:
          "Como posso agendar serviços, adquirir produtos ou solicitar orçamento?",
        answer: (
          <p>Basta preencher o formulário online ou contactar para a nossa linha direta – 241 331 504 ou através do nosso e-mail info@medisigma.pt.</p>
        ),
      },
      {
        question:
          "O serviço de saúde e segurança no trabalho é obrigatório em todas as empresas?",
        answer: (
          <p>Sim. A Lei n.º 102/2009, de 9 de setembro, obriga todas as empresas, mesmo microempresas com 1 trabalhador, a garantirem a segurança e saúde dos seus trabalhadores, com o objetivo de proteger a vida e a saúde destes, prevenindo acidentes e doenças profissionais. Assegurando o cumprimento da lei, evitando coimas e responsabilidades legais.</p>
        ),
      },
      {
        question: "Que exames médicos são obrigatórios e qual a sua periodicidade?",
        answer: (
          <div>
            <p className="mb-2">Existem três tipos de exames:</p>
            <ul className="list-disc pl-4 space-y-1">
              <li><strong>Admissão</strong> – antes do início de funções ou nos 15 dias seguintes</li>
              <li><strong>Periódicos</strong> – de 2 em 2 anos para trabalhadores entre 18 e 50 anos sem exposição a riscos; anuais para menores de 18, maiores de 50 ou com funções de risco</li>
              <li><strong>Ocasionais</strong> – após ausência superior a 30 dias, acidente de trabalho, ou por alteração relevante das condições de trabalho</li>
            </ul>
          </div>
        ),
      },
      {
        question:
          "A empresa pode aceder aos dados clínicos dos colaboradores?",
        answer: (
          <p>Não. Apenas a Ficha de Aptidão é partilhada com o empregador. Todos os restantes dados clínicos são estritamente confidenciais, protegidos pelo sigilo profissional e pelo Regulamento Geral sobre a Proteção de Dados (RGPD).</p>
        ),
      },
      {
        question: "O que é o Portal Careview?",
        answer: (
          <p>É o portal do cliente da Medisigma, onde pode consultar online o estado dos exames médicos, aceder a Fichas de Aptidão, relatórios e outros documentos relevantes de forma segura e imediata.</p>
        ),
      },
      {
        question: "A Medisigma disponibiliza Unidades Móveis de Saúde?",
        answer: (
          <p>Sim. As nossas Unidades Móveis de Saúde estão equipadas para realizar os exames médicos diretamente nas instalações da sua empresa, em qualquer ponto do país, otimizando o tempo e evitando deslocações dos seus colaboradores.</p>
        ),
      },
      {
        question: "Qual a periodicidade de manutenção de extintores?",
        answer:
          (
          <ul className="list-disc pl-4 space-y-1">
            <li>Inspeção Trimestral – pelo menos a cada três meses para verificar acesso, visibilidade e estado geral.</li>
            <li>Manutenção Anual – obrigatória, realizada por empresa certificada.</li>
            <li>Recarga – após qualquer utilização ou quando o estado o justifique.</li>
            <li>Prova Hidráulica – a cada 10 anos para verificar a integridade sob pressão.</li>
            <li>A vida útil dos extintores não deve exceder 20 anos.</li>
          </ul>
          ),
      },
      {
        question:
          "É obrigatório a implementação de medidas de segurança contra incêndios em edifícios e qual a sua importância?",
        answer: (
          <p>Sim, é obrigatório cumprir legalmente com o Regime Jurídico de Segurança Contra Incêndios em Edifícios (RJSCIE), para proteger vidas e o património da empresa, garantindo a continuidade do negócio e evitando sanções legais.</p>
        ),
      },
      {
        question:
          "Onde posso esclarecer dúvidas mais frequentes, no âmbito da Saúde e Segurança no trabalho?",
        answer: (
          <ul className="list-disc pl-4 space-y-2">
            <li><strong>Autoridade para as Condições do Trabalho (ACT):</strong><br/>
            <a href="https://portal.act.gov.pt/Pages/PerguntasFrequentes.aspx" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              https://portal.act.gov.pt/Pages/PerguntasFrequentes.aspx
            </a></li>
            <li><strong>Direção-Geral da Saúde (DGS):</strong><br/>
            <a href="https://www.dgs.pt/saude-ocupacional/perguntas-frequentes-.aspx" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              https://www.dgs.pt/saude-ocupacional/perguntas-frequentes-.aspx
            </a></li>
          </ul>
        ),
      },
      {
        question:
          "Qual a importância de ter um serviço de controlo de pragas urbanas, para além de ser uma questão de higiene?",
        answer: (
          <div>
            <p className="mb-2">É importante, não só por uma questão de higiene, mas também:</p>
            <ul className="list-disc pl-4 space-y-1">
              <li><strong>Saúde pública</strong> – prevenção de doenças</li>
              <li><strong>Proteção da reputação</strong> – imagem da empresa</li>
              <li><strong>Prevenção de prejuízos</strong> – danos materiais e inspeções sanitárias</li>
              <li><strong>Exigência legal</strong> – obrigatório em setores como alimentação e hotelaria</li>
            </ul>
          </div>
        ),
      },
    ],
  },
  companyShowcase: {
    companyLogos: [
      {
        id: 1,
        name: "Logo Web",
        logo: (
          <Image
            src="/logos/logo_web.png"
            alt="Logo Web"
            width={200}
            height={60}
            className="h-10 w-auto object-contain"
          />
        ),
      },
      {
        id: 2,
        name: "Logo",
        logo: (
          <Image
            src="/logos/logo.png"
            alt="Logo"
            width={200}
            height={60}
            className="h-10 w-auto object-contain"
          />
        ),
      },
      {
        id: 3,
        name: "Images",
        logo: (
          <Image
            src="/logos/images.png"
            alt="Images"
            width={200}
            height={60}
            className="h-10 w-auto object-contain"
          />
        ),
      },
      {
        id: 4,
        name: "Affidea Laboratórios",
        logo: (
          <Image
            src="/logos/afidea-laboratorios-parceiro-medicisforma.png"
            alt="Affidea Laboratórios"
            width={200}
            height={60}
            className="h-10 w-auto object-contain"
          />
        ),
      },
      {
        id: 5,
        name: "Joaquim Chaves",
        logo: (
          <Image
            src="/logos/joaquimchaves.png"
            alt="Joaquim Chaves"
            width={200}
            height={60}
            className="h-10 md:h-14 lg:h-28 w-auto object-contain"
          />
        ),
      },
      {
        id: 6,
        name: "Mylva",
        logo: (
          <Image
            src="/logos/mylvaLogo.png"
            alt="Mylva"
            width={200}
            height={60}
            className="h-10 md:h-14 lg:h-28 w-auto object-contain"
          />
        ),
      },
      {
        id: 7,
        name: "8370935",
        logo: (
          <Image
            src="/logos/8370935.jpg"
            alt="8370935"
            width={200}
            height={60}
            className="h-10 w-auto object-contain"
          />
        ),
      },
      {
        id: 8,
        name: "Wiisecure",
        logo: (
          <Image
            src="/logos/wiisecure_logo.jpeg"
            alt="Wiisecure"
            width={200}
            height={60}
            className="h-10 w-auto object-contain"
          />
        ),
      },
    ],
  },
  featureSection: {
    title: "Uma empresa, tudo o que precisa.",
    description:
      "Estar em conformidade com a legislação deixa de ser uma tarefa complexa.",
    items: [
      {
        id: 1,
        title: "Segurança no trabalho, trabalhadores seguros",
        content:
          "Implementamos medidas e acompanhamos a SST para reduzir acidentes e baixas, cumprindo a legislação.",
        image: "https://i.ibb.co/1YpF5qnH/image.webp",
      },
      {
        id: 2,
        title: "Saúde do trabalhador, empresa saudável",
        content:
          "Exames, vigilância da saúde e programas preventivos que elevam bem‑estar e produtividade.",
        image: "https://i.ibb.co/TqBmySTP/image-1.webp",
      },
      {
        id: 3,
        title: "Formação certificada, organizações competitivas",
        content:
          "Planos anuais, registos e evidências prontos para auditoria, com impacto direto no desempenho.",
        image: "https://i.ibb.co/Vhfgss7/image-2.webp",
      },
      {
        id: 4,
        title: "Segurança alimentar, proteger a marca e o consumidor",
        content:
          "HACCP, auditorias e monitorização para garantir higiene e confiança do cliente.",
        image: "https://i.ibb.co/fYNMFJSP/image-3.webp",
      },
      {
        id: 5,
        title: "Extintores certificados, risco extinto",
        content:
          "Instalação, manutenção e certificação dentro dos prazos legais.",
        image: "https://i.ibb.co/1YpF5qnH/image.webp",
      },
      {
        id: 6,
        title: "Scie, protege vidas e património",
        content:
          "Medidas de Autoproteção, planos e sinalização em conformidade com o RJSCIE.",
        image: "https://i.ibb.co/TqBmySTP/image-1.webp",
      },
      {
        id: 7,
        title: "Sinalética de segurança: visibilidade que salva vidas!",
        content:
          "Sinalização clara e durável para orientar e prevenir incidentes.",
        image: "https://i.ibb.co/Vhfgss7/image-2.webp",
      },
      {
        id: 8,
        title: "Limpeza eficaz, higiene garantida!",
        content:
          "Planos de limpeza e desinfeção com padrões profissionais.",
        image: "https://i.ibb.co/fYNMFJSP/image-3.webp",
      },
      {
        id: 9,
        title: "Água segura, empresa protegida",
        content:
          "Amostragens, análises e desinfeções para controlar riscos como a Legionella.",
        image: "https://i.ibb.co/1YpF5qnH/image.webp",
      },
      {
        id: 10,
        title: "Saúde mental, mente saudável",
        content:
          "Avaliação de riscos psicossociais e programas de apoio à equipa.",
        image: "https://i.ibb.co/TqBmySTP/image-1.webp",
      },
      {
        id: 11,
        title: "Nutrição equilibrada, produtividade garantida.",
        content:
          "Planos alimentares e ações de sensibilização ajustados ao trabalho.",
        image: "https://i.ibb.co/Vhfgss7/image-2.webp",
      },
      {
        id: 12,
        title: "Pragas controladas, trabalho protegido.",
        content:
          "Controlo integrado de pragas com intervenção rápida e registos HACCP.",
        image: "https://i.ibb.co/fYNMFJSP/image-3.webp",
      },
    ],
  },
  bentoSection: {
    title: "Salvaguardamos o seu negócio.",
    description:
      "Oferecemos soluções integradas em medicina do trabalho, formação profissional e segurança, garantindo o cumprimento de todas as normas e certificações.",
    items: [
      {
        id: 1,
        content: <FirstBentoAnimation />,
        title: "Suporte especializado, a um clique.",
        description:
          "Esclareça dúvidas, peça serviços ou apoio especializado, estamos sempre disponíveis para ajudar.",
      },
      {
        id: 2,
        content: <SecondBentoAnimation />,
        title: "Um parceiro para tudo o que precisa.",
        description:
          "Os nossos serviços são certificados por todas as entidades competentes e garantidos por uma equipa pluridisciplinar.",
      },
      {
        id: 3,
        content: (
          <ThirdBentoAnimation
            data={[20, 30, 25, 45, 40, 55, 75]}
            toolTipValues={[
              100, 123, 161, 498, 878, 3404, 3833, 4261, 4799, 5133,
            ]}
          />
        ),
        title: "Formação Certificada, resultados Visíveis.",
        description:
          "Acompanhe horas concluídas e taxa de certificação, prove o retorno e mantenha a sua equipa sempre qualificada.",
      },
      {
        id: 4,
        content: <FourthBentoAnimation once={false} />,
        title: "O que precisa, quando precisa",
        description:
          "Agendamos exames, relatórios e unidade móvel no momento certo, garantindo a lei cumprida e a sua equipa focada no negócio.",
      },
    ],
  },
  benefits: [
    {
      id: 1,
      text: "Save hours each week with AI-optimized scheduling.",
      image: "/Device-6.png",
    },
    {
      id: 2,
      text: "Reduce scheduling conflicts and double-bookings.",
      image: "/Device-7.png",
    },
    {
      id: 3,
      text: "Improve work-life balance with smart time allocation.",
      image: "/Device-8.png",
    },
    {
      id: 4,
      text: "Increase productivity with AI-driven time management insights.",
      image: "/Device-1.png",
    },
  ],
  growthSection: {
    title: "Built for Secure Growth",
    description:
      "Where advanced security meets seamless scalability—designed to protect your data and empower your growth.",
    items: [
      {
        id: 1,
        content: (
          <div
            className="relative flex size-full items-center justify-center overflow-hidden transition-all duration-300 hover:[mask-image:none] hover:[webkit-mask-image:none]"
            style={{
              WebkitMaskImage: `url("data:image/svg+xml,%3Csvg width='265' height='268' viewBox='0 0 265 268' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fillRule='evenodd' clipRule='evenodd' d='M121.384 4.5393C124.406 1.99342 128.319 0.585938 132.374 0.585938C136.429 0.585938 140.342 1.99342 143.365 4.5393C173.074 29.6304 210.174 45.6338 249.754 50.4314C253.64 50.9018 257.221 52.6601 259.855 55.3912C262.489 58.1223 264.005 61.6477 264.13 65.3354C265.616 106.338 254.748 146.9 232.782 182.329C210.816 217.759 178.649 246.61 140.002 265.547C137.645 266.701 135.028 267.301 132.371 267.298C129.715 267.294 127.1 266.686 124.747 265.526C86.0991 246.59 53.9325 217.739 31.9665 182.309C10.0005 146.879 -0.867679 106.317 0.618784 65.3147C0.748654 61.6306 2.26627 58.1102 4.9001 55.3833C7.53394 52.6565 11.1121 50.9012 14.9945 50.4314C54.572 45.6396 91.6716 29.6435 121.384 4.56V4.5393Z' fill='black'/%3E%3C/svg%3E")`,
              maskImage: `url("data:image/svg+xml,%3Csvg width='265' height='268' viewBox='0 0 265 268' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fillRule='evenodd' clipRule='evenodd' d='M121.384 4.5393C124.406 1.99342 128.319 0.585938 132.374 0.585938C136.429 0.585938 140.342 1.99342 143.365 4.5393C173.074 29.6304 210.174 45.6338 249.754 50.4314C253.64 50.9018 257.221 52.6601 259.855 55.3912C262.489 58.1223 264.005 61.6477 264.13 65.3354C265.616 106.338 254.748 146.9 232.782 182.329C210.816 217.759 178.649 246.61 140.002 265.547C137.645 266.701 135.028 267.301 132.371 267.298C129.715 267.294 127.1 266.686 124.747 265.526C86.0991 246.59 53.9325 217.739 31.9665 182.309C10.0005 146.879 -0.867679 106.317 0.618784 65.3147C0.748654 61.6306 2.26627 58.1102 4.9001 55.3833C7.53394 52.6565 11.1121 50.9012 14.9945 50.4314C54.572 45.6396 91.6716 29.6435 121.384 4.56V4.5393Z' fill='black'/%3E%3C/svg%3E")`,
              WebkitMaskSize: "contain",
              maskSize: "contain",
              WebkitMaskRepeat: "no-repeat",
              maskPosition: "center",
            }}
          >
            <div className="absolute top-[55%] md:top-[58%] left-[55%] md:left-[57%] -translate-x-1/2 -translate-y-1/2  size-full z-10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="227"
                height="244"
                viewBox="0 0 227 244"
                fill="none"
                className="size-[90%] md:size-[85%] object-contain fill-background"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M104.06 3.61671C106.656 1.28763 110.017 0 113.5 0C116.983 0 120.344 1.28763 122.94 3.61671C148.459 26.5711 180.325 41.2118 214.322 45.6008C217.66 46.0312 220.736 47.6398 222.999 50.1383C225.262 52.6369 226.563 55.862 226.67 59.2357C227.947 96.7468 218.612 133.854 199.744 166.267C180.877 198.68 153.248 225.074 120.052 242.398C118.028 243.454 115.779 244.003 113.498 244C111.216 243.997 108.969 243.441 106.948 242.379C73.7524 225.055 46.1231 198.661 27.2556 166.248C8.38807 133.835 -0.947042 96.7279 0.329744 59.2168C0.441295 55.8464 1.74484 52.6258 4.00715 50.1311C6.26946 47.6365 9.34293 46.0306 12.6777 45.6008C46.6725 41.2171 78.5389 26.5832 104.06 3.63565V3.61671Z"
                />
              </svg>
            </div>
            <div className="absolute top-[58%] md:top-[60%] left-1/2 -translate-x-1/2 -translate-y-1/2  size-full z-20">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="245"
                height="282"
                viewBox="0 0 245 282"
                className="size-full object-contain fill-accent"
              >
                <g filter="url(#filter0_dddd_2_33)">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M113.664 7.33065C116.025 5.21236 119.082 4.04126 122.25 4.04126C125.418 4.04126 128.475 5.21236 130.836 7.33065C154.045 28.2076 183.028 41.5233 213.948 45.5151C216.984 45.9065 219.781 47.3695 221.839 49.6419C223.897 51.9144 225.081 54.8476 225.178 57.916C226.339 92.0322 217.849 125.781 200.689 155.261C183.529 184.74 158.4 208.746 128.209 224.501C126.368 225.462 124.323 225.962 122.248 225.959C120.173 225.956 118.13 225.45 116.291 224.484C86.0997 208.728 60.971 184.723 43.811 155.244C26.6511 125.764 18.1608 92.015 19.322 57.8988C19.4235 54.8334 20.6091 51.9043 22.6666 49.6354C24.7242 47.3665 27.5195 45.906 30.5524 45.5151C61.4706 41.5281 90.4531 28.2186 113.664 7.34787V7.33065Z"
                  />
                </g>
                <defs>
                  <filter
                    id="filter0_dddd_2_33"
                    x="0.217041"
                    y="0.0412598"
                    width="244.066"
                    height="292.917"
                    filterUnits="userSpaceOnUse"
                    colorInterpolationFilters="sRGB"
                  >
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix
                      in="SourceAlpha"
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                      result="hardAlpha"
                    />
                    <feOffset dy="3" />
                    <feGaussianBlur stdDeviation="3.5" />
                    <feColorMatrix
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.04 0"
                    />
                    <feBlend
                      mode="normal"
                      in2="BackgroundImageFix"
                      result="effect1_dropShadow_2_33"
                    />
                    <feColorMatrix
                      in="SourceAlpha"
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                      result="hardAlpha"
                    />
                    <feOffset dy="12" />
                    <feGaussianBlur stdDeviation="6" />
                    <feColorMatrix
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.04 0"
                    />
                    <feBlend
                      mode="normal"
                      in2="effect1_dropShadow_2_33"
                      result="effect2_dropShadow_2_33"
                    />
                    <feColorMatrix
                      in="SourceAlpha"
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                      result="hardAlpha"
                    />
                    <feOffset dy="27" />
                    <feGaussianBlur stdDeviation="8" />
                    <feColorMatrix
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.02 0"
                    />
                    <feBlend
                      mode="normal"
                      in2="effect2_dropShadow_2_33"
                      result="effect3_dropShadow_2_33"
                    />
                    <feColorMatrix
                      in="SourceAlpha"
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                      result="hardAlpha"
                    />
                    <feOffset dy="48" />
                    <feGaussianBlur stdDeviation="9.5" />
                    <feColorMatrix
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.01 0"
                    />
                    <feBlend
                      mode="normal"
                      in2="effect3_dropShadow_2_33"
                      result="effect4_dropShadow_2_33"
                    />
                    <feBlend
                      mode="normal"
                      in="SourceGraphic"
                      in2="effect4_dropShadow_2_33"
                      result="shape"
                    />
                  </filter>
                </defs>
              </svg>
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="81"
                height="80"
                viewBox="0 0 81 80"
                className="fill-background"
              >
                <g filter="url(#filter0_iiii_2_34)">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M20.5 36V28C20.5 22.6957 22.6071 17.6086 26.3579 13.8579C30.1086 10.1071 35.1957 8 40.5 8C45.8043 8 50.8914 10.1071 54.6421 13.8579C58.3929 17.6086 60.5 22.6957 60.5 28V36C62.6217 36 64.6566 36.8429 66.1569 38.3431C67.6571 39.8434 68.5 41.8783 68.5 44V64C68.5 66.1217 67.6571 68.1566 66.1569 69.6569C64.6566 71.1571 62.6217 72 60.5 72H20.5C18.3783 72 16.3434 71.1571 14.8431 69.6569C13.3429 68.1566 12.5 66.1217 12.5 64V44C12.5 41.8783 13.3429 39.8434 14.8431 38.3431C16.3434 36.8429 18.3783 36 20.5 36ZM52.5 28V36H28.5V28C28.5 24.8174 29.7643 21.7652 32.0147 19.5147C34.2652 17.2643 37.3174 16 40.5 16C43.6826 16 46.7348 17.2643 48.9853 19.5147C51.2357 21.7652 52.5 24.8174 52.5 28Z"
                  />
                </g>
                <defs>
                  <filter
                    id="filter0_iiii_2_34"
                    x="12.5"
                    y="8"
                    width="56"
                    height="70"
                    filterUnits="userSpaceOnUse"
                    colorInterpolationFilters="sRGB"
                  >
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feBlend
                      mode="normal"
                      in="SourceGraphic"
                      in2="BackgroundImageFix"
                      result="shape"
                    />
                    <feColorMatrix
                      in="SourceAlpha"
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                      result="hardAlpha"
                    />
                    <feOffset dy="1" />
                    <feGaussianBlur stdDeviation="1" />
                    <feComposite
                      in2="hardAlpha"
                      operator="arithmetic"
                      k2="-1"
                      k3="1"
                    />
                    <feColorMatrix
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
                    />
                    <feBlend
                      mode="normal"
                      in2="shape"
                      result="effect1_innerShadow_2_34"
                    />
                    <feColorMatrix
                      in="SourceAlpha"
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                      result="hardAlpha"
                    />
                    <feOffset dy="3" />
                    <feGaussianBlur stdDeviation="1.5" />
                    <feComposite
                      in2="hardAlpha"
                      operator="arithmetic"
                      k2="-1"
                      k3="1"
                    />
                    <feColorMatrix
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.09 0"
                    />
                    <feBlend
                      mode="normal"
                      in2="effect1_innerShadow_2_34"
                      result="effect2_innerShadow_2_34"
                    />
                    <feColorMatrix
                      in="SourceAlpha"
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                      result="hardAlpha"
                    />
                    <feOffset dy="8" />
                    <feGaussianBlur stdDeviation="2.5" />
                    <feComposite
                      in2="hardAlpha"
                      operator="arithmetic"
                      k2="-1"
                      k3="1"
                    />
                    <feColorMatrix
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0"
                    />
                    <feBlend
                      mode="normal"
                      in2="effect2_innerShadow_2_34"
                      result="effect3_innerShadow_2_34"
                    />
                    <feColorMatrix
                      in="SourceAlpha"
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                      result="hardAlpha"
                    />
                    <feOffset dy="14" />
                    <feGaussianBlur stdDeviation="3" />
                    <feComposite
                      in2="hardAlpha"
                      operator="arithmetic"
                      k2="-1"
                      k3="1"
                    />
                    <feColorMatrix
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.01 0"
                    />
                    <feBlend
                      mode="normal"
                      in2="effect3_innerShadow_2_34"
                      result="effect4_innerShadow_2_34"
                    />
                  </filter>
                </defs>
              </svg>
            </div>
            <div className="size-full">
              <FlickeringGrid
                className="size-full"
                gridGap={4}
                squareSize={2}
                maxOpacity={0.5}
              />
            </div>
          </div>
        ),

        title: "Advanced Task Security",
        description:
          "Safeguard your tasks with state-of-art encryption and secure access to your workflow data.",
      },
      {
        id: 2,
        content: (
          <div className="relative flex size-full max-w-lg items-center justify-center overflow-hidden [mask-image:linear-gradient(to_top,transparent,black_50%)] -translate-y-20">
            <Globe className="top-28" />
          </div>
        ),

        title: "Scalable for Teams",
        description:
          "Grow with your team. Track tasks across multiple workspaces and all team members.",
      },
    ],
  },
  quoteSection: {
    quote:
      "Para mim as formações da Medisigma são incríveis, e o suporte é imbatível. Recomendo vivamente",
    author: {
      name: "João Andrade",
      role: "Director Recursos Humanos, Innovatech",
      image: "https://randomuser.me/api/portraits/men/50.jpg",
    },
  },
  pricing: {
    title: "Pricing that scales with you",
    description:
      "Whichever plan you pick, it's free until you love your docs. That's our promise.",
    pricingItems: [
      {
        name: "Free",
        href: "#",
        price: "$0",
        period: "month",
        yearlyPrice: "$0",
        features: [
          "Custom domain",
          "SEO-optimizations",
          "Auto-generated API docs",
          "Built-in components library",
        ],
        description: "Perfect for individual users",
        buttonText: "Start Free",
        buttonColor: "bg-accent text-primary",
        isPopular: false,
      },
      {
        name: "Startup",
        href: "#",
        price: "$12",
        period: "month",
        yearlyPrice: "$120",
        features: [
          "Custom domain",
          "SEO-optimizations",
          "Auto-generated API docs",
          "Built-in components library",
          "E-commerce integration",
          "User authentication system",
          "Multi-language support",
          "Real-time collaboration tools",
        ],
        description: "Ideal for professionals and small teams",
        buttonText: "Upgrade to Pro",
        buttonColor: "bg-secondary text-white",
        isPopular: true,
      },
      {
        name: "Enterprise",
        href: "#",
        price: "$24",
        period: "month",
        yearlyPrice: "$240",
        features: [
          "Custom domain",
          "SEO-optimizations",
          "Auto-generated API docs",
          "Built-in components librarys",
          "Real-time collaboration tools",
        ],
        description: "Best for large teams and enterprise-level organizations",
        buttonText: "Contact Sales",
        buttonColor: "bg-primary text-primary-foreground",
        isPopular: false,
      },
    ],
  },
  testimonials: [
    {
      id: "1",
      name: "Ana Cardoso",
      role: "Diretora de RH na IberMetal",
      img: "https://randomuser.me/api/portraits/women/44.jpg",
      description: (
        <p>
          Com a #Medisigma a gerir a medicina do trabalho,
          ganhámos total tranquilidade legal.
          <Highlight>
            Reduzimos o absentismo em 18 % num ano.
          </Highlight>{" "}
          Serviço rápido e sem burocracias.
        </p>
      ),
    },
    {
      id: "2",
      name: "Miguel Duarte",
      role: "Gestor de Operações na FreshFoods",
      img: "https://randomuser.me/api/portraits/men/32.jpg",
      description: (
        <p>
          A unidade móvel da #Medisigma realizou exames a 120 colaboradores em
          apenas dois dias.
          <Highlight>
            Produção não parou um minuto.
          </Highlight>{" "}
          Excelente coordenação em fábrica.
        </p>
      ),
    },
    {
      id: "3",
      name: "Helena Lopes",
      role: "Responsável de QHSE na Construtec",
      img: "https://randomuser.me/api/portraits/women/65.jpg",
      description: (
        <p>
          Os programas de segurança e extintores da #Medisigma
          passaram na auditoria da ACT sem qualquer não conformidade.
          <Highlight>
            Custos de seguro baixaram 12 %.
          </Highlight>
        </p>
      ),
    },
    {
      id: "4",
      name: "Ricardo Almeida",
      role: "Director Geral na CleanHotels",
      img: "https://randomuser.me/api/portraits/men/61.jpg",
      description: (
        <p>
          O controlo de legionella da #Medisigma
          protegeu os nossos hóspedes e a reputação do grupo.
          <Highlight>
            Relatórios prontos em 48 h.
          </Highlight>{" "}
          Parceria essencial para hotelaria.
        </p>
      ),
    },
    {
      id: "5",
      name: "Patrícia Sousa",
      role: "HR Business Partner na TechWave",
      img: "https://randomuser.me/api/portraits/women/24.jpg",
      description: (
        <p>
          Os workshops de saúde mental da #Medisigma
          melhoraram o clima interno e a retenção.
          <Highlight>
            Satisfação dos colaboradores subiu para 92 %.
          </Highlight>
        </p>
      ),
    },
    {
      id: "6",
      name: "João Ferreira",
      role: "Director de Qualidade na AgroPlus",
      img: "https://randomuser.me/api/portraits/men/48.jpg",
      description: (
        <p>
          Graças ao plano integrado de controlo de pragas da #Medisigma,
          obtivemos certificação IFS sem ressalvas.
          <Highlight>
            Contaminações reduziram para zero.
          </Highlight>{" "}
          Fulcral na indústria alimentar.
        </p>
      ),
    },
    {
      id: "7",
      name: "Sofia Mendes",
      role: "Directora de Formação na EduPro",
      img: "https://randomuser.me/api/portraits/women/39.jpg",
      description: (
        <p>
          A formação certificada da #Medisigma em segurança no trabalho
          foi clara e prática.
          <Highlight>
            100 % de aprovação nas avaliações finais.
          </Highlight>{" "}
          Recomendo para equipas grandes.
        </p>
      ),
    },
    {
      id: "8",
      name: "Pedro Nunes",
      role: "CEO na GreenBuild",
      img: "https://randomuser.me/api/portraits/men/70.jpg",
      description: (
        <p>
          Integrar todos os serviços da #Medisigma
          poupou-nos horas de gestão e múltiplos fornecedores.
          <Highlight>
            Um único parceiro, todas as áreas cobertas.
          </Highlight>{" "}
          Investimento que compensa.
        </p>
      ),
    },
  ],  
  ctaSection: {
    id: "cta",
    title: "Seguimos juntos?",
    backgroundImage: "/logo_site23_br.webp",
    button: {
      text: "Fale com a nossa equipa",
      href: "#",
    },
    /*subtext: "Cancel anytime, no questions asked",*/
  },
  footerLinks: [
    {
      title: "Empresa",
      links: [
        { id: 1, title: "Início", url: "/" },
        { id: 2, title: "Sobre Nós", url: "/sobre-nos" },
        { id: 3, title: "Casos de Sucesso", url: "/casos-de-sucesso" },
        { id: 4, title: "Testemunhos", url: "/testemunhos" },
        { id: 5, title: "Blog", url: "/blog" },
        { id: 6, title: "Contactos", url: "/contact" },
      ],
    },
    {
      title: "Serviços",
      links: [
        { id: 1, title: "Medicina no Trabalho", url: "/servicos/medicina-no-trabalho" },
        { id: 2, title: "Segurança no Trabalho", url: "/servicos/seguranca-no-trabalho" },
        { id: 3, title: "Segurança Alimentar", url: "/servicos/seguranca-alimentar" },
        { id: 4, title: "Formação Certificada", url: "/servicos/formacao-certificada" },
        { id: 5, title: "Psicologia", url: "/servicos/psicologia" },
        { id: 6, title: "Controlo de Pragas", url: "/servicos/controlo-pragas" },
        { id: 7, title: "Segurança Contra Incêndios", url: "/servicos/seguranca-incendios" },
        { id: 8, title: "Legionella", url: "/servicos/legionella" },
        { id: 9, title: "Medicina Desportiva", url: "/servicos/medicina-desportiva" },
        { id: 10, title: "Nutrição", url: "/servicos/nutricao" },
      ],
    },
    {
      title: "Apoio ao Cliente",
      links: [
        { id: 1, title: "Newsletter", url: "#newsletter" },
        { id: 2, title: "Bolsa de Recrutamento", url: "/recrutamento" },
        { id: 3, title: "FAQs", url: "/faqs" },
        { id: 4, title: "Política de Privacidade", url: "/politica-de-privacidade" },
        { id: 5, title: "Termos e Condições", url: "/termos-e-condicoes" },
        { id: 6, title: "Política de Cookies", url: "/cookies" },
        { id: 7, title: "Resolução de Litígios", url: "/resolucao-litigios" },
        { id: 8, title: "Livro de Reclamações", url: "https://www.livroreclamacoes.pt/Inicio/" },
      ],
    },
  ],
};

export type SiteConfig = typeof siteConfig;
