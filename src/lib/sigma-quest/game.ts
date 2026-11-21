import { ZONES, ZONE_IDS, type Choice, type ZoneId } from './cases';
import { AREAS, DELTAS, add, entityInReach, walkable, type AreaId, type Entity, type Move, type Point } from './world';

export type QuestAction = Move | 'a' | 'c' | 'b' | '1' | '2' | '3' | '4';
export type Score = { decisions: number; clues: number; extras: number; streak: number; missions: number; initiative: number };
type Progress = { briefing: boolean; clues: number; completed: boolean; extra: boolean };
type Challenge = { zone: ZoneId; round: 'first' | 'second' | 'extra' | 'inspection' };
type Turn = { challenge: Challenge; pressure: number };
export type Scene =
  | { type: 'map' }
  | { type: 'note'; heading: string; text: string; award?: number; guide?: ZoneId }
  | { type: 'review' }
  | { type: 'choice'; turn: Turn }
  | { type: 'reaction'; turn: Turn; choice: Choice; awarded: number; combo: number }
  | { type: 'finish' };

export type Quest = {
  seed: number; area: AreaId; position: Point; facing: Move; steps: number;
  scene: Scene; introduced: boolean; progress: Record<ZoneId, Progress>;
  score: Score; streak: number; longest: number; firstTries: number; answered: number;
  inspected: number; leftStressauro: boolean;
};

export const QUEST_VERSION = 2;
export const MAX_EVENTS = 16000;
export const CLUE_POINTS = 25;
export const MISSION_POINTS = 70;
export const INITIATIVE_POINTS = 120;
export const TIME_BUDGET_MS = 14 * 60_000;
export const MAX_SCORE = 3560 + INITIATIVE_POINTS + TIME_BUDGET_MS / 2000;
export const MAX_DECISIONS = 20;
export const MAIN_DECISION_POINTS = 100;
export const EXTRA_POINTS = 160;
export const INSPECTION_POINTS = 120;
export const STREAK_STEP = 8;
const STREAK_CAP = 5;

const mapScene: Scene = { type: 'map' };
const freshProgress = (): Progress => ({ briefing: false, clues: 0, completed: false, extra: false });

export function newQuest(seed: number): Quest {
  return {
    seed, area: 'hub', position: AREAS.hub.spawn, facing: 'n', steps: 0, scene: mapScene,
    introduced: false, progress: {
      office: freshProgress(), factory: freshProgress(), kitchen: freshProgress(),
      hotel: freshProgress(), warehouse: freshProgress(),
    },
    score: { decisions: 0, clues: 0, extras: 0, streak: 0, missions: 0, initiative: 0 },
    streak: 0, longest: 0, firstTries: 0, answered: 0, inspected: 0, leftStressauro: false,
  };
}

export function totalPoints(score: Score): number {
  return score.decisions + score.clues + score.extras + score.streak + score.missions + score.initiative;
}

export const timeBonus = (elapsedMs: number) => Math.max(0, Math.floor((TIME_BUDGET_MS - elapsedMs) / 2000));

export const completedZones = (state: Quest) => ZONE_IDS.filter(zone => state.progress[zone].completed).length;
export const completedExtras = (state: Quest) => ZONE_IDS.filter(zone => state.progress[zone].extra).length;
export const evidenceCount = (progress: Progress) => (progress.clues & 1) + ((progress.clues >> 1) & 1);
export const canDoExtra = (progress: Progress) => progress.completed && progress.clues === 3 && !progress.extra;

function withProgress(state: Quest, zone: ZoneId, patch: Partial<Progress>): Quest {
  return { ...state, progress: { ...state.progress, [zone]: { ...state.progress[zone], ...patch } } };
}

function note(state: Quest, heading: string, text: string, detail?: { award?: number; guide?: ZoneId }): Quest {
  return { ...state, scene: { type: 'note', heading, text, ...detail } };
}

function shuffle<T>(items: readonly T[], seed: number, key: string): T[] {
  const shuffled = [...items];
  let random = seed ^ 0x10862afd;
  for (const char of key) random = Math.imul(random ^ char.charCodeAt(0), 0x01000193);
  for (let i = shuffled.length - 1; i > 0; i--) {
    random = Math.imul(random, 1664525) + 1013904223 | 0;
    const index = (random >>> 0) % (i + 1);
    [shuffled[i], shuffled[index]] = [shuffled[index], shuffled[i]];
  }
  return shuffled;
}

export const inspectionOrder = (seed: number) => shuffle(ZONE_IDS, seed, 'inspection');

export function turnContent(seed: number, { challenge }: Turn) {
  const zone = ZONES[challenge.zone];
  const caseVersion = shuffle(zone.first, seed, challenge.zone)[0];
  const decision = {
    first: caseVersion, second: zone.second, extra: zone.extra.question, inspection: zone.inspection,
  }[challenge.round];
  return {
    prompt: decision.prompt,
    choices: shuffle(decision.choices, seed, challenge.zone + challenge.round),
  };
}

export const availablePoints = ({ challenge, pressure }: Turn) => {
  const base = challenge.round === 'extra' ? EXTRA_POINTS : challenge.round === 'inspection' ? INSPECTION_POINTS : MAIN_DECISION_POINTS;
  return Math.round(base * Math.max(20, 100 - pressure) / 100);
};

function startTurn(state: Quest, zone: ZoneId, round: Challenge['round']): Quest {
  return { ...state, scene: { type: 'choice', turn: { challenge: { zone, round }, pressure: 0 } } };
}

function beginInspection(state: Quest): Quest {
  return startTurn(state, inspectionOrder(state.seed)[state.inspected], 'inspection');
}

function interact(state: Quest, entity: Entity): Quest {
  if (entity.kind === 'door') {
    return { ...state, area: entity.zone, position: AREAS[entity.zone].spawn, facing: 'n' };
  }
  if (entity.kind === 'intro') {
    return note({ ...state, introduced: true }, 'Helena · Supervisora',
      'Primeiro dia! Visita os cinco edifícios pela ordem que quiseres. Em cada sala há alguém que te ajuda e um folheto na parede. Lê o folheto para ganhares pontos. No fim, mostra a caderneta à Inês, aqui na praça.');
  }
  if (entity.kind === 'inspector') {
    const remaining = ZONE_IDS.length - completedZones(state);
    if (remaining > 0) {
      return note(state, 'Inês · Inspetora na história',
        remaining === 1 ? 'Falta um Risco na caderneta. Volta cá quando terminares a última missão.' :
          'Ainda faltam ' + remaining + ' Riscos na caderneta. Visita os edifícios que faltam e volta à praça.');
    }
    return { ...state, scene: { type: 'review' } };
  }
  if (state.area === 'hub') return state;
  const zone = ZONES[state.area];
  const progress = state.progress[state.area];
  switch (entity.kind) {
    case 'exit': {
      const door = AREAS.hub.objects.find(object => object.kind === 'door' && object.zone === state.area);
      if (!door) return state;
      return {
        ...state,
        area: 'hub',
        position: add(door.at, DELTAS.s),
        facing: 's',
        leftStressauro: state.leftStressauro || (state.area === 'office' && progress.completed),
      };
    }
    case 'mentor':
      return note(withProgress(state, state.area, { briefing: true }), zone.mentor, zone.briefing, { guide: state.area });
    case 'evidence': {
      const bit = 1 << entity.index;
      const clue = zone.evidence[entity.index];
      const poster = entity.index === 0 ? state.area : undefined;
      const heading = poster ? 'Folheto na parede' : clue.label;
      if (progress.clues & bit) return note(state, heading, clue.text, { guide: poster });
      const updated = withProgress(state, state.area, { clues: progress.clues | bit });
      return note({ ...updated, score: { ...state.score, clues: state.score.clues + CLUE_POINTS } }, heading, clue.text,
        { award: CLUE_POINTS, guide: poster });
    }
    case 'risk':
      if (state.area === 'office' && state.leftStressauro && !state.score.initiative) {
        const updated = { ...state, score: { ...state.score, initiative: INITIATIVE_POINTS } };
        return note(updated, 'Stressauro · De volta ao escritório',
          'Voltaste para ver como corriam as coisas. Olha, só me ficou um papel! Quando chegam dois pedidos urgentes, agora pergunto qual deve esperar. A Leonor até me deixou ajudar com o quadro.',
          { award: INITIATIVE_POINTS });
      }
      return progress.completed ? note(state, zone.risk + ' · Resolvido', zone.resolution) : startTurn(state, state.area, 'first');
    case 'extra':
      if (progress.extra) return note(state, zone.extra.label, 'Já resolveste o desafio extra deste local.');
      if (canDoExtra(progress)) return startTurn(state, state.area, 'extra');
      return note(state, zone.extra.label, 'Resolve o encontro principal e observa as duas pistas para chegares a este desafio.');
    default:
      return state;
  }
}

function answer(state: Quest, turn: Turn, index: number): Quest {
  const choice = turnContent(state.seed, turn).choices[index];
  if (choice.result !== 'best') {
    const pressure = turn.pressure + (choice.result === 'partial' ? 20 : 35);
    return { ...state, streak: 0, scene: { type: 'reaction', turn: { ...turn, pressure }, choice, awarded: 0, combo: 0 } };
  }
  const fresh = turn.pressure === 0;
  const streak = fresh ? state.streak + 1 : 0;
  const combo = Math.max(0, (Math.min(streak, STREAK_CAP) - 1) * STREAK_STEP);
  const { zone, round } = turn.challenge;
  const field = round === 'extra' ? 'extras' : 'decisions';
  const awarded = availablePoints(turn);
  const updated: Quest = {
    ...state, streak, longest: Math.max(streak, state.longest), firstTries: state.firstTries + Number(fresh),
    answered: state.answered + 1,
    score: {
      ...state.score, [field]: state.score[field] + awarded, streak: state.score.streak + combo,
      missions: state.score.missions + (round === 'second' ? MISSION_POINTS : 0),
    },
    scene: { type: 'reaction', turn, choice, awarded, combo },
  };
  if (round === 'second') return withProgress(updated, zone, { completed: true });
  if (round === 'extra') return withProgress(updated, zone, { extra: true });
  if (round === 'inspection') return { ...updated, inspected: state.inspected + 1 };
  return updated;
}

export function applyAction(state: Quest, action: QuestAction): Quest {
  const { scene } = state;
  if (scene.type === 'map') {
    if (action === 'a') {
      const near = entityInReach(AREAS[state.area], state.position, state.facing);
      return near ? interact(state, near) : state;
    }
    if (action !== 'n' && action !== 's' && action !== 'w' && action !== 'e') return state;
    const position = add(state.position, DELTAS[action]);
    return walkable(AREAS[state.area], position)
      ? { ...state, position, facing: action, steps: state.steps + 1 }
      : state;
  }
  if (scene.type === 'choice' && /^[1-4]$/.test(action)) {
    return answer(state, scene.turn, Number(action) - 1);
  }
  if (scene.type === 'review' && action === 'b') return { ...state, scene: mapScene };
  if (action !== 'c') return state;
  switch (scene.type) {
    case 'note': return { ...state, scene: mapScene };
    case 'review': return beginInspection(state);
    case 'reaction':
      if (scene.choice.result !== 'best') return { ...state, scene: { type: 'choice', turn: scene.turn } };
      if (scene.turn.challenge.round === 'first') return startTurn(state, scene.turn.challenge.zone, 'second');
      if (scene.turn.challenge.round === 'inspection') {
        return state.inspected < ZONE_IDS.length ? beginInspection(state) : { ...state, scene: { type: 'finish' } };
      }
      return { ...state, scene: mapScene };
    default: return state;
  }
}

export function recommendedEntity(state: Quest): Entity {
  const map = AREAS[state.area];
  if (state.area === 'hub') {
    const next = ZONE_IDS.find(zone => !state.progress[zone].completed);
    const target = !state.introduced ? 'helena' : next ?? 'ines';
    return map.objects.find(object => object.id === target) ?? map.objects[0];
  }
  const progress = state.progress[state.area];
  const target = !progress.briefing && !progress.completed ? 'mentor' :
    progress.completed ? 'exit' : progress.clues === 3 ? 'risk' : !(progress.clues & 1) ? 'clue-1' : 'clue-2';
  return map.objects.find(object => object.id === target) ?? map.objects[0];
}

export function replayQuest(seed: unknown, log: unknown): Quest | null {
  if (typeof seed !== 'number' || !Number.isSafeInteger(seed) || seed < 1 || seed > 0x7fffffff ||
    typeof log !== 'string' || log.length > MAX_EVENTS || /[^nsewacb1-4]/.test(log)) return null;
  let state = newQuest(seed);
  for (const action of log as Iterable<QuestAction>) {
    const next = applyAction(state, action);
    if (next === state) return null;
    state = next;
  }
  return state;
}
