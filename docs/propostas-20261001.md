# Pedidos de proposta e navegação

Continuação das melhorias de contacto e pontuação registadas em `contactos-pontuacao-20261001.md`.

## Alterações

- Página `/pedir-proposta/`, ligada no menu, no rodapé, no catálogo de serviços, nos formulários partilhados e no llms.txt.
- Seleção inicial por serviço através de valores conhecidos do catálogo. Ligações de serviços mantêm o serviço escolhido.
- Empresa, email e serviço obrigatórios. Nome, telefone, concelho, NIF e mensagem opcionais.
- Quantidade de trabalhadores para Medicina do Trabalho e SST, estabelecimentos para HACCP, Pragas e SCIE, extintores para Manutenção de Extintores.
- Sem JavaScript, todas as perguntas opcionais estão disponíveis com indicação do serviço a que se aplicam. Com JavaScript, apenas as quantidades relevantes ficam visíveis e ativas.
- Os novos campos usam o mesmo endpoint, nos formatos JSON, urlencoded e multipart. Validação no servidor, inclusão no identificador do pedido e notificação interna.
- Campos separados dos dados comerciais enriquecidos em `web.contacts`. Migração `proposal_optional_details`, SQL em `supabase/review/proposal-details.sql`. Sem alterações a registos existentes ou permissões da função.
- Administração apresenta os dados indicados pelo visitante numa coluna própria.
- Novo redirecionamento 301 de `/fale-connosco`, com e sem barra, preservando parâmetros.
- Menu com Área de cliente, Portal Careview e Formação Moodle. Ação principal Pedir proposta e acesso separado a Contactos.
- ContactPage nas páginas de contacto e proposta, referenciando a organização central. Nova página no sitemap.
- Acesso direto ao formulário em telemóvel e fecho do menu após navegação.

## Validação local

- 57 testes automáticos aprovados, com gravação e notificações simuladas.
- TypeScript e compilação de produção aprovados. A primeira tentativa de repetição da compilação encontrou uma indisponibilidade transitória do RPC; uma consulta isolada confirmou HTTP 200 e a compilação seguinte passou integralmente.
- 226 ficheiros de código e conteúdo sem m-dashes. 29 artigos e rascunhos da base de dados também verificados, sem necessidade de alterações.
- 72 URLs do sitemap em HTML e Markdown, incluindo canonical e negociação de conteúdo.
- 76 páginas e variantes verificadas quanto a pontuação, contactos, redirecionamentos e novos campos.
- Navegador da app em computador a 1440 píxeis e telemóvel a 390 píxeis. Sem deslocação horizontal, apenas 3 campos obrigatórios. Seleções Medicina do Trabalho, HACCP e Extintores verificadas. Menu fecha após escolher Pedir proposta.
- Nenhum contacto de teste criado em produção e nenhuma notificação de teste enviada.
- `npm audit` mantém 7 vulnerabilidades anteriores, incluindo uma crítica no Next.js. As dependências e o lockfile não foram alterados nesta tarefa.
- A função `web.submit_lead` mantém SECURITY INVOKER e execução apenas por postgres e service_role. Os avisos do Supabase no schema web sobre funções de candidaturas e triggers são anteriores e não foram alterados nesta tarefa.

## Pendente

O horário de atendimento comercial foi pedido ao utilizador e não foi inventado. Será acrescentado em texto e nos dados estruturados quando estiver confirmado. Os botões flutuantes ficam para uma experiência posterior, conforme a recomendação aprovada.

## Publicação

Publicação pelo GitHub após a aprovação do utilizador neste chat. Verificar o estado do commit no GitHub e repetir os verificadores no domínio público antes de declarar a disponibilização concluída.
