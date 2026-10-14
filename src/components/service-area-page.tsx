import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import ContactForm from './ContactForm';
import { AbrantesServiceMedia, LocationServiceMedia } from './service-media/section';
import { serviceAreas, type ServiceAreaKey } from '@/lib/service-areas';
import { priorityServices } from '@/lib/technical-services';
import { MEDISIGMA_POSTAL_ADDRESS, serializeJsonLd } from '@/lib/organization';

export function serviceAreaMetadata(key: ServiceAreaKey): Metadata {
  const { name } = serviceAreas[key];
  const title = `Medicina do Trabalho e serviços técnicos em ${name}`;
  const description = `Apoio a empresas em ${name}: medicina e segurança no trabalho, Legionella, radão, ruído, qualidade do ar, extintores e HACCP. Peça uma proposta.`;
  return { title, description, alternates: { canonical: `https://www.medisigma.pt/${key}/` }, openGraph: { title, description, locale: 'pt_PT', url: `https://www.medisigma.pt/${key}/` } };
}
export function ServiceAreaPage({ areaKey }: { areaKey: ServiceAreaKey }) {
  const area = serviceAreas[areaKey];
  return <main className="bg-white">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd({ '@context': 'https://schema.org', '@type': 'Service', '@id': `https://www.medisigma.pt/${areaKey}/#service`, name: `Serviços Medisigma em ${area.name}`, description: area.context, url: `https://www.medisigma.pt/${areaKey}/`, provider: { '@id': 'https://www.medisigma.pt/#organization' }, areaServed: { '@type': 'City', name: area.name } }) }} />
    <section className="mx-auto max-w-6xl px-6 py-14 md:py-20">
      <p className="text-sm font-semibold uppercase tracking-wider text-secondary">{areaKey === 'abrantes' ? 'Sede e área de serviço' : 'Área de serviço'}</p>
      <h1 className="mt-5 max-w-4xl text-3xl font-bold leading-tight md:text-5xl">Medicina do Trabalho e serviços técnicos em {area.name}</h1>
      <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-700">{area.context}</p>
      {areaKey === 'abrantes' && <p className="mt-4 text-gray-700">Sede: {MEDISIGMA_POSTAL_ADDRESS}.</p>}
      <Link href="#contact-form" className="mt-8 inline-flex min-h-12 items-center rounded-lg bg-secondary px-6 py-3 font-semibold text-white">Pedir apoio em {area.name}</Link>
    </section>
    <section className="mx-auto max-w-6xl px-6 py-12"><h2 className="text-2xl font-semibold">Saúde e segurança da equipa</h2><div className="mt-6 grid gap-5 md:grid-cols-2"><Link href="/servicos/medicina-no-trabalho/" className="rounded-xl border p-6"><h3 className="text-xl font-semibold text-secondary">Medicina do Trabalho</h3><p className="mt-3 leading-7">Exames de admissão, periódicos e ocasionais e acompanhamento da saúde ocupacional. Indique o número de trabalhadores e os locais de trabalho.</p></Link><Link href="/servicos/seguranca-no-trabalho/" className="rounded-xl border p-6"><h3 className="text-xl font-semibold text-secondary">Segurança no Trabalho</h3><p className="mt-3 leading-7">Avaliação dos riscos profissionais e apoio às medidas de prevenção. Descreva a atividade e as tarefas da equipa.</p></Link></div></section>
    <section className="mx-auto max-w-6xl px-6 py-12"><h2 className="text-2xl font-semibold">Avaliações e acompanhamento das instalações</h2><div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{priorityServices.map(service => <article key={service.key} className="flex flex-col rounded-xl border p-6"><h3 className="text-lg font-semibold"><Link href={`/servicos/${service.key}/`} className="text-secondary underline underline-offset-4">{service.name}</Link></h3><p className="my-4 leading-7 text-gray-700">{service.purpose}</p><Link href={`/pedir-proposta/?servico=${service.key}`} className="mt-auto pt-3 text-sm font-medium text-secondary underline underline-offset-4">Pedir proposta</Link></article>)}</div></section>
    <section className="mx-auto max-w-6xl px-6 py-12"><h2 className="text-2xl font-semibold">Preparar uma intervenção em {area.name}</h2><p className="mt-5 max-w-3xl leading-7 text-gray-700">{area.preparation}</p><p className="mt-4 max-w-3xl leading-7 text-gray-700">A disponibilidade de cada serviço, as condições de deslocação e o âmbito são confirmados na proposta. Indique a morada da instalação; esta página identifica a área de serviço.</p><div className="mt-6 flex flex-wrap gap-5"><Link href="/setores/industria/" className="text-secondary underline underline-offset-4">Preparar um pedido para a indústria</Link><Link href="/setores/hotelaria-alojamento/" className="text-secondary underline underline-offset-4">Preparar um pedido para hotelaria e alojamento</Link></div></section>
    {areaKey === 'abrantes' ? <AbrantesServiceMedia /> : <LocationServiceMedia location={areaKey} />}
    <section id="contact-form" className="mx-auto grid max-w-6xl items-start gap-10 px-6 py-12 lg:grid-cols-2"><div><h2 className="text-3xl font-semibold">Conte-nos o que precisa</h2><p className="mt-5 leading-7 text-gray-700">Selecione o serviço e indique a localização da instalação. Se ainda não conhece todos os dados, a equipa esclarece consigo no contacto seguinte.</p><p className="mt-4 leading-7 text-gray-700">Respondemos em até 48 horas úteis. Para outros serviços, consulte o <Link href="/servicos/" className="text-secondary underline">catálogo completo</Link>.</p></div><div className="min-w-0"><ContactForm proposal acceptMediaIntent pagina={`Área de serviço: ${area.name}`} fonte={`localidade:${areaKey}`} /></div></section>
  </main>;
}
