'use client';

import { useState, useRef } from 'react';

export default function ApplicationForm({ jobId, jobTitle }: { jobId?: string, jobTitle?: string }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cvMode, setCvMode] = useState<'file' | 'link'>('file');
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const name = (formData.get('name') ?? '').toString().trim();
    const email = (formData.get('email') ?? '').toString().trim();
    const cvLink = (formData.get('cv_link') ?? '').toString().trim();
    const cvFile = formData.get('cv') as File;

    if (!name || !email) {
      alert('Nome e email são obrigatórios');
      return;
    }

    if (cvMode === 'file' && (!cvFile || cvFile.size === 0)) {
      alert('Por favor, selecione um ficheiro para o CV');
      return;
    }

    if (cvMode === 'link' && !cvLink) {
      alert('Por favor, insira o link para o CV');
      return;
    }

    // Se modo link, remover ficheiro do FormData para não enviar lixo
    if (cvMode === 'link') {
      formData.delete('cv');
    } else {
      // Se modo ficheiro, remover link
      formData.delete('cv_link');
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
      if (fileInputRef.current) fileInputRef.current.value = '';
      setCvMode('file'); // Reset para default
    } catch (err: unknown) {
      console.error(err);
      alert(err instanceof Error ? err.message : 'Erro ao enviar');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input type="hidden" name="job_id" value={jobId || ''} />
      {jobTitle && (
        <div className="mb-4 p-3 bg-muted rounded-lg border">
          <p className="text-sm font-medium">Candidatura para:</p>
          <p className="text-lg font-bold text-primary">{jobTitle}</p>
        </div>
      )}
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
        <label htmlFor="cover_letter" className="block text-sm font-medium mb-2">Carta de Apresentação / Mensagem</label>
        <textarea id="cover_letter" name="cover_letter" rows={4} className="w-full px-4 py-3 border rounded-lg" />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">CV *</label>
        <div className="flex gap-4 mb-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="cvMode"
              value="file"
              checked={cvMode === 'file'}
              onChange={() => setCvMode('file')}
              className="text-secondary focus:ring-secondary"
            />
            <span className="text-sm">Upload Ficheiro</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="cvMode"
              value="link"
              checked={cvMode === 'link'}
              onChange={() => setCvMode('link')}
              className="text-secondary focus:ring-secondary"
            />
            <span className="text-sm">Link Externo</span>
          </label>
        </div>

        {cvMode === 'file' ? (
          <div>
            <input
              ref={fileInputRef}
              id="cv"
              name="cv"
              type="file"
              accept=".pdf,.doc,.docx"
              className="w-full px-4 py-3 border rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-secondary/10 file:text-secondary hover:file:bg-secondary/20"
            />
            <p className="text-xs text-gray-500 mt-1">Formatos: PDF, DOC. Máx: 5MB.</p>
          </div>
        ) : (
          <div>
            <input
              id="cv_link"
              name="cv_link"
              type="url"
              placeholder="https://drive.google.com/... ou LinkedIn"
              className="w-full px-4 py-3 border rounded-lg"
            />
            <p className="text-xs text-gray-500 mt-1">Partilhe um link público.</p>
          </div>
        )}
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
