import React from "react";
import Image from "next/image";

export default function FormacaoCertificadaPage() {
  return (
    <section className="py-12 md:py-20 w-full px-6 max-w-4xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">Formação Profissional Certificada</h1>
      <div className="mb-8 text-lg leading-relaxed text-center">
        <p>
          O Grupo MEDISIGMA elaborou o presente Plano de Formação com o objetivo de promover a qualificação e atualização dos profissionais.
        </p>
      </div>
      <div className="flex justify-center">
        <Image src="/logo_site23_br.webp" alt="Formação Profissional Certificada" width={180} height={90} className="rounded shadow" />
      </div>
    </section>
  );
} 