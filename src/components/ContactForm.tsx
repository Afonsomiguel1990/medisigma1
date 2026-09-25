'use client';
import { useEffect, useRef, useState } from 'react';
import { submitContactIntent, serviceKeyFromLabel, type SubmissionIntent } from '@/lib/leads/client-submission';
import { mediaContactIntent } from '@/lib/media-contact';

interface ContactFormProps {
  pagina?: string;
  fonte?: string;
  servicoDefault?: string;
  serviceKey?: string;
  acceptMediaIntent?: boolean;
}

export default function ContactForm({ pagina, fonte, servicoDefault, serviceKey, acceptMediaIntent = false }: ContactFormProps) {
  const busy = useRef(false);
  const intent = useRef<SubmissionIntent>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mediaIntent, setMediaIntent] = useState<ReturnType<typeof mediaContactIntent>>();
  useEffect(() => {
    if (!acceptMediaIntent) return;
    const selectService = (event: Event) => {
      if (!busy.current) setMediaIntent(mediaContactIntent((event as CustomEvent).detail?.mediaId));
    };
    window.addEventListener('medisigma:media-contact', selectService);
    return () => window.removeEventListener('medisigma:media-contact', selectService);
  }, [acceptMediaIntent]);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (busy.current) return;
    const form = e.currentTarget;
    const formData = new FormData(form);
    const read = (name: string) => formData.get(name)?.toString().trim() || '';
    const empresa = read('empresa');
    const email = read('email');
    if (!empresa || !email) {
      alert('Por favor, preencha os campos obrigatórios (Empresa e Email).');
      return;
    }
    busy.current = true;
    setIsSubmitting(true);
    const paginaLabel = pagina || 'Formulário de Contacto';
    try {
      await submitContactIntent({
        empresa, email, telefone: read('telefone'), mensagem: read('mensagem'),
        servico: mediaIntent?.serviceLabel || servicoDefault || 'Não especificado',
        service_key: mediaIntent?.serviceKey || serviceKey || serviceKeyFromLabel(servicoDefault || '', window.location.pathname),
        company_sector: read('servico'), lead_kind: 'service_request',
        pagina: paginaLabel, fonte: mediaIntent ? `${fonte || paginaLabel}:media:${mediaIntent.mediaId}` : fonte || paginaLabel,
        url: window.location.href, confirm_mail: read('confirm_mail'),
      }, intent.current);
      alert('Mensagem recebida. Obrigado!');
      form.reset();
      intent.current = {};
      setMediaIntent(undefined);
    } catch {
      alert('Erro ao enviar mensagem. Tente novamente ou contacte-nos pelo 241 331 504.');
    } finally { busy.current = false; setIsSubmitting(false); }
  };
  return (
    <div className="bg-white p-8 rounded-xl shadow-2xl">
      <h3 className="text-2xl font-semibold text-gray-900 mb-6">Contacto Rápido</h3>
      {mediaIntent && <div className="mb-5 rounded-lg bg-blue-50 p-3 text-sm text-slate-800" role="status">
        <p>Pedido sobre <strong>{mediaIntent.serviceLabel}</strong></p>
        <button type="button" disabled={isSubmitting} onClick={() => setMediaIntent(undefined)} className="mt-1 underline underline-offset-4">Retirar seleção</button>
      </div>}
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="empresa" className="block text-sm font-medium text-gray-700 mb-2">
            Nome da Empresa *
          </label>
          <input
            type="text"
            id="empresa"
            name="empresa"
            maxLength={200}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
            placeholder="A sua empresa"
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            maxLength={254}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
            placeholder="empresa@exemplo.pt"
            required
          />
        </div>

        <div>
          <label htmlFor="telefone" className="block text-sm font-medium text-gray-700 mb-2">
            Telefone
          </label>
          <input
            type="tel"
            id="telefone"
            name="telefone"
            maxLength={40}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
            placeholder="Ex: 912 345 678"
          />
        </div>

        <div>
          <label htmlFor="servico" className="block text-sm font-medium text-gray-700 mb-2">
            Tipo de Instalação
          </label>
          <select
            id="servico"
            name="servico"
            defaultValue={''}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
          >
            <option value="">Selecione...</option>
            <option value="Hotelaria">Hotelaria</option>
            <option value="Indústria">Indústria</option>
            <option value="Condomínio">Condomínio</option>
            <option value="Instalação de Saúde">Instalação de Saúde</option>
            <option value="Outro">Outro</option>
          </select>
        </div>

        <div>
          <label htmlFor="mensagem" className="block text-sm font-medium text-gray-700 mb-2">
            Mensagem (opcional)
          </label>
          <textarea
            id="mensagem"
            name="mensagem"
            maxLength={2500}
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
            placeholder="Descreva brevemente as suas necessidades..."
          />
        </div>

        {/* Honeypot field for anti-spam */}
        <div style={{ opacity: 0, position: 'absolute', top: 0, left: 0, height: 0, width: 0, zIndex: -1 }}>
          <label htmlFor="confirm_mail">Não preencha este campo</label>
          <input
            type="text"
            id="confirm_mail"
            name="confirm_mail"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          aria-busy={isSubmitting}
          className="w-full bg-secondary text-white py-3 px-6 rounded-lg font-semibold hover:bg-secondary/90 transition-colors"
        >
          {isSubmitting ? 'A enviar...' : 'Enviar Mensagem'}
        </button>

        <p className="text-xs text-gray-500 text-center">
          * Campos obrigatórios. Os seus dados serão tratados com confidencialidade.
        </p>
      </form>
    </div>
  );
}
