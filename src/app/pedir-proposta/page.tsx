import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle, Mail, Phone } from 'lucide-react';
import ContactForm from '@/components/ContactForm';
import { ContactApiDetails } from '@/components/ContactApiDetails';
import { ContactLink } from '@/components/custom/contact-link';
import { MEDISIGMA, serializeJsonLd } from '@/lib/organization';
import { proposalService } from '@/lib/proposal';

export const metadata: Metadata = {
  title: 'Pedir proposta',
  description: 'Peça uma proposta de serviços à Medisigma. Indique a empresa e o serviço pretendido. Respondemos em até 48 horas úteis.',
  alternates: { canonical: 'https://www.medisigma.pt/pedir-proposta/' },
};

export default async function ProposalPage({ searchParams }: { searchParams: Promise<{ servico?: string | string[] }> }) {
  const params = await searchParams;
  const selected = proposalService(typeof params.servico === 'string' ? params.servico : '');
  return <main className="bg-white">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd({
      '@context': 'https://schema.org', '@type': 'ContactPage',
      '@id': 'https://www.medisigma.pt/pedir-proposta/#webpage',
      url: 'https://www.medisigma.pt/pedir-proposta/', name: 'Pedir proposta', inLanguage: 'pt-PT',
      about: { '@id': 'https://www.medisigma.pt/#organization' },
      isPartOf: { '@id': 'https://www.medisigma.pt/#website' },
    }) }} />
    <section className="mx-auto grid max-w-6xl items-start gap-10 px-6 py-12 md:py-20 lg:grid-cols-2 lg:gap-16">
      <div>
        <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-secondary">Serviços para empresas</p>
        <h1 className="mb-6 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">Peça uma proposta para a sua empresa</h1>
        <p className="mb-7 text-lg leading-relaxed text-gray-700">Indique o serviço de que precisa. A nossa equipa analisa o pedido e responde em até 48 horas úteis.</p>
        <a href="#proposal-form" className="mb-7 inline-flex min-h-11 items-center justify-center rounded-lg bg-secondary px-5 py-3 font-semibold text-white lg:hidden">Preencher pedido</a>
        <ul className="mb-8 space-y-4 text-gray-700">
          {['Empresa, email e serviço são os únicos campos obrigatórios.', 'Os dados adicionais ajudam-nos a preparar a proposta.', 'Se faltar alguma informação, esclarecemos consigo no contacto seguinte.'].map(text => <li key={text} className="flex gap-3"><CheckCircle aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-secondary" /><span>{text}</span></li>)}
        </ul>
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-6">
          <h2 className="mb-3 text-lg font-semibold">Prefere falar connosco?</h2>
          <div className="flex flex-col gap-3 text-sm">
            <ContactLink href={`tel:${MEDISIGMA.telephoneHref}`} type="phone" className="inline-flex items-center gap-2 text-secondary"><Phone aria-hidden="true" className="h-4 w-4" />{MEDISIGMA.telephone}</ContactLink>
            <ContactLink href={`mailto:${MEDISIGMA.email}`} type="email" className="inline-flex items-center gap-2 text-secondary"><Mail aria-hidden="true" className="h-4 w-4" />{MEDISIGMA.email}</ContactLink>
          </div>
          <p className="mt-5 text-sm text-gray-700">Para outras questões, use a <Link href="/contact/" className="underline underline-offset-4">página de contacto</Link>.</p>
        </div>
      </div>
      <div id="proposal-form" className="min-w-0 scroll-mt-28 rounded-xl border border-gray-200">
        <ContactForm proposal pagina="Pedir proposta" fonte="pedido-proposta" servicoDefault={selected} />
      </div>
    </section>
    <ContactApiDetails />
  </main>;
}
