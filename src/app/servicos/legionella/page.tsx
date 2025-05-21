import React from "react";
import Image from "next/image";

export default function LegionellaPage() {
  return (
    <section className="py-12 md:py-20 w-full px-6 max-w-4xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">Legionella</h1>
      <div className="mb-8 text-lg leading-relaxed text-center">
        <p>
          A Legionella é um problema de saúde pública e tem impacto direto na segurança dos edifícios e das pessoas. Oferecemos soluções de prevenção e controlo.
        </p>
      </div>
      <div className="flex justify-center">
        <Image src="/logo_site23_br.webp" alt="Legionella" width={180} height={90} className="rounded shadow" />
      </div>
    </section>
  );
} 