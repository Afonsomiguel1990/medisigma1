'use client';

import { useState, useRef, useEffect } from 'react';
import { Job } from '@/app/recrutamento/JobsList';

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

interface SpontaneousApplicationFormProps {
  jobs?: Job[];
  preSelectedJobId?: string | null;
}

export default function SpontaneousApplicationForm({ jobs = [], preSelectedJobId }: SpontaneousApplicationFormProps) {
  const [state, setState] = useState<FormState>(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cvMode, setCvMode] = useState<'file' | 'link'>('file');
  const [cvFile, setCvFile] = useState<File | null>(null);

  const [applicationType, setApplicationType] = useState<'spontanea' | 'vaga'>('spontanea');
  const [selectedJobId, setSelectedJobId] = useState<string>('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (preSelectedJobId) {
      setApplicationType('vaga');
      setSelectedJobId(preSelectedJobId);
      const job = jobs.find(j => j.id === preSelectedJobId);
      if (job) {
        setState(prev => ({ ...prev, area_interesse: `Vaga: ${job.title}` }));
      }
    }
  }, [preSelectedJobId, jobs]);

  function handleJobChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const newJobId = e.target.value;
    setSelectedJobId(newJobId);

    if (newJobId) {
      const job = jobs.find(j => j.id === newJobId);
      if (job) {
        setState(prev => ({ ...prev, area_interesse: `Vaga: ${job.title}` }));
      }
    } else {
      setState(prev => ({ ...prev, area_interesse: '' }));
    }
  }

  function handleTypeChange(type: 'spontanea' | 'vaga') {
    setApplicationType(type);
    if (type === 'spontanea') {
      setSelectedJobId('');
      setState(prev => ({ ...prev, area_interesse: '' }));
    } else {
      setState(prev => ({ ...prev, area_interesse: '' }));
    }
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      setCvFile(e.target.files[0]);
    }
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

    if (applicationType === 'vaga' && !selectedJobId) {
      alert('Por favor, selecione a vaga a que se candidata.');
      return;
    }

    if (cvMode === 'file' && !cvFile) {
      alert('Por favor, selecione um ficheiro para o CV.');
      return;
    }

    if (cvMode === 'link' && !state.cv_link) {
      alert('Por favor, insira o link para o CV.');
      return;
    }

    setIsSubmitting(true);

    try {
      let body;
      let headers = {};

      const areaInteresseFinal = applicationType === 'vaga' ? state.area_interesse : (state.area_interesse || 'Candidatura Espontânea');

      if (cvMode === 'file' && cvFile) {
        const formData = new FormData();
        formData.append('nome', nome);
        formData.append('email', email);
        formData.append('telefone', telefone);
        formData.append('area_interesse', areaInteresseFinal);
        formData.append('mensagem', state.mensagem || '');
        formData.append('pagina', applicationType === 'vaga' ? 'Candidatura a Vaga' : 'Candidatura Espontânea');
        formData.append('url', typeof window !== 'undefined' ? window.location.href : '');
        formData.append('cv', cvFile);
        body = formData;
      } else {
        body = JSON.stringify({
          nome,
          email,
          telefone,
          area_interesse: areaInteresseFinal,
          cv_link: state.cv_link || '',
          mensagem: state.mensagem || '',
          pagina: applicationType === 'vaga' ? 'Candidatura a Vaga' : 'Candidatura Espontânea',
          url: typeof window !== 'undefined' ? window.location.href : '',
        });
        headers = { 'Content-Type': 'application/json' };
      }

      const response = await fetch('/api/spontaneous-applications', {
        method: 'POST',
        headers: headers,
        body: body,
      });

      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err?.error || 'Falha ao enviar candidatura.');
      }

      alert('Candidatura enviada com sucesso! Obrigado.');
      setState(initialState);
      setCvFile(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
      setApplicationType('spontanea');
      setSelectedJobId('');
    } catch (error: unknown) {
      console.error('Erro ao enviar candidatura:', error);
      alert(error instanceof Error ? error.message : 'Erro ao enviar candidatura. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="bg-white dark:bg-card rounded-xl shadow-lg border p-6 sm:p-8">
      {/* Type Selector */}
      <div className="flex p-1 bg-muted rounded-lg mb-8">
        <button
          type="button"
          onClick={() => handleTypeChange('spontanea')}
          className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${applicationType === 'spontanea'
              ? 'bg-white dark:bg-background text-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground'
            }`}
        >
          Candidatura Espontânea
        </button>
        <button
          type="button"
          onClick={() => handleTypeChange('vaga')}
          className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${applicationType === 'vaga'
              ? 'bg-white dark:bg-background text-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground'
            }`}
        >
          Candidatura a Vaga
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Job Selector for Vaga mode */}
        {applicationType === 'vaga' && (
          <div className="p-4 bg-primary/5 rounded-lg border border-primary/10 mb-6">
            <label htmlFor="job_select" className="block text-sm font-medium text-foreground mb-2">
              Selecione a Vaga *
            </label>
            <select
              id="job_select"
              value={selectedJobId}
              onChange={handleJobChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent bg-white dark:bg-background"
            >
              <option value="">Selecione uma vaga...</option>
              {jobs.map((job) => (
                <option key={job.id} value={job.id}>
                  {job.title} - {job.location}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              placeholder="Ex: João Silva"
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
              placeholder="Ex: joao@email.com"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

          {applicationType === 'spontanea' && (
            <div>
              <label htmlFor="area_interesse" className="block text-sm font-medium text-gray-700 mb-2">
                Área de Interesse
              </label>
              <select
                id="area_interesse"
                name="area_interesse"
                value={state.area_interesse}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent bg-white dark:bg-background"
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
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            CV (Curriculum Vitae) *
          </label>
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
              <span className="text-sm text-gray-700">Upload Ficheiro</span>
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
              <span className="text-sm text-gray-700">Link Externo</span>
            </label>
          </div>

          {cvMode === 'file' ? (
            <div>
              <input
                ref={fileInputRef}
                id="cv_file"
                name="cv_file"
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-secondary/10 file:text-secondary hover:file:bg-secondary/20"
              />
              <p className="text-xs text-gray-500 mt-1">
                Formatos aceites: PDF, DOC, DOCX. Máx: 5MB.
              </p>
            </div>
          ) : (
            <div>
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
          )}
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
    </div>
  );
}




