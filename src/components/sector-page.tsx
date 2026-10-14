import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ServiceMediaSection } from './service-media/section';
import { serializeJsonLd } from '@/lib/organization';
import { CommercialHero } from './commercial-hero';

const sectors = {
  industria: {
    name: 'Indústria', title: 'Segurança e avaliações técnicas para a indústria',
    description: 'Prepare as avaliações de ruído, qualidade do ar, radão, Legionella e segurança no trabalho da sua unidade industrial com a Medisigma.',
    intro: 'O ruído da produção, a qualidade do ar e os sistemas de água pedem cuidados diferentes. A Medisigma ajuda a organizar as avaliações da sua unidade industrial e a definir as medidas de prevenção para a equipa.',
    image: { src: '/media/servicos/medicao-ruido-industria.webp', alt: 'Avaliação de ruído realizada pela Medisigma na Sofalca, em Abrantes', position: 'center 45%' },
    action: 'Pedir apoio para a minha empresa',
    contactTitle: 'Vamos olhar para as necessidades da sua fábrica.',
    contactText: 'Quer avaliar um posto de trabalho ou reunir vários serviços? Conte-nos o que pretende melhorar. Ajudamos a escolher as avaliações e a preparar a intervenção.',
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
    intro: 'Entre os quartos, a cozinha e as áreas técnicas, há muito para acompanhar. A Medisigma ajuda a organizar a prevenção da Legionella, o HACCP e a segurança do edifício, com apoio ajustado ao funcionamento do seu alojamento.',
    image: { src: '/media/servicos/herdade-amarela-capa.webp', alt: 'Técnico Medisigma durante o acompanhamento da Herdade Amarela, em Abrantes', position: 'center 40%' },
    action: 'Pedir apoio para o meu alojamento',
    contactTitle: 'O seu alojamento merece um acompanhamento próximo.',
    contactText: 'Está a preparar a abertura, a rever procedimentos ou à procura de apoio regular? Fale-nos do seu estabelecimento. A nossa equipa ajuda a perceber por onde começar.',
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
  const url = `https://www.medisigma.pt/setores/${key}/`;
  return { title: sector.title, description: sector.description, alternates: { canonical: url }, openGraph: { title: sector.title, description: sector.description, url, images: [{ url: sector.image.src, alt: sector.image.alt }] } };
}
export function SectorPage({ sectorKey }: { sectorKey: SectorKey }) {
  const sector = sectors[sectorKey];
  return <main className="bg-white">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd({ '@context': 'https://schema.org', '@type': 'CollectionPage', name: sector.title, description: sector.description, url: `https://www.medisigma.pt/setores/${sectorKey}/`, about: { '@id': 'https://www.medisigma.pt/#organization' }, mainEntity: { '@type': 'ItemList', itemListElement: sector.services.map((service, index) => ({ '@type': 'ListItem', position: index + 1, name: service.name, url: `https://www.medisigma.pt/servicos/${service.key}/` })) } }) }} />
    <CommercialHero title={sector.title} intro={sector.intro} image={sector.image} action={{ href: '/pedir-proposta/', label: sector.action }} />
    <section className="mx-auto max-w-6xl px-8 py-10 md:py-14"><h2 className="text-2xl font-semibold text-slate-900 sm:text-3xl">O apoio certo para cada área</h2><div className="mt-8 divide-y divide-slate-200 border-y border-slate-200">{sector.services.map(service => <article key={service.key} className="grid gap-4 py-7 md:grid-cols-[1fr_1.6fr] md:gap-10"><h3 className="text-xl font-semibold text-slate-900"><Link href={`/servicos/${service.key}/`} className="hover:text-secondary hover:underline">{service.name}</Link></h3><div><p className="leading-7 text-slate-700">{service.need}</p><div className="mt-4 flex flex-wrap gap-6"><Link href={`/servicos/${service.key}/`} className="text-secondary underline underline-offset-4">Conhecer o serviço</Link><Link href={`/pedir-proposta/?servico=${service.key}`} className="font-semibold text-secondary underline underline-offset-4">Pedir proposta</Link></div></div></article>)}</div></section>
    <section className="mx-auto max-w-6xl px-8 py-10"><h2 className="text-2xl font-semibold text-slate-900">Conte-nos como funciona o seu espaço</h2><ul className="mt-6 max-w-3xl list-disc space-y-4 pl-5 leading-7 text-slate-700">{sector.preparation.map(text => <li key={text}>{text}</li>)}</ul></section>
    <ServiceMediaSection id={sector.media} contactHref={`/pedir-proposta/?servico=${sectorKey === 'industria' ? 'ruido-ocupacional' : 'seguranca-incendios'}`} />
    <section className="mx-4 mb-8 rounded-2xl bg-[#edf2f8] px-6 py-10 sm:mx-8 sm:px-9 md:py-14"><div className="mx-auto max-w-6xl"><h2 className="max-w-2xl text-3xl font-semibold leading-tight tracking-tight text-slate-900 sm:text-4xl">{sector.contactTitle}</h2><p className="mt-6 max-w-2xl text-lg leading-8 text-slate-700">{sector.contactText}</p><Link href="/pedir-proposta/" className="mt-7 inline-flex min-h-12 items-center rounded-lg bg-secondary px-6 py-3 font-semibold text-white hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-secondary">{sector.action}</Link></div></section>
  </main>;
}
