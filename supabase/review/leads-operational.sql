-- Review script only. Supabase CLI was unavailable, so this is not a migration.
-- Additive to SigmaMulti. Existing contacts and click table grants are unchanged.
begin;

create table web.lead_submissions (
  submission_id uuid primary key,
  contact_id uuid unique references web.contacts(id),
  payload_hash text not null check (payload_hash ~ '^[a-f0-9]{64}$'),
  lead_kind text not null check (lead_kind in ('service_request', 'resource_request')),
  created_at timestamptz not null default now(),
  service_key text,
  company_sector text,
  resource_id text,
  source text not null,
  page text not null,
  attribution jsonb not null default '{}'::jsonb check (jsonb_typeof(attribution) = 'object'),
  notification_status text not null default 'pending' check (notification_status in ('pending','sending','sent','failed','uncertain')),
  notification_attempt_id uuid,
  notification_started_at timestamptz,
  notification_completed_at timestamptz
);
create index lead_submissions_created_at_idx on web.lead_submissions(created_at);
alter table web.lead_submissions enable row level security;
revoke all on web.lead_submissions from public, anon, authenticated;
grant select, insert, update, delete on web.lead_submissions to service_role;

create table web.contact_click_events (
  event_id uuid primary key,
  legacy_id uuid unique,
  payload_hash text not null check (payload_hash ~ '^[a-f0-9]{64}$'),
  channel text not null check (channel in ('phone','email','whatsapp')),
  created_at timestamptz not null default now(),
  page text not null,
  service_key text,
  company_sector text,
  attribution jsonb not null default '{}'::jsonb check (jsonb_typeof(attribution) = 'object')
);
create index contact_click_events_created_at_idx on web.contact_click_events(created_at);
alter table web.contact_click_events enable row level security;
revoke all on web.contact_click_events from public, anon, authenticated;
grant select, insert, update, delete on web.contact_click_events to service_role;

create function web.submit_lead(p_input jsonb) returns jsonb
language plpgsql security invoker set search_path = '' as $$
declare
  v_id uuid := (p_input->>'submissionId')::uuid;
  v_existing web.lead_submissions%rowtype;
  v_contact uuid;
  v_created timestamptz;
begin
  if v_id is null then raise exception 'submissionId required'; end if;
  -- Transaction lock prevents the legacy INSERT from racing the receipt INSERT.
  perform pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtextextended('lead:' || v_id::text, 0));
  select * into v_existing from web.lead_submissions where submission_id = v_id;
  if found then
    return jsonb_build_object('status', case when v_existing.payload_hash = p_input->>'payloadHash' then 'duplicate' else 'conflict' end,
      'submissionId', v_id, 'notificationStatus', v_existing.notification_status,
      'createdAt',v_existing.created_at,'contactId',v_existing.contact_id);
  end if;
  insert into web.lead_submissions(submission_id, payload_hash, lead_kind, service_key, company_sector, resource_id, source, page, attribution)
  values (v_id, p_input->>'payloadHash', p_input->>'leadKind', p_input->>'serviceKey', p_input->>'companySector', p_input->>'resourceId', p_input->>'fonte', coalesce(nullif(regexp_replace(split_part(split_part(p_input->>'url','?',1),'#',1),'^https?://[^/]+',''),''),'/'), coalesce(p_input->'attribution','{}'::jsonb))
  returning created_at into v_created;
  insert into web.contacts(empresa, telefone, email, servico, mensagem, pagina, url, fonte)
  values (p_input->>'empresa', p_input->>'telefone', p_input->>'email', p_input->>'servico', p_input->>'mensagem', p_input->>'pagina', p_input->>'url', p_input->>'fonte') returning id into v_contact;
  update web.lead_submissions set contact_id = v_contact where submission_id = v_id;
  return jsonb_build_object('status','accepted','submissionId',v_id,'notificationStatus','pending','contactId',v_contact,'createdAt',v_created);
end;
$$;

create function web.claim_lead_notification(p_submission_id uuid) returns jsonb
language plpgsql security invoker set search_path = '' as $$
declare v_attempt uuid := gen_random_uuid();
begin
  -- A worker may have sent before it crashed. Never resend a previous claim.
  update web.lead_submissions set notification_status = 'sending', notification_attempt_id = v_attempt,
    notification_started_at = now(), notification_completed_at = null
  where submission_id = p_submission_id and notification_status = 'pending';
  if found then return jsonb_build_object('attemptId',v_attempt); end if;
  return null;
end;
$$;

create function web.complete_lead_notification(p_submission_id uuid, p_attempt_id uuid, p_status text) returns boolean
language plpgsql security invoker set search_path = '' as $$
begin
  if p_status not in ('sent','failed','uncertain') or p_status is null then raise exception 'Invalid notification status'; end if;
  update web.lead_submissions set notification_status = p_status, notification_completed_at = now()
  where submission_id = p_submission_id and notification_attempt_id = p_attempt_id
    and notification_status = 'sending';
  return found;
end;
$$;

create function web.record_contact_click(p_input jsonb) returns jsonb
language plpgsql security invoker set search_path = '' as $$
declare v_id uuid := (p_input->>'eventId')::uuid; v_hash text; v_legacy uuid;
begin
  if v_id is null then raise exception 'eventId required'; end if;
  perform pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtextextended('click:' || v_id::text, 0));
  select payload_hash into v_hash from web.contact_click_events where event_id = v_id;
  if found then
    return jsonb_build_object('status', case when v_hash = p_input->>'payloadHash' then 'duplicate' else 'conflict' end,'eventId',v_id);
  end if;
  insert into web.contact_click_events(event_id,payload_hash,channel,page,service_key,company_sector,attribution)
  values(v_id,p_input->>'payloadHash',p_input->>'channel',coalesce(nullif(regexp_replace(split_part(split_part(p_input->>'url','?',1),'#',1),'^https?://[^/]+',''),''),'/'),p_input->>'serviceKey',p_input->>'companySector',coalesce(p_input->'attribution','{}'::jsonb));
  case p_input->>'channel'
    when 'phone' then insert into public.phone_clicks(pagina,url) values(p_input->>'pagina',p_input->>'url') returning id into v_legacy;
    when 'email' then insert into public.email_clicks(pagina,url) values(p_input->>'pagina',p_input->>'url') returning id into v_legacy;
    when 'whatsapp' then insert into public.whatsapp_clicks(pagina,url) values(p_input->>'pagina',p_input->>'url') returning id into v_legacy;
    else raise exception 'Invalid channel';
  end case;
  update web.contact_click_events set legacy_id = v_legacy where event_id = v_id;
  return jsonb_build_object('status','accepted','eventId',v_id);
end;
$$;

create function web.get_lead_analytics(p_from timestamptz, p_to timestamptz) returns jsonb
language plpgsql stable security invoker set search_path = '' as $$
declare v_result jsonb;
begin
  if p_from is null or p_to is null or p_to <= p_from or p_to > p_from + interval '366 days' then
    raise exception 'Invalid analytics interval';
  end if;
  with leads as (select * from web.lead_submissions where created_at >= p_from and created_at < p_to),
  clicks as (select * from web.contact_click_events where created_at >= p_from and created_at < p_to)
  select jsonb_build_object(
    'submissions',(select count(*) from leads),
    'serviceRequests',(select count(*) from leads where lead_kind = 'service_request'),
    'resourceRequests',(select count(*) from leads where lead_kind = 'resource_request'),
    'clicks',(select count(*) from clicks),
    'byService',(select coalesce(jsonb_agg(to_jsonb(g)),'[]') from (select coalesce(service_key,'unknown') as key,count(*) as count from leads group by 1 order by 2 desc,1) g),
    'bySector',(select coalesce(jsonb_agg(to_jsonb(g)),'[]') from (select coalesce(company_sector,'unknown') as key,count(*) as count from leads group by 1 order by 2 desc,1) g),
    'bySource',(select coalesce(jsonb_agg(to_jsonb(g)),'[]') from (select coalesce(attribution->>'source','unknown') as key,count(*) as count from leads group by 1 order by 2 desc,1) g),
    'byPage',(select coalesce(jsonb_agg(to_jsonb(g)),'[]') from (select page as key,count(*) as count from leads group by 1 order by 2 desc,1) g),
    'notifications',(select coalesce(jsonb_agg(to_jsonb(g)),'[]') from (select case when notification_status = 'sending' and notification_started_at < now() - interval '2 minutes' then 'uncertain' when notification_status = 'pending' and created_at < now() - interval '2 minutes' then 'pending_intervention' else notification_status end as key,count(*) as count from leads group by 1 order by 2 desc,1) g),
    'byEntryPage',(select coalesce(jsonb_agg(to_jsonb(g)),'[]') from (select coalesce(attribution->>'entry_path','unknown') as key,count(*) as count from leads group by 1 order by 2 desc,1) g),
    'attributionStatus',(select coalesce(jsonb_agg(to_jsonb(g)),'[]') from (select coalesce(attribution->>'status','unknown') as key,count(*) as count from leads group by 1 order by 2 desc,1) g),
    'assistedArticles',(select coalesce(jsonb_agg(to_jsonb(g)),'[]') from (select article as key,count(distinct submission_id) as count from leads cross join lateral jsonb_array_elements_text(case when jsonb_typeof(attribution->'assisted_article_paths') = 'array' then attribution->'assisted_article_paths' else '[]'::jsonb end) article group by 1 order by 2 desc,1) g),
    'legacyUnattributed',jsonb_build_object(
      'contacts',(select count(*) from web.contacts c where c.created_at >= p_from and c.created_at < p_to and not exists(select 1 from web.lead_submissions l where l.contact_id = c.id)),
      'clicks',(select count(*) from (select id,created_at,'phone' channel from public.phone_clicks union all select id,created_at,'email' from public.email_clicks union all select id,created_at,'whatsapp' from public.whatsapp_clicks) c where c.created_at >= p_from and c.created_at < p_to and not exists(select 1 from web.contact_click_events e where e.legacy_id = c.id and e.channel = c.channel))),
    'clicksByChannel',(select coalesce(jsonb_agg(to_jsonb(g)),'[]') from (select channel as key,count(*) as count from clicks group by 1 order by 2 desc,1) g)
  ) into v_result;
  return v_result;
end;
$$;

revoke all on function web.submit_lead(jsonb), web.claim_lead_notification(uuid), web.complete_lead_notification(uuid,uuid,text), web.record_contact_click(jsonb), web.get_lead_analytics(timestamptz,timestamptz) from public, anon, authenticated;
grant execute on function web.submit_lead(jsonb), web.claim_lead_notification(uuid), web.complete_lead_notification(uuid,uuid,text), web.record_contact_click(jsonb), web.get_lead_analytics(timestamptz,timestamptz) to service_role;
grant usage on schema web to service_role;
-- No legacy table/sequence grants are modified. Existing service_role privileges
-- must include the legacy INSERTs and their sequences, checked before rollout.
commit;
