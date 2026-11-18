import type { Metadata } from 'next';
import Image from 'next/image';
import { qualityPolicyMission, qualityPolicyPath, qualityPolicyTitle } from '@/content/quality-policy';
import { siteConfig } from '@/lib/site';
import valuesIllustration from './valores.webp';

const description = 'Política da Qualidade, missão, visão e valores do Grupo Medisigma. Documento PQ 01/1, de 03/12/2025.';
const canonical = new URL(qualityPolicyPath, siteConfig.url).href;
const headingClass = 'mb-3 text-lg font-bold tracking-wide text-blue-700 dark:text-blue-300';

export const metadata: Metadata = {
  title: qualityPolicyTitle,
  description,
  authors: [{ name: 'Ana Lúcia Simões' }, { name: 'Rui Simões' }],
  alternates: { canonical },
  openGraph: { type: 'website', locale: 'pt_PT', siteName: siteConfig.name, title: qualityPolicyTitle, description, url: canonical },
  twitter: { card: 'summary', title: qualityPolicyTitle, description },
};

export default function QualityPolicyPage() {
  return (
    <main className="mx-auto w-full max-w-4xl px-9 py-12 text-foreground sm:px-12 sm:py-16 lg:px-16">
      <article aria-labelledby="titulo-politica">
        <div className="mb-9 border-b border-border pb-7">
          <h1 id="titulo-politica" className="max-w-3xl text-balance text-3xl font-bold tracking-tight sm:text-5xl sm:leading-tight">
            {qualityPolicyTitle}
          </h1>
          <div className="mt-5 flex flex-wrap gap-x-6 gap-y-1 text-sm text-muted-foreground">
            <p className="font-semibold text-foreground">PQ 01/1</p>
            <p>Data: <time dateTime="2025-12-03">03/12/2025</time></p>
          </div>
        </div>

        <div className="space-y-10 text-base leading-7 sm:text-lg sm:leading-8">
          <section aria-labelledby="politica">
            <h2 id="politica" className={headingClass}>POLÍTICA DA QUALIDADE</h2>
            <p>
              No âmbito da sua Política da Qualidade, a Medisigma compromete-se com a excelência de
              serviços e produtos, nas áreas da Saúde no Trabalho, Segurança no Trabalho, Segurança
              Alimentar, Legionella, Formação, Manutenção De Extintores e Controlo De Pragas Urbanas que
              disponibiliza, garantindo a conformidade com os requisitos legais, regulamentares e normativos,
              bem como a superação das expectativas dos clientes e partes interessadas. O Sistema de
              Gestão, baseado na norma ISO 9001 e NP 4413, sustenta esta abordagem e promove uma
              cultura de melhoria contínua em todas as áreas de atuação.
            </p>
            <p className="mt-6">Principais eixos:</p>
            <ul className="mt-3 list-disc space-y-3 pl-6">
              <li>
                <strong>Foco no Cliente (Satisfação do Cliente)</strong> - Reconhecemos que a nossa sustentabilidade
                depende da capacidade de atrair e reter clientes, o que só é possível garantindo a sua satisfação.
              </li>
              <li>
                <strong>Melhoria Contínua dos Processos</strong> – Existe um compromisso constante com a melhoria
                continua por forma a tornar todos os processos eficientes e eficazes, desde o atendimento
                inicial até à entrega do serviço final.
              </li>
              <li>
                <strong>Comprometimento dos Colaboradores -</strong> A qualidade é um esforço de equipa. O nosso
                foco passa por garantir que todos os colaboradores compreendam o seu papel e estejam
                motivados para contribuir para os objetivos organizacionais.
              </li>
            </ul>
            <p className="mt-6">
              A política proporciona o enquadramento para os objetivos da qualidade. A Gerência avalia a sua
              adequação ao contexto e à orientação estratégica na revisão do SGQ. Esta política é
              devidamente comunicada para que seja compreendida e aplicada por todos os colaboradores do
              Grupo Medisigma, bem como às partes interessadas.
            </p>
          </section>

          <section aria-labelledby="missao">
            <h2 id="missao" className={headingClass}>MISSÃO</h2>
            <p>{qualityPolicyMission}</p>
          </section>

          <section aria-labelledby="visao">
            <h2 id="visao" className={headingClass}>VISÃO</h2>
            <p>
              Acrescentar valor aos Clientes na prestação de serviços em diversas áreas, assentes nas
              expetativas e Satisfação destes, contribuindo para a sustentabilidade do negócio.
            </p>
          </section>

          <section aria-labelledby="valores">
            <h2 id="valores" className={headingClass}>VALORES</h2>
            <div className="grid items-center gap-6 sm:grid-cols-2">
              <ul className="list-disc space-y-1 pl-6">
                <li>Satisfação do Cliente</li>
                <li>Compromisso e confiança</li>
                <li>Ética e transparência</li>
                <li>Excelência e melhoria contínua</li>
                <li>Dinamismo</li>
                <li>Capital Humano e Envolvimento</li>
              </ul>
              <Image src={valuesIllustration} alt="" sizes="(max-width: 639px) 100vw, 360px" className="h-auto w-full max-w-sm" />
            </div>
          </section>
        </div>

        <div className="mt-10 border-t border-border pt-6 leading-7">
          <p>Abrantes, <time dateTime="2025-12-03">03 de dezembro de 2025</time></p>
          <p className="mt-4 font-semibold">A Gerência</p>
          <div className="flex flex-wrap gap-x-8">
            <p>Ana Lúcia Simões</p>
            <p>Rui Simões</p>
          </div>
          <p className="mt-6 text-sm text-muted-foreground">Mod 003_1</p>
        </div>
      </article>
    </main>
  );
}
