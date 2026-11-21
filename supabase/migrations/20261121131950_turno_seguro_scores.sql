create table web.turno_seguro_scores (
  run_id uuid primary key,
  initials text not null check (initials ~ '^[A-Z]{3}$'),
  points integer not null check (points between 0 and 1080),
  saved_at timestamptz not null default clock_timestamp()
);

create index turno_seguro_scores_ranking_idx
  on web.turno_seguro_scores (points desc, saved_at, run_id);

alter table web.turno_seguro_scores enable row level security;
revoke all on table web.turno_seguro_scores from public, anon, authenticated, service_role;
grant select, insert on table web.turno_seguro_scores to service_role;
