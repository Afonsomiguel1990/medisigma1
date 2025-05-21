import React from "react";
import Image from "next/image";

export default function SegurancaAlimentarPage() {
  return (
    <section className="py-12 md:py-20 w-full px-6 max-w-4xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">Segurança Alimentar</h1>
      <div className="mb-8 text-lg leading-relaxed text-center">
        <p>
          Sistema preventivo que permite dotar as empresas de meios e procedimentos para garantir a segurança dos alimentos.
        </p>
      </div>
      <div className="flex justify-center">
        <Image src="/logo_site23_br.webp" alt="Segurança Alimentar" width={180} height={90} className="rounded shadow" />
      </div>
    </section>
  );
} 