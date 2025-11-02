'use client';

import { useState } from 'react';

interface FormState {
  nome: string;
  email: string;
  telefone: string;
  area_interesse: string;
  cv_link: string;
  mensagem: string;
}

const initialState: FormState = {
  nome: '',
  email: '',
  telefone: '',
  area_interesse: '',
  cv_link: '',
  mensagem: '',
};

export default function SpontaneousApplicationForm() {
  const [state, setState] = useState<FormState>(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const nome = state.nome.trim();
    const email = state.email.trim();
    const telefone = state.telefone.trim();

    if (!nome || !email || !telefone) {
      alert('Por favor, preencha os campos obrigatórios (Nome, Email e Telefone).');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/spontaneous-applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome,
          email,
          telefone,
          area_interesse: state.area_interesse || 'Candidatura Espontânea',
          cv_link: state.cv_link || '',
          mensagem: state.mensagem || '',
          pagina: 'Candidatura Espontânea',
          url: typeof window !== 'undefined' ? window.location.href : '',
        }),
      });

      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err?.error || 'Falha ao enviar candidatura.');
      }

      alert('Candidatura enviada com sucesso! Obrigado.');
      setState(initialState);
    } catch (error: unknown) {
      console.error('Erro ao enviar candidatura espontânea:', error);
      alert(error?.message || 'Erro ao enviar candidatura. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-2">
          Nome Completo *
        </label>
        <input
          id="nome"
          name="nome"
          value={state.nome}
          onChange={handleChange}
          type="text"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
          placeholder="O seu nome completo"
          required
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
          Email *
        </label>
        <input
          id="email"
          name="email"
          value={state.email}
          onChange={handleChange}
          type="email"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
          placeholder="seuemail@exemplo.pt"
          required
        />
      </div>

      <div>
        <label htmlFor="telefone" className="block text-sm font-medium text-gray-700 mb-2">
          Telefone *
        </label>
        <input
          id="telefone"
          name="telefone"
          value={state.telefone}
          onChange={handleChange}
          type="tel"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
          placeholder="Ex: 912 345 678"
          required
        />
      </div>

      <div>
        <label htmlFor="area_interesse" className="block text-sm font-medium text-gray-700 mb-2">
          Área de Interesse
        </label>
        <select
          id="area_interesse"
          name="area_interesse"
          value={state.area_interesse}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
        >
          <option value="">Selecione uma área...</option>
          <option value="Medicina do Trabalho">Medicina do Trabalho</option>
          <option value="Segurança no Trabalho">Segurança no Trabalho</option>
          <option value="Psicologia">Psicologia</option>
          <option value="Controlo de Pragas">Controlo de Pragas</option>
          <option value="Legionella">Análises a Legionella</option>
          <option value="Formação">Formação Certificada</option>
          <option value="Administrativo">Área Administrativa</option>
          <option value="Comercial">Área Comercial</option>
          <option value="Outra">Outra</option>
        </select>
      </div>

      <div>
        <label htmlFor="cv_link" className="block text-sm font-medium text-gray-700 mb-2">
          Link para CV (Google Drive, Dropbox, LinkedIn, etc.)
        </label>
        <input
          id="cv_link"
          name="cv_link"
          value={state.cv_link}
          onChange={handleChange}
          type="url"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
          placeholder="https://drive.google.com/... ou https://linkedin.com/in/..."
        />
        <p className="text-xs text-gray-500 mt-1">
          Partilhe um link público para o seu CV ou perfil profissional.
        </p>
      </div>

      <div>
        <label htmlFor="mensagem" className="block text-sm font-medium text-gray-700 mb-2">
          Mensagem / Motivação
        </label>
        <textarea
          id="mensagem"
          name="mensagem"
          value={state.mensagem}
          onChange={handleChange}
          rows={4}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
          placeholder="Conte-nos um pouco sobre a sua experiência e motivação."
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-secondary text-white py-3 px-6 rounded-lg font-semibold hover:bg-secondary/90 transition-colors disabled:opacity-70"
      >
        {isSubmitting ? 'A enviar...' : 'Enviar Candidatura'}
      </button>

      <p className="text-xs text-gray-500 text-center">
        * Campos obrigatórios. Os seus dados serão tratados com confidencialidade conforme a nossa{' '}
        <a href="/politica-de-privacidade" className="text-secondary hover:underline">
          Política de Privacidade
        </a>.
      </p>
    </form>
  );
}




