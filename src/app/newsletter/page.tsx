import React from "react";
import { Metadata } from "next";
import { CheckCircle, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Newsletter | MediSigma",
  description: "Subscreva a newsletter da MediSigma e receba as últimas novidades sobre medicina do trabalho, segurança e saúde ocupacional.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/newsletter",
  },
};

export default function NewsletterPage() {
  return (
    <main className="min-h-screen bg-white flex flex-col divide-y divide-border">
      {/* Hero / CTA Section */}
      <section className="relative py-16 md:py-24 mx-6 md:mx-8 rounded-3xl mb-8">
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <div className="animated-hero-background absolute inset-0 h-full w-full [background:radial-gradient(125%_125%_at_50%_10%,var(--background)_40%,var(--secondary)_100%)] rounded-3xl" />
        </div>
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Texto de Apresentação */}
            <div>
              <div className="mb-6 inline-flex items-center justify-center p-3 bg-white rounded-full shadow-sm">
                <Mail className="w-8 h-8 text-secondary" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Subscreva a Nossa Newsletter
              </h1>
              <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                Mantenha-se atualizado com as últimas novidades, dicas e informações 
                essenciais sobre medicina do trabalho, segurança e saúde ocupacional.
              </p>

              <ul className="space-y-4 mb-8 text-gray-700">
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                  Artigos exclusivos e atualizações mensais
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                  Guias práticos sobre conformidade legal
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                  Novidades e tendências do setor
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                  Cancele a subscrição a qualquer momento
                </li>
              </ul>

              <p className="text-sm text-gray-600">
                Os seus dados serão tratados com confidencialidade de acordo com a nossa{" "}
                <a href="/politica-de-privacidade" className="text-secondary hover:underline">
                  Política de Privacidade
                </a>.
              </p>
            </div>

            {/* Formulário Newsletter Brevo */}
            <div className="bg-white p-8 rounded-xl shadow-2xl border border-gray-200">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
                Mantenha a sua empresa atualizada
              </h3>
              <div className="relative w-full overflow-hidden rounded-lg" style={{ minHeight: 360 }}>
                <iframe
                  title="Formulário Newsletter Medisigma"
                  src="https://c3b31976.sibforms.com/serve/MUIFADBLg1xJz3kQ6zEtAlm3xMm9a4DBmOZ5JS7LYG2N8XBBKCygpiZ-td3Up8G6wLTPTmd6W7k6U2J_PMRGItVyhWUZ8v7TdzzrSMBe6PSa3OiG_XG53IyKQPilN_RQmPOc3sjP9wKgtUChzyq0TwHvb5Raos8h6fvOJFW8rxPBgxzNmHAViJaaDIxFUxyjEA6PRZX72nDss1mw"
                  frameBorder="0"
                  scrolling="auto"
                  allowFullScreen
                  className="block w-full"
                  style={{ minHeight: 360 }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}











