-- Additive analytics update. Apply only after review.
begin;
create or replace function web.get_lead_analytics(p_from timestamptz, p_to timestamptz) returns jsonb
language plpgsql stable security invoker set search_path = '' as $$
declare v_result jsonb;
begin
  if p_from is null or p_to is null or p_to <= p_from or p_to > p_from + interval '366 days' then
    raise exception 'Invalid analytics interval';
  end if;
  with all_leads as (select * from web.lead_submissions where created_at >= p_from and created_at < p_to),
  leads as (select * from all_leads where lead_kind = 'service_request'),
  clicks as (select * from web.contact_click_events where created_at >= p_from and created_at < p_to)
  select jsonb_build_object(
    'submissions',(select count(*) from all_leads),
    'serviceRequests',(select count(*) from leads where lead_kind = 'service_request'),
    'resourceRequests',(select count(*) from all_leads where lead_kind = 'resource_request'),
    'clicks',(select count(*) from clicks),
    'byService',(select coalesce(jsonb_agg(to_jsonb(g)),'[]') from (select coalesce(service_key,'unknown') as key,count(*) as count from leads group by 1 order by 2 desc,1) g),
    'bySector',(select coalesce(jsonb_agg(to_jsonb(g)),'[]') from (select coalesce(company_sector,'unknown') as key,count(*) as count from leads group by 1 order by 2 desc,1) g),
    'bySource',(select coalesce(jsonb_agg(to_jsonb(g)),'[]') from (select coalesce(attribution->>'source','unknown') as key,count(*) as count from leads group by 1 order by 2 desc,1) g),
    'byPage',(select coalesce(jsonb_agg(to_jsonb(g)),'[]') from (select page as key,count(*) as count from leads group by 1 order by 2 desc,1) g),
    'notifications',(select coalesce(jsonb_agg(to_jsonb(g)),'[]') from (select case when notification_status = 'sending' and notification_started_at < now() - interval '2 minutes' then 'uncertain' when notification_status = 'pending' and created_at < now() - interval '2 minutes' then 'pending_intervention' else notification_status end as key,count(*) as count from all_leads group by 1 order by 2 desc,1) g),
    'byEntryPage',(select coalesce(jsonb_agg(to_jsonb(g)),'[]') from (select coalesce(attribution->>'entry_path','unknown') as key,count(*) as count from leads group by 1 order by 2 desc,1) g),
    'attributionStatus',(select coalesce(jsonb_agg(to_jsonb(g)),'[]') from (select coalesce(attribution->>'status','unknown') as key,count(*) as count from leads group by 1 order by 2 desc,1) g),
    'assistedArticles',(select coalesce(jsonb_agg(to_jsonb(g)),'[]') from (select article as key,count(distinct submission_id) as count from leads cross join lateral jsonb_array_elements_text(case when jsonb_typeof(attribution->'assisted_article_paths') = 'array' then attribution->'assisted_article_paths' else '[]'::jsonb end) article group by 1 order by 2 desc,1) g),
    'legacyUnattributed',jsonb_build_object(
      'contacts',(select count(*) from web.contacts c where c.created_at >= p_from and c.created_at < p_to and not exists(select 1 from web.lead_submissions l where l.contact_id = c.id)),
      'clicks',(select count(*) from (select id,created_at,'phone' channel from public.phone_clicks union all select id,created_at,'email' from public.email_clicks union all select id,created_at,'whatsapp' from public.whatsapp_clicks) c where c.created_at >= p_from and c.created_at < p_to and not exists(select 1 from web.contact_click_events e where e.legacy_id = c.id and e.channel = c.channel))),
    'resourcesByResource',(select coalesce(jsonb_agg(to_jsonb(g)),'[]') from (select coalesce(resource_id,'unknown') as key,count(*) as count from all_leads where lead_kind = 'resource_request' group by 1 order by 2 desc,1) g),
    'clicksByPage',(select coalesce(jsonb_agg(to_jsonb(g)),'[]') from (select page as key,count(*) as count from clicks group by 1 order by 2 desc,1) g),
    'clicksByChannel',(select coalesce(jsonb_agg(to_jsonb(g)),'[]') from (select channel as key,count(*) as count from clicks group by 1 order by 2 desc,1) g)
  ) into v_result;
  return v_result;
end;
$$;
commit;
