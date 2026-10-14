begin;
-- Native forms cannot retain a JavaScript intent UUID. Serialize identical payloads
-- for 30 minutes and reuse the existing transactional intake/notification workflow.
create or replace function web.receive_native_contact(p_input jsonb,p_ip_key text,p_email_key text)
returns jsonb language plpgsql security invoker set search_path='' as $$
declare existing_id uuid; input jsonb := p_input;
begin
  if p_input->>'kind' is distinct from 'contact'
    or p_input->>'payloadHash' is null
    or p_input->>'payloadHash' !~ '^[a-f0-9]{64}$' then
    raise exception 'Invalid native contact';
  end if;
  perform pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtextextended('native-contact:' || (p_input->>'payloadHash'),0));
  select submission_id into existing_id from web.public_intake
    where kind='contact' and payload_hash=p_input->>'payloadHash'
      and created_at >= now()-interval '30 minutes'
    order by created_at desc limit 1;
  if existing_id is not null then
    input := jsonb_set(jsonb_set(input,'{submissionId}',to_jsonb(existing_id::text)),'{payload,submissionId}',to_jsonb(existing_id::text));
  end if;
  return web.receive_public_submission(input,p_ip_key,p_email_key);
end;
$$;
revoke all on function web.receive_native_contact(jsonb,text,text) from public,anon,authenticated;
grant execute on function web.receive_native_contact(jsonb,text,text) to service_role;
commit;
