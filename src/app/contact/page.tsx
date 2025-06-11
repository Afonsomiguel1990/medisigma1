import React from "react";
import { Metadata } from "next";
import { CheckCircle, Phone } from "lucide-react";

export const metadata: Metadata = {
  title: "Contacto | MediSigma",
  description: "Entre em contacto com a MediSigma para solicitar propostas ou esclarecer dúvidas sobre os nossos serviços.",
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
        <div className="absolute inset-0">
          <div className="animated-hero-background absolute inset-0 -z-10 h-full w-full [background:radial-gradient(125%_125%_at_50%_10%,var(--background)_40%,var(--secondary)_100%)] rounded-3xl" />
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
                <a
                  href="https://wa.me/351241331504?text=Olá%2C%20gostaria%20de%20saber%20mais%20sobre%20os%20vossos%20serviços."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors text-center flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.515z"/>
                  </svg>
                  WhatsApp
                </a>
              </div>
            </div>

            {/* Formulário de Contacto */}
            <div className="bg-white p-8 rounded-xl shadow-2xl border border-gray-200" id="contact-form">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">Envie-nos uma mensagem</h2>
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Nome *
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                    placeholder="O seu nome"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                    placeholder="email@exemplo.pt"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                    Empresa
                  </label>
                  <input
                    type="text"
                    id="company"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                    placeholder="Nome da empresa"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Mensagem *
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                    placeholder="Descreva brevemente as suas necessidades..."
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-secondary text-white py-3 px-6 rounded-lg font-semibold hover:bg-secondary/90 transition-colors"
                >
                  Enviar Mensagem
                </button>
                <p className="text-xs text-gray-500 text-center">
                  * Campos obrigatórios. Os seus dados serão tratados com confidencialidade.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
} 