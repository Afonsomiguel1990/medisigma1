import React from "react";
import Image from "next/image";

export default function SegurancaNoTrabalhoPage() {
  return (
    <section className="py-12 md:py-20 w-full px-6 max-w-4xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">Segurança no Trabalho</h1>
      <div className="mb-8 text-lg leading-relaxed text-center">
        <p>
          Os trabalhadores estão expostos a determinados fatores de risco profissionais. Atuamos na prevenção e controlo desses riscos, promovendo ambientes de trabalho mais seguros.
        </p>
      </div>
      <div className="flex justify-center">
        <Image src="/logo_site23_br.webp" alt="Segurança no Trabalho" width={180} height={90} className="rounded shadow" />
      </div>
    </section>
  );
} 