import React from "react";
import { Metadata } from "next";
import { CheckCircle, Phone } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import WhatsAppButton from "@/components/WhatsAppButton";


export const metadata: Metadata = {
  title: "Contacto | Grupo Medisigma",
  description: "Entre em contacto com o Grupo Medisigma para solicitar propostas ou esclarecer dúvidas sobre os nossos serviços.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white flex flex-col divide-y divide-border">
      {/* Hero / CTA Section */}
      <section className="relative py-16 md:py-24 mx-6 md:mx-8 rounded-3xl mb-8">
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <div className="animated-hero-background absolute inset-0 h-full w-full [background:radial-gradient(125%_125%_at_50%_10%,var(--background)_40%,var(--secondary)_100%)] rounded-3xl" />
        </div>
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Texto de Apresentação */}
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Fale Connosco
              </h1>
              <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                A nossa equipa está pronta para responder às suas questões e preparar uma proposta
                personalizada para a sua empresa. Envie-nos uma mensagem ou ligue-nos — respondemos
                em menos de 24&nbsp;horas úteis.
              </p>

              <ul className="space-y-4 mb-8 text-gray-700">
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                  Resposta em 24&nbsp;horas úteis
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
                <a
                  href="tel:241331504"
                  className="bg-white text-secondary px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors text-center border-2 border-white flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  Ligar
                </a>
                <WhatsAppButton />
              </div>
            </div>

            {/* Formulário de Contacto */}
            <div className="bg-white p-8 rounded-xl shadow-2xl border border-gray-200" id="contact-form">
              <ContactForm pagina="Página Contacto" fonte="contacto" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
} 