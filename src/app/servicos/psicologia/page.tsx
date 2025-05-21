import React from "react";
import Image from "next/image";

export default function PsicologiaPage() {
  return (
    <section className="py-12 md:py-20 w-full px-6 max-w-4xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">Psicologia</h1>
      <div className="mb-8 text-lg leading-relaxed text-center">
        <p>
          O Grupo MEDISIGMA procura dar uma resposta 360º às necessidades dos seus clientes, incluindo o apoio psicológico especializado.
        </p>
      </div>
      <div className="flex justify-center">
        <Image src="/logo_site23_br.webp" alt="Psicologia" width={180} height={90} className="rounded shadow" />
      </div>
    </section>
  );
} 