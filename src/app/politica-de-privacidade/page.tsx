import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Política de Privacidade | Medisigma',
  description: 'Consulte a nossa Política de Privacidade para saber como tratamos os seus dados pessoais em conformidade com o RGPD.',
};

export default function PoliticaDePrivacidadePage() {
  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-6">
        Política de Privacidade
      </h1>
      <div className="prose dark:prose-invert max-w-none text-justify">
        <p className="font-bold">Última atualização: 11 de Junho de 2025</p>
        
        <p>A sua privacidade é importante para nós. É política da Medisigma respeitar a sua privacidade em relação a qualquer informação sua que possamos recolher no site <a href="https://medisigma.pt">Medisigma</a>, e outros sites que possuímos e operamos.</p>
        
        <h2 className="text-2xl font-semibold mt-6 mb-4">1. Que dados recolhemos?</h2>
        <p>Recolhemos informações pessoais que nos fornece diretamente quando preenche um formulário de contacto, subscreve a nossa newsletter ou nos contacta por outros meios. As informações podem incluir:</p>
        <ul>
          <li>Nome</li>
          <li>Endereço de e-mail</li>
          <li>Número de telefone</li>
          <li>Nome da empresa</li>
          <li>Qualquer outra informação que decida partilhar connosco.</li>
        </ul>
        <p>Também recolhemos dados automaticamente através de cookies e tecnologias semelhantes quando navega no nosso site. Para mais informações, consulte a nossa <a href="/cookies">Política de Cookies</a>.</p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">2. Como utilizamos os seus dados?</h2>
        <p>Utilizamos os seus dados para os seguintes fins:</p>
        <ul>
            <li>Para fornecer e manter o nosso serviço.</li>
            <li>Para gerir os seus pedidos e responder às suas questões.</li>
            <li>Para enviar comunicações de marketing, caso tenha consentido.</li>
            <li>Para analisar o tráfego do site e melhorar a experiência do utilizador.</li>
            <li>Para cumprir obrigações legais.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6 mb-4">3. Com quem partilhamos os seus dados?</h2>
        <p>Não partilhamos as suas informações pessoais com terceiros, exceto nas seguintes situações:</p>
        <ul>
            <li>Com o seu consentimento explícito.</li>
            <li>Com prestadores de serviços que atuam em nosso nome (ex: serviços de alojamento web), que estão contratualmente obrigados a proteger os seus dados.</li>
            <li>Para cumprir uma obrigação legal ou uma ordem judicial.</li>
            <li>Para proteger os nossos direitos, propriedade ou segurança.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6 mb-4">4. Segurança dos seus dados</h2>
        <p>Estamos empenhados em proteger os seus dados pessoais. Implementamos medidas técnicas e organizacionais adequadas para proteger os seus dados contra acesso não autorizado, alteração, divulgação ou destruição.</p>
        
        <h2 className="text-2xl font-semibold mt-6 mb-4">5. Retenção de dados</h2>
        <p>Reteremos as suas informações pessoais apenas pelo tempo necessário para os fins estabelecidos nesta política de privacidade, a menos que um período de retenção mais longo seja exigido ou permitido por lei.</p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">6. Os seus direitos de proteção de dados</h2>
        <p>De acordo com o Regulamento Geral sobre a Proteção de Dados (RGPD), tem os seguintes direitos:</p>
        <ul>
            <li><strong>Direito de acesso:</strong> O direito de obter uma cópia dos seus dados pessoais.</li>
            <li><strong>Direito de retificação:</strong> O direito de solicitar a correção de dados incorretos ou incompletos.</li>
            <li><strong>Direito ao apagamento (ou &quot;direito a ser esquecido&quot;):</strong> O direito de solicitar o apagamento dos seus dados, em determinadas circunstâncias.</li>
            <li><strong>Direito à limitação do tratamento:</strong> O direito de solicitar a restrição do tratamento dos seus dados.</li>
            <li><strong>Direito de portabilidade dos dados:</strong> O direito de receber os seus dados num formato estruturado, de uso corrente e de leitura automática.</li>
            <li><strong>Direito de oposição:</strong> O direito de se opor ao tratamento dos seus dados, em determinadas circunstâncias.</li>
            <li><strong>Direito de não ficar sujeito a decisões automatizadas:</strong> O direito de não ser sujeito a uma decisão tomada exclusivamente com base no tratamento automatizado.</li>
        </ul>
        <p>Para exercer qualquer um destes direitos, por favor, <a href="/contact">contacte-nos</a>.</p>
        
        <h2 className="text-2xl font-semibold mt-6 mb-4">7. Links para outros sites</h2>
        <p>O nosso site pode conter links para outros sites que não são operados por nós. Se clicar num link de terceiros, será direcionado para o site desse terceiro. Aconselhamos vivamente a rever a Política de Privacidade de todos os sites que visitar. Não temos controlo e não assumimos qualquer responsabilidade pelo conteúdo, políticas de privacidade ou práticas de quaisquer sites ou serviços de terceiros.</p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">8. Alterações a esta Política de Privacidade</h2>
        <p>Podemos atualizar a nossa Política de Privacidade de tempos em tempos. Iremos notificá-lo de quaisquer alterações, publicando a nova Política de Privacidade nesta página e atualizando a data da &quot;última atualização&quot; no topo desta página.</p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">9. Contacte-nos</h2>
        <p>Se tiver alguma dúvida sobre esta Política de Privacidade, pode contactar-nos através do nosso <a href="/contact">formulário de contacto</a>.</p>
      </div>
    </div>
  );
} 