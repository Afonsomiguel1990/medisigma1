create table web.sigma_quest_runs (
  run_id uuid primary key,
  running_since timestamptz default clock_timestamp(),
  elapsed_ms integer not null default 0 check (elapsed_ms between 0 and 172800000),
  result_digest text check (result_digest ~ '^[a-f0-9]{64}$'),
  check (result_digest is null or running_since is null)
);

alter table web.sigma_quest_runs enable row level security;
revoke all on table web.sigma_quest_runs from public, anon, authenticated, service_role;
grant select, insert, update on table web.sigma_quest_runs to service_role;

create function web.sigma_quest_clock(p_run_id uuid, p_action text, p_digest text, p_min_ms integer)
returns jsonb
language plpgsql security invoker
set search_path = ''
as $$
declare
  run web.sigma_quest_runs%rowtype;
  tick timestamptz;
  active_ms integer;
begin
  select * into run from web.sigma_quest_runs where run_id = p_run_id for update;
  if not found then return null; end if;
  tick := clock_timestamp();
  active_ms := least(172800000, run.elapsed_ms +
    greatest(0, coalesce(floor(extract(epoch from (tick - run.running_since)) * 1000), 0)))::integer;

  if run.result_digest is not null then
    if p_action = 'finish' and run.result_digest is distinct from p_digest then
      return jsonb_build_object('status', 'conflict');
    end if;
  elsif p_action = 'pause' then
    update web.sigma_quest_runs set running_since = null, elapsed_ms = active_ms where run_id = p_run_id;
    run.running_since := null;
  elsif p_action = 'resume' then
    if run.running_since is null then
      update web.sigma_quest_runs set running_since = tick where run_id = p_run_id;
      run.running_since := tick;
    end if;
  elsif p_action = 'finish' then
    if p_digest is null or p_min_ms is null or active_ms < p_min_ms then
      return jsonb_build_object('status', 'too_soon');
    end if;
    update web.sigma_quest_runs set running_since = null, elapsed_ms = active_ms, result_digest = p_digest where run_id = p_run_id;
    run.running_since := null;
    run.result_digest := p_digest;
  else
    raise exception 'Invalid clock command';
  end if;

  return jsonb_build_object('status', 'ok', 'elapsedMs', active_ms,
    'running', run.running_since is not null, 'finished', run.result_digest is not null);
end;
$$;

revoke all on function web.sigma_quest_clock(uuid, text, text, integer) from public, anon, authenticated, service_role;
grant execute on function web.sigma_quest_clock(uuid, text, text, integer) to service_role;

create table web.sigma_quest_scores (
  run_id uuid primary key references web.sigma_quest_runs (run_id),
  letters text not null check (char_length(letters) = 4 and letters collate "C" ~ '^[A-Z]{4}$'),
  points integer not null check (points between 0 and 4100),
  first_tries smallint not null check (first_tries between 0 and 20),
  elapsed_ms integer not null check (elapsed_ms between 0 and 172800000),
  saved_at timestamptz not null default clock_timestamp()
);

create index sigma_quest_scores_letters_rank_idx
  on web.sigma_quest_scores (letters, points desc, first_tries desc, elapsed_ms, saved_at, run_id);

alter table web.sigma_quest_scores enable row level security;
revoke all on table web.sigma_quest_scores from public, anon, authenticated, service_role;
grant select, insert on table web.sigma_quest_scores to service_role;

create function web.sigma_quest_top10()
returns table (letters text, points integer, first_tries smallint, elapsed_ms integer)
language sql stable security invoker
set search_path = ''
as $$
  select ranked.letters, ranked.points, ranked.first_tries, ranked.elapsed_ms
  from (
    select distinct on (s.letters) s.letters, s.points, s.first_tries, s.elapsed_ms, s.saved_at, s.run_id
    from web.sigma_quest_scores as s
    order by s.letters, s.points desc, s.first_tries desc, s.elapsed_ms, s.saved_at, s.run_id
  ) as ranked
  order by ranked.points desc, ranked.first_tries desc, ranked.elapsed_ms, ranked.saved_at, ranked.run_id
  limit 10;
$$;

revoke all on function web.sigma_quest_top10() from public, anon, authenticated, service_role;
grant execute on function web.sigma_quest_top10() to service_role;
