-- Additive contact details. Preserve existing records, RLS and function privileges.
set lock_timeout = '5s';
alter table web.contacts
  add column if not exists nome text,
  add column if not exists localidade text,
  add column if not exists tipo_instalacao text;

create or replace function web.submit_lead(p_input jsonb) returns jsonb
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
  insert into web.contacts(empresa, telefone, email, servico, mensagem, pagina, url, fonte, nome, localidade, tipo_instalacao)
  values (p_input->>'empresa', p_input->>'telefone', p_input->>'email', p_input->>'servico', p_input->>'mensagem', p_input->>'pagina', p_input->>'url', p_input->>'fonte', nullif(p_input->>'nome',''), nullif(p_input->>'localidade',''), nullif(p_input->>'tipo_instalacao','')) returning id into v_contact;
  update web.lead_submissions set contact_id = v_contact where submission_id = v_id;
  return jsonb_build_object('status','accepted','submissionId',v_id,'notificationStatus','pending','contactId',v_contact,'createdAt',v_created);
end;
$$;
