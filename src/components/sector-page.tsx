import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ServiceMediaSection } from './service-media/section';
import { serializeJsonLd } from '@/lib/organization';

const sectors = {
  industria: {
    name: 'Indústria', title: 'Segurança e avaliações técnicas para a indústria',
    description: 'Prepare as avaliações de ruído, qualidade do ar, radão, Legionella e segurança no trabalho da sua unidade industrial com a Medisigma.',
    intro: 'Uma unidade industrial pode reunir riscos diferentes na produção, manutenção, armazém e escritórios. Identifique a necessidade de cada área para preparar uma intervenção com o âmbito adequado.',
    preparation: ['Localização das instalações, atividade, turnos e contacto responsável pelo acesso.', 'Tarefas, máquinas e períodos representativos de funcionamento.', 'Pisos ocupados, sistemas de água e ventilação e avaliações anteriores, quando existam.'],
    services: [
      { key: 'ruido-ocupacional', name: 'Ruído ocupacional', need: 'Conhecer a exposição dos trabalhadores nas tarefas e nos turnos.' },
      { key: 'qualidade-do-ar-interior', name: 'Qualidade do ar interior', need: 'Avaliar as condições do ar nos espaços ocupados. Identifique separadamente exposições a agentes químicos do processo industrial.' },
      { key: 'radao', name: 'Radão', need: 'Preparar a avaliação e medição nos espaços de trabalho, tendo em conta os pisos e a utilização.' },
      { key: 'legionella', name: 'Legionella', need: 'Avaliar sistemas de água e equipamentos e organizar a prevenção e o acompanhamento.' },
      { key: 'seguranca-no-trabalho', name: 'Segurança no trabalho', need: 'Rever riscos profissionais, procedimentos e medidas de prevenção da atividade.' },
    ], media: 'sofalca-ruido' as const,
  },
  'hotelaria-alojamento': {
    name: 'Hotelaria e alojamento', title: 'Serviços técnicos para hotelaria e alojamento',
    description: 'Legionella, qualidade do ar, HACCP e segurança contra incêndios para hotéis e alojamentos. Prepare o pedido com a Medisigma.',
    intro: 'Os sistemas de água, os quartos, a restauração e os equipamentos de segurança têm necessidades próprias. Reúna a informação do edifício e escolha o apoio pretendido para preparar o pedido.',
    preparation: ['Localização, tipo de alojamento, capacidade e períodos de abertura ou encerramento.', 'Sistemas de água, zonas comuns e utilização dos espaços; mencione piscinas ou outros equipamentos existentes.', 'Existência de cozinha ou restauração, plano de prevenção, registos de manutenção e avaliações anteriores.'],
    services: [
      { key: 'legionella', name: 'Legionella', need: 'Enquadrar as redes e equipamentos de água, o plano ou programa e o acompanhamento.' },
      { key: 'qualidade-do-ar-interior', name: 'Qualidade do ar interior', need: 'Avaliar as condições dos espaços ocupados e a informação disponível sobre ventilação.' },
      { key: 'seguranca-alimentar', name: 'HACCP e segurança alimentar', need: 'Implementar ou acompanhar os procedimentos da cozinha e do serviço de refeições.' },
      { key: 'seguranca-incendios', name: 'Segurança contra incêndios', need: 'Preparar as medidas de autoproteção e o acompanhamento do edifício.' },
      { key: 'manutencao-extintores', name: 'Manutenção de extintores', need: 'Identificar os equipamentos, as quantidades e os locais para preparar a manutenção.' },
    ], media: 'herdade-amarela' as const,
  },
};
export type SectorKey = keyof typeof sectors;
export function sectorMetadata(key: SectorKey): Metadata {
  const sector = sectors[key];
  return { title: sector.title, description: sector.description, alternates: { canonical: `https://www.medisigma.pt/setores/${key}/` } };
}
export function SectorPage({ sectorKey }: { sectorKey: SectorKey }) {
  const sector = sectors[sectorKey];
  return <main className="bg-white">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd({ '@context': 'https://schema.org', '@type': 'CollectionPage', name: sector.title, description: sector.description, url: `https://www.medisigma.pt/setores/${sectorKey}/`, about: { '@id': 'https://www.medisigma.pt/#organization' }, mainEntity: { '@type': 'ItemList', itemListElement: sector.services.map((service, index) => ({ '@type': 'ListItem', position: index + 1, name: service.name, url: `https://www.medisigma.pt/servicos/${service.key}/` })) } }) }} />
    <section className="mx-auto max-w-6xl px-6 py-14 md:py-20"><p className="text-sm font-semibold uppercase tracking-wider text-secondary">{sector.name}</p><h1 className="mt-5 max-w-4xl text-3xl font-bold leading-tight md:text-5xl">{sector.title}</h1><p className="mt-6 max-w-3xl text-lg leading-8 text-gray-700">{sector.intro}</p></section>
    <section className="mx-auto max-w-6xl px-6 py-10"><h2 className="text-2xl font-semibold">Que apoio procura?</h2><div className="mt-6 grid gap-6 md:grid-cols-2">{sector.services.map(service => <article key={service.key} className="rounded-xl border p-6"><h3 className="text-xl font-semibold">{service.name}</h3><p className="my-4 leading-7 text-gray-700">{service.need}</p><div className="flex flex-wrap gap-5"><Link href={`/servicos/${service.key}/`} className="text-secondary underline underline-offset-4">Conhecer o serviço</Link><Link href={`/pedir-proposta/?servico=${service.key}`} className="font-semibold text-secondary underline underline-offset-4">Pedir proposta</Link></div></article>)}</div></section>
    <section className="mx-auto max-w-6xl px-6 py-12"><h2 className="text-2xl font-semibold">Informação útil para preparar o pedido</h2><ul className="mt-6 max-w-3xl list-disc space-y-4 pl-5 leading-7">{sector.preparation.map(text => <li key={text}>{text}</li>)}</ul><p className="mt-5 max-w-3xl leading-7 text-gray-700">Se precisa de vários serviços, escolha o principal e indique os restantes na mensagem. Não precisa de repetir o pedido. A proposta confirma os serviços incluídos e as condições de execução.</p></section>
    <ServiceMediaSection id={sector.media} contactHref={`/pedir-proposta/?servico=${sectorKey === 'industria' ? 'ruido-ocupacional' : 'seguranca-incendios'}`} />
    <section className="mx-auto max-w-6xl px-6 py-12"><h2 className="text-2xl font-semibold">Ainda não sabe que serviço selecionar?</h2><p className="mt-4 max-w-3xl leading-7 text-gray-700">Descreva a atividade, o edifício e a necessidade. A equipa ajuda a encaminhar o pedido e confirma a disponibilidade na sua localização.</p><Link href="/pedir-proposta/" className="mt-6 inline-flex min-h-12 items-center rounded-lg bg-secondary px-6 py-3 font-semibold text-white">Falar com a Medisigma</Link></section>
  </main>;
}
