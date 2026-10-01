import React from "react";
import { Metadata } from "next";
import { CheckCircle, Mail, MapPin, Phone } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import WhatsAppButton from "@/components/WhatsAppButton";
import { ContactLink } from "@/components/custom/contact-link";
import { MEDISIGMA, MEDISIGMA_POSTAL_ADDRESS, serializeJsonLd } from "@/lib/organization";
import { CONTACT_SUCCESS_MESSAGE } from "@/lib/contact";
import { ContactApiDetails } from "@/components/ContactApiDetails";


export const metadata: Metadata = {
  title: "Contacto",
  description: "Entre em contacto com o Grupo Medisigma para solicitar propostas ou esclarecer dúvidas sobre os nossos serviços.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://www.medisigma.pt/contact/",
  },
};

export default async function ContactPage({ searchParams }: { searchParams: Promise<{ enviado?: string }> }) {
  const { enviado } = await searchParams;
  return (
    <main className="min-h-screen bg-white flex flex-col divide-y divide-border">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd({
        '@context': 'https://schema.org', '@type': 'ContactPage',
        '@id': 'https://www.medisigma.pt/contact/#webpage', url: 'https://www.medisigma.pt/contact/',
        name: 'Contacto', inLanguage: 'pt-PT',
        about: { '@id': 'https://www.medisigma.pt/#organization' },
        isPartOf: { '@id': 'https://www.medisigma.pt/#website' },
      }) }} />
      {/* Hero / CTA Section */}
      <section className="relative py-12 md:py-24 mx-3 sm:mx-6 md:mx-8 rounded-3xl mb-8">
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <div className="animated-hero-background absolute inset-0 h-full w-full [background:radial-gradient(125%_125%_at_50%_10%,var(--background)_40%,var(--secondary)_100%)] rounded-3xl" />
        </div>
        <div className="container mx-auto px-3 sm:px-6 max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Texto de Apresentação */}
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Fale Connosco
              </h1>
              <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                A nossa equipa está pronta para responder às suas questões e preparar uma proposta
                personalizada para a sua empresa. Envie-nos uma mensagem ou ligue-nos.
                Respondemos em até 48&nbsp;horas úteis.
              </p>

              <ul className="space-y-4 mb-8 text-gray-700">
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                  Resposta em até 48&nbsp;horas úteis
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                  Proposta 100% personalizada ao seu negócio
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                  Equipa especializada com +20&nbsp;anos de experiência
                </li>
              </ul>

              <div className="flex flex-col sm:flex-row gap-4">
                <ContactLink
                  href={`tel:${MEDISIGMA.telephoneHref}`}
                  type="phone"
                  className="bg-white text-secondary px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors text-center border-2 border-white flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  Ligar
                </ContactLink>
                <WhatsAppButton />
              </div>

              <div className="mt-8 grid gap-3 text-sm text-gray-700">
                <ContactLink
                  href={`mailto:${MEDISIGMA.email}`}
                  type="email"
                  className="inline-flex items-center gap-3 hover:text-secondary"
                >
                  <Mail className="h-4 w-4 shrink-0" />
                  {MEDISIGMA.email}
                </ContactLink>
                <ContactLink
                  href={`tel:${MEDISIGMA.telephoneHref}`}
                  type="phone"
                  className="inline-flex items-center gap-3 hover:text-secondary"
                >
                  <Phone className="h-4 w-4 shrink-0" />
                  {MEDISIGMA.telephone}
                </ContactLink>
                <address className="inline-flex items-start gap-3 not-italic">
                  <MapPin className="h-4 w-4 shrink-0 mt-0.5" />
                  <span>
                    {MEDISIGMA.legalName}<br />
                    {MEDISIGMA_POSTAL_ADDRESS}
                  </span>
                </address>
              </div>
            </div>

            {/* Formulário de Contacto */}
            <div className="min-w-0 bg-white rounded-xl border border-gray-200 scroll-mt-28" id="contact-form">
              {enviado === '1' && <p role="status" className="mb-6 rounded-lg bg-green-50 p-4 text-green-900">{CONTACT_SUCCESS_MESSAGE}</p>}
              <ContactForm pagina="Página Contacto" fonte="contacto" />
            </div>
          </div>
        </div>
      </section>
      <ContactApiDetails />
    </main>
  );
}
