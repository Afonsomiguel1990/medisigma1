'use client';

interface ContactFormProps {
  pagina?: string;
  fonte?: string;
  servicoDefault?: string;
}

interface ContactFormData {
  empresa: string;
  telefone: string;
  email: string;
  servico: string;
  mensagem: string;
  pagina: string;
  url: string;
  fonte: string;
}

export default function ContactForm({ pagina, fonte, servicoDefault }: ContactFormProps) {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const empresa = formData.get('empresa')?.toString().trim() || '';
    const telefone = formData.get('telefone')?.toString().trim() || '';
    const email = formData.get('email')?.toString().trim() || '';
    const servico = formData.get('servico')?.toString().trim() || '';
    const mensagem = formData.get('mensagem')?.toString().trim() || '';

    if (!empresa || !email) {
      alert('Por favor, preencha os campos obrigatórios (Empresa e Email).');
      return;
    }

    const paginaLabel = pagina || 'Formulário de Contacto';
    const fonteLabel = fonte || paginaLabel;

    const data: ContactFormData = {
      empresa,
      telefone,
      email,
      servico: servico || servicoDefault || 'Não especificado',
      mensagem: mensagem || '',
      pagina: paginaLabel,
      fonte: fonteLabel,
      url: typeof window !== 'undefined' ? window.location.href : '',
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert('Mensagem recebida. Obrigado!');
        form.reset();
      } else {
        const err = await response.json().catch(() => ({}));
        console.error('Erro na API /api/contact:', err);
        throw new Error(err?.error || 'Falha ao enviar');
      }
    } catch (error) {
      console.error('Erro ao enviar contacto:', error);
      alert('Erro ao enviar mensagem. Tente novamente ou contacte-nos pelo 241 331 504.');
    }
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-2xl">
      <h3 className="text-2xl font-semibold text-gray-900 mb-6">Contacto Rápido</h3>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="empresa" className="block text-sm font-medium text-gray-700 mb-2">
            Nome da Empresa *
          </label>
          <input
            type="text"
            id="empresa"
            name="empresa"
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
            defaultValue={servicoDefault || ''}
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
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
            placeholder="Descreva brevemente as suas necessidades..."
          />
        </div>

        <button
          type="submit"
          className="w-full bg-secondary text-white py-3 px-6 rounded-lg font-semibold hover:bg-secondary/90 transition-colors"
        >
          Enviar Mensagem
        </button>

        <p className="text-xs text-gray-500 text-center">
          * Campos obrigatórios. Os seus dados serão tratados com confidencialidade.
        </p>
      </form>
    </div>
  );
} 