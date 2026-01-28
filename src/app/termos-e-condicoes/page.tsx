import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Termos e Condições | Medisigma',
  description: 'Consulte os Termos e Condições de utilização do site da Medisigma.',
};

export default function TermosECondicoesPage() {
  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-8">
        Termos e Condições
      </h1>
      <div className="prose dark:prose-invert max-w-none space-y-8">

        {/* Identificação da Empresa */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4">1. Identificação da Entidade</h2>
          <div className="bg-muted/30 rounded-lg p-6 mb-6">
            <p className="text-foreground mb-2"><strong>Denominação Social:</strong> GRUPO MEDISIGMA, LDA</p>
            <p className="text-foreground mb-2"><strong>Morada:</strong> Via Industrial 1 2 Lote 5, 2200-293 Abrantes</p>
            <p className="text-foreground mb-2"><strong>Número de Identificação Fiscal:</strong> 516858513</p>
            <p className="text-foreground mb-2"><strong>Email:</strong> info@medisigma.pt</p>
            <p className="text-foreground"><strong>Website:</strong> www.medisigma.pt</p>
          </div>
        </section>

        {/* Objeto e Âmbito */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4">2. Objeto e Âmbito de Aplicação</h2>
          <p className="text-muted-foreground mb-4">
            Os presentes Termos e Condições regulam a utilização do website da GRUPO MEDISIGMA, LDA (doravante designada por &quot;Medisigma&quot; ou &quot;Empresa&quot;), bem como a prestação de serviços especializados em Medicina do Trabalho, Segurança e Higiene no Trabalho, Segurança Alimentar, Controlo de Pragas, Formação Certificada e demais serviços conexos.
          </p>
          <p className="text-muted-foreground mb-4">
            A utilização deste website pressupõe a aceitação integral e sem reservas dos presentes termos e condições. Caso não concorde com qualquer disposição aqui constante, deverá abster-se de utilizar este website e os serviços da Medisigma.
          </p>
        </section>

        {/* Definições */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4">3. Definições</h2>
          <div className="space-y-3">
            <p className="text-muted-foreground">
              <strong>&quot;Website&quot;:</strong> Portal eletrónico acessível através do endereço www.medisigma.pt e respetivos subdomínios.
            </p>
            <p className="text-muted-foreground">
              <strong>&quot;Utilizador&quot;:</strong> Qualquer pessoa singular ou coletiva que aceda e utilize o website da Medisigma.
            </p>
            <p className="text-muted-foreground">
              <strong>&quot;Serviços&quot;:</strong> Totalidade dos serviços prestados pela Medisigma, incluindo mas não se limitando a Medicina do Trabalho, Segurança no Trabalho, Formação e Consultoria.
            </p>
            <p className="text-muted-foreground">
              <strong>&quot;Cliente&quot;:</strong> Entidade que contrata formalmente os serviços da Medisigma mediante contrato escrito.
            </p>
          </div>
        </section>

        {/* Utilização do Website */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4">4. Condições de Utilização do Website</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">4.1. Acesso</h3>
              <p className="text-muted-foreground">
                O acesso ao website é gratuito e aberto ao público, ressalvadas as áreas de acesso restrito que requerem autenticação. A Medisigma reserva-se o direito de modificar, suspender ou interromper, temporária ou definitivamente, o acesso ao website, sem aviso prévio.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">4.2. Uso Adequado</h3>
              <p className="text-muted-foreground">
                O Utilizador compromete-se a utilizar o website de forma lícita, não atentando contra a dignidade humana, ordem pública, investigação criminal em curso, direitos de terceiros, bons costumes e menores de idade. É expressamente proibida a utilização do website para fins comerciais não autorizados, distribuição de software malicioso ou qualquer atividade ilegal.
              </p>
            </div>
          </div>
        </section>

        {/* Propriedade Intelectual */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4">5. Propriedade Intelectual</h2>
          <p className="text-muted-foreground mb-4">
            Todos os conteúdos presentes no website, incluindo mas não se limitando a textos, imagens, logótipos, gráficos, vídeos, software e design, são propriedade da Medisigma ou de terceiros que autorizaram a sua utilização, encontrando-se protegidos pelas leis de propriedade intelectual e direitos de autor.
          </p>
          <p className="text-muted-foreground mb-4">
            É vedada a reprodução, distribuição, modificação, transmissão ou utilização dos conteúdos para fins comerciais sem autorização expressa e por escrito da Medisigma, sob pena de responsabilização civil e criminal.
          </p>
        </section>

        {/* Prestação de Serviços */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4">6. Prestação de Serviços</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">6.1. Medicina do Trabalho</h3>
              <p className="text-muted-foreground">
                Os serviços de Medicina do Trabalho são prestados em conformidade com a Lei n.º 102/2009, de 10 de setembro, e demais legislação aplicável, por médicos devidamente licenciados e especializados na área.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">6.2. Segurança no Trabalho</h3>
              <p className="text-muted-foreground">
                Os serviços de Segurança e Higiene no Trabalho são executados por técnicos certificados, em cumprimento da Lei n.º 102/2009 e respetiva regulamentação, visando a prevenção de riscos profissionais.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">6.3. Certificação e Qualidade</h3>
              <p className="text-muted-foreground">
                A Medisigma compromete-se a prestar todos os serviços com o mais elevado padrão de qualidade, em conformidade com as normas técnicas aplicáveis e certificações obtidas.
              </p>
            </div>
          </div>
        </section>

        {/* Responsabilidades e Limitações */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4">7. Responsabilidades e Limitações</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">7.1. Limitação de Responsabilidade</h3>
              <p className="text-muted-foreground">
                A Medisigma não se responsabiliza por danos diretos ou indiretos resultantes da utilização do website, incluindo mas não se limitando a perda de dados, lucros cessantes ou interrupção de atividade, salvo em casos de dolo ou negligência grosseira.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">7.2. Disponibilidade</h3>
              <p className="text-muted-foreground">
                A Medisigma envidará os melhores esforços para garantir a disponibilidade contínua do website, não podendo, contudo, garantir que o mesmo esteja livre de interrupções, erros ou falhas técnicas.
              </p>
            </div>
          </div>
        </section>

        {/* Proteção de Dados */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4">8. Proteção de Dados Pessoais</h2>
          <p className="text-muted-foreground mb-4">
            O tratamento de dados pessoais pela Medisigma rege-se pelo disposto no Regulamento Geral sobre a Proteção de Dados (RGPD) e demais legislação aplicável em matéria de proteção de dados, conforme descrito na nossa Política de Privacidade.
          </p>
          <p className="text-muted-foreground mb-4">
            A Medisigma compromete-se a implementar medidas técnicas e organizativas adequadas para garantir a segurança e confidencialidade dos dados pessoais tratados no âmbito da sua atividade.
          </p>
        </section>

        {/* Alterações */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4">9. Alterações aos Termos e Condições</h2>
          <p className="text-muted-foreground mb-4">
            A Medisigma reserva-se o direito de alterar os presentes Termos e Condições a qualquer momento, sendo as alterações eficazes a partir da sua publicação no website. Os Utilizadores serão notificados de alterações substanciais através de aviso prominente no website.
          </p>
          <p className="text-muted-foreground mb-4">
            A continuação da utilização do website após a publicação de alterações constitui aceitação tácita dos novos termos.
          </p>
        </section>

        {/* Lei Aplicável e Foro */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4">10. Lei Aplicável e Resolução de Litígios</h2>
          <p className="text-muted-foreground mb-4">
            Os presentes Termos e Condições regem-se pela lei portuguesa. Para a resolução de quaisquer litígios emergentes da interpretação ou execução dos presentes termos, será competente o foro da comarca de Abrantes, com expressa renúncia a qualquer outro.
          </p>
          <p className="text-muted-foreground mb-4">
            Previamente ao recurso aos tribunais, as partes comprometem-se a envidar esforços para resolver amigavelmente qualquer divergência através de negociação direta ou mediação.
          </p>
        </section>

        {/* Contactos */}
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4">11. Contactos</h2>
          <p className="text-muted-foreground mb-4">
            Para esclarecimento de dúvidas sobre os presentes Termos e Condições ou sobre a utilização do website, poderá contactar a Medisigma através dos seguintes meios:
          </p>
          <div className="bg-muted/30 rounded-lg p-6">
            <p className="text-foreground mb-2"><strong>Email:</strong> geral@medisigma.pt</p>
            <p className="text-foreground mb-2"><strong>Telefone:</strong> 241 331 504</p>
            <p className="text-foreground"><strong>Morada:</strong> Via Industrial 1 2 Lote 5, 2200-293 Abrantes</p>
          </div>
        </section>

        {/* Data de Vigência */}
        <section className="border-t pt-8">
          <p className="text-sm text-muted-foreground text-center">
            <strong>Última atualização:</strong> {new Date().toLocaleDateString('pt-PT', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
          <p className="text-sm text-muted-foreground text-center mt-2">
            Estes Termos e Condições entram em vigor na data da sua publicação no website.
          </p>
        </section>

      </div>
    </div>
  );
} 