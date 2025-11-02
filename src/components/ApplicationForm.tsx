'use client';

import { useState } from 'react';

export default function ApplicationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const name = (formData.get('name') ?? '').toString().trim();
    const email = (formData.get('email') ?? '').toString().trim();
    if (!name || !email) {
      alert('Nome e email são obrigatórios');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/applications', {
        method: 'POST',
        body: formData,
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.error || 'Falha ao enviar candidatura');
      }
      alert('Candidatura enviada com sucesso. Obrigado!');
      form.reset();
    } catch (err: unknown) {
      console.error(err);
      alert(err?.message || 'Erro ao enviar');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-2">Nome *</label>
        <input id="name" name="name" type="text" required className="w-full px-4 py-3 border rounded-lg" />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-2">Email *</label>
        <input id="email" name="email" type="email" required className="w-full px-4 py-3 border rounded-lg" />
      </div>
      <div>
        <label htmlFor="phone" className="block text-sm font-medium mb-2">Telefone</label>
        <input id="phone" name="phone" type="tel" className="w-full px-4 py-3 border rounded-lg" />
      </div>
      <div>
        <label htmlFor="cover_letter" className="block text-sm font-medium mb-2">Carta de Apresentação</label>
        <textarea id="cover_letter" name="cover_letter" rows={4} className="w-full px-4 py-3 border rounded-lg" />
      </div>
      <div>
        <label htmlFor="cv" className="block text-sm font-medium mb-2">CV (PDF/DOC)</label>
        <input id="cv" name="cv" type="file" accept=".pdf,.doc,.docx" className="w-full" />
      </div>
      <div className="flex items-center gap-2">
        <input id="consent" name="consent" type="checkbox" className="h-4 w-4" />
        <label htmlFor="consent" className="text-sm">Concordo com o tratamento dos meus dados para recrutamento.</label>
      </div>
      <button type="submit" disabled={isSubmitting} className="w-full bg-secondary text-white py-3 rounded-lg font-semibold">
        {isSubmitting ? 'A enviar...' : 'Enviar Candidatura'}
      </button>
    </form>
  );
}
