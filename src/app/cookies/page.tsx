import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Política de Cookies | Medisigma',
  description: 'Consulte a nossa Política de Cookies para saber como utilizamos cookies no nosso site para garantir a conformidade com o RGPD.',
};

const CookiePolicyButton = () => {
  return (
    <button
      type="button"
      className="cc__btn"
      data-cc="show-preferencesModal"
    >
      Alterar Consentimento de Cookies
    </button>
  );
}

export default function PoliticaDeCookiesPage() {
  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-6">
        Política de Cookies
      </h1>
      <div className="prose dark:prose-invert max-w-none text-justify">
                    <p className="font-bold">Última atualização: 11 de Junho de 2025</p>
        
        <p>A Medisigma (&quot;nós&quot;, &quot;nosso&quot;) utiliza cookies no nosso website (<a href="https://medisigma.pt">https://medisigma.pt</a>). Ao utilizar o nosso website, concorda com o uso de cookies em conformidade com esta Política de Cookies.</p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">O que são cookies?</h2>
        <p>
          Cookies são pequenos ficheiros de texto que são armazenados no seu computador ou dispositivo móvel quando visita um website. Eles são amplamente utilizados para fazer os websites funcionarem, ou funcionarem de forma mais eficiente, bem como para fornecer informações aos proprietários do site.
        </p>
        
        <h2 className="text-2xl font-semibold mt-6 mb-4">Como utilizamos os cookies?</h2>
        <p>Utilizamos cookies para os seguintes fins:</p>
        <ul>
          <li><strong>Cookies Estritamente Necessários:</strong> Essenciais para o funcionamento do site. Estes cookies não armazenam qualquer informação de identificação pessoal.</li>
          <li><strong>Cookies de Análise e Desempenho:</strong> Permitem-nos reconhecer e contar o número de visitantes e ver como os visitantes se movem pelo nosso site. Isto ajuda-nos a melhorar a forma como o nosso site funciona.</li>
          <li><strong>Cookies de Marketing:</strong> Utilizados para rastrear visitantes através de websites. A intenção é exibir anúncios que são relevantes e apelativos para o utilizador individual.</li>
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
                        <td className="border border-gray-300 p-2">Utilizado pelo Google Analytics para distinguir utilizadores. (Se aplicável)</td>
                    </tr>
                    <tr>
                        <td className="border border-gray-300 p-2"><code>_gid</code></td>
                        <td className="border border-gray-300 p-2">Utilizado pelo Google Analytics para distinguir utilizadores. (Se aplicável)</td>
                    </tr>
                     <tr>
                        <td className="border border-gray-300 p-2 font-semibold">Marketing</td>
                        <td className="border border-gray-300 p-2">N/A</td>
                        <td className="border border-gray-300 p-2">Atualmente, não utilizamos cookies de marketing.</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <p className="mt-4 text-sm"><i>Esta lista será atualizada à medida que novos cookies forem adicionados ou removidos.</i></p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">Como pode gerir os seus cookies?</h2>
        <p>
          Pode gerir as suas preferências de cookies a qualquer momento, clicando no botão abaixo. Isto permitirá que revisite o banner de consentimento de cookies e altere as suas preferências ou retire o seu consentimento imediatamente.
        </p>
        
        <CookiePolicyButton />

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