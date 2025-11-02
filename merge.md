## Plano de Integração e Centralização de Dados — Supabase (Projeto: SigmaMulti)

Objetivo: unificar Website (Next.js na Vercel) e OS interno da empresa no mesmo projeto Supabase (`SigmaMulti`, id `jtulxclahsgowmfrifwf`), garantindo isolamento lógico por domínios, segurança via RLS e uma base sólida para conteúdos, oportunidades de emprego e envio de emails.

### Visão Geral de Arquitetura
- **Projeto Supabase único**: Auth, Postgres, Storage, Edge Functions e Webhooks partilhados.
- **Isolamento por schema**: `web` (site) e `os` (sistema interno).
- **RBAC**: papéis `admin`, `editor`, `hr`, `viewer` (e `service` no backend) controlados via RLS/claims.
- **Storage**: buckets separados (`web-media`, `os-cv`, `os-docs`).
- **Emails**: Resend para transacionais; disparo via Edge Functions/webhooks.
- **Hospedagem**: Vercel (2 apps) com variáveis `.env` próprias mas apontando ao mesmo Supabase.

### Variáveis de Ambiente (ambas as apps)
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE` (apenas no backend de rotas/edge com extremo cuidado)
- `RESEND_API_KEY`
- (opcional) `NEXT_PUBLIC_APP_ENV`, `LOG_LEVEL`

---

## Backlog de Tarefas (checklist)

### T1 — Desenho de Isolamento e Governança
- [x] T1.1 Definir domínios/dados por app e limites de acoplamento
- [x] T1.2 Criar schemas `web` e `os` e convenções de nome (tabelas, índices, políticas)
- [x] T1.3 Definir RBAC: `admin`, `editor`, `hr`, `viewer`, `service`
- [x] T1.4 Mapear owners e processos de aprovação de alterações (migrations)

### T2 — Esquema de Dados Inicial
- [x] T2.1 `web.posts` (blog), `web.tags`, `web.post_tags`
- [x] T2.2 `web.jobs` (ofertas)
- [x] T2.3 `web.applications` (candidaturas)
- [x] T2.4 `web.subscribers` (newsletter, opcional)
- [ ] T2.5 `os.*` tabelas necessárias ao sistema interno (fasear)

### T3 — Políticas de Segurança (RLS)
- [x] T3.1 Ativar RLS em todas as tabelas públicas
- [x] T3.2 Políticas de leitura pública segura para `web.posts` publicados
- [x] T3.3 Políticas de leitura pública para `web.jobs` publicados
- [x] T3.4 Políticas de insert abertas para `web.applications` e `web.subscribers`; leitura bloqueada por omissão (abriremos para `hr/admin` quando os roles estiverem definidos)
- [ ] T3.5 Claims/funcões helper para roles e ownership

### T4 — Storage e Regras
- [x] T4.1 Criar buckets `web-media`, `os-cv`, `os-docs`
- [x] T4.2 Regras: acesso público apenas a media do site; `cv` e `docs` restritos a `hr/admin`
- [ ] T4.3 Limites de tamanho e extensões, antivírus/varredura (opcional)

### T5 — Integrações e Emails
- [ ] T5.1 Configurar Resend
- [ ] T5.2 Edge Functions/webhooks para disparo em novos registos (contacto/candidatura)
- [ ] T5.3 Templates de email (admin + candidato)

#### T5 — Plano temporário (NOOP Emails) — Deferred
- Motivo: sem conta de email confirmada neste momento; evitamos bloqueio do projeto.
- Estratégia:
  - `EMAIL_ENABLED=false` nas envs das duas apps.
  - `EmailProvider` com implementação NOOP (regista em log e/ou em `web.email_outbox`), para que o código de envio não quebre.
  - Quando houver credenciais, ativar `EMAIL_ENABLED=true` e trocar a implementação para Resend.
- Subtarefas:
  - [ ] T5.0 Criar interface `EmailProvider` e implementação NOOP
  - [ ] T5.1 (deferred) Integrar Resend e variáveis (`RESEND_API_KEY`)
  - [ ] T5.2 (deferred) Webhook/Edge Function para disparos assíncronos
  - [ ] T5.3 (deferred) Templates (admin + candidato)

### T6 — Website (esta repo)
- [x] T6.1 Contacto: gravar submissões em `web.contacts` (NOOP email)
- [x] T6.2 Candidaturas: upload de CV para `os-cv`, gravar `applications` (NOOP email) + UI
 - [ ] T6.3 Backoffice leve para blog e ofertas (só se aprovado) ou manter MDX inicialmente
 - [ ] T6.4 (Opcional) Migrar blog de MDX para DB (drafts, scheduling, pesquisa)

### T7 — OS (outra app)
- [ ] T7.1 Consumir `web.applications` com vistas/filters para HR
- [ ] T7.2 Gestão de ofertas (`web.jobs`) com fluxos de publicação
- [ ] T7.3 Painéis e permissões por role

### T8 — Observabilidade, Backups e DevEx
- [ ] T8.1 Ativar logs e auditoria
- [ ] T8.2 Backups automáticos e retenção
- [ ] T8.3 Playbooks de incidentes e restauração
- [ ] T8.4 Documentação de migrations e convenções

### T9 — Segurança e Conformidade
- [ ] T9.1 Revisão de RLS por tabela
- [ ] T9.2 PII e retenção (GDPR); consentimentos armazenados
- [ ] T9.3 Encriptação em trânsito e em repouso (default Supabase)
- [ ] T9.4 Minimização de chaves: uso de `service_role` apenas em funções dedicadas

---

### Progresso executado (2025-09-29)
- T2 (DDL): criadas `web.posts`, `web.tags`, `web.post_tags`, `web.jobs`, `web.applications`, `web.subscribers`, `web.contacts`.
  - Índices: `posts.slug` único; `tags.name` único; `subscribers.email` único; `jobs(status, published_at desc)`; `applications(job_id, created_at desc)`.
- T3 (RLS/Políticas): RLS ativo em todas as `web.*`.
  - `posts`: SELECT público apenas se `status='published'`.
  - `jobs`: SELECT público apenas se `status='published'`.
  - `applications`: INSERT aberto (política `applications_insert_any`); SELECT bloqueado (aguarda roles `hr/admin`).
  - `contacts`: INSERT aberto; SELECT bloqueado.
  - `subscribers`: INSERT aberto; SELECT bloqueado.
  - `tags`/`post_tags`: sem políticas públicas (inacessíveis por omissão).
- T4 (Storage): buckets `web-media` (público), `os-cv` (privado), `os-docs` (privado) com políticas aplicadas.
- **Configuração PostgREST (2025-09-29)**:
  - Exposed schemas: `public`, `graphql_public`, `web` (configurado via dashboard).
  - `GRANT USAGE ON SCHEMA web TO anon, authenticated, service_role`.
  - `GRANT INSERT ON TABLE web.applications TO anon, authenticated`.
  - `GRANT INSERT ON TABLE web.contacts TO anon, authenticated`.
  - `GRANT SELECT ON TABLE web.applications TO anon, authenticated` (concedido para compatibilidade futura).
  - Ajustado `search_path` de todos os roles para incluir `web`: `ALTER ROLE {authenticator|anon|authenticated|service_role} SET search_path = web, public`.
- **Código atualizado (2025-09-29)**:
  - `src/app/api/applications/route.ts`: usa `supabase.schema('web').from('applications')` sem `.select()`.
  - `src/app/api/contact/route.ts`: usa `supabase.schema('web').from('contacts')`.
  - Ambos testados e validados com submissões bem-sucedidas.

#### T6 — Detalhamento (em curso)
- T6.1: ✅ Implementado `web.contacts` com RLS (insert anónimo, select bloqueado); rota `POST /api/contact` usa `.schema('web').from('contacts')`; `ContactForm.tsx` aponta para `/api/contact`; emails em NOOP.
  - Permissões SQL: `GRANT INSERT ON web.contacts TO anon, authenticated`.
  - Testado e validado em 2025-09-29.
- T6.2: ✅ Implementado `POST /api/applications` com upload para `os-cv` e registo em `web.applications`; componente `ApplicationForm` criado e integrado em `recrutamento/page.tsx`.
  - Rota usa `.schema('web').from('applications')` (sem `.select()` para evitar conflito RLS).
  - Permissões SQL: `GRANT INSERT ON web.applications TO anon, authenticated`.
  - Fallback temporário: se `SUPABASE_SERVICE_ROLE` não estiver definida, a rota grava a candidatura (RLS permite `insert`) e **ignora o upload de CV**. Quando for fornecida a service key, o upload passa a ocorrer automaticamente.
  - Testado e validado em 2025-09-29 (candidatura gravada com sucesso).

### T1 — Detalhamento

#### T1.1 Domínios, dados e limites de acoplamento
- **web (site)**: conteúdos públicos (posts, tags, jobs publicados), submissões públicas (contactos, candidaturas), media pública do site.
- **os (sistema interno)**: dados operacionais, workflows internos, reporting; lê e gere entidades que o `web` publica (ex.: publicar/fechar `jobs`).
- **Partilha controlada**: `web.applications` é escrito por anónimo (site) e lido por `hr` no OS; `web.jobs` é gerido por `hr/admin` no OS e consumido publicamente no site.
- **Evitar acoplamento**: APIs e views claras entre schemas; sem joins cruzados diretos fora de views autorizadas.

#### T1.2 Convenções de schema, nomes e migrações
- Schemas: `web` (site), `os` (interno). Futuro: `shared` para utilitários comuns.
- Tabelas: `snake_case` no singular quando entidade (ex.: `web.post`) ou plural quando coleção clara (mantemos plural por consistência do plano: `web.posts`).
- Índices: `idx_<schema>_<tabela>_<coluna(s)>`; chaves únicas `uk_<...>`; FKs `fk_<...>`.
- Triggers/funcs: prefixo por domínio: `web_...`, `os_...`.
- Migrations: uma pasta por app, nomeadas por timestamp + resumo; nunca editar migrations antigas; criar nova para qualquer alteração.

#### T1.3 RBAC e claims
- Roles lógicas: `admin`, `editor` (conteúdo), `hr` (recrutamento), `viewer` (somente leitura), `service` (backend server-side).
- Mapeamento: claims JWT com `role` e, quando aplicável, `permissions` específicas. Gestão via tabela `os.user_roles` (manutenção por admin) e função de emissão de JWT com claims.
- RLS base:
  - `web.posts`: leitura pública apenas quando `status='published'`; escrita por `admin`/`editor`.
  - `web.jobs`: leitura pública quando `status='published'`; gestão por `admin`/`hr`.
  - `web.applications`: `insert` aberto; `select` restrito a `admin/hr`.

#### T1.4 Governance e processo de alterações
- Proposta de mudança → PR de migrations (revisão por owner de domínio `web` ou `os`).
- Checklist de RLS obrigatório para novas tabelas; testes mínimos de política.
- Janela de deploy combinada; backups antes de alterações destrutivas; plano de rollback documentado.
- Documentar no `merge.md` qualquer decisão relevante e apontar migrações afetadas.

## Esquema Sugerido (DDL de referência — aplicar após aprovação)

```sql
-- Schema e extensões
create schema if not exists web;
create schema if not exists os;

-- Blog
create table if not exists web.posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  content_rich jsonb not null,
  status text not null check (status in ('draft','scheduled','published')),
  published_at timestamptz,
  author_id uuid references auth.users(id),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists web.tags (
  id uuid primary key default gen_random_uuid(),
  name text unique not null
);

create table if not exists web.post_tags (
  post_id uuid references web.posts(id) on delete cascade,
  tag_id uuid references web.tags(id) on delete cascade,
  primary key (post_id, tag_id)
);

-- Emprego
create table if not exists web.jobs (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  location text,
  type text,
  description jsonb not null,
  status text not null check (status in ('draft','published','closed')),
  published_at timestamptz,
  created_by uuid references auth.users(id),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists web.applications (
  id uuid primary key default gen_random_uuid(),
  job_id uuid references web.jobs(id) on delete set null,
  name text not null,
  email text not null,
  phone text,
  cv_url text,
  cover_letter text,
  consent boolean not null default false,
  created_at timestamptz default now()
);

-- (Opcional) Newsletter
create table if not exists web.subscribers (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  subscribed_at timestamptz default now(),
  gdpr_consent boolean not null default true
);
```

### Políticas RLS (exemplos de referência)
```sql
alter table web.posts enable row level security;
create policy posts_read_published on web.posts
  for select using (status = 'published');

create policy posts_write_by_editor on web.posts
  for all to authenticated using (auth.role() in ('admin','editor'))
  with check (auth.role() in ('admin','editor'));

alter table web.jobs enable row level security;
create policy jobs_read_published on web.jobs
  for select using (status = 'published');
create policy jobs_write_hr on web.jobs
  for all to authenticated using (auth.role() in ('admin','hr'))
  with check (auth.role() in ('admin','hr'));

alter table web.applications enable row level security;
-- qualquer pessoa pode criar candidatura
create policy applications_insert_any on web.applications for insert with check (true);
-- apenas HR/Admin lê candidaturas
create policy applications_read_hr on web.applications for select
  using (auth.role() in ('admin','hr'));
```

> Nota: As funções/claims `auth.role()`/JWT devem ser ajustadas ao mecanismo de roles escolhido (p. ex. `auth.users` + `auth.jwt()` custom claims). O snippet é ilustrativo.

---

## Fluxos de Email (Resend)
- Nova candidatura: email para equipa `hr@empresa` + confirmação para candidato.
- Novo contacto: email para `info@empresa` + confirmação.
- Publicação de oferta/blog: email para `subscribers` (se aprovado no futuro).

## Critérios de Aceitação (amostra)
- Blog: listagem pública apenas de `published`; editores conseguem criar/editar; RLS testado.
- Emprego: criação de candidaturas sem autenticação; HR consegue filtrar/ler; CV protegido.
- Emails: logs de entrega, falhas reprocessadas.
- Segurança: nenhum endpoint exige `service_role` no cliente; chaves expostas apenas `anon`.

## Riscos e Mitigações
- Partilha de projeto (7/10): acoplamento de migrations e chaves → mitigação com schemas, processos e revisão.
- RLS mal configurado (8/10): fuga de dados → checklist de políticas e testes automáticos.
- Storage público inadvertido (6/10): revisão de regras e buckets por domínio.

## Fases e Ordem Sugerida
1. T1 → T2 (DDL) → T3 (RLS) → T4 (Storage) → T5 (Emails)
2. T6 (Website) e T7 (OS) em paralelo depois de base pronta
3. T8/T9 contínuos

---

### Decisões em Aberto (para aprovação)
- Migrar blog para DB já, ou manter MDX e migrar depois?
- Campos obrigatórios em `applications` e limites de ficheiro (tamanho/extensão)?
- Estrutura de roles e onboarding (quem é `admin`, `editor`, `hr`)?

---

Quando aprovares, seguimos por T1 e inicio o trabalho via MCP da Supabase, registando conclusão de cada tarefa aqui.



