import React from "react";
import Image from "next/image";

export default function ControloPragasPage() {
  return (
    <section className="py-12 md:py-20 w-full px-6 max-w-4xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">Controlo de Pragas Urbanas</h1>
      <div className="mb-8 text-lg leading-relaxed text-center">
        <p>
          O controlo de pragas urbanas é fundamental para garantir ambientes saudáveis e seguros, prevenindo riscos para a saúde pública.
        </p>
      </div>
      <div className="flex justify-center">
        <Image src="/logo_site23_br.webp" alt="Controlo de Pragas Urbanas" width={180} height={90} className="rounded shadow" />
      </div>
    </section>
  );
} 