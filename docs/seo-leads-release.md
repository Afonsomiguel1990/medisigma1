# Aquisição e proteção dos pedidos

Implementação de 14 de setembro de 2026. Frentes executadas por subagentes GPT-6 Astra com raciocínio médio, com revisão e integração pelo coordenador.

## Recursos retirados por decisão da equipa

Em 14 de setembro, o utilizador determinou que os recursos têm de ser produzidos pela equipa. A disponibilização destes seis materiais foi suspensa: catálogo e páginas individuais passam a 404, o endpoint devolve 410 sem guardar pedidos, notificar o Slack ou emitir ligações. Foram removidas as chamadas aos recursos nos artigos e nos seis serviços. Os ficheiros privados, recibos e contactos anteriores são preservados. Não voltar a publicar materiais sem preparação e aprovação da equipa.

O prebuild mantém a validação da configuração e da RPC dos pedidos, mas já não exige os ficheiros suspensos. O registo abaixo descreve o lote inicial e os respetivos testes; as referências à disponibilidade dos recursos foram substituídas por esta decisão.

## Comportamento entregue

- Contactos guardados antes da notificação, no circuito Supabase e Slack existente. O formatter mantém os campos comerciais e não altera a apresentação das candidaturas. O cabeçalho dos recursos é `PEDIDO DE RECURSO`.
- Identificador por intenção de envio. Pedidos concorrentes com a mesma chave e conteúdo partilham contacto e tentativa de notificação; conteúdo diferente com a mesma chave recebe 409. Estados incertos não são reenviados automaticamente.
- O sucesso do formulário significa que o pedido ficou guardado. Falha de Slack, de analytics ou de emissão da ligação não apaga esse sucesso.
- Novas tabelas operacionais e RPC limitadas ao servidor, sem alterar permissões das tabelas existentes. O painel `/admin/analytics/` usa a autenticação administrativa existente e apresenta só agregados.
- Pedidos comerciais, recursos, cliques e contactos históricos ficam separados. Serviço, página de entrada, página do pedido, origem e artigos anteriores são analisados nos pedidos comerciais; há grupos próprios para recursos e cliques por página.
- Analytics apenas após consentimento, com origem desconhecida e observação parcial explícitas. A janela local expira após 30 minutos de inatividade. Não são enviadas query strings nem campos dos formulários para GA4. A recusa e revogação não impedem o pedido.
- Seis recursos em bucket privado `web-resources`. Cada ligação dura 600 segundos; a mesma intenção pode obter outra durante 24 horas. O formulário pede empresa e email. Os ficheiros e os seus mestres ficam fora do Git público.
- Capas do blog limitadas a 160/240/320 px, com `sizes` adequado à largura disponível. Mantêm-se cartões, corpo, cores, fontes e ordem das secções. Preservado o tratamento próprio do testemunho O Ramiro, publicado entretanto noutra frente.
- Títulos sem marca repetida, autoria coerente, CTAs por tema, artigos relacionados por assunto, tabelas Markdown renderizadas e remoção de FAQ schema que não correspondia ao texto visível.
- Correções pontuais em seis serviços e treze localidades; quatro artigos corrigidos no CMS após comparação da versão e hash anteriores. Fontes e limites em `editorial-review.md`. Dois recursos e seis entidades propostos em `authority-outreach.md`, sem contactos externos.

## Evidência e limites

36 testes automatizados passaram: concorrência e deduplicação, conflitos, falhas de persistência, Slack rejeitado/incerto, candidatura, consentimento, atribuição, recursos e contratos HTML/Markdown. As verificações SQL correram em transações revertidas e confirmaram atomicidade, exclusão de acesso público e separação dos agregados, sem contactos permanentes de teste.

Os 27 artigos foram compilados com GFM e verificados por HTTP quanto a conteúdo real, título, H1 e canonical. O build de produção passou. O único aviso de lint remanescente pertence ao PostEditor administrativo anterior a este lote. O aviso local sobre múltiplos lockfiles decorre da localização do worktree e não motivou alterações globais de configuração.

A verificação HTTP da versão candidata passou nas 70 páginas do sitemap, tanto em HTML como em Markdown, incluindo aliases, páginas inexistentes, exclusão dos recursos do sitemap e respostas das APIs. O painel e a API administrativa recusaram acesso sem autenticação; com as credenciais de teste do processo local, devolveram agregados e `Cache-Control: no-store`.

O prebuild verifica, sem enviar notificações, a configuração de servidor, as credenciais necessárias ao acesso administrativo, a RPC privada e a presença dos seis ficheiros no bucket privado. Uma configuração incompleta impede a publicação de uma versão sem capacidade para guardar os novos pedidos ou abrir o painel autorizado.

Na retoma, o comando completo `npm run build`, incluindo o prebuild, voltou a passar localmente. A primeira tentativa de publicação foi bloqueada por ausência de `SUPABASE_SERVICE_ROLE` na Vercel, antes de substituir a versão pública. A inspeção autorizada do ambiente também identificou a ausência de `ADMIN_USERNAME` e `ADMIN_PASSWORD`; o controlo passou a exigir os três nomes em falta. A introdução dos valores na Vercel ficou a cargo do utilizador.

No browser, a API de submissão e os fornecedores de analytics foram substituídos por respostas simuladas. Foram exercitados duplo envio, perda de resposta e repetição com o mesmo identificador, consentimento tardio, revogação, contribuição de artigo, renovação de recurso e expiração 410. A assinatura e descarga dos seis ficheiros foram verificadas separadamente no Storage real, comparando SHA-256; os endereços públicos diretos foram recusados.

Esta prova não equivale a uma mensagem nova observada no canal Slack. Não foram enviados contactos ou mensagens de teste para a equipa. O estado `sent` significa resposta HTTP de sucesso e corpo `ok` do webhook; não mede leitura humana. Os identificadores do formulário vivem na página aberta; recarregar inicia uma intenção nova.

Os modelos XLSX foram reabertos e inspecionados, mas a recalculação nativa em Excel não foi observada. Não existe prova nova de DR, nem auditoria independente de todas as certificações, instalações ou alegações dos 27 artigos. A revisão das fontes incidiu nos temas prioritários.

## Publicação e reversão

As migrações aditivas aplicadas são `medisigma_lead_tracking_private_receipts` e `medisigma_analytics_separate_request_kinds`. Os SQL revistos e as verificações com rollback constam de `supabase/review/`.

Publicar pelo fluxo Git para Vercel, após verificar a versão candidata. O checkout original e o simulador de Medicina no Trabalho em desenvolvimento permanecem separados e preservados. A integração inclui os commits de produção relativos ao testemunho O Ramiro.

Para corrigir ou reverter uma funcionalidade, criar um commit sobre a versão atual e preservar sempre contactos, recibos de deduplicação e bucket privado. Não eliminar tabelas nem reabrir estados de notificação para tentar novamente. Uma reversão integral ao código anterior perde a proteção de deduplicação para novas submissões, pelo que deve ser evitada quando uma correção localizada resolve o problema. O conteúdo CMS dispõe de snapshot anterior verificado por SHA-256 e registo das quatro alterações; restaurar apenas os campos pretendidos, confirmando primeiro a versão atual para não substituir trabalho posterior.

## Avaliação seguinte

O indicador principal é o número de pedidos de serviço, separado do estado de entrega Slack. Recursos, cliques e artigos que contribuíram para pedidos são indicadores distintos. O painel começa com 28 dias completos até ontem, em UTC; os dados anteriores ao novo sistema têm secção própria, sem atribuição retroativa.

O primeiro período completo pode ser 15 de setembro a 12 de outubro de 2026, inclusive. A comparação exige as mesmas datas e filtros em cada ferramenta. O levantamento anterior encontrou 36 contactos históricos e 40 cliques entre 16 de agosto e 12 de setembro em UTC; não devem ser apresentados como leads qualificados. Os 928 cliques do Search Console pertencem ao período do respetivo relatório, que deve ser alinhado antes de cruzar dados.

Duplicar cliques para 1.856 por 28 dias continua a ser um objetivo, sem garantia nem prazo assumido. Não se podem concluir ganhos de tráfego no dia da publicação. Também não há uma nova medição de campo dos Core Web Vitals: o build mostra cerca de 340 kB de JavaScript inicial na homepage e 321 kB nos serviços principais, justificando um lote posterior de diagnóstico de dependências. O presente lote limita a alteração de desempenho às imagens e ao carregamento de analytics condicionado ao consentimento.
