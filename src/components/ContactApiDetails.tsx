import React from 'react';
import { CONTACT_SERVICES } from '@/lib/contact';

export function ContactApiDetails() {
  return <section className="mx-auto w-full max-w-6xl px-6 py-8 text-sm text-gray-700">
    <details>
      <summary className="cursor-pointer font-medium">Contacto por agentes e integrações</summary>
      <div className="mt-4 space-y-3">
        <p>Este formulário funciona sem JavaScript. Também pode enviar um pedido comercial por <code>POST /api/contact</code>. Este endpoint não realiza marcações nem aceita dados clínicos.</p>
        <p>Formatos aceites: <code>application/json</code>, <code>application/x-www-form-urlencoded</code> e <code>multipart/form-data</code>, sem ficheiros.</p>
        <p>Campos obrigatórios: <code>empresa</code>, <code>email</code> e <code>servico</code>. Campos opcionais: <code>nome</code>, <code>localidade</code>, <code>telefone</code>, <code>tipo_instalacao</code> e <code>mensagem</code>.</p>
        <p>Serviços: {CONTACT_SERVICES.map(service => service.value).join('; ')}.</p>
        <p>Limites: empresa, nome, localidade, serviço e tipo de instalação até 200 caracteres; email até 254; telefone até 40; mensagem até 2500. Deixe <code>confirm_mail</code> vazio.</p>
        <p>Para repetir uma tentativa sem duplicar o pedido, envie o mesmo <code>submission_id</code>, um UUID, com os mesmos dados. Para um novo pedido, use outro UUID.</p>
        <p>Com JSON, uma resposta HTTP 200 com <code>saved: true</code> confirma a gravação. <code>saved: false</code> não confirma a receção. Com formulário HTML e <code>Accept: text/html</code>, a confirmação usa um redirecionamento HTTP 303.</p>
        <p>Erros: 400 para campos inválidos; 409 para um identificador reutilizado com dados diferentes; 413 para corpo demasiado longo; 415 para formato não suportado; 429 para excesso de pedidos, com <code>Retry-After</code>; 503 quando não foi possível guardar. O limite atual é de 5 pedidos por 10 minutos por endereço IP.</p>
        <pre className="overflow-x-auto rounded-lg bg-gray-100 p-4"><code>{JSON.stringify({ empresa: 'Empresa Exemplo', email: 'contacto@example.com', servico: 'Medicina do Trabalho', mensagem: 'Pretendemos uma proposta para a nossa empresa.' }, null, 2)}</code></pre>
        <p>A confirmação é apresentada no ecrã. Respondemos em até 48 horas úteis.</p>
      </div>
    </details>
  </section>;
}
