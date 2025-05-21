import React from "react";
import Image from "next/image";

export default function AboutPage() {
  return (
    <section className="py-12 md:py-20 w-full px-6 max-w-4xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">Sobre Nós</h1>
      <div className="mb-8 text-lg leading-relaxed text-center">
        <p>
          Somos uma equipa dedicada à saúde e segurança no trabalho, com anos de experiência a proteger pessoas, empresas e resultados. Acreditamos na proximidade, confiança e inovação para garantir o melhor serviço aos nossos clientes.
        </p>
      </div>
      <div className="flex flex-col md:flex-row gap-6 items-center justify-center">
        <Image src="/logo_site23_br.webp" alt="Logo Medisigma" width={180} height={90} className="rounded shadow" />
        <Image src="/logomedisigma.svg" alt="Equipa Medisigma" width={180} height={90} className="rounded shadow" />
      </div>
    </section>
  );
} 