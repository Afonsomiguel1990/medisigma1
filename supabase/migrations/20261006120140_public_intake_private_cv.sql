-- Additive rollout. Historical CV objects, links and bucket visibility are untouched.
create table web.intake_settings (
  id boolean primary key default true check (id),
  mode text not null default 'observe' check (mode in ('observe','enforce')),
  observation_started_at timestamptz,
  enforcement_enabled_at timestamptz,
  rules_version text not null default '2026-10-06.1'
);
insert into web.intake_settings(id) values (true);

create table web.intake_counters (
  key text primary key,
  attempts integer not null,
  reset_at timestamptz not null
);
create index intake_counters_reset_idx on web.intake_counters(reset_at);

create table web.public_intake (
  submission_id uuid primary key,
  kind text not null check (kind in ('contact','spontaneous','application')),
  payload_hash text not null check (payload_hash ~ '^[a-f0-9]{64}$'),
  payload jsonb not null,
  state text not null default 'received' check (state in ('pending_upload','received','held','accepted','spam')),
  suspected boolean not null default false,
  reasons text[] not null default '{}',
  rules_version text not null,
  mode_at_receipt text not null,
  operational_id uuid,
  notification_status text not null default 'pending' check (notification_status in ('pending','sending','sent','failed','uncertain')),
  notification_attempt_id uuid,
  notification_started_at timestamptz,
  notification_completed_at timestamptz,
  created_at timestamptz not null default now(),
  completed_at timestamptz
);
create index public_intake_review_idx on web.public_intake(state,created_at desc);
create index public_intake_observation_idx on web.public_intake(suspected,created_at desc);

create table web.cv_uploads (
  id uuid primary key default gen_random_uuid(),
  submission_id uuid not null unique references web.public_intake(submission_id),
  payload_hash text not null,
  object_path text not null unique,
  extension text not null check (extension in ('pdf','doc','docx')),
  declared_size integer not null check (declared_size between 1 and 5242880),
  content_hash text not null check (content_hash ~ '^[a-f0-9]{64}$'),
  validation_status text not null default 'pending' check (validation_status in ('pending','valid','invalid','suspicious')),
  validation_code text,
  created_at timestamptz not null default now(),
  expires_at timestamptz not null default now() + interval '2 hours',
  validated_at timestamptz
);

create table web.cv_access_tokens (
  id uuid primary key default gen_random_uuid(),
  cv_id uuid not null references web.cv_uploads(id),
  token_hash text not null unique check (token_hash ~ '^[a-f0-9]{64}$'),
  created_at timestamptz not null default now(),
  expires_at timestamptz not null default now() + interval '90 days',
  revoked_at timestamptz
);
create index cv_access_tokens_cv_idx on web.cv_access_tokens(cv_id);

create table web.intake_reviews (
  id uuid primary key default gen_random_uuid(),
  submission_id uuid not null references web.public_intake(submission_id),
  action text not null check (action in ('accept','spam','link_created','links_revoked')),
  actor text not null,
  previous_state text not null,
  created_at timestamptz not null default now()
);
create index intake_reviews_submission_idx on web.intake_reviews(submission_id,created_at);

-- No browser role can read or mutate the intake, counters, file registry or tokens.
do $lockdown$
declare t text;
begin
  foreach t in array array['intake_settings','intake_counters','public_intake','cv_uploads','cv_access_tokens','intake_reviews'] loop
    execute format('alter table web.%I enable row level security',t);
    execute format('revoke all on web.%I from public, anon, authenticated',t);
    execute format('grant all on web.%I to service_role',t);
  end loop;
end $lockdown$;

insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types)
values ('web-cv-private','web-cv-private',false,5242880,
  array['application/pdf','application/msword','application/vnd.openxmlformats-officedocument.wordprocessingml.document']);
-- A restrictive boundary also protects against unrelated broad storage policies.
create policy web_cv_private_boundary on storage.objects as restrictive for all to anon, authenticated
using (bucket_id <> 'web-cv-private') with check (bucket_id <> 'web-cv-private');

create function web.increment_intake_counter(p_key text, p_window_seconds integer)
returns jsonb language plpgsql security invoker set search_path = '' as $$
declare v web.intake_counters%rowtype;
begin
  if p_key is null or length(p_key)>200 or p_window_seconds not between 1 and 86400 then raise exception 'Invalid counter'; end if;
  insert into web.intake_counters(key,attempts,reset_at)
    values(p_key,1,now()+make_interval(secs=>p_window_seconds))
  on conflict(key) do update set
    attempts=case when web.intake_counters.reset_at<=now() then 1 else web.intake_counters.attempts+1 end,
    reset_at=case when web.intake_counters.reset_at<=now() then excluded.reset_at else web.intake_counters.reset_at end
  returning * into v;
  return jsonb_build_object('count',v.attempts,'retryAfter',greatest(1,ceil(extract(epoch from v.reset_at-now()))::integer));
end $$;

create function web.intake_receipt(p_id uuid, p_duplicate boolean default false)
returns jsonb language sql security invoker set search_path = '' as $$
  select jsonb_build_object('submissionId',i.submission_id,'state',i.state,'duplicate',p_duplicate,
    'createdAt',i.created_at,'notificationStatus',i.notification_status,'operationalId',i.operational_id,
    'uploadId',u.id,'objectPath',u.object_path,'uploadExpiresAt',u.expires_at,'validationStatus',u.validation_status)
  from web.public_intake i left join web.cv_uploads u on u.submission_id=i.submission_id where i.submission_id=p_id;
$$;

-- Coordinate with the existing trigger destinations without changing their credentials.
-- Old code/integrations still fire the triggers. The new transaction has one emitter.
drop trigger trg_notify_contact on web.contacts;
create trigger trg_notify_contact after insert on web.contacts for each row
when (coalesce(current_setting('medisigma.managed_submission',true),'') <> '1') execute function web.notify_contact();
drop trigger trg_notify_candidatura on web.candidaturas;
create trigger trg_notify_candidatura after insert on web.candidaturas for each row
when (coalesce(current_setting('medisigma.managed_submission',true),'') <> '1') execute function web.notify_candidatura();

create function web.promote_intake(p_id uuid)
returns void language plpgsql security invoker set search_path = '' as $$
declare i web.public_intake%rowtype; u web.cv_uploads%rowtype; r jsonb; v_id uuid; v_previous text;
begin
  select * into strict i from web.public_intake where submission_id=p_id for update;
  if i.operational_id is not null then return; end if;
  select * into u from web.cv_uploads where submission_id=p_id;
  if found and u.validation_status <> 'valid' then raise exception 'CV not validated'; end if;
  v_previous := current_setting('medisigma.managed_submission',true);
  perform set_config('medisigma.managed_submission','1',true);
  if i.kind='contact' then
    r := web.submit_lead(i.payload);
    if r->>'status'='conflict' then raise exception 'Submission conflict'; end if;
    v_id := (r->>'contactId')::uuid;
  else
    insert into web.candidaturas(nome,email,telefone,area_interesse,cv_link,mensagem,pagina,url,origem)
    values (i.payload->>'nome',i.payload->>'email',i.payload->>'telefone',i.payload->>'area_interesse',
      case when u.id is not null then '/cv/'||u.id::text else nullif(i.payload->>'cv_link','') end,
      i.payload->>'mensagem',i.payload->>'pagina',i.payload->>'url',i.payload->>'origem') returning id into v_id;
  end if;
  perform set_config('medisigma.managed_submission',coalesce(v_previous,''),true);
  update web.public_intake set state='accepted', operational_id=v_id,completed_at=now() where submission_id=p_id;
end $$;

create function web.receive_public_submission(p_input jsonb, p_ip_key text, p_email_key text)
returns jsonb language plpgsql security invoker set search_path = '' as $$
declare
  v_id uuid := (p_input->>'submissionId')::uuid;
  v_kind text := p_input->>'kind';
  v_hash text := p_input->>'payloadHash';
  v_reasons text[] := array(select jsonb_array_elements_text(coalesce(p_input->'reasons','[]'::jsonb)));
  i web.public_intake%rowtype; old web.lead_submissions%rowtype;
  v_mode text; v_ip jsonb; v_email jsonb; v_upload uuid;
begin
  if v_id is null or v_hash !~ '^[a-f0-9]{64}$' or v_kind not in ('contact','spontaneous','application') then raise exception 'Invalid submission'; end if;
  perform pg_advisory_xact_lock(hashtextextended('intake:'||v_id::text,0));
  select * into i from web.public_intake where submission_id=v_id;
  if found then
    if i.payload_hash<>v_hash or i.kind<>v_kind then return jsonb_build_object('state','conflict'); end if;
    return web.intake_receipt(v_id,true);
  end if;
  -- Preserve idempotent receipts issued before this rollout.
  if v_kind='contact' then
    select * into old from web.lead_submissions where submission_id=v_id;
    if found then
      return jsonb_build_object('state',case when old.payload_hash=v_hash then 'accepted' else 'conflict' end,
        'submissionId',v_id,'duplicate',true,'createdAt',old.created_at,'notificationStatus',old.notification_status,'legacy',true);
    end if;
  end if;
  v_ip := web.increment_intake_counter('submit-ip:'||p_ip_key,600);
  if (v_ip->>'count')::integer>30 then return jsonb_build_object('state','limited','retryAfter',v_ip->'retryAfter'); end if;
  v_email := web.increment_intake_counter('submit-email:'||p_email_key,1800);
  if (v_ip->>'count')::integer>5 then v_reasons:=array_append(v_reasons,'ip_frequency'); end if;
  if (v_email->>'count')::integer>3 then v_reasons:=array_append(v_reasons,'email_frequency'); end if;
  select mode into strict v_mode from web.intake_settings where id;
  insert into web.public_intake(submission_id,kind,payload_hash,payload,state,suspected,reasons,rules_version,mode_at_receipt)
  values(v_id,v_kind,v_hash,p_input->'payload',case when p_input->'file' is not null and p_input->'file'<>'null'::jsonb then 'pending_upload' else 'received' end,
    cardinality(v_reasons)>0,v_reasons,p_input->>'ruleVersion',v_mode);
  if p_input->'file' is not null and p_input->'file'<>'null'::jsonb then
    v_upload:=gen_random_uuid();
    insert into web.cv_uploads(id,submission_id,payload_hash,object_path,extension,declared_size,content_hash)
    values(v_upload,v_id,v_hash,gen_random_uuid()::text||'/'||gen_random_uuid()::text||'.'||(p_input->'file'->>'extension'),
      p_input->'file'->>'extension',(p_input->'file'->>'size')::integer,p_input->'file'->>'sha256');
  elsif v_mode='enforce' and cardinality(v_reasons)>0 then
    update web.public_intake set state='held',completed_at=now() where submission_id=v_id;
  else
    perform web.promote_intake(v_id);
  end if;
  return web.intake_receipt(v_id);
end $$;

create function web.complete_cv_upload(p_submission_id uuid,p_payload_hash text,p_upload_id uuid,p_validation text,p_code text)
returns jsonb language plpgsql security invoker set search_path = '' as $$
declare i web.public_intake%rowtype; u web.cv_uploads%rowtype; v_mode text;
begin
  perform pg_advisory_xact_lock(hashtextextended('intake:'||p_submission_id::text,0));
  select * into strict i from web.public_intake where submission_id=p_submission_id for update;
  select * into strict u from web.cv_uploads where id=p_upload_id and submission_id=p_submission_id and payload_hash=p_payload_hash for update;
  if i.payload_hash<>p_payload_hash then raise exception 'Submission conflict'; end if;
  if i.state<>'pending_upload' then return web.intake_receipt(p_submission_id,true); end if;
  if p_validation not in ('valid','invalid','suspicious') then raise exception 'Invalid validation state'; end if;
  update web.cv_uploads set validation_status=p_validation,validation_code=p_code,validated_at=now() where id=u.id;
  select mode into strict v_mode from web.intake_settings where id;
  if p_validation<>'valid' then
    update web.public_intake set state='held',suspected=true,reasons=array_append(reasons,'cv_'||p_validation),completed_at=now() where submission_id=p_submission_id;
  elsif v_mode='enforce' and i.suspected then
    update web.public_intake set state='held',completed_at=now() where submission_id=p_submission_id;
  else
    perform web.promote_intake(p_submission_id);
  end if;
  return web.intake_receipt(p_submission_id);
end $$;

create function web.review_public_submission(p_id uuid,p_action text,p_actor text)
returns jsonb language plpgsql security invoker set search_path = '' as $$
declare i web.public_intake%rowtype;
begin
  select * into strict i from web.public_intake where submission_id=p_id for update;
  if p_action not in ('accept','spam') or length(p_actor)>200 then raise exception 'Invalid review'; end if;
  if p_action='accept' and i.state in ('held','spam') and i.operational_id is null then
    perform web.promote_intake(p_id);
  elsif p_action='spam' and i.state in ('held','accepted') then
    update web.public_intake set state='spam' where submission_id=p_id;
    update web.cv_access_tokens set revoked_at=coalesce(revoked_at,now()) where cv_id in (select id from web.cv_uploads where submission_id=p_id);
  else return web.intake_receipt(p_id,true);
  end if;
  insert into web.intake_reviews(submission_id,action,actor,previous_state) values(p_id,p_action,p_actor,i.state);
  return web.intake_receipt(p_id);
end $$;

create function web.claim_intake_notification(p_id uuid)
returns jsonb language plpgsql security invoker set search_path = '' as $$
declare i web.public_intake%rowtype; v_attempt uuid:=gen_random_uuid();
begin
  -- A crash after claiming is uncertain, not a reason to resend.
  update web.public_intake set notification_status='uncertain'
    where submission_id=p_id and notification_status='sending' and notification_started_at<now()-interval '2 minutes';
  update web.public_intake set notification_status='sending',notification_attempt_id=v_attempt,notification_started_at=now()
    where submission_id=p_id and state='accepted' and notification_status='pending' returning * into i;
  if not found then return null; end if;
  return jsonb_build_object('attemptId',v_attempt,'kind',i.kind,'payload',i.payload,
    'cvId',(select id from web.cv_uploads where submission_id=p_id and validation_status='valid'));
end $$;

create function web.complete_intake_notification(p_id uuid,p_attempt uuid,p_status text)
returns boolean language plpgsql security invoker set search_path = '' as $$
begin
  if p_status not in ('sent','failed','uncertain') then raise exception 'Invalid notification result'; end if;
  update web.public_intake set notification_status=p_status,notification_completed_at=now()
  where submission_id=p_id and notification_attempt_id=p_attempt and notification_status in ('sending','uncertain');
  if not found then return false; end if;
  update web.lead_submissions set notification_status=p_status,notification_completed_at=now()
    where submission_id=p_id and exists(select 1 from web.public_intake where submission_id=p_id and kind='contact');
  return true;
end $$;

create function web.create_cv_access_token(p_cv_id uuid,p_hash text,p_actor text default null)
returns jsonb language plpgsql security invoker set search_path = '' as $$
declare u web.cv_uploads%rowtype; i web.public_intake%rowtype; v_id uuid; v_expires timestamptz;
begin
  select * into strict u from web.cv_uploads where id=p_cv_id;
  select * into strict i from web.public_intake where submission_id=u.submission_id for update;
  if u.validation_status<>'valid' or i.state<>'accepted' then raise exception 'CV not available'; end if;
  insert into web.cv_access_tokens(cv_id,token_hash) values(p_cv_id,p_hash) returning id,expires_at into v_id,v_expires;
  if p_actor is not null then
    insert into web.intake_reviews(submission_id,action,actor,previous_state) values(i.submission_id,'link_created',p_actor,i.state);
  end if;
  return jsonb_build_object('id',v_id,'expiresAt',v_expires);
end $$;

create function web.revoke_cv_access_tokens(p_cv_id uuid,p_actor text,p_token_id uuid default null)
returns void language plpgsql security invoker set search_path = '' as $$
declare i web.public_intake%rowtype;
begin
  select i0.* into strict i from web.public_intake i0 join web.cv_uploads u on u.submission_id=i0.submission_id where u.id=p_cv_id for update of i0;
  update web.cv_access_tokens set revoked_at=coalesce(revoked_at,now()) where cv_id=p_cv_id and (p_token_id is null or id=p_token_id);
  insert into web.intake_reviews(submission_id,action,actor,previous_state) values(i.submission_id,'links_revoked',p_actor,i.state);
end $$;

create function web.resolve_cv_access(p_cv_id uuid,p_hash text)
returns text language sql security invoker set search_path = '' as $$
  select u.object_path from web.cv_uploads u join web.public_intake i on i.submission_id=u.submission_id
  join web.cv_access_tokens t on t.cv_id=u.id
  where u.id=p_cv_id and u.validation_status='valid' and i.state='accepted'
    and t.token_hash=p_hash and t.expires_at>now() and t.revoked_at is null limit 1;
$$;

do $functions$
declare f record;
begin
  for f in select p.oid::regprocedure as signature from pg_proc p join pg_namespace n on n.oid=p.pronamespace
    where n.nspname='web' and p.proname in ('increment_intake_counter','intake_receipt','promote_intake','receive_public_submission',
      'complete_cv_upload','review_public_submission','claim_intake_notification','complete_intake_notification',
      'create_cv_access_token','revoke_cv_access_tokens','resolve_cv_access') loop
    execute format('revoke all on function %s from public, anon, authenticated',f.signature);
    execute format('grant execute on function %s to service_role',f.signature);
  end loop;
end $functions$;
