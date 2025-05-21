import React from "react";
import Image from "next/image";

export default function MedicinaNoTrabalhoPage() {
  return (
    <section className="py-12 md:py-20 w-full px-6 max-w-4xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">Medicina no Trabalho</h1>
      <div className="mb-8 text-lg leading-relaxed text-center">
        <p>
          Avaliamos a aptidão física e psíquica dos trabalhadores para o exercício das suas funções, promovendo a saúde e prevenindo riscos profissionais.
        </p>
      </div>
      <div className="flex justify-center">
        <Image src="/logo_site23_br.webp" alt="Medicina no Trabalho" width={180} height={90} className="rounded shadow" />
      </div>
    </section>
  );
} 