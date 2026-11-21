import assert from 'node:assert/strict';
import { readdir, readFile } from 'node:fs/promises';
import test from 'node:test';
import { PGlite } from '@electric-sql/pglite';
import {
  facingCell, isMissionComplete, MAX_SCORE, MISSIONS, MISSION_TICKS, missionPoints, parseActions,
  replayTurn, startMission, stepMission, TICK_MS, type Cell, type Command, type Direction, type MissionState,
  type TurnAction,
} from '../src/lib/turno-seguro/game';
import { issueRunToken, validateFinishedRun } from '../src/lib/turno-seguro/record-server';

const directions: Direction[] = ['up', 'right', 'down', 'left'];

function pathTo(state: MissionState, target: Cell): Direction[] {
  const frontier = [{ state, path: [] as Direction[] }];
  const seen = new Set<string>();
  for (const option of frontier) {
    const { state: position, path } = option;
    const key = [position.facing, ...position.player].join(',');
    if (seen.has(key)) continue;
    seen.add(key);
    const [x, y] = facingCell(position);
    if (x === target[0] && y === target[1]) return path;
    for (const direction of directions) {
      frontier.push({ state: stepMission(position, direction), path: [...path, direction] });
    }
  }
  throw new Error(`Cannot reach ${target}`);
}

function completeTurn() {
  const actions: TurnAction[] = [];
  const pointsByMission = [];
  let ticks = 0;
  for (const [index, level] of MISSIONS.entries()) {
    let state = startMission(index);
    function act(command: Command) {
      actions.push([index, state.tick, command]);
      state = stepMission(state, command);
    }
    for (const task of level.tasks) {
      pathTo(state, task.at).forEach(act);
      act('act');
      if (index === 2 && task.destination) {
        pathTo(state, task.destination).forEach(act);
        act('act');
      }
    }
    assert.ok(isMissionComplete(state), level.title);
    pointsByMission.push(missionPoints(state));
    ticks += state.tick;
  }
  return { actions, pointsByMission, ticks };
}

test('all three missions are solvable and give the same score in server replay', () => {
  const { actions, pointsByMission, ticks } = completeTurn();
  assert.ok(pointsByMission.every((points) => points > 300));
  assert.ok(pointsByMission.reduce((sum, points) => sum + points, 0) <= MAX_SCORE);
  assert.deepEqual(replayTurn(actions), {
    points: pointsByMission.reduce((sum, points) => sum + points, 0),
    durationMs: ticks * TICK_MS,
  });
});

test('timeout keeps tasks earned and advances even if other missions have no moves', () => {
  let state = startMission(0);
  const actions: TurnAction[] = [];
  for (const command of [...pathTo(state, MISSIONS[0].tasks[0].at), 'act'] as Command[]) {
    actions.push([0, state.tick, command]);
    state = stepMission(state, command);
  }
  assert.deepEqual(replayTurn(actions), { points: 100, durationMs: 3 * MISSION_TICKS * TICK_MS });
});

test('invalid commands, duplicate ticks and commands after a victory are rejected', () => {
  assert.equal(parseActions([[0, 0, 'constructor']]), null);
  assert.equal(parseActions([[0, 0, 'act'], [0, 0, 'up']]), null);
  assert.equal(parseActions([[0, MISSION_TICKS, 'act']]), null);
  const { actions } = completeTurn();
  const last = actions.at(-1)!;
  assert.equal(replayTurn([...actions, [last[0], last[1] + 1, 'act']]), null);
});

test('valid score uses the replay, bound to a signed and timely run', async (context) => {
  const previousSecret = process.env.SUBMISSION_HMAC_SECRET;
  process.env.SUBMISSION_HMAC_SECRET = 'turno-seguro-local-test';
  context.after(() => {
    if (previousSecret === undefined) delete process.env.SUBMISSION_HMAC_SECRET;
    else process.env.SUBMISSION_HMAC_SECRET = previousSecret;
  });

  const start = 1_794_000_000_000;
  const { actions, ticks, pointsByMission } = completeTurn();
  const token = await issueRunToken(start);
  const submission = { token, actions, initials: 'áfs', points: 99999 };
  const now = start + ticks * TICK_MS;
  const saved = await validateFinishedRun(submission, now);
  assert.equal(saved.points, pointsByMission.reduce((sum, points) => sum + points, 0));
  assert.equal(saved.initials, 'AFS');
  assert.deepEqual(saved, await validateFinishedRun(submission, now));
  await assert.rejects(validateFinishedRun(submission, start), { status: 400 });
  await assert.rejects(validateFinishedRun(submission, start + 600_001), { status: 410 });
  const altered = token.slice(0, -1) + (token.endsWith('0') ? '1' : '0');
  await assert.rejects(validateFinishedRun({ ...submission, token: altered }, now), { status: 400 });
});

test('the ranking migration preserves tie order and restricts access to the server', async (context) => {
  const db = new PGlite();
  context.after(() => db.close());
  const directory = new URL('../supabase/migrations/', import.meta.url);
  const migrationName = (await readdir(directory)).find((name) => name.endsWith('_turno_seguro_scores.sql'));
  assert.ok(migrationName);
  await db.exec(`
    create role anon;
    create role authenticated;
    create role service_role bypassrls;
    create schema web;
    grant usage on schema web to anon, authenticated, service_role;
  `);
  await db.exec(await readFile(new URL(migrationName, directory), 'utf8'));
  const { rows } = await db.query(`
    select
      has_table_privilege('anon', 'web.turno_seguro_scores', 'SELECT') as anon_read,
      has_table_privilege('authenticated', 'web.turno_seguro_scores', 'INSERT') as user_write,
      has_table_privilege('service_role', 'web.turno_seguro_scores', 'INSERT') as server_write,
      relrowsecurity as rls
    from pg_class where oid = 'web.turno_seguro_scores'::regclass
  `);
  assert.deepEqual(rows, [{ anon_read: false, user_write: false, server_write: true, rls: true }]);
  await db.exec(`
    set role service_role;
    insert into web.turno_seguro_scores (run_id, initials, points, saved_at) values
      ('00000000-0000-0000-0000-000000000001', 'ABC', 125, '2026-11-21T00:00:00Z'),
      ('00000000-0000-0000-0000-000000000002', 'DEF', 125, '2026-11-21T01:00:00Z'),
      ('00000000-0000-0000-0000-000000000003', 'GHI', 255, '2026-11-21T02:00:00Z');
  `);
  const ranking = await db.query('select initials from web.turno_seguro_scores order by points desc, saved_at, run_id');
  assert.deepEqual(ranking.rows, [{ initials: 'GHI' }, { initials: 'ABC' }, { initials: 'DEF' }]);
  await assert.rejects(db.exec(`
    insert into web.turno_seguro_scores (run_id, initials, points)
    values ('00000000-0000-0000-0000-000000000001', 'ABC', 125)
  `), { code: '23505' });
});
