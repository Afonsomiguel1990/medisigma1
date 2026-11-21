import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { test } from 'node:test';
import { PGlite } from '@electric-sql/pglite';
import { ZONE_IDS } from '../src/lib/sigma-quest/cases';
import {
  applyAction, completedExtras, completedZones, INITIATIVE_POINTS, MAX_SCORE, newQuest, replayQuest, timeBonus, totalPoints, turnContent,
  type QuestAction,
} from '../src/lib/sigma-quest/game';
import { AREAS, findPath, walkable } from '../src/lib/sigma-quest/world';
import { issueQuestRun, validateLetters, verifyFinishedQuest } from '../src/lib/sigma-quest/record-server';

function campaign(seed: number, extras: boolean, mistakes = false, reverse = false, revisit = false) {
  let state = newQuest(seed);
  let moves = '';
  function act(action: QuestAction) {
    const next = applyAction(state, action);
    assert.notEqual(next, state, 'Move ' + action + ' from ' + state.area + ' · ' + state.scene.type);
    state = next;
    moves += action;
  }
  function go(id: string) {
    const map = AREAS[state.area];
    const entity = map.objects.find(object => object.id === id);
    assert.ok(entity, id);
    const path = findPath(map, state.position, entity.at, entity, state.facing);
    assert.ok(path, id + ' from ' + state.area);
    for (const move of path) act(move);
    act('a');
  }
  function answer(result: 'best' | 'partial' | 'wrong') {
    assert.equal(state.scene.type, 'choice');
    const index = turnContent(seed, state.scene.turn).choices.findIndex(choice => choice.result === result);
    assert.ok(index >= 0);
    act(String(index + 1) as QuestAction);
    act('c');
  }
  go('helena');
  act('c');
  if (reverse) {
    go('ines');
    assert.equal(state.scene.type, 'note');
    act('c');
  }
  const route = reverse ? [...ZONE_IDS].reverse() : ZONE_IDS;
  for (const zone of route) {
    go(zone);
    assert.equal(state.area, zone);
    go('mentor');
    act('c');
    if (extras) {
      for (const [index, clue] of ['clue-1', 'clue-2', 'clue-1'].entries()) {
        go(clue);
        assert.equal(state.scene.type, 'note');
        assert.equal(state.scene.guide, clue === 'clue-1' ? zone : undefined);
        assert.equal(state.scene.award, index === 2 ? undefined : 25);
        act('c');
      }
    }
    go('risk');
    if (mistakes) { answer('partial'); answer('wrong'); }
    answer('best');
    answer('best');
    if (extras) { go('extra'); answer('best'); }
    go('exit');
  }
  if (revisit) {
    go('office');
    go('risk');
    assert.equal(state.score.initiative, INITIATIVE_POINTS);
    act('c');
    go('risk');
    assert.equal(state.score.initiative, INITIATIVE_POINTS);
    act('c');
    go('exit');
  }
  go('ines');
  act('b');
  go('ines');
  act('c');
  for (let i = 0; i < ZONE_IDS.length; i++) answer('best');
  assert.equal(state.scene.type, 'finish');
  return { state, moves };
}

test('five interiors can be explored in either order and a full campaign replays identically', () => {
  for (const map of Object.values(AREAS)) {
    assert.ok(walkable(map, map.spawn), map.name);
    for (const entity of map.objects) {
      assert.ok(findPath(map, map.spawn, entity.at, entity), map.name + ' · ' + entity.name);
    }
  }
  for (const seed of [1, 78345, 9162201, 0x7fffffff]) {
    const { state, moves } = campaign(seed, true, false, seed % 2 === 1);
    assert.equal(totalPoints(state.score), 3560);
    assert.equal(completedZones(state), 5);
    assert.equal(completedExtras(state), 5);
    assert.equal(state.score.clues, 250);
    assert.equal(state.firstTries, 20);
    assert.deepEqual(replayQuest(seed, moves), state);
  }
});

test('a return to the Stressauro pays once and faster completions gain more points', () => {
  const { state, moves } = campaign(982, true, false, false, true);
  assert.equal(totalPoints(state.score), 3680);
  assert.equal(replayQuest(982, moves)?.score.initiative, INITIATIVE_POINTS);
  assert.equal(totalPoints(state.score) + timeBonus(0), MAX_SCORE);
  assert.equal(timeBonus(8 * 60_000), 180);
  assert.equal(timeBonus(10 * 60_000), 120);
  assert.equal(timeBonus(14 * 60_000 + 1), 0);
});

test('skipping extras and making partial or wrong choices makes a material difference', () => {
  const direct = campaign(14, false).state;
  const retried = campaign(14, false, true).state;
  assert.equal(totalPoints(direct.score), 2350);
  assert.equal(completedExtras(direct), 0);
  assert.equal(direct.firstTries, 15);
  assert.equal(retried.firstTries, 10);
  assert.ok(totalPoints(retried.score) < totalPoints(direct.score) - 350);
  assert.ok(replayQuest(14, 'ac')?.introduced);
  assert.equal(replayQuest(14, '1'), null);
  assert.equal(replayQuest(14, 'x'), null);
});

test('letters, completion and awarded score are validated at the API boundary', async () => {
  const previous = process.env.SUBMISSION_HMAC_SECRET;
  process.env.SUBMISSION_HMAC_SECRET = 'local-sigma-quest-test-secret';
  try {
    assert.equal(validateLetters('aBcD'), 'ABCD');
    for (const value of ['ABC', 'ABCDE', 'ABC1', 'ABÓD', ' ABCD', 'AB-D', 'ADMN', null]) {
      assert.throws(() => validateLetters(value), { status: 400 });
    }
    const started = Date.now();
    const { seed, token } = await issueQuestRun(started);
    const { moves } = campaign(seed, true);
    const saved = await verifyFinishedQuest({ token, moves, points: 1 }, started + 600_000);
    assert.equal(saved.basePoints, 3560);
    assert.equal(saved.firstTries, 20);
    await assert.rejects(verifyFinishedQuest({ token, moves: moves.slice(0, -1) }, started + 600_000), { status: 400 });
    await assert.rejects(verifyFinishedQuest({ token, moves }, started + 1), { status: 400 });
    await assert.rejects(verifyFinishedQuest({ token, moves }, started + 49 * 3600_000), { status: 410 });
  } finally {
    if (previous === undefined) delete process.env.SUBMISSION_HMAC_SECRET;
    else process.env.SUBMISSION_HMAC_SECRET = previous;
  }
});

test('the migration restricts access and returns at most ten different codes in order', async () => {
  const db = new PGlite();
  try {
    await db.exec(await readFile('tests/fixtures/intake-baseline.sql', 'utf8'));
    await db.exec(await readFile('supabase/migrations/20261121171031_sigma_quest_scores.sql', 'utf8'));
    async function insert(letters: string, points: number, firstTries: number, time = 450_000) {
      const id = randomUUID();
      await db.query('insert into web.sigma_quest_runs (run_id) values ($1)', [id]);
      return db.query('insert into web.sigma_quest_scores (run_id, letters, points, first_tries, elapsed_ms) values ($1,$2,$3,$4,$5)',
        [id, letters, points, firstTries, time]);
    }
    await insert('ABCD', 1800, 13);
    await insert('ABCD', 3000, 15);
    await insert('AABD', 3000, 11);
    await insert('QZRX', 3000, 15, 448_000);
    for (let i = 0; i < 9; i++) await insert('XYZ' + 'ABCDEFGHI'[i], 1200 + i, 10);
    await assert.rejects(insert('ABC1', 1, 0), { code: '23514' });
    await assert.rejects(insert('BCDE', MAX_SCORE + 1, 0), { code: '23514' });

    const runId = randomUUID();
    await db.query("insert into web.sigma_quest_runs (run_id, running_since) values ($1, clock_timestamp() - interval '4 minutes')", [runId]);

    for (const role of ['anon', 'authenticated']) {
      const { rows } = await db.query<{ available: boolean }>(
        "select has_table_privilege($1,'web.sigma_quest_scores','select,insert') or has_table_privilege($1,'web.sigma_quest_runs','select,update') or has_function_privilege($1,'web.sigma_quest_top10()','execute') or has_function_privilege($1,'web.sigma_quest_clock(uuid,text,text,integer)','execute') as available",
        [role],
      );
      assert.equal(rows[0].available, false);
    }
    await db.exec('set role service_role');
    const { rows } = await db.query<{ letters: string; points: number }>('select * from web.sigma_quest_top10()');
    assert.equal(rows.length, 10);
    assert.deepEqual(rows.slice(0, 3).map(row => row.letters), ['QZRX', 'ABCD', 'AABD']);
    assert.equal(rows.filter(row => row.letters === 'ABCD').length, 1);
    assert.equal(rows[0].points, 3000);

    async function clock(action: string, digest: string | null = null, min = 0) {
      const result = await db.query<{ clock: { running?: boolean; elapsedMs?: number; finished?: boolean; status: string } }>(
        'select web.sigma_quest_clock($1,$2,$3,$4) as clock', [runId, action, digest, min],
      );
      return result.rows[0].clock;
    }
    const paused = await clock('pause');
    assert.equal(paused.running, false);
    assert.ok(paused.elapsedMs! >= 240_000);
    assert.deepEqual(await clock('pause'), paused);
    const digest = 'a'.repeat(64);
    assert.deepEqual(await clock('finish', digest, 600_000), { status: 'too_soon' });
    assert.equal((await clock('resume')).running, true);
    const finish = await clock('finish', digest, 4000);
    assert.equal(finish.finished, true);
    assert.equal(finish.running, false);
    assert.deepEqual(await clock('finish', digest, 4000), finish);
    assert.deepEqual(await clock('resume'), finish);
    assert.deepEqual(await clock('finish', 'b'.repeat(64), 4000), { status: 'conflict' });
  } finally {
    await db.close();
  }
});
