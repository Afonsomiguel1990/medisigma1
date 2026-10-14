# Medisigma: implementação e acompanhamento da aquisição

Preparado a 14 de outubro de 2026 a partir de `origin/main` em `92d33aab1ba086784e963ab9a61937845d4451b9`, na branch `codex/seo-growth-20261014`. O checkout principal e o simulador por publicar foram preservados. O código, as migrações e as revisões editoriais aguardam publicação; as configurações de GA4 indicadas abaixo já foram guardadas.

## Alterações preparadas

- Analytics: comandos `gtag` em formato `Arguments`, fila criada antes do carregamento da tag, conservação do consumidor instalado pelo Google, retoma após consentimento e navegação, evento `generate_lead` apenas para receções elegíveis e sem duplicação. ID e propriedade mantidos. `contact_form_start` mede o início do formulário sem enviar campos pessoais. `analytics_debug=1` permite a validação pública no DebugView após consentimento.
- Pedidos: catálogo partilhado com radão, ruído ocupacional e qualidade do ar; ajuda contextual; três campos obrigatórios; backend independente do consentimento. Os formulários nativos e clientes sem UUID reutilizam pedidos idênticos durante 30 minutos, através da receção existente. Uma submissão com UUID mantém a deduplicação atual.
- Páginas: três novos serviços, Legionella reformulada, percursos de extintores e HACCP melhorados, duas páginas de setor e treze páginas locais revistas. As localidades representam áreas de serviço; a sede confirmada é Abrantes. Foram retirados testemunhos genéricos e afirmações locais sem prova. Radão encaminha para contacto sem alegar execução própria ou acreditação da Medisigma.
- Descoberta: navegação, ligações editoriais, representações HTML/Markdown, organização, canónicas e sitemap incluem os serviços novos. Seis URLs antigas têm redirecionamento direto com parâmetros preservados.
- Conteúdo: `src/content/seo-growth-editorial.json` contém seis revisões verificáveis contra o conteúdo atual. Corrige dois resumos com acentuação danificada e atualiza os quatro artigos técnicos existentes. As secções de preparação de radão e ruído já cobriam o assunto; foram mantidas e ligadas ao serviço correspondente. Não foram criados artigos duplicados nem identificados revisores técnicos fictícios.
- Estabilidade visual: recrutamento passa a um bloco estável no rodapé; campos opcionais deixam de desaparecer durante a hidratação. As tabelas dos artigos conservam os seus cabeçalhos no telemóvel.
- Leitura de aquisição: o relatório administrativo existente passa a destacar os seis serviços prioritários e os grupos de páginas. A migração exclui apenas classificações explícitas de spam, teste e candidatura. Careview e Sistema Volta ficam separados quando identificados na página do pedido ou de entrada. Históricos sem classificação continuam identificados como tal.

## GA4 já configurado

Propriedade `519429067`, fluxo `13284521770`, tag `G-GB5WGQPXK3`.

- Criadas e confirmadas as dimensões de evento `service_key` e `lead_kind`.
- Desativadas as visualizações automáticas por mudanças no histórico, porque o site envia `page_view` nas navegações.
- Desativadas a pesquisa automática no site e as interações automáticas com formulários. O site envia eventos limitados a categorias e confirmações.
- Filtro `Internal Traffic`: modo Teste. Não foi alterado.
- Fuso horário corrigido de Açores para Horário Portugal. O Google confirmou que a alteração afeta apenas dados posteriores e pode criar uma descontinuidade no dia da mudança. Moeda Euro mantida. O relatório do backend continua a identificar explicitamente os seus dias em UTC; para comparações por dia civil com o GA4, converter as fronteiras de Europe/Lisbon para UTC.
- O fluxo continuava sem dados nas últimas 48 horas antes da publicação da correção. Isto não permite declarar a recolha recuperada.

Provas locais: `output/seo-growth/ga4-dimensions.jpg` e `ga4-enhanced-after.jpg`. A receção em tempo real, o DebugView e a marcação de `generate_lead` como evento principal ficam para a validação após publicação e disparo confirmado. Não se devem gerar pedidos comerciais fictícios em produção para forçar esta verificação.

## Verificação e limites da prova

Os testes de contactos, consentimento, permissões e migrações usam dados sintéticos e não enviam notificações comerciais. O servidor de apresentação local usa uma chave de escrita inválida e um destino de notificações local desativado.

Build final e 82 testes automáticos concluídos. Verificados 82 URLs em HTML e Markdown, 19 páginas prioritárias com canónicas e sitemap, seis redirecionamentos diretos, seis revisões editoriais preparadas e 20 páginas com media, legendas e ligações de contacto.

Foram verificados 48 percursos, em viewports de 320, 390, 820 e 1280 píxeis. A área útil de conteúdo foi, respetivamente, 305, 375, 805 e 1265 píxeis devido à barra de deslocamento. Não houve transbordo horizontal. Os formulários mantiveram empresa, email e serviço como únicos campos obrigatórios. O contrato HTML nativo, a submissão JSON e multipart e a deduplicação foram testados separadamente.

Medições locais de CLS, mediana de três carregamentos a 390 píxeis, observadas até 1,5 segundos após `load` num proxy local de diagnóstico:

| Modelo | Antes | Depois |
| --- | ---: | ---: |
| Lisboa | 0,1154 | 0,0222 |
| Legionella | 0,1149 | 0,0234 |
| Artigo de formação | 0,1457 | 0,0309 |

Esta comparação apoia a correção local e não substitui os dados de campo do Search Console. O código anterior foi servido a partir do checkout já existente em `tmp/blog-ruido-20261009`, sem alterações aos seus ficheiros versionados. Os resultados completos estão em `output/seo-growth/`.

A auditoria das dependências de produção encontrou zero vulnerabilidades conhecidas. A auditoria completa identificou 15 alertas nas dependências de desenvolvimento já presentes no lockfile, incluindo lint e processamento CSS. A atualização dessas dependências deve ser feita numa alteração própria.

## Ordem de publicação e reversão

1. Obter autorização para publicar o conjunto de alterações através de GitHub e Vercel.
2. Aplicar as duas migrações `20261014090000_acquisition_explicit_exclusions.sql` e `20261014091000_native_contact_retry.sql`. Confirmar funções e permissões. Não criam tabelas nem alteram os contactos históricos.
3. Gerar os ficheiros editoriais com `node scripts/prepare-growth-editorial.mjs`. Rever e aplicar `output/seo-growth/editorial-apply.sql`. A transação recusa alterações se os campos de origem já tiverem mudado. Manter `editorial-rollback.sql` para reversão.
4. Publicar os commits pelo fluxo GitHub. Aguardar a sincronização Vercel e verificar publicamente os serviços, páginas locais, setores, redirecionamentos, canónicas, sitemap e representações para agentes.
5. Validar consentimento, navegação, tempo real e DebugView. Marcar `generate_lead` como evento principal após confirmar um disparo válido. A validação operacional de uma submissão real requer a autorização prevista no plano.
6. Inspecionar os cinco URLs novos no Search Console e verificar o sitemap existente. Pedir indexação depois de confirmar o conteúdo publicado. Não garantir indexação ou posição.

Para reverter o site, reverter os commits publicados e deixar o fluxo GitHub fazer a sincronização. A função adicional de receção nativa pode permanecer sem consumidores. O relatório anterior está em `supabase/review/leads-analytics-breakdowns.sql`; a reversão editorial usa condições sobre os textos novos para não sobrescrever trabalho posterior. As dimensões de GA4 não precisam de ser removidas. Qualquer reposição das opções de medição deve ser coordenada com a versão do código para evitar duplicações.

## Medição dos 90 dias

`src/content/acquisition-query-baseline.json` fixa vinte pesquisas: doze com observações e oito alvos sem base observada, identificados com `null`, nunca com procura zero. Base Search Console: Web, Portugal, 12 de julho a 11 de outubro de 2026, comparada com 12 de abril a 11 de julho. As posições são médias das impressões, não posições garantidas numa pesquisa local.

O indicador principal é o número de pedidos elegíveis guardados pelo backend. A base comercial será constituída pelos primeiros 28 dias completos de medição fiável após publicação. As taxas do GA4 usam apenas eventos e sessões com a mesma cobertura de consentimento. Cliques em telefone, email e WhatsApp são intenções. Impressões nas funcionalidades de IA da Pesquisa Google e visitas com origem identificada em assistentes são métricas diferentes.

As metas de trabalho são +25% nos cliques orgânicos das páginas comerciais prioritárias e +25% nos pedidos, com números absolutos quando a base for inferior a dez. Avaliar aos dias 30, 60 e 90 a partir da publicação verificada. Fixar então as datas dos acompanhamentos; não iniciar o relógio de resultados com a versão ainda local.

## Próximas ações por prioridade

1. **Publicação e medição real:** concluir os passos acima e guardar a data de início da base fiável.
2. **Perfil de Empresa:** o perfil público Medisigma em Abrantes existe, com telefone 241 331 504, categoria “Escritório empresarial”, 4,0/5 em 38 opiniões e horário publicado de segunda a sexta, 09:00–18:00. A morada surge como “Via Industrial 1 2 Lote 5, 2200-293 Abrantes”, diferente da formulação do site. Confirmar a normalização da morada, o horário real e a categoria disponível mais adequada à atividade. Na conta pessoal indicada pelo utilizador, o gestor não lista a Medisigma e a Pesquisa mostra “É o proprietário desta empresa?”. Não foi reivindicado nem criado qualquer perfil.
3. **Prova técnica:** confirmar com a equipa os âmbitos, entregáveis e documentos de qualificação aplicáveis antes de acrescentar acreditações, métodos, prazos de execução ou revisão técnica nominal. Preparar fotografias atuais da sede e exemplos autorizados dos serviços para o perfil empresarial.
4. **Primeiro ciclo de procura:** priorizar títulos e percursos de “HACCP restauração” (336 impressões, posição 10,9), “manutenção extintores” (52; 10,3) e “avaliaçao da qualidade do ar interior” (34; 15,8). Usar o registo estável das vinte pesquisas para acompanhar a progressão.
5. **Autoridade local e reputação:** rever o perfil existente com acesso de gestão confirmado, preparar respostas individuais às críticas sem divulgar dados clínicos e facilitar pedidos de opiniões autênticas. Não publicar respostas nem contactar clientes sem autorização.
6. **Dias 30, 60 e 90:** registar publicações, pedidos por serviço, procura sem marca em Portugal, pesquisas locais, grupos de entrada, intenções, visitas de assistentes, impressões em IA, indexação e dados de campo. Reordenar o ciclo seguinte pelos pedidos e pela procura observados, mantendo Careview, recrutamento e Sistema Volta separados.
