-- Keep notification ownership with an old deployment if it wins the receipt race.
create or replace function web.promote_intake(p_id uuid)
returns void language plpgsql security invoker set search_path = '' as $$
declare i web.public_intake%rowtype; u web.cv_uploads%rowtype; r jsonb; v_id uuid; v_previous text; v_notification text;
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
    if r->>'status'='duplicate' then
      select case when notification_status in ('sent','failed','uncertain') then notification_status else 'uncertain' end
        into v_notification from web.lead_submissions where submission_id=p_id;
    end if;
  else
    insert into web.candidaturas(nome,email,telefone,area_interesse,cv_link,mensagem,pagina,url,origem)
    values (i.payload->>'nome',i.payload->>'email',i.payload->>'telefone',i.payload->>'area_interesse',
      case when u.id is not null then '/cv/'||u.id::text else nullif(i.payload->>'cv_link','') end,
      i.payload->>'mensagem',i.payload->>'pagina',i.payload->>'url',i.payload->>'origem') returning id into v_id;
  end if;
  perform set_config('medisigma.managed_submission',coalesce(v_previous,''),true);
  update web.public_intake set state='accepted',operational_id=v_id,completed_at=now(),
    notification_status=coalesce(v_notification,notification_status) where submission_id=p_id;
end $$;

-- Undo a mistaken spam review without recreating an existing operational record.
-- Revoked links stay revoked; an administrator can explicitly issue a new one.
create or replace function web.review_public_submission(p_id uuid,p_action text,p_actor text)
returns jsonb language plpgsql security invoker set search_path = '' as $$
declare i web.public_intake%rowtype;
begin
  select * into strict i from web.public_intake where submission_id=p_id for update;
  if p_action not in ('accept','spam') or length(p_actor)>200 then raise exception 'Invalid review'; end if;
  if p_action='accept' and i.state in ('held','spam') then
    if i.operational_id is null then perform web.promote_intake(p_id);
    else update web.public_intake set state='accepted' where submission_id=p_id;
    end if;
  elsif p_action='spam' and i.state in ('held','accepted') then
    update web.public_intake set state='spam' where submission_id=p_id;
    update web.cv_access_tokens set revoked_at=coalesce(revoked_at,now()) where cv_id in (select id from web.cv_uploads where submission_id=p_id);
  else return web.intake_receipt(p_id,true);
  end if;
  insert into web.intake_reviews(submission_id,action,actor,previous_state) values(p_id,p_action,p_actor,i.state);
  return web.intake_receipt(p_id);
end $$;
