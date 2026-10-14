import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import ContactForm from '@/components/ContactForm';
import { ServiceMediaSection } from '@/components/service-media/section';
import { serializeJsonLd } from '@/lib/organization';
import { technicalServices, type TechnicalServiceKey } from '@/lib/technical-services';
import { CommercialHero } from './commercial-hero';

export function technicalServiceMetadata(key: TechnicalServiceKey): Metadata {
  const service = technicalServices[key];
  const url = `https://www.medisigma.pt/servicos/${key}/`;
  return { title: service.title, description: service.description, alternates: { canonical: url },
    openGraph: { title: service.title, description: service.description, url, locale: 'pt_PT', type: 'website', images: [{ url: service.image.src, alt: service.image.alt }] } };
}

export function TechnicalServicePage({ serviceKey }: { serviceKey: TechnicalServiceKey }) {
  const service = technicalServices[serviceKey];
  const url = `https://www.medisigma.pt/servicos/${serviceKey}/`;
  const proposal = `/pedir-proposta/?servico=${serviceKey}`;
  return <main className="bg-white">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd([
      { '@context': 'https://schema.org', '@type': 'Service', '@id': `${url}#service`, url, name: service.title,
        description: service.description, image: `https://www.medisigma.pt${service.image.src}`, serviceType: service.name, provider: { '@id': 'https://www.medisigma.pt/#organization' }, areaServed: { '@type': 'Country', name: 'Portugal' } },
      { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: service.questions.map(item => ({ '@type': 'Question', name: item.question, acceptedAnswer: { '@type': 'Answer', text: item.answer } })) },
    ]) }} />
    <CommercialHero title={service.title} intro={service.intro} image={service.image}
      action={{ href: proposal, label: service.action }} sectionLink={{ href: '/servicos/', label: 'Serviços para empresas' }} />
    <section className="mx-auto grid max-w-6xl gap-10 px-8 py-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16 md:py-16">
      <div><h2 className="max-w-lg text-2xl font-semibold leading-tight text-slate-900 sm:text-3xl">{service.scopeTitle}</h2><div className="mt-6 space-y-5 text-slate-700">{service.scope.map(text => <p key={text} className="leading-7">{text}</p>)}</div></div>
      <div className="self-start rounded-2xl bg-slate-50 p-6 sm:p-8"><h2 className="text-2xl font-semibold text-slate-900">O que recebe</h2><ul className="mt-6 list-disc space-y-4 pl-5 leading-7 text-slate-700">{service.deliverables.map(text => <li key={text}>{text}</li>)}</ul></div>
    </section>
    {service.media.map(id => <ServiceMediaSection key={id} id={id} contactHref={proposal} />)}
    <section className="mx-auto grid max-w-6xl gap-10 border-y border-slate-200 px-8 py-10 md:grid-cols-[1fr_1.4fr]"><h2 className="text-2xl font-semibold leading-tight text-slate-900">Para começarmos a conversar</h2><ul className="list-disc space-y-4 pl-5 leading-7 text-slate-700">{service.preparation.map(text => <li key={text}>{text}</li>)}</ul></section>
    <section className="mx-auto max-w-6xl px-8 py-12 md:py-16"><h2 className="text-2xl font-semibold text-slate-900">As suas dúvidas, esclarecidas</h2><div className="mt-6 divide-y divide-slate-200">{service.questions.map(item => <details key={item.question} className="py-5"><summary className="cursor-pointer text-lg font-medium text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-secondary">{item.question}</summary><p className="mt-4 max-w-3xl leading-7 text-slate-700">{item.answer}</p></details>)}</div><ul className="mt-8 flex flex-wrap gap-x-8 gap-y-4">{service.links.map(link => <li key={link.href}><Link href={link.href} className="text-secondary underline underline-offset-4">{link.label}</Link></li>)}</ul></section>
    <section id="cta-section" className="mx-4 mb-8 scroll-mt-28 rounded-2xl bg-[#edf2f8] px-6 py-10 sm:mx-8 sm:px-9 md:py-14"><div className="mx-auto grid max-w-6xl items-start gap-10 lg:grid-cols-2 lg:gap-14"><div className="lg:pt-6"><h2 className="max-w-lg text-3xl font-semibold leading-tight tracking-tight text-slate-900 sm:text-4xl">{service.contactTitle}</h2><p className="mt-6 max-w-lg text-lg leading-8 text-slate-700">{service.contactText}</p></div><div className="min-w-0"><ContactForm proposal servicoDefault={service.name} pagina={`Serviço: ${service.name}`} fonte={`servico:${serviceKey}`} /></div></div></section>
  </main>;
}
