'use client';

interface ContactFormData {
  empresa: string;
  email: string;
  servico: string;
  mensagem: string;
  pagina: string;
  url: string;
  timestamp: string;
}

export default function ContactForm() {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    // Garantir que todos os campos são tratados corretamente
    const empresa = formData.get('empresa')?.toString().trim() || '';
    const email = formData.get('email')?.toString().trim() || '';
    const servico = formData.get('servico')?.toString().trim() || '';
    const mensagem = formData.get('mensagem')?.toString().trim() || '';
    
    // Validação básica dos campos obrigatórios
    if (!empresa || !email) {
      alert('Por favor, preencha todos os campos obrigatórios (Nome da Empresa e Email).');
      return;
    }
    
    const data: ContactFormData = {
      empresa: empresa,
      email: email,
      servico: servico || 'Não especificado',
      mensagem: mensagem || '',
      pagina: 'Legionella - Controlo e Prevenção',
      url: typeof window !== 'undefined' ? window.location.href : '',
      timestamp: new Date().toISOString()
    };

    // Debug: Mostrar no console o que será enviado
    console.log('Dados a enviar para webhook:', data);

    try {
      const response = await fetch('https://hook.eu1.make.com/yg81xw9zg45ltry61rj5ja40v3uloa6s', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });

      console.log('Resposta do webhook:', {
        status: response.status,
        statusText: response.statusText,
        ok: response.ok
      });

      if (response.ok) {
        alert('Mensagem enviada com sucesso! Entraremos em contacto brevemente.');
        form.reset();
      } else {
        console.error('Erro na resposta do webhook:', response);
        throw new Error(`Erro ${response.status}: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Erro ao enviar para webhook:', error);
      alert('Erro ao enviar mensagem. Tente novamente ou contacte-nos diretamente pelo telefone 241 331 504.');
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
          <label htmlFor="servico" className="block text-sm font-medium text-gray-700 mb-2">
            Tipo de Instalação
          </label>
          <select 
            id="servico"
            name="servico"
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
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
            placeholder="Descreva brevemente as suas necessidades..."
          ></textarea>
        </div>
        
        <button 
          type="submit"
          className="w-full bg-secondary text-white py-3 px-6 rounded-lg font-semibold hover:bg-secondary/90 transition-colors"
        >
          Enviar Pedido
        </button>
        
        <p className="text-xs text-gray-500 text-center">
          * Campos obrigatórios. Os seus dados serão tratados com confidencialidade.
        </p>
      </form>
    </div>
  );
} 