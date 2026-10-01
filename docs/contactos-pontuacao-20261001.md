# Contactos e pontuação, 1 de outubro de 2026

Implementação preparada na branch `codex/contactos-pontuacao-20261001`, a partir de `origin/main` em `2c49a94`. O checkout original foi preservado. A publicação do site ainda não foi feita.

## Alterações

- Serviço obrigatório separado do tipo de instalação. Nome da pessoa e localidade opcionais. Seleções automáticas e pedidos dos simuladores mantidos.
- POST de contacto por JSON, formulário normal ou multipart sem ficheiros, com validação comum. Confirmação após gravação e tratamento de falhas de notificação preservados.
- Resposta anunciada em até 48 horas úteis, sem email automático. Confirmação acessível na página e envio sem JavaScript.
- Redirecionamentos 301 para os dois endereços portugueses, contactos no rodapé e documentação disponível em Markdown.
- Um exemplar de cada testemunho no HTML inicial. Cópias animadas apenas no cliente, ocultas para acessibilidade, sem foco nem IDs repetidos.
- M-dashes removidos do conteúdo publicável. Verificação de ficheiros e artigos da base de dados antes de compilar.

## Base de dados

A migração `contact_person_location_installation` foi aplicada no projeto Supabase `jtulxclahsgowmfrifwf`. O SQL correspondente está em `supabase/review/contact-details.sql`.

Foram acrescentadas as colunas opcionais `nome`, `localidade` e `tipo_instalacao` e atualizada a função transacional `web.submit_lead`. A função continua com SECURITY INVOKER e com os mesmos privilégios de execução. Não houve reclassificação, atualização ou remoção dos contactos antigos.

Não foram encontrados m-dashes nos 28 artigos publicados e no rascunho existente. Não foi necessário alterar esses registos.

## Validação

- 53 testes automáticos, incluindo submissões nos três formatos, antispam, limites, conflitos de identificador, falhas de gravação e de notificação.
- Compilação de produção e TypeScript aprovados. Para compilar localmente foram usadas credenciais administrativas temporárias apenas no processo, sem alterar a configuração de produção.
- 223 ficheiros de conteúdo verificados sem m-dashes.
- 71 URLs do sitemap verificadas em HTML e Markdown, com canonical, negociação de conteúdo e dados estruturados.
- Verificação adicional de 74 páginas, incluindo erros e confirmação, com contactos no rodapé, pontuação e redirecionamentos.
- Navegador da app a 1440 e 390 píxeis. Campos obrigatórios confirmados, serviço de extintores pré-selecionado e ausência de overflow horizontal. Campos com 276 píxeis de largura no telemóvel após corrigir margens acumuladas.
- Carrossel confirmado no navegador: 9 grupos de cópias com aria-hidden e inert, sem IDs nos grupos duplicados.

Os testes de envio usaram gravação e notificações simuladas. Não foram criados contactos de teste em produção nem enviados emails ou mensagens de teste para a equipa.

## Antes de publicar

O ficheiro de dependências bloqueadas permanece igual ao de origin/main. O npm audit reportou 7 vulnerabilidades preexistentes, incluindo uma crítica no Next.js. Esta implementação não atualiza dependências.

A publicação deve seguir o fluxo habitual pelo GitHub, após autorização. Depois da disponibilização, executar `npm run verify:contact -- https://www.medisigma.pt` e `npm run verify:agent -- --base-url https://www.medisigma.pt`, além de confirmar visualmente o formulário.
