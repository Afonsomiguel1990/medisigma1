import { ADVENTURE_MISSIONS } from './adventure';

export const COLUMNS = 11;
export const ROWS = 8;
export const TILE = 16;
export const TICK_MS = 150;
export const TASK_POINTS = 100;
const TIME_BONUS = 60;

export type RunVersion = 1 | 2;
export const CURRENT_RUN_VERSION = 2;

export function missionTicks(version: RunVersion): number {
  return (version === 1 ? 30_000 : 45_000) / TICK_MS;
}

export type Direction = 'up' | 'right' | 'down' | 'left';
export type Command = Direction | 'act';
export type Cell = readonly [column: number, row: number];
export type TurnAction = readonly [mission: number, tick: number, command: Command];

type Task = {
  at: Cell;
  label: string;
  sprite: 'cable' | 'spill' | 'papers' | 'crate' | 'fish' | 'bowl' | 'carrot';
  destination?: Cell;
};

export type Mission = {
  title: string;
  room: string;
  instruction: string;
  map: readonly string[];
  start: Cell;
  tasks: readonly Task[];
  mentor?: {
    name: string;
    role: string;
    at: Cell;
    sprite: 'mentorLara' | 'mentorRui' | 'mentorInes';
  };
  kit?: Cell;
  exit?: Cell;
};

const CLASSIC_MISSIONS: readonly Mission[] = [
  {
    title: 'Segurança no Trabalho',
    room: 'Oficina',
    instruction: 'Aproxima-te dos três riscos e usa Ação para os assinalar.',
    map: [
      '##########',
      '#.d....d.#',
      '#........#',
      '#.d....d.#',
      '#........#',
      '#..d..d..#',
      '#........#',
      '##########',
    ],
    start: [4, 6],
    tasks: [
      { at: [2, 2], sprite: 'cable', label: 'Cabo na passagem' },
      { at: [6, 3], sprite: 'spill', label: 'Derrame no chão' },
      { at: [7, 5], sprite: 'papers', label: 'Passagem obstruída' },
    ],
  },
  {
    title: 'Extintores',
    room: 'Armazém',
    instruction: 'Usa Ação junto de cada caixa para a arrumar e libertar o acesso ao extintor.',
    map: [
      '##########',
      '#.e...e..#',
      '#p...p...#',
      '#...r....#',
      '#r.....e.#',
      '#...r.p..#',
      '#........#',
      '##########',
    ],
    start: [4, 6],
    tasks: [
      { at: [2, 2], sprite: 'crate', label: 'Extintor da esquerda', destination: [1, 2] },
      { at: [6, 2], sprite: 'crate', label: 'Extintor da direita', destination: [5, 2] },
      { at: [7, 5], sprite: 'crate', label: 'Extintor junto à entrada', destination: [6, 5] },
    ],
  },
  {
    title: 'Segurança Alimentar',
    room: 'Cozinha',
    instruction: 'Usa Ação para pegar num tabuleiro e pousá-lo na bancada com o mesmo símbolo.',
    map: [
      '##########',
      '#.k....k.#',
      '#........#',
      '#..k..k..#',
      '#........#',
      '#..k..k..#',
      '#........#',
      '##########',
    ],
    start: [4, 6],
    tasks: [
      { at: [1, 2], sprite: 'fish', label: 'Peixe cru', destination: [7, 1] },
      { at: [8, 3], sprite: 'bowl', label: 'Prato preparado', destination: [2, 1] },
      { at: [2, 5], sprite: 'carrot', label: 'Legumes crus', destination: [6, 5] },
    ],
  },
];

export const MISSIONS = ADVENTURE_MISSIONS;
export const MAX_SCORE = MISSIONS.reduce(
  (total, mission) => total + mission.tasks.length * TASK_POINTS + TIME_BONUS,
  0,
);

export type MissionState = {
  index: number;
  version: RunVersion;
  tick: number;
  player: Cell;
  facing: Direction;
  moving: boolean;
  resolved: readonly boolean[];
  carrying: number | null;
  hasKit: boolean;
};

const DIRECTIONS: Record<Direction, Cell> = {
  up: [0, -1],
  right: [1, 0],
  down: [0, 1],
  left: [-1, 0],
};

export function missionsFor(version: RunVersion): readonly Mission[] {
  return version === 1 ? CLASSIC_MISSIONS : MISSIONS;
}

export function roomFor(state: MissionState): Mission {
  return missionsFor(state.version)[state.index];
}

export function startMission(index: number, version: RunVersion = CURRENT_RUN_VERSION): MissionState {
  const mission = missionsFor(version)[index];
  return {
    index,
    version,
    tick: 0,
    player: mission.start,
    facing: 'up',
    moving: false,
    resolved: mission.tasks.map(() => false),
    carrying: null,
    hasKit: false,
  };
}

function sameCell(a: Cell, b: Cell | undefined): boolean {
  return b !== undefined && a[0] === b[0] && a[1] === b[1];
}

function adjacent(cell: Cell, direction: Direction): Cell {
  const [dx, dy] = DIRECTIONS[direction];
  return [cell[0] + dx, cell[1] + dy];
}

export function facingCell(state: MissionState): Cell {
  return adjacent(state.player, state.facing);
}

export function taskCell(state: MissionState, index: number): Cell | undefined {
  const task = roomFor(state).tasks[index];
  if (state.carrying === index) return undefined;
  return state.resolved[index] ? task.destination ?? task.at : task.at;
}

type Interaction =
  | { kind: 'kit'; at: Cell; label: string }
  | { kind: 'carry' | 'resolve'; at: Cell; label: string; index: number };

function interactions(state: MissionState): Interaction[] {
  const mission = roomFor(state);
  if (mission.kit && !state.hasKit) {
    return [{ kind: 'kit', at: mission.kit, label: 'Recolher o kit' }];
  }
  if (state.carrying !== null) {
    const task = mission.tasks[state.carrying];
    return task.destination
      ? [{ kind: 'resolve', at: task.destination, index: state.carrying, label: `Pousar ${task.label}` }]
      : [];
  }
  const pickup = state.index === 2 || (state.version === 2 && state.index === 1);
  const verb = pickup ? 'Recolher' : state.index === 0 ? 'Assinalar' : 'Arrumar';
  return mission.tasks.flatMap((task, index) => state.resolved[index] ? [] : [{
    kind: pickup ? 'carry' : 'resolve',
    at: task.at,
    index,
    label: `${verb} ${task.label}`,
  }]);
}

function interactionAtPlayer(state: MissionState): Interaction | undefined {
  const targets = interactions(state);
  const target = facingCell(state);
  const facing = targets.find((item) => sameCell(target, item.at));
  if (facing || state.version === 1) return facing;
  return targets.find(({ at: [x, y] }) => Math.abs(x - state.player[0]) + Math.abs(y - state.player[1]) === 1);
}

export function actionLabel(state: MissionState): string | undefined {
  return interactionAtPlayer(state)?.label;
}

export function actionCell(state: MissionState): Cell | undefined {
  return interactionAtPlayer(state)?.at;
}

export function goalCells(state: MissionState): Cell[] {
  const exit = roomFor(state).exit;
  if (exit && state.resolved.every(Boolean)) return [exit];
  return interactions(state).map(({ at }) => at);
}

export function missionHint(state: MissionState): string {
  if (roomFor(state).kit && !state.hasKit) return 'Recolhe o kit amarelo de sinalização.';
  if (state.resolved.every(Boolean)) return 'Segue para a saída verde.';
  if (state.index === 0) return 'Assinala os três riscos marcados no mapa.';
  if (state.index === 1) {
    return state.carrying === null ? 'Pega numa caixa junto a um extintor.' : 'Leva a caixa à zona amarela marcada.';
  }
  return state.carrying === null ? 'Pega num dos tabuleiros.' : 'Leva o tabuleiro à bancada com o símbolo igual.';
}

export function remainingSeconds(state: MissionState): number {
  return Math.ceil((missionTicks(state.version) - state.tick) * TICK_MS / 1000);
}

export function isMissionComplete(state: MissionState): boolean {
  const exit = roomFor(state).exit;
  return state.resolved.every(Boolean) && (!exit || sameCell(state.player, exit));
}

export function isMissionOver(state: MissionState): boolean {
  return state.tick === missionTicks(state.version) || isMissionComplete(state);
}

export function completedTasks(state: MissionState): number {
  return state.resolved.filter(Boolean).length;
}

export function missionPoints(state: MissionState): number {
  const limit = missionTicks(state.version);
  const remaining = limit - state.tick;
  const timePoints = state.version === 1
    ? Math.floor(remaining * TICK_MS / 1000) * 2
    : Math.floor(TIME_BONUS * remaining / limit);
  const bonus = isMissionComplete(state) ? timePoints : 0;
  return completedTasks(state) * TASK_POINTS + bonus;
}

export function stepMission(state: MissionState, command?: Command): MissionState {
  if (isMissionOver(state)) return state;

  const next = { ...state, tick: state.tick + 1, moving: false };
  if (!command) return next;

  const mission = roomFor(state);
  if (command !== 'act') {
    const [x, y] = adjacent(state.player, command);
    const cell: Cell = [x, y];
    const tile = mission.map[y]?.[x];
    const blocked = !tile || !'.=m'.includes(tile)
      || sameCell(cell, mission.mentor?.at)
      || (!state.hasKit && sameCell(cell, mission.kit))
      || mission.tasks.some((_, index) => sameCell(cell, taskCell(state, index)));
    return { ...next, facing: command, player: blocked ? state.player : cell, moving: !blocked };
  }

  const action = interactionAtPlayer(state);
  if (!action) return next;
  if (action.kind === 'kit') return { ...next, hasKit: true };
  if (action.kind === 'carry') return { ...next, carrying: action.index };
  return {
    ...next,
    carrying: null,
    resolved: state.resolved.map((done, index) => done || index === action.index),
  };
}

function isCommand(value: unknown): value is Command {
  return value === 'act' || (typeof value === 'string' && Object.hasOwn(DIRECTIONS, value));
}

export function parseActions(value: unknown, version: RunVersion = CURRENT_RUN_VERSION): TurnAction[] | null {
  const count = missionsFor(version).length;
  const limit = missionTicks(version);
  if (!Array.isArray(value) || value.length > count * limit) return null;

  const actions: TurnAction[] = [];
  let priorTick = -1;
  for (const entry of value) {
    if (!Array.isArray(entry) || entry.length !== 3) return null;
    const [mission, tick, command] = entry;
    if (!Number.isInteger(mission) || mission < 0 || mission >= count
      || !Number.isInteger(tick) || tick < 0 || tick >= limit || !isCommand(command)) return null;
    const time = mission * limit + tick;
    if (time <= priorTick) return null;
    actions.push([mission, tick, command]);
    priorTick = time;
  }
  return actions;
}

export function replayTurn(actions: readonly TurnAction[], version: RunVersion = CURRENT_RUN_VERSION): { points: number; durationMs: number } | null {
  let cursor = 0;
  let points = 0;
  let ticks = 0;

  for (let index = 0; index < missionsFor(version).length; index++) {
    let mission = startMission(index, version);
    while (!isMissionOver(mission)) {
      const action = actions[cursor];
      const ready = action?.[0] === index && action[1] === mission.tick;
      mission = stepMission(mission, ready ? action[2] : undefined);
      if (ready) cursor++;
    }
    if (actions[cursor]?.[0] === index) return null;
    points += missionPoints(mission);
    ticks += mission.tick;
  }
  return cursor === actions.length ? { points, durationMs: ticks * TICK_MS } : null;
}
