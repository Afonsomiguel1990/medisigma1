import React from 'react';
import { Metadata } from 'next';
import { CookiePreferencesButton } from '@/components/cookie-preferences-button';

export const metadata: Metadata = {
  title: 'Política de Cookies',
  description: 'Saiba como utilizamos cookies, como funciona a análise de navegação e como pode alterar as suas preferências.',
  alternates: {
    canonical: 'https://www.medisigma.pt/cookies/',
  },
};

export default function PoliticaDeCookiesPage() {
  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-6">
        Política de Cookies
      </h1>
      <div className="prose dark:prose-invert max-w-none text-justify">
        <p className="font-bold">Última atualização: 14 de setembro de 2026</p>

        <p>A Medisigma utiliza cookies no seu website (<a href="https://www.medisigma.pt">https://www.medisigma.pt</a>). Os cookies necessários guardam as suas preferências. A análise de navegação só começa depois de aceitar a categoria de análise. Pode recusar ou retirar esse consentimento e continuar a consultar o site e a enviar formulários.</p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">O que são cookies?</h2>
        <p>
          Cookies são pequenos ficheiros de texto que são armazenados no seu computador ou dispositivo móvel quando visita um website. Eles são amplamente utilizados para fazer os websites funcionarem, ou funcionarem de forma mais eficiente, bem como para fornecer informações aos proprietários do site.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">Como utilizamos os cookies?</h2>
        <p>Utilizamos cookies para os seguintes fins:</p>
        <ul>
          <li><strong>Cookies Estritamente Necessários:</strong> Guardam a sua escolha de consentimento para a aplicar nas visitas seguintes.</li>
          <li><strong>Cookies de Análise e Desempenho:</strong> Com o seu consentimento, ajudam a perceber as páginas consultadas, as origens das visitas, os pedidos enviados e os cliques de contacto. A observação começa nesse momento e não recupera a navegação anterior ao consentimento.</li>
          <li><strong>Cookies de Marketing:</strong> A categoria inclui o serviço de vídeos do Facebook. Estes vídeos só carregam quando autoriza esse serviço. Ao carregar um vídeo, o Facebook pode recolher dados da visita e utilizar cookies próprios.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6 mb-4">Que cookies utilizamos?</h2>
        <p>Abaixo encontra-se uma lista dos cookies que utilizamos no nosso site.</p>

        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 p-2">Categoria</th>
                <th className="border border-gray-300 p-2">Cookie</th>
                <th className="border border-gray-300 p-2">Finalidade</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 p-2 font-semibold">Necessários</td>
                <td className="border border-gray-300 p-2"><code>cc_cookie</code></td>
                <td className="border border-gray-300 p-2">Armazena as preferências de consentimento de cookies do utilizador.</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2 font-semibold" rowSpan={2}>Análise</td>
                <td className="border border-gray-300 p-2"><code>_ga</code></td>
                <td className="border border-gray-300 p-2">Utilizado pelo Google Analytics para distinguir visitas, apenas após consentimento de análise.</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2"><code>_ga_*</code></td>
                <td className="border border-gray-300 p-2">Família de cookies do Google Analytics que mantém informação de sessão, apenas após consentimento de análise.</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2 font-semibold">Marketing</td>
                <td className="border border-gray-300 p-2">Cookies de terceiros do Facebook</td>
                <td className="border border-gray-300 p-2">Podem ser utilizados quando autoriza o serviço de vídeos do Facebook. Os nomes dependem do serviço carregado.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-sm"><i>Após consentimento de análise, usamos também armazenamento de sessão do navegador para relacionar a origem da visita, páginas e artigos consultados com um pedido. A observação tem uma janela de 30 minutos de inatividade e é reiniciada na interação seguinte após esse prazo. Retirar o consentimento elimina este registo local. Esta atribuição é parcial e não inclui o conteúdo dos campos dos formulários.</i></p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">Como pode gerir os seus cookies?</h2>
        <p>
          Pode gerir as suas preferências de cookies a qualquer momento, clicando no botão abaixo. Isto permitirá que revisite o banner de consentimento de cookies e altere as suas preferências ou retire o seu consentimento imediatamente.
        </p>

        <CookiePreferencesButton />

        <p className="mt-4">
          Além disso, diferentes navegadores fornecem métodos diferentes para bloquear e eliminar cookies utilizados por websites. Pode alterar as configurações do seu navegador para bloquear/eliminar os cookies. Para saber mais sobre como gerir e eliminar cookies, visite <a href="https://www.allaboutcookies.org" target="_blank" rel="noopener noreferrer">www.allaboutcookies.org</a>.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">Alterações a esta Política de Cookies</h2>
        <p>
          Podemos atualizar a nossa Política de Cookies de tempos em tempos. Iremos notificá-lo de quaisquer alterações, publicando a nova Política de Cookies nesta página.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">Contacte-nos</h2>
        <p>
          Se tiver alguma dúvida sobre esta Política de Cookies, pode contactar-nos através do nosso <a href="/contact">formulário de contacto</a>.
        </p>

      </div>
    </div>
  );
}
