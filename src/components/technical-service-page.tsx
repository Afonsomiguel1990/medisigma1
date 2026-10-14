import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import ContactForm from '@/components/ContactForm';
import { ServiceMediaSection } from '@/components/service-media/section';
import { serializeJsonLd } from '@/lib/organization';
import { technicalServices, type TechnicalServiceKey } from '@/lib/technical-services';

export function technicalServiceMetadata(key: TechnicalServiceKey): Metadata {
  const service = technicalServices[key];
  const url = `https://www.medisigma.pt/servicos/${key}/`;
  return { title: service.title, description: service.description, alternates: { canonical: url },
    openGraph: { title: service.title, description: service.description, url, locale: 'pt_PT', type: 'website' } };
}

export function TechnicalServicePage({ serviceKey }: { serviceKey: TechnicalServiceKey }) {
  const service = technicalServices[serviceKey];
  const url = `https://www.medisigma.pt/servicos/${serviceKey}/`;
  const proposal = `/pedir-proposta/?servico=${serviceKey}`;
  return <main className="bg-white">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd([
      { '@context': 'https://schema.org', '@type': 'Service', '@id': `${url}#service`, url, name: service.title,
        description: service.description, serviceType: service.name, provider: { '@id': 'https://www.medisigma.pt/#organization' }, areaServed: { '@type': 'Country', name: 'Portugal' } },
      { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: service.questions.map(item => ({ '@type': 'Question', name: item.question, acceptedAnswer: { '@type': 'Answer', text: item.answer } })) },
    ]) }} />
    <section className="mx-auto max-w-6xl px-6 py-14 md:py-20">
      <Link href="/servicos/" className="text-sm font-medium text-secondary underline underline-offset-4">Serviços para empresas</Link>
      <h1 className="mt-6 max-w-4xl text-3xl font-bold leading-tight tracking-tight text-gray-900 md:text-5xl">{service.title}</h1>
      <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-700">{service.description}</p>
      <p className="mt-4 max-w-3xl leading-7 text-gray-600">{service.audience}</p>
      <Link href={proposal} className="mt-8 inline-flex min-h-12 items-center rounded-lg bg-secondary px-6 py-3 font-semibold text-white">{serviceKey === 'radao' ? 'Fale connosco sobre radão' : 'Pedir proposta'}</Link>
      <p className="mt-3 text-sm text-gray-600">Empresa, email e serviço. A restante informação é opcional.</p>
    </section>
    <section className="mx-auto grid max-w-6xl gap-10 px-6 py-12 lg:grid-cols-2">
      <div><h2 className="text-2xl font-semibold">O que fazemos</h2><ol className="mt-6 space-y-5">{service.scope.map((text, index) => <li key={text} className="flex gap-4 leading-7"><span className="font-semibold text-secondary" aria-hidden="true">{index + 1}.</span><span>{text}</span></li>)}</ol></div>
      <div className="rounded-2xl bg-slate-50 p-6 sm:p-8"><h2 className="text-2xl font-semibold">O que recebe</h2><ul className="mt-6 list-disc space-y-4 pl-5 leading-7">{service.deliverables.map(text => <li key={text}>{text}</li>)}</ul><p className="mt-6 border-t border-slate-200 pt-5 text-sm leading-6 text-gray-600">Os entregáveis e as condições da intervenção ficam identificados na proposta.</p></div>
    </section>
    <section className="mx-auto max-w-6xl px-6 py-12"><h2 className="text-2xl font-semibold">Como preparar o pedido</h2><ul className="mt-6 max-w-3xl list-disc space-y-4 pl-5 leading-7">{service.preparation.map(text => <li key={text}>{text}</li>)}</ul><p className="mt-5 text-gray-600">Se ainda não tiver estes dados, descreva o que precisa. Esclarecemos consigo no contacto seguinte.</p></section>
    {service.media.map(id => <ServiceMediaSection key={id} id={id} contactHref={proposal} />)}
    <section className="mx-auto max-w-6xl px-6 py-12"><h2 className="text-2xl font-semibold">Âmbito e preparação da intervenção</h2><p className="mt-5 max-w-3xl leading-7 text-gray-700">{service.limitation}</p><p className="mt-4 max-w-3xl leading-7 text-gray-700">Indique o concelho para confirmarmos consigo a disponibilidade e as condições de deslocação. Conheça as áreas de serviço em <Link href="/abrantes/" className="underline">Abrantes</Link>, <Link href="/coimbra/" className="underline">Coimbra</Link>, <Link href="/lisboa/" className="underline">Lisboa</Link>, <Link href="/santarem/" className="underline">Santarém</Link> e <Link href="/leiria/" className="underline">Leiria</Link>.</p></section>
    <section className="mx-auto max-w-6xl px-6 py-12"><h2 className="text-2xl font-semibold">Antes de contratar</h2><div className="mt-6 divide-y divide-slate-200">{service.questions.map(item => <details key={item.question} className="py-5"><summary className="cursor-pointer text-lg font-medium">{item.question}</summary><p className="mt-4 max-w-3xl leading-7 text-gray-700">{item.answer}</p></details>)}</div></section>
    <section id="cta-section" className="mx-auto grid max-w-6xl items-start gap-10 px-6 py-12 lg:grid-cols-2"><div><h2 className="text-3xl font-semibold">Fale connosco sobre {service.name.toLowerCase()}</h2><p className="mt-5 leading-7 text-gray-700">Indique a empresa e a necessidade. Respondemos em até 48 horas úteis.</p><ul className="mt-8 space-y-4">{service.links.map(link => <li key={link.href}><Link href={link.href} className="text-secondary underline underline-offset-4">{link.label}</Link></li>)}</ul><p className="mt-8 text-sm text-gray-500">Conteúdo: Equipa Medisigma. Atualizado a 14 de outubro de 2026.</p></div><div className="min-w-0"><ContactForm proposal servicoDefault={service.name} pagina={`Serviço: ${service.name}`} fonte={`servico:${serviceKey}`} /></div></section>
  </main>;
}
