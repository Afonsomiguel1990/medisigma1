import { createHash, randomInt, randomUUID, timingSafeEqual } from 'node:crypto';
import { privateIdentifier } from '@/lib/security/identity';
import { HttpError } from '@/lib/security/body';
import { getSupabaseAdmin } from '@/lib/supabase';
import { QUEST_VERSION, replayQuest, timeBonus, totalPoints } from './game';
import { normalizeLetters, type QuestClock, type QuestRecord, type QuestResult } from './record';

const PURPOSE = 'sigma-quest-partida';
const LIFETIME = 48 * 60 * 60_000;
const reserved = new Set([
  'ACTX', 'ADMN', 'MEDI', 'SIGM',
  'PUTA', 'PUTO', 'MERD', 'PORR', 'CRLH', 'FODA', 'FODE', 'FTSE', 'FDSE', 'VDIA', 'BIXX',
  'NAZI', 'KKKK', 'KKKX', 'FUCK', 'FUKK', 'SHIT', 'CUNT', 'DICK', 'COCK', 'SLUT', 'TWAT',
  'RAPE', 'TITS', 'WANK', 'PORN', 'SEXX', 'HITL', 'KILL', 'JIZZ',
]);

const repository = () => getSupabaseAdmin().schema('web');

export function validateLetters(value: unknown): string {
  const letters = normalizeLetters(value);
  if (!letters) throw new HttpError(400, 'Escolhe quatro letras de A a Z.');
  if (reserved.has(letters)) throw new HttpError(400, 'Essa combinação está reservada. Experimenta outras quatro letras.');
  return letters;
}

export async function issueQuestRun(now = Date.now()) {
  const id = randomUUID();
  const seed = randomInt(1, 0x80000000);
  const payload = QUEST_VERSION + '.' + id + '.' + now + '.' + seed;
  return { id, seed, token: payload + '.' + await privateIdentifier(PURPOSE, payload) };
}

export async function createQuestRun() {
  const { id, seed, token } = await issueQuestRun();
  const { error } = await repository().from('sigma_quest_runs').insert({ run_id: id });
  if (error) throw error;
  return { seed, token };
}

async function checkToken(token: unknown, now: number) {
  const match = typeof token === 'string' &&
    /^((\d)\.([a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12})\.(\d{13})\.([1-9]\d{0,9}))\.([a-f0-9]{64})$/.exec(token);
  if (!match) throw new HttpError(400, 'O código da partida é inválido.');
  const [, payload, version, id, started, seed, signature] = match;
  const expected = await privateIdentifier(PURPOSE, payload);
  if (!timingSafeEqual(Buffer.from(signature, 'hex'), Buffer.from(expected, 'hex'))) {
    throw new HttpError(400, 'O código da partida é inválido.');
  }
  const age = now - Number(started);
  if (Number(version) !== QUEST_VERSION || age < 0 || age > LIFETIME) {
    throw new HttpError(410, 'O prazo para publicar este resultado terminou. Podes começar uma partida nova.');
  }
  return { id, age, seed: Number(seed) };
}

type ClockAction = 'pause' | 'resume' | 'finish';

async function clock(id: string, action: ClockAction, digest: string | null = null, minimum = 0): Promise<QuestClock> {
  const { data, error } = await repository().rpc('sigma_quest_clock', {
    p_run_id: id, p_action: action, p_digest: digest, p_min_ms: minimum,
  });
  if (error) throw error;
  if (!data) throw new HttpError(410, 'O cronómetro desta partida expirou.');
  if (data.status === 'conflict') throw new HttpError(409, 'Já existe um resultado para esta partida.');
  if (data.status === 'too_soon') throw new HttpError(409, 'O cronómetro ainda não tem tempo de jogo suficiente para confirmar a partida.');
  return { elapsedMs: data.elapsedMs, running: data.running, finished: data.finished };
}

export async function changeQuestClock(token: unknown, action: 'pause' | 'resume'): Promise<QuestClock> {
  const { id } = await checkToken(token, Date.now());
  return clock(id, action);
}

export async function verifyFinishedQuest(body: Record<string, unknown>, now = Date.now()) {
  const { id, age, seed } = await checkToken(body.token, now);
  const moves = typeof body.moves === 'string' ? body.moves : '';
  const state = replayQuest(seed, moves);
  const minimum = state ? Math.max(4000, state.steps * 30) : 0;
  if (!state || state.scene.type !== 'finish' || age < minimum) {
    throw new HttpError(400, 'A partida tem de ser concluída antes de publicares o resultado.');
  }
  return { id, digest: createHash('sha256').update(moves).digest('hex'), minimum,
    basePoints: totalPoints(state.score), firstTries: state.firstTries };
}

export async function finishQuest(body: Record<string, unknown>): Promise<QuestResult & { runId: string }> {
  const { id, digest, minimum, basePoints, firstTries } = await verifyFinishedQuest(body);
  const timer = await clock(id, 'finish', digest, minimum);
  const timePoints = timeBonus(timer.elapsedMs);
  return { ...timer, runId: id, points: basePoints + timePoints, firstTries, timePoints };
}

export async function validateQuestRun(body: Record<string, unknown>) {
  const letters = validateLetters(body.letters);
  const result = await finishQuest(body);
  return { run_id: result.runId, letters, points: result.points, first_tries: result.firstTries, elapsed_ms: result.elapsedMs };
}

export async function loadQuestRecords(): Promise<QuestRecord[]> {
  const { data, error } = await repository().rpc('sigma_quest_top10');
  if (error) throw error;
  return (data ?? []) as QuestRecord[];
}

export async function storeQuestRecord(record: QuestRecord & { run_id: string }): Promise<QuestRecord> {
  const table = repository().from('sigma_quest_scores');
  const { error } = await table.insert(record);
  const { letters, points, first_tries, elapsed_ms } = record;
  if (!error) return { letters, points, first_tries, elapsed_ms };
  if (error.code !== '23505') throw error;

  const saved = await table.select('letters,points,first_tries,elapsed_ms').eq('run_id', record.run_id).single();
  if (saved.error) throw saved.error;
  if (saved.data.letters !== letters || saved.data.points !== points || saved.data.first_tries !== first_tries ||
      saved.data.elapsed_ms !== elapsed_ms) {
    throw new HttpError(409, 'Já foi publicado um resultado para esta partida.');
  }
  return saved.data;
}
