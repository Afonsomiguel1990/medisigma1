import atlas from './sprite-map.json';
import { actionCell, COLUMNS, goalCells, roomFor, ROWS, taskCell, TILE, type Cell, type MissionState } from './game';

type Sprite = keyof typeof atlas;

const floors = ['floorOffice', 'floorWarehouse', 'floorKitchen'] as const;
const walls = ['wallOffice', 'wallWarehouse', 'wallKitchen'] as const;
const furniture: Partial<Record<string, Sprite>> = {
  d: 'bench',
  r: 'rack',
  e: 'extinguisher',
  p: 'bay',
  k: 'counter',
  w: 'window',
  s: 'notice',
  m: 'mat',
  '=': 'stripe',
  t: 'toolbox',
  f: 'fridge',
  v: 'stove',
};

export const SPRITE_URL = '/images/jogos/turno-seguro/sprites-v2.png';

function drawTile(context: CanvasRenderingContext2D, sheet: HTMLImageElement, sprite: Sprite, x: number, y: number) {
  const [sourceX, sourceY] = atlas[sprite];
  context.drawImage(sheet, sourceX, sourceY, TILE, TILE, x, y, TILE, TILE);
}

export function drawPortrait(canvas: HTMLCanvasElement, sheet: HTMLImageElement, sprite: Sprite): void {
  const context = canvas.getContext('2d');
  if (!context) return;
  context.clearRect(0, 0, TILE, TILE);
  drawTile(context, sheet, sprite, 0, 0);
}

function clamp(value: number, limit: number): number {
  return Math.min(Math.max(0, value), Math.max(0, limit));
}

export function drawMission(
  canvas: HTMLCanvasElement,
  sheet: HTMLImageElement,
  state: MissionState,
  playing: boolean,
): void {
  const context = canvas.getContext('2d');
  if (!context) return;
  context.imageSmoothingEnabled = false;

  const mission = roomFor(state);
  const left = clamp(state.player[0] - Math.floor(COLUMNS / 2), mission.map[0].length - COLUMNS);
  const top = clamp(state.player[1] - Math.floor(ROWS / 2), mission.map.length - ROWS);
  function stamp(sprite: Sprite, [column, row]: Cell, offsetY = 0) {
    drawTile(context!, sheet, sprite, (column - left) * TILE, (row - top) * TILE + offsetY);
  }
  for (let row = 0; row < ROWS; row++) {
    for (let column = 0; column < COLUMNS; column++) {
      const cell: Cell = [column + left, row + top];
      const tile = mission.map[cell[1]][cell[0]];
      stamp(tile === '#' || tile === 'w' ? walls[state.index] : floors[state.index], cell);
      const object = furniture[tile];
      if (object) stamp(object, cell);
    }
  }
  stamp('entry', [mission.start[0], mission.map.length - 1]);
  if (mission.mentor) stamp(mission.mentor.sprite, mission.mentor.at);
  if (mission.kit && !state.hasKit) stamp('kit', mission.kit);
  if (mission.exit) stamp(state.resolved.every(Boolean) ? 'exitOpen' : 'exitClosed', mission.exit);

  mission.tasks.forEach((task, index) => {
    if (state.index === 2 && task.destination && !state.resolved[index]) {
      context.globalAlpha = 0.45;
      stamp(task.sprite, task.destination);
      context.globalAlpha = 1;
    }
    const position = taskCell(state, index);
    if (!position) return;
    stamp(task.sprite, position);
    if (state.index === 0 && state.resolved[index]) stamp('flag', position);
  });

  const goals = goalCells(state);
  const visible = goals.filter(([x, y]) => x >= left && x < left + COLUMNS && y >= top && y < top + ROWS);
  if (playing) {
    for (const [x, y] of visible) {
      drawMarker(context, (x - left) * TILE + 13, (y - top) * TILE + 3);
    }
    if (!visible.length && goals.length) {
      const [x, y] = goals.reduce((near, cell) => distance(cell, state.player) < distance(near, state.player) ? cell : near);
      drawMarker(context,
        5 + clamp((x - left) * TILE + 3, canvas.width - 10),
        5 + clamp((y - top) * TILE + 3, canvas.height - 10),
      );
    }
  }

  const action = playing ? actionCell(state) : undefined;
  if (action) {
    const [column, row] = action;
    const x = (column - left) * TILE;
    const y = (row - top) * TILE;
    context.strokeStyle = '#1b3b2e';
    context.strokeRect(x + 0.5, y + 0.5, TILE - 1, TILE - 1);
    context.strokeStyle = '#fff5cb';
    context.strokeRect(x + 1.5, y + 1.5, TILE - 3, TILE - 3);
  }

  const outfit = state.index === 2 ? 'kitchen' : 'work';
  const frame = state.moving ? 1 + (state.tick % 2) : 0;
  stamp(`${outfit}-${state.facing}-${frame}` as Sprite, state.player);
  if (state.carrying !== null) stamp(mission.tasks[state.carrying].sprite, state.player, -8);
}

function distance(a: Cell, b: Cell): number {
  return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);
}

function drawMarker(context: CanvasRenderingContext2D, x: number, y: number): void {
  context.fillStyle = '#443722';
  context.fillRect(x - 2, y - 3, 5, 7);
  context.fillRect(x - 3, y - 2, 7, 5);
  context.fillStyle = '#ffe691';
  context.fillRect(x - 1, y - 2, 3, 5);
  context.fillRect(x - 2, y - 1, 5, 3);
}
