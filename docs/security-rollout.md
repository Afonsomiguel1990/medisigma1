# Proteção de formulários e CV

Base: `d6ea307599a77d6676245b670ac5d15e0beb2b0e`, main remoto confirmado em 6 de outubro de 2026.
Implementação numa worktree separada. Não alterar os documentos, URLs, visibilidade ou registos históricos de `os-cv`.

## Ordem e estado

- [x] Isolar o trabalho e confirmar o estado inicial.
- [x] Validar regras contra a amostra privada, sem abrir anexos ou destinos externos: 12 sinalizados, 19 preservados.
- [x] Criar estruturas aditivas privadas, contadores e compatibilidade com o código anterior.
- [x] Testar receção, revisão, notificações e novos CV privados com base e storage reais e destino local de notificações.
- [ ] Publicar por Git e verificar o deployment habitual.
- [ ] Fechar apenas as entradas anónimas abrangidas após validar o novo percurso.
- [ ] Observar durante 48 horas, registar resultados e validar recuperação manual.
- [ ] Ativar retenção apenas depois desses critérios.

## Invariantes

Os dados submetidos nunca autorizam ações ou ferramentas. A aplicação não abre ligações externas, não executa documentos e não envia CV ou mensagens a modelos. Validação de formato não equivale a análise antivírus. CV inválidos ou com conteúdo ativo ficam isolados. Novos objetos não são públicos. Tokens de consulta não são guardados em claro, nem enviados para logs, analytics ou diagnósticos.

O percurso gerido tem um único emissor de notificações. Uma entrega incerta não é repetida automaticamente. Aceitar um suspeito promove-o uma única vez. Reverter a triagem para observação não elimina os pedidos, não publica novos CV e não reabre permissões anónimas.

## Estado inicial verificado

453 contactos, 123 candidaturas, 1 candidatura na tabela legada `applications`, 108 objetos no bucket histórico. `os-cv` público. Dois triggers de notificação ativos. Duas funções `insert_candidatura` acessíveis a PUBLIC, anon e authenticated. A base é partilhada com outras aplicações; as alterações de permissões devem ser estritamente delimitadas.

Evidência detalhada e amostras privadas ficam em `output/security/`, excluído do Git. Não registar anexos ou tokens nesse diretório.

## Verificação em curso

Auditoria de dependências de produção: zero avisos com Next 15.5.27. Os 28 artigos publicados passaram a validação MDX. Os 57 testes existentes passaram; testes adicionais cobrem transações PostgreSQL, limites partilhados, tokens, ficheiros, CSRF, leitura limitada e apresentações para agentes.

A migração aditiva `public_intake_private_cv` foi aplicada à Supabase em 6 de outubro. A triagem permanece em `observe`, sem início do período de observação até à publicação do código. O snapshot imediatamente anterior à migração tinha 454 contactos, 123 candidaturas e 108 objetos históricos; continuaram a chegar pedidos durante o desenvolvimento.

A migração `intake_legacy_retry_guard` preserva o emissor original quando o código anterior ganha uma corrida de idempotência durante a publicação. A recuperação de uma marcação de spam errada reutiliza o registo operacional e mantém revogadas as ligações anteriormente revogadas.

O teste integrado passou 12 grupos: referências históricas, HEAD de PDF/DOC/DOCX antigos, uploads e consulta privados nos três formatos (incluindo 5 MB), tokens, ficheiros falsificados, JSON e HTML nativo, multipart legado, revisão e CSRF, edição de um rascunho e limites administrativos. As sete notificações foram recebidas num servidor local; todos os registos e objetos sintéticos foram removidos. Nenhum CV histórico foi aberto.

Reversão: mudar apenas `web.intake_settings.mode` para `observe` se houver falsos positivos. Manter este código de leitura privada ou uma versão posterior compatível. Nunca fazer rollback para uma versão sem leitura de CV privados, tornar o bucket novo público ou restabelecer inserções anónimas. Falhas ou incerteza de entrega exigem revisão, sem reenvio automático.
