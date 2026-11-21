export const COLUMNS = 10;
export const ROWS = 8;
export const TILE = 16;
export const TICK_MS = 150;
export const MISSION_TICKS = 30_000 / TICK_MS;
export const TASK_POINTS = 100;
export const SECOND_POINTS = 2;

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

type Mission = {
  title: string;
  room: string;
  instruction: string;
  map: readonly string[];
  start: Cell;
  tasks: readonly Task[];
};

export const MISSIONS: readonly Mission[] = [
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

export const MAX_SCORE = MISSIONS.reduce(
  (total, mission) => total + mission.tasks.length * TASK_POINTS + 30 * SECOND_POINTS,
  0,
);

export type MissionState = {
  index: number;
  tick: number;
  player: Cell;
  facing: Direction;
  moving: boolean;
  resolved: readonly boolean[];
  carrying: number | null;
};

const DIRECTIONS: Record<Direction, Cell> = {
  up: [0, -1],
  right: [1, 0],
  down: [0, 1],
  left: [-1, 0],
};

export function startMission(index: number): MissionState {
  const mission = MISSIONS[index];
  return {
    index,
    tick: 0,
    player: mission.start,
    facing: 'up',
    moving: false,
    resolved: mission.tasks.map(() => false),
    carrying: null,
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
  const task = MISSIONS[state.index].tasks[index];
  if (state.carrying === index) return undefined;
  return state.resolved[index] ? task.destination ?? task.at : task.at;
}

export function actionLabel(state: MissionState): string | undefined {
  const mission = MISSIONS[state.index];
  const target = facingCell(state);
  if (state.carrying !== null) {
    const task = mission.tasks[state.carrying];
    return sameCell(target, task.destination) ? `Pousar: ${task.label}` : undefined;
  }
  const task = mission.tasks.find((item, index) => !state.resolved[index] && sameCell(target, item.at));
  if (!task) return undefined;
  const verb = state.index === 0 ? 'Assinalar' : state.index === 1 ? 'Arrumar' : 'Pegar';
  return `${verb}: ${task.label}`;
}

export function remainingSeconds(state: MissionState): number {
  return Math.ceil((MISSION_TICKS - state.tick) * TICK_MS / 1000);
}

export function isMissionComplete(state: MissionState): boolean {
  return state.resolved.every(Boolean);
}

export function isMissionOver(state: MissionState): boolean {
  return state.tick === MISSION_TICKS || isMissionComplete(state);
}

export function completedTasks(state: MissionState): number {
  return state.resolved.filter(Boolean).length;
}

export function missionPoints(state: MissionState): number {
  const secondsLeft = Math.floor((MISSION_TICKS - state.tick) * TICK_MS / 1000);
  const bonus = isMissionComplete(state) ? secondsLeft * SECOND_POINTS : 0;
  return completedTasks(state) * TASK_POINTS + bonus;
}

export function stepMission(state: MissionState, command?: Command): MissionState {
  if (isMissionOver(state)) return state;

  const next = { ...state, tick: state.tick + 1, moving: false };
  if (!command) return next;

  const mission = MISSIONS[state.index];
  if (command !== 'act') {
    const [x, y] = adjacent(state.player, command);
    const cell: Cell = [x, y];
    const blocked = mission.map[y]?.[x] !== '.'
      || mission.tasks.some((_, index) => sameCell(cell, taskCell(state, index)));
    return { ...next, facing: command, player: blocked ? state.player : cell, moving: !blocked };
  }

  const target = facingCell(state);
  const carried = state.carrying;
  if (carried !== null) {
    if (!sameCell(target, mission.tasks[carried].destination)) return next;
    return {
      ...next,
      carrying: null,
      resolved: state.resolved.map((done, index) => done || index === carried),
    };
  }

  const actedOn = mission.tasks.findIndex((task, index) => !state.resolved[index] && sameCell(target, task.at));
  if (actedOn < 0) return next;
  if (state.index === 2) return { ...next, carrying: actedOn };
  return { ...next, resolved: state.resolved.map((done, index) => done || index === actedOn) };
}

function isCommand(value: unknown): value is Command {
  return value === 'act' || (typeof value === 'string' && Object.hasOwn(DIRECTIONS, value));
}

export function parseActions(value: unknown): TurnAction[] | null {
  if (!Array.isArray(value) || value.length > MISSIONS.length * MISSION_TICKS) return null;

  const actions: TurnAction[] = [];
  let priorTick = -1;
  for (const entry of value) {
    if (!Array.isArray(entry) || entry.length !== 3) return null;
    const [mission, tick, command] = entry;
    if (!Number.isInteger(mission) || mission < 0 || mission >= MISSIONS.length
      || !Number.isInteger(tick) || tick < 0 || tick >= MISSION_TICKS || !isCommand(command)) return null;
    const time = mission * MISSION_TICKS + tick;
    if (time <= priorTick) return null;
    actions.push([mission, tick, command]);
    priorTick = time;
  }
  return actions;
}

export function replayTurn(actions: readonly TurnAction[]): { points: number; durationMs: number } | null {
  let cursor = 0;
  let points = 0;
  let ticks = 0;

  for (let index = 0; index < MISSIONS.length; index++) {
    let mission = startMission(index);
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
