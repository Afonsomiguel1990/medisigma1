import React from "react";

export default function ContactPage() {
  return (
    <section className="py-12 md:py-20 w-full px-6 max-w-2xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">Contacto</h1>
      <form className="flex flex-col gap-4 bg-white p-6 rounded-xl shadow-md border">
        <label className="font-medium">Nome
          <input type="text" name="name" className="mt-1 w-full border rounded px-3 py-2" required />
        </label>
        <label className="font-medium">Email
          <input type="email" name="email" className="mt-1 w-full border rounded px-3 py-2" required />
        </label>
        <label className="font-medium">Mensagem
          <textarea name="message" rows={5} className="mt-1 w-full border rounded px-3 py-2" required />
        </label>
        <button type="submit" className="bg-primary text-white rounded px-4 py-2 font-semibold hover:bg-primary/90 transition">Enviar</button>
      </form>
    </section>
  );
} 