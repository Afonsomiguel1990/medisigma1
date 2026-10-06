# Proteção de formulários e CV

Base: `d6ea307599a77d6676245b670ac5d15e0beb2b0e`, main remoto confirmado em 6 de outubro de 2026.
Implementação numa worktree separada. Não alterar os documentos, URLs, visibilidade ou registos históricos de `os-cv`.

## Ordem e estado

- [x] Isolar o trabalho e confirmar o estado inicial.
- [x] Validar regras contra a amostra privada, sem abrir anexos ou destinos externos: 12 sinalizados, 19 preservados.
- [x] Criar estruturas aditivas privadas, contadores e compatibilidade com o código anterior.
- [x] Testar receção, revisão, notificações e novos CV privados com base e storage reais e destino local de notificações.
- [x] Publicar por Git e verificar o deployment habitual.
- [x] Fechar apenas as entradas anónimas abrangidas após validar o novo percurso.
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

Total final: 75 testes aprovados, TypeScript e build de produção aprovados. A auditoria zero refere-se a dependências de produção; permanecem avisos nas ferramentas de desenvolvimento.

A migração aditiva `public_intake_private_cv` foi aplicada à Supabase em 6 de outubro. A triagem permanece em `observe`, sem início do período de observação até à publicação do código. O snapshot imediatamente anterior à migração tinha 454 contactos, 123 candidaturas e 108 objetos históricos; continuaram a chegar pedidos durante o desenvolvimento.

A migração `intake_legacy_retry_guard` preserva o emissor original quando o código anterior ganha uma corrida de idempotência durante a publicação. A recuperação de uma marcação de spam errada reutiliza o registo operacional e mantém revogadas as ligações anteriormente revogadas.

O teste integrado passou 12 grupos: referências históricas, HEAD de PDF/DOC/DOCX antigos, uploads e consulta privados nos três formatos (incluindo 5 MB), tokens, ficheiros falsificados, JSON e HTML nativo, multipart legado, revisão e CSRF, edição de um rascunho e limites administrativos. As sete notificações foram recebidas num servidor local; todos os registos e objetos sintéticos foram removidos. Nenhum CV histórico foi aberto.

Reversão: mudar apenas `web.intake_settings.mode` para `observe` se houver falsos positivos. Manter este código de leitura privada ou uma versão posterior compatível. Nunca fazer rollback para uma versão sem leitura de CV privados, tornar o bucket novo público ou restabelecer inserções anónimas. Falhas ou incerteza de entrega exigem revisão, sem reenvio automático.

## Produção e período de observação

Implementação publicada em `92d65fb0831e420200dad7f0ec51e9a1bf51f56d`, deployment `dpl_GPGk9A4eoTL9NAtTZRisntMRRJFp`, estado Ready verificado no browser integrado e no GitHub. Novos uploads PDF de 5 MB, DOC e DOCX passaram pelo domínio público, produziram exatamente três notificações de teste no destino habitual e abriram pelo Slack sem login. Os três registos e documentos sintéticos foram depois removidos; não são candidaturas reais.

A migração `close_anonymous_form_writes` foi aplicada depois deste teste. Verificações HTTP com anon confirmaram a recusa das inserções nas três tabelas, dos dois wrappers e dos uploads em ambos os buckets. Leituras das seis tabelas privadas também são recusadas. Mantêm-se os grants autenticados de CRM e a leitura pública de `os-cv`.

Verificações públicas: 76 páginas de contacto/navegação e 72 URLs do sitemap em HTML e Markdown aprovadas. A consulta histórica usou apenas referências e pedidos HEAD. A administração passou criação/edição/pré-visualização/remoção de rascunho e revisão de candidatura por API autenticada; o browser integrado recusou abrir a página protegida por Basic Auth.

Observação iniciada em **6 de outubro de 2026 às 13:52:19 Europe/Lisbon** (12:52:19 UTC). A retenção não pode ser ativada antes de **8 de outubro de 2026 às 13:52:19 Europe/Lisbon**. Automação deste chat: `medisigma-validar-48h-e-ativar-reten-o-de-spam`, verificação diária às 14:00. Confirmar o tempo na Supabase antes da ativação, independentemente do horário do agendamento.

Durante observe, os sinais são registados mas os pedidos válidos continuam a ser entregues; ficheiros inválidos/suspeitos ficam sempre isolados e os limites duros já vigoram. A ativação deve verificar a observação, o benchmark 12/19, a recuperação manual e os estados de entrega, e executar uma atualização condicionada a `observation_started_at <= now()-interval '48 hours'`. Preservar o snapshot histórico original; não voltar a criá-lo com novos registos.
