-- Apply only after the compatible application has been deployed and verified.
-- Preserve authenticated CRM access, legacy public reads and other apps' buckets.
revoke insert on web.contacts,web.candidaturas,web.applications from public,anon;
revoke execute on function public.insert_candidatura(text,text,text,text,text,text,text,text,text) from public,anon,authenticated;
revoke execute on function web.insert_candidatura(text,text,text,text,text,text,text,text,text) from public,anon,authenticated;
grant execute on function public.insert_candidatura(text,text,text,text,text,text,text,text,text) to service_role;
grant execute on function web.insert_candidatura(text,text,text,text,text,text,text,text,text) to service_role;
-- Defense in depth if another permissive policy is added later.
create policy web_forms_no_anon_contact_insert on web.contacts as restrictive for insert to anon with check(false);
create policy web_forms_no_anon_candidate_insert on web.candidaturas as restrictive for insert to anon with check(false);
create policy web_forms_no_anon_application_insert on web.applications as restrictive for insert to anon with check(false);
drop policy if exists os_cv_insert_public on storage.objects;
create policy web_cv_no_anon_insert on storage.objects as restrictive for insert to anon
with check(bucket_id not in ('os-cv','web-cv-private'));
-- No UPDATE to storage.buckets: old public CV URLs remain unchanged.
