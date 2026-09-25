# Fotografias e vídeos nas páginas de serviços

Versão para revisão, preparada a partir de `origin/main` (`ce15c3b`) num checkout isolado. A publicação não foi executada. Os originais permanecem na pasta fornecida, sem alterações.

## Seleção aplicada

| Página | Material | Destino do pedido |
| --- | --- | --- |
| Segurança no Trabalho | Sofalca, vídeo e duas fotografias de medição | Avaliação de ruído |
| Segurança Contra Incêndios | Herdade Amarela, vídeo e capa | Medidas de autoproteção |
| Segurança Alimentar | Visita técnica, fotografia de registos e entrevista do Ramiro | Apoio em segurança alimentar |
| Medicina Desportiva | Benfica de Abrantes, vídeo e fotografia de avaliação | Exames desportivos, para atletas e clubes |
| Manutenção de Extintores | Técnico na viatura e pormenor da balança | Manutenção de extintores |
| SinalSigma | Aplicação de sinal de perigo elétrico | Sinalética |
| Controlo de Pragas | Técnico junto de um ponto de controlo | Controlo de pragas |

A análise da fala do vídeo da Herdade Amarela identificou o levantamento para medidas de autoproteção como assunto. Por isso, o exemplo foi associado a Segurança Contra Incêndios. O [site do alojamento](https://www.herdadeamarela.pt/home) confirma o nome Herdade Amarela de Ceilões. A localização em Abrantes foi confirmada pelo cliente. A [Sofalca](https://www.sofalca.pt/pt/contact/) indica Bemposta, Abrantes.

Abrantes apresenta dois vídeos (Sofalca e Benfica de Abrantes) e dois cartões (Ramiro e Herdade Amarela). As restantes 12 páginas locais reutilizam os mesmos ficheiros, com a legenda explícita «Exemplo de trabalho realizado pela Medisigma em Portugal».

- Segurança alimentar: Lisboa, Santarém, Castelo Branco, Coimbra, Tomar e Fátima.
- Ruído: Covilhã, Leiria, Torres Novas e Entroncamento.
- Medicina desportiva: Rio Maior.
- Segurança no alojamento: Portalegre, com ligação a Segurança Contra Incêndios.

A homepage, a página de testemunhos e o artigo existente do Ramiro foram preservados. O aniversário/vouchers ficou fora da seleção. Não foram criadas páginas individuais de vídeo.

## Ficheiros e funcionamento

Cinco MP4 H.264 a 720 × 1280, áudio AAC e índice no início do ficheiro (`faststart`): 6,60 MiB (Sofalca), 3,45 MiB (Herdade), 4,51 MiB (segurança alimentar), 5,36 MiB (Benfica) e 21,28 MiB (Ramiro). Total aproximado: 41,2 MiB. As capas provêm dos vídeos originais. Oito fotografias WebP passam pelo sistema responsivo de imagens do Next.js. O enquadramento de IMG_2958 concentra-se na balança, evitando os documentos da parte superior da fotografia.

`service-media-manifest.json` regista originais, SHA-256, enquadramentos e resultados. A preparação pode ser repetida com `scripts/prepare-service-media.py`, Python/Pillow, FFmpeg e libheif. As ferramentas de transcrição e os WAV intermédios são locais e não entram no site.

O player usa controlos nativos, `preload="none"`, capa, legendas PT-PT, transcrição expansível e ligação direta ao MP4. O HTML inicial contém o vídeo e a respetiva fonte. Não existe autoplay nem carregamento integral deliberado ao abrir a página.

Os botões selecionam o serviço no formulário existente e mostram essa seleção ao visitante. O envio continua a exigir a ação do utilizador. Mantêm-se a API, a gravação e a proteção contra duplicados. A origem do bloco é acrescentada ao campo `fonte`, no formato `origem:media:identificador`.

## Medição

Os eventos `service_video_start`, `service_video_complete` e `service_media_cta` usam `media_id`, `service_key` e o caminho público da página, sem dados do formulário. Dependem do consentimento e da inicialização do analytics; não são acumulados enquanto o consentimento está ausente. Os ambientes locais e de preview não enviam estes eventos.

Os pedidos recebidos continuam a ser os pedidos efetivamente gravados. Os grupos por serviço, página e origem já existem na estrutura de analytics. `generate_lead` mantém-se associado à confirmação de gravação. Telefone e WhatsApp continuam a ser cliques separados, sem os contar como pedidos recebidos.

Na publicação, guardar o ponto de comparação dos 28 dias anteriores. Passados 28 dias completos, comparar pedidos por serviço/página, sessões e taxa de pedido, reproduções, conclusões e cliques nos blocos. Separar alterações no volume/composição do tráfego e campanhas; uma variação não demonstra, por si só, efeito dos vídeos. Esta comparação ainda não é possível porque a alteração não foi publicada.

## Publicação

`src/content/service-media-publication.json` mantém `publishedAt: null` durante a revisão. Não é usada a data de exportação. O `VideoObject` está implementado, mas só é emitido quando existir a data efetiva de primeira publicação. O build de produção recusa uma data em falta.

Depois da autorização de publicação e com a data real definida:

1. Registar essa data com `npm run media:publication -- YYYY-MM-DD`. O comando preserva a data se já estiver registada.
2. Concluir a revisão auditiva e substituir as duas marcações provisórias nas legendas e na transcrição do Ramiro (1:17–1:20 e 2:27–2:28). O build de produção recusa essas marcações e verifica a correspondência entre legendas e transcrição.
3. Executar `npm run verify:media`, `npm test`, `npx tsc --noEmit` e `npm run build` com a configuração do projeto.
4. Seguir o fluxo Git do projeto. Não executar publicação direta por CLI.
5. Esperar pelo deployment `Ready` e executar `npm run verify:media-pages -- https://www.medisigma.pt`.
6. Confirmar as páginas, reprodução, legendas e metadados no domínio público.

Os testes de HTML e dos ficheiros não submetem formulários nem enviam notificações. Os testes de gravação, duplicação e consentimento usam os adaptadores simulados da suite existente.

## Verificação da versão de revisão

As falas dos cinco vídeos foram processadas integralmente com reconhecimento de voz local e o texto foi revisto. Para a entrevista foram comparadas três transcrições (Whisper small, medium e large-v3-turbo). Duas passagens continuam assinaladas como pouco percetíveis; as transcrições automáticas discordam e não foi inventada uma citação. Isto não substitui a revisão auditiva humana integral antes da publicação. Os dois excertos para facilitar a confirmação estão em `.media-build/ramiro-rever-01.mp3` e `.media-build/ramiro-rever-02.mp3` (não publicados).

Validações executadas na versão local em 25 de setembro de 2026:

- 41 testes aprovados, incluindo consentimento, pedidos gravados, duplicados e seleção dos serviços pelos novos botões.
- TypeScript e build Next.js concluídos. O preflight confirmou a configuração do servidor e a disponibilidade do RPC privado, sem enviar notificações. Para a revisão local foram usadas credenciais administrativas efémeras no processo, sem editar `.env` nem a configuração de produção.
- 20 páginas verificadas por HTTP: HTML com os players, faixas de legendas, ligações para os formulários e indicação geográfica correta.
- Os cinco MP4 responderam a pedidos parciais com HTTP 206. Os cinco VTT e as 13 imagens/capas responderam corretamente. Hashes, dimensões, H.264/AAC, índice de reprodução e estrutura/tempos das legendas validados.
- Os cinco vídeos foram descodificados integralmente com FFmpeg, sem erros. No browser integrado foram verificados reprodução, navegação temporal e carregamento das legendas dos cinco players.
- As 20 páginas foram verificadas no browser a 360 e 390 px: 40 verificações sem deslocação horizontal, autoplay ou dados de vídeo carregados antes da interação.
- Inspeção visual das secções em computador e telemóvel. A seleção de serviço foi confirmada nos formulários de Segurança Alimentar, Lisboa, Segurança Contra Incêndios, Portalegre, Abrantes e SinalSigma, sem submeter pedidos reais.
- `git diff --check` sem erros. A cópia principal mantém as alterações que já existiam antes desta tarefa. As três advertências de lint do build já existiam nos imports de `Link` de duas páginas e no `useEffect` de `PostEditor`.

A revisão está disponível apenas no computador local, em `http://127.0.0.1:3075`. Se o processo tiver terminado, pode voltar a ser iniciado neste checkout com `node .media-build/run-local.mjs start`. A publicação e a validação no domínio público permanecem por executar, conforme o plano aprovado.
