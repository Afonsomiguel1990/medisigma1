import atlas from './sprite-map.json';
import { actionLabel, COLUMNS, facingCell, MISSIONS, ROWS, taskCell, TILE, type Cell, type MissionState } from './game';

type Sprite = keyof typeof atlas;

const floors = ['floorOffice', 'floorWarehouse', 'floorKitchen'] as const;
const walls = ['wallOffice', 'wallWarehouse', 'wallKitchen'] as const;
const furniture: Partial<Record<string, Sprite>> = {
  d: 'bench',
  r: 'rack',
  e: 'extinguisher',
  p: 'bay',
  k: 'counter',
};

export const SPRITE_URL = '/images/jogos/turno-seguro/sprites.png';

export function drawMission(
  canvas: HTMLCanvasElement,
  sheet: HTMLImageElement,
  state: MissionState,
  playing: boolean,
): void {
  const context = canvas.getContext('2d');
  if (!context) return;
  context.imageSmoothingEnabled = false;

  function stamp(sprite: Sprite, [column, row]: Cell, offsetY = 0) {
    const [x, y] = atlas[sprite];
    context!.drawImage(sheet, x, y, TILE, TILE, column * TILE, row * TILE + offsetY, TILE, TILE);
  }

  const mission = MISSIONS[state.index];
  for (let row = 0; row < ROWS; row++) {
    for (let column = 0; column < COLUMNS; column++) {
      const cell: Cell = [column, row];
      const tile = mission.map[row][column];
      stamp(tile === '#' ? walls[state.index] : floors[state.index], cell);
      const object = furniture[tile];
      if (object) stamp(object, cell);
    }
  }
  stamp('entry', [mission.start[0], ROWS - 1]);

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

  if (playing && actionLabel(state)) {
    const [column, row] = facingCell(state);
    const x = column * TILE;
    const y = row * TILE;
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
