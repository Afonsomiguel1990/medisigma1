-- Run only after reviewing the DDL. Synthetic data rolls back.
begin;
do $$
declare v_input jsonb; v_receipt jsonb; v_claim jsonb; v_count bigint; v_id uuid := gen_random_uuid();
begin
  if nullif(current_setting('app.notify_url',true),'') is not null
    or nullif(current_setting('app.notify_secret',true),'') is not null then
    raise exception 'Legacy notification settings present: abort tests before any INSERT';
  end if;
  if has_table_privilege('anon','web.lead_submissions','SELECT')
    or has_table_privilege('authenticated','web.lead_submissions','INSERT')
    or has_function_privilege('anon','web.submit_lead(jsonb)','EXECUTE')
    or has_function_privilege('authenticated','web.record_contact_click(jsonb)','EXECUTE') then
    raise exception 'Operational permissions are too broad';
  end if;
  v_input := jsonb_build_object('submissionId',v_id,'payloadHash',repeat('a',64),'leadKind','service_request',
    'empresa','Synthetic rollback test','telefone','','email','test@example.invalid','servico','test',
    'mensagem','Synthetic rollback test','pagina','Test','url','https://www.medisigma.pt/servicos/test?discard=1',
    'fonte','test','attribution',jsonb_build_object('source','direct','entry_path','/test','assisted_article_paths',jsonb_build_array('/blog/test','/blog/test')));
  v_receipt := web.submit_lead(v_input);
  assert v_receipt->>'status' = 'accepted', 'First submission must be accepted';
  assert v_receipt->>'contactId' is not null, 'Receipt must link the legacy contact';
  assert (select page from web.lead_submissions where submission_id=v_id) = '/servicos/test', 'Query must not enter aggregate page';
  assert web.submit_lead(v_input)->>'status' = 'duplicate', 'Retry must deduplicate';
  assert web.submit_lead(v_input || jsonb_build_object('payloadHash',repeat('b',64)))->>'status' = 'conflict', 'Changed payload must conflict';
  select count(*) into v_count from web.contacts where id=(v_receipt->>'contactId')::uuid;
  assert v_count = 1, 'Exactly one legacy contact';
  v_claim := web.claim_lead_notification(v_id);
  assert v_claim->>'attemptId' is not null, 'Pending claim required';
  assert web.claim_lead_notification(v_id) is null, 'Second worker must not claim';
  assert not web.complete_lead_notification(v_id,gen_random_uuid(),'sent'), 'Stale attempt cannot complete';
  assert web.complete_lead_notification(v_id,(v_claim->>'attemptId')::uuid,'uncertain'), 'Current attempt must complete';
  assert web.claim_lead_notification(v_id) is null, 'Uncertain delivery must never resend';
  v_id := gen_random_uuid();
  v_input := jsonb_build_object('eventId',v_id,'payloadHash',repeat('c',64),'channel','phone','pagina','Test','url','https://www.medisigma.pt/test','attribution','{}'::jsonb);
  assert web.record_contact_click(v_input)->>'status' = 'accepted', 'First click accepted';
  assert web.record_contact_click(v_input)->>'status' = 'duplicate', 'Duplicate click ignored';
  assert web.record_contact_click(v_input || jsonb_build_object('payloadHash',repeat('d',64)))->>'status' = 'conflict', 'Changed click conflicts';
  assert (select count(*) from public.phone_clicks c join web.contact_click_events e on e.legacy_id=c.id where e.event_id=v_id) = 1, 'One legacy click';
  v_input := jsonb_build_object('submissionId',gen_random_uuid(),'payloadHash',repeat('e',64),'leadKind','resource_request',
    'resourceId','preparacao-exames','serviceKey','resource-only-verification',
    'empresa','Synthetic rollback resource','telefone','','email','test@example.invalid','servico','test',
    'mensagem','','pagina','Test','url','https://www.medisigma.pt/recursos/preparacao-exames','fonte','test','attribution','{}'::jsonb);
  perform web.submit_lead(v_input);
  v_receipt := web.get_lead_analytics(now()-interval '1 minute',now()+interval '1 minute');
  assert not exists (select 1 from jsonb_array_elements(v_receipt->'byService') g where g->>'key'='resource-only-verification'), 'Resource must not enter service breakdown';
  assert exists (select 1 from jsonb_array_elements(v_receipt->'resourcesByResource') g where g->>'key'='preparacao-exames' and (g->>'count')::int >= 1), 'Resource must enter resource breakdown';
  assert exists (select 1 from jsonb_array_elements(v_receipt->'clicksByPage') g where g->>'key'='/test' and (g->>'count')::int >= 1), 'Click must enter page breakdown';
end;
$$;
rollback;
