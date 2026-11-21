import { randomUUID, timingSafeEqual } from 'node:crypto';
import { getSupabaseAdmin } from '@/lib/supabase';
import { HttpError } from '@/lib/security/body';
import { privateIdentifier } from '@/lib/security/identity';
import { isAllowedOrigin } from '@/lib/security/origin';
import { parseActions, replayTurn, TICK_MS, type RunVersion } from './game';
import { normalizeInitials, validInitials, type RecordEntry } from './record';

const SIGNING_PURPOSE = 'turno-seguro-partida';
const RUN_LIFETIME_MS = 10 * 60 * 1000;

export function checkGameOrigin(request: Request): void {
  if (!isAllowedOrigin(request.headers.get('origin'))) {
    throw new HttpError(403, 'Abre o jogo no site da Medisigma.');
  }
}

export function gameJson(data: object, status = 200): Response {
  return Response.json(data, { status, headers: { 'Cache-Control': 'no-store' } });
}

export async function issueRunToken(now = Date.now(), version: RunVersion = 1): Promise<string> {
  const payload = `${version}.${randomUUID()}.${now}`;
  return `${payload}.${await privateIdentifier(SIGNING_PURPOSE, payload)}`;
}

async function verifyRunToken(token: unknown, now: number) {
  const match = typeof token === 'string'
    ? /^(([12])\.([a-f\d-]{36})\.(\d{13}))\.([a-f\d]{64})$/.exec(token)
    : null;
  if (!match) throw new HttpError(400, 'O código da partida é inválido.');

  const [, payload, runVersion, id, startedAt, actual] = match;
  const expected = await privateIdentifier(SIGNING_PURPOSE, payload);
  if (!timingSafeEqual(Buffer.from(actual, 'hex'), Buffer.from(expected, 'hex'))) {
    throw new HttpError(400, 'O código da partida é inválido.');
  }
  const elapsed = now - Number(startedAt);
  if (elapsed < -TICK_MS || elapsed > RUN_LIFETIME_MS) {
    throw new HttpError(410, 'Esta partida expirou. Começa um novo turno para entrares no quadro.');
  }
  const version: RunVersion = runVersion === '2' ? 2 : 1;
  return { id, elapsed, version };
}

export async function validateFinishedRun(body: Record<string, unknown>, now = Date.now()) {
  const initials = typeof body.initials === 'string' ? normalizeInitials(body.initials) : '';
  if (!validInitials(initials)) throw new HttpError(400, 'Escreve três letras para guardar o resultado.');

  const { id, elapsed, version } = await verifyRunToken(body.token, now);
  const actions = parseActions(body.actions, version);
  const result = actions && replayTurn(actions, version);
  if (!result || result.durationMs > elapsed + TICK_MS) {
    throw new HttpError(400, 'As jogadas desta partida são inválidas.');
  }
  return { run_id: id, initials, points: result.points };
}

function scores() {
  return getSupabaseAdmin().schema('web').from('turno_seguro_scores');
}

export async function loadRecords(): Promise<RecordEntry[]> {
  const { data, error } = await scores()
    .select('initials,points')
    .order('points', { ascending: false })
    .order('saved_at', { ascending: true })
    .order('run_id', { ascending: true })
    .limit(10);
  if (error) throw error;
  return data;
}

export async function storeRecord(record: RecordEntry & { run_id: string }): Promise<RecordEntry> {
  const { error } = await scores().insert(record);
  const { initials, points } = record;
  if (!error) return { initials, points };
  if (error.code !== '23505') throw error;

  const previous = await scores().select('initials,points').eq('run_id', record.run_id).single();
  if (previous.error) throw previous.error;
  if (previous.data.initials !== initials || previous.data.points !== points) {
    throw new HttpError(409, 'Já foi guardado um resultado para esta partida.');
  }
  return previous.data;
}
