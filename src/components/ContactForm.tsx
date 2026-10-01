'use client';

import React, { useEffect, useId, useRef, useState } from 'react';
import { submitContactIntent, type SubmissionIntent } from '@/lib/leads/client-submission';
import { mediaContactIntent } from '@/lib/media-contact';
import { CONTACT_SERVICES, CONTACT_SUCCESS_MESSAGE, contactServiceKey, normalizeContactService } from '@/lib/contact';
import Link from 'next/link';
import { ProposalFields } from './ProposalFields';

interface ContactFormProps {
  pagina?: string;
  fonte?: string;
  servicoDefault?: string;
  serviceKey?: string;
  acceptMediaIntent?: boolean;
  proposal?: boolean;
}

const inputClass = 'w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent';
const fields = [
  { name: 'empresa', label: 'Nome da Empresa *', type: 'text', autoComplete: 'organization', maxLength: 200, required: true },
  { name: 'nome', label: 'Nome da pessoa (opcional)', type: 'text', autoComplete: 'name', maxLength: 200 },
  { name: 'email', label: 'Email *', type: 'email', autoComplete: 'email', maxLength: 254, required: true },
  { name: 'telefone', label: 'Telefone (opcional)', type: 'tel', autoComplete: 'tel', maxLength: 40 },
  { name: 'localidade', label: 'Localidade (opcional)', type: 'text', autoComplete: 'address-level2', maxLength: 200 },
];

export default function ContactForm({ pagina, fonte, servicoDefault, acceptMediaIntent = false, proposal = false }: ContactFormProps) {
  const id = useId();
  const busy = useRef(false);
  const intent = useRef<SubmissionIntent>({});
  const initialService = normalizeContactService(servicoDefault);
  const [service, setService] = useState(initialService);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [mediaIntent, setMediaIntent] = useState<ReturnType<typeof mediaContactIntent>>();
  const paginaLabel = pagina || 'Formulário de Contacto';
  const fonteLabel = fonte || paginaLabel;

  useEffect(() => {
    if (!acceptMediaIntent) return;
    const selectService = (event: Event) => {
      if (busy.current) return;
      const selected = mediaContactIntent((event as CustomEvent).detail?.mediaId);
      setMediaIntent(selected);
      if (selected) setService(normalizeContactService(selected.serviceLabel));
    };
    window.addEventListener('medisigma:media-contact', selectService);
    return () => window.removeEventListener('medisigma:media-contact', selectService);
  }, [acceptMediaIntent]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (busy.current) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    const read = (name: string) => data.get(name)?.toString().trim() || '';
    busy.current = true;
    setIsSubmitting(true);
    setStatus('idle');
    try {
      const receipt = await submitContactIntent({
        empresa: read('empresa'), nome: read('nome'), email: read('email'),
        telefone: read('telefone'), localidade: read('localidade'),
        mensagem: read('mensagem'), tipo_instalacao: read('tipo_instalacao'),
        ...(proposal ? { concelho: read('concelho'), nif: read('nif'), numero_trabalhadores: read('numero_trabalhadores'), numero_estabelecimentos: read('numero_estabelecimentos'), numero_extintores: read('numero_extintores') } : {}),
        servico: read('servico'), service_key: contactServiceKey(read('servico')),
        lead_kind: 'service_request', pagina: paginaLabel,
        fonte: mediaIntent ? `${fonteLabel}:media:${mediaIntent.mediaId}` : fonteLabel,
        url: window.location.href, confirm_mail: read('confirm_mail'),
      }, intent.current);
      if (!receipt.saved) throw new Error('Verifique os campos e tente novamente.');
      setStatus('success');
      form.reset();
      setService(initialService);
      intent.current = {};
      setMediaIntent(undefined);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Erro ao enviar mensagem. Tente novamente ou contacte-nos pelo 241 331 504.');
      setStatus('error');
    } finally {
      busy.current = false;
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-xl shadow-2xl">
      <h3 className="text-2xl font-semibold text-gray-900 mb-6">{proposal ? 'Dados do pedido' : 'Contacto Rápido'}</h3>
      {mediaIntent && <div className="mb-5 rounded-lg bg-blue-50 p-3 text-sm text-slate-800" role="status">
        <p>Pedido sobre <strong>{mediaIntent.serviceLabel}</strong></p>
        <button type="button" disabled={isSubmitting} onClick={() => { setMediaIntent(undefined); setService(initialService); }} className="mt-1 underline underline-offset-4">Retirar seleção</button>
      </div>}
      <form className="space-y-4" method="post" action="/api/contact" onSubmit={handleSubmit} aria-busy={isSubmitting}>
        <input type="hidden" name="pagina" value={paginaLabel} />
        <input type="hidden" name="fonte" value={mediaIntent ? `${fonteLabel}:media:${mediaIntent.mediaId}` : fonteLabel} />
        {fields.filter(field => !proposal || field.name !== 'localidade').map(({ label, ...field }) => <div key={field.name}>
          <label htmlFor={`${id}-${field.name}`} className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
          <input {...field} id={`${id}-${field.name}`} className={inputClass} />
        </div>)}
        <div>
          <label htmlFor={`${id}-servico`} className="block text-sm font-medium text-gray-700 mb-2">Serviço *</label>
          <select id={`${id}-servico`} name="servico" required value={service} className={inputClass}
            onChange={event => { setService(event.target.value); setMediaIntent(undefined); }}>
            <option value="">Selecione o serviço...</option>
            {CONTACT_SERVICES.map(option => <option key={option.value} value={option.value}>{'label' in option ? option.label : option.value}</option>)}
          </select>
        </div>
        {proposal && <ProposalFields id={id} service={service} inputClass={inputClass} />}
        <div>
          <label htmlFor={`${id}-tipo_instalacao`} className="block text-sm font-medium text-gray-700 mb-2">Tipo de Instalação (opcional)</label>
          <select id={`${id}-tipo_instalacao`} name="tipo_instalacao" defaultValue="" className={inputClass}>
            <option value="">Selecione...</option>
            {['Hotelaria', 'Indústria', 'Condomínio', 'Instalação de Saúde', 'Outro'].map(value => <option key={value} value={value}>{value}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor={`${id}-mensagem`} className="block text-sm font-medium text-gray-700 mb-2">Mensagem (opcional)</label>
          <textarea id={`${id}-mensagem`} name="mensagem" maxLength={2500} rows={4} className={inputClass} placeholder="Descreva brevemente as suas necessidades..." />
        </div>
        <div aria-hidden="true" hidden>
          <label htmlFor={`${id}-confirm_mail`}>Não preencha este campo</label>
          <input type="text" id={`${id}-confirm_mail`} name="confirm_mail" tabIndex={-1} autoComplete="off" />
        </div>
        <button type="submit" disabled={isSubmitting} className="w-full bg-secondary text-white py-3 px-6 rounded-lg font-semibold hover:bg-secondary/90 transition-colors disabled:opacity-60">
          {isSubmitting ? 'A enviar...' : proposal ? 'Pedir proposta' : 'Enviar Mensagem'}
        </button>
        <div aria-live="polite" aria-atomic="true">
          {status === 'success' && <p role="status" className="rounded-lg bg-green-50 p-4 text-green-900">{CONTACT_SUCCESS_MESSAGE}</p>}
          {status === 'error' && <p role="alert" className="rounded-lg bg-red-50 p-4 text-red-900">{errorMessage}</p>}
        </div>
        <p className="text-xs text-gray-500 text-center">* Campos obrigatórios. Os seus dados serão tratados com confidencialidade.</p>
        {!proposal && <p className="text-sm text-center"><Link className="text-secondary underline underline-offset-4" href={`/pedir-proposta/${contactServiceKey(service) ? '?servico=' + contactServiceKey(service) : ''}`}>Pedir proposta com mais detalhes</Link></p>}
      </form>
    </div>
  );
}
