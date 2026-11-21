import { ZONES, type ZoneId } from './cases';

export type AreaId = 'hub' | ZoneId;
export type Point = Readonly<{ x: number; y: number }>;
export type Move = 'n' | 's' | 'w' | 'e';
export const DELTAS: Record<Move, Point> = {
  n: { x: 0, y: -1 }, s: { x: 0, y: 1 }, w: { x: -1, y: 0 }, e: { x: 1, y: 0 },
};
export const MOVES: Move[] = ['n', 's', 'w', 'e'];

export type Prop = { kind: 'desk' | 'sofa' | 'plant' | 'machine' | 'pallet' | 'counter' |
  'tables' | 'shelf' | 'tank' | 'tile' | 'fountain' | 'garden'; x: number; y: number; w: number; h: number };
type Building = { zone: ZoneId; x: number; y: number; w: number; h: number; door: Point };
export type Entity = { id: string; at: Point; name: string } & (
  { kind: 'door'; zone: ZoneId } |
  { kind: 'evidence'; index: 0 | 1 } |
  { kind: 'mentor' | 'risk' | 'extra' | 'exit' | 'intro' | 'inspector' }
);

export type Area = {
  id: AreaId; name: string; width: number; height: number;
  spawn: Point; objects: readonly Entity[]; props: readonly Prop[];
  buildings?: readonly Building[];
  blocked: ReadonlySet<number>;
};

const point = (x: number, y: number): Point => ({ x, y });
const prop = (kind: Prop['kind'], x: number, y: number, w = 2, h = 2): Prop => ({ kind, x, y, w, h });
const building = (zone: ZoneId, x: number, y: number, w: number, h: number): Building => (
  { zone, x, y, w, h, door: point(x + Math.floor(w / 2), y + h - 1) }
);

export const BUILDINGS = [
  building('office', 3, 2, 8, 5),
  building('kitchen', 14, 2, 9, 5),
  building('factory', 27, 2, 8, 5),
  building('hotel', 4, 17, 10, 5),
  building('warehouse', 25, 17, 10, 5),
];

function area(input: Omit<Area, 'blocked'>): Area {
  const blocked = new Set<number>();
  const obstructions = [...(input.buildings || []), ...input.props.filter(p => p.kind !== 'tile')];
  for (const { x, y, w, h } of obstructions) {
    for (let row = y; row < y + h; row++) {
      for (let column = x; column < x + w; column++) blocked.add(row * input.width + column);
    }
  }
  for (const { at } of input.objects) blocked.add(at.y * input.width + at.x);
  return { ...input, blocked };
}

function room(
  id: ZoneId, width: number, height: number,
  places: { mentor: Point; clues: readonly [Point, Point]; risk: Point; extra: Point },
  props: Prop[],
): Area {
  const { mentor, clues, risk, extra } = places;
  const zone = ZONES[id];
  const middle = Math.floor(width / 2);
  return area({
    id, name: zone.name, width, height, spawn: point(middle, height - 3), props,
    objects: [
      { id: 'mentor', kind: 'mentor', at: mentor, name: zone.mentor.split(' · ')[0] },
      { id: 'clue-1', kind: 'evidence', at: clues[0], name: 'Folheto na parede', index: 0 },
      { id: 'clue-2', kind: 'evidence', at: clues[1], name: zone.evidence[1].label, index: 1 },
      { id: 'risk', kind: 'risk', at: risk, name: zone.risk },
      { id: 'extra', kind: 'extra', at: extra, name: zone.extra.label },
      { id: 'exit', kind: 'exit', at: point(middle, height - 1), name: 'Bairro' },
    ],
  });
}

export const AREAS: Record<AreaId, Area> = {
  hub: area({
    id: 'hub', name: 'Bairro Sigma', width: 38, height: 25, spawn: point(18, 15),
    buildings: BUILDINGS,
    objects: [
      { id: 'helena', kind: 'intro', at: point(18, 14), name: 'Helena' },
      { id: 'ines', kind: 'inspector', at: point(23, 15), name: 'Inês' },
      ...BUILDINGS.map<Entity>(({ zone, door }) => ({ id: zone, kind: 'door', zone, at: door, name: ZONES[zone].name })),
    ],
    props: [
      prop('fountain', 16, 10, 5, 3), prop('garden', 9, 11, 4, 2), prop('garden', 26, 10, 4, 2),
      prop('garden', 16, 18, 5, 3), prop('plant', 3, 11), prop('plant', 33, 12),
      prop('plant', 2, 17), prop('plant', 34, 8), prop('plant', 23, 19),
      prop('plant', 13, 21), prop('plant', 1, 3), prop('plant', 35, 19),
    ],
  }),
  office: room('office', 25, 17, {
    mentor: point(10, 12), clues: [point(5, 5), point(19, 9)], risk: point(13, 4), extra: point(20, 13),
  }, [
    prop('desk', 3, 3, 5, 2), prop('desk', 8, 7, 4, 2), prop('desk', 16, 6, 6, 2),
    prop('desk', 3, 10, 4, 2), prop('sofa', 17, 11, 3, 1), prop('shelf', 19, 2, 4, 2),
    prop('plant', 2, 13, 1, 2), prop('plant', 22, 13, 1, 2),
  ]),
  factory: room('factory', 29, 18, {
    mentor: point(11, 13), clues: [point(7, 10), point(23, 6)], risk: point(14, 5), extra: point(23, 12),
  }, [
    prop('machine', 10, 2, 7, 2), prop('machine', 19, 3, 6, 3), prop('pallet', 4, 5, 4, 3),
    prop('pallet', 8, 5, 2, 3), prop('shelf', 4, 12, 4, 2), prop('pallet', 22, 13, 4, 2),
    prop('tile', 5, 9, 20, 1), prop('tile', 13, 7, 2, 9),
  ]),
  kitchen: room('kitchen', 26, 18, {
    mentor: point(10, 13), clues: [point(5, 5), point(20, 10)], risk: point(13, 4), extra: point(20, 5),
  }, [
    prop('shelf', 3, 2, 6, 2), prop('counter', 12, 2, 10, 2), prop('counter', 16, 7, 7, 2),
    prop('tables', 5, 9, 5, 2), prop('tables', 11, 6, 3, 3), prop('pallet', 3, 13, 4, 2),
    prop('counter', 20, 13, 3, 2),
  ]),
  hotel: room('hotel', 30, 18, {
    mentor: point(12, 13), clues: [point(7, 7), point(23, 10)], risk: point(22, 4), extra: point(4, 13),
  }, [
    prop('sofa', 4, 3, 5, 2), prop('desk', 9, 5, 5, 2), prop('plant', 3, 6, 1, 2),
    prop('tables', 5, 10, 3, 2), prop('desk', 19, 12, 6, 2), prop('tank', 22, 2, 5, 2),
    prop('shelf', 24, 6, 3, 3), prop('plant', 16, 3, 2, 2), prop('sofa', 19, 7, 3, 2),
  ]),
  warehouse: room('warehouse', 29, 18, {
    mentor: point(11, 13), clues: [point(5, 8), point(22, 4)], risk: point(14, 5), extra: point(24, 12),
  }, [
    prop('shelf', 3, 3, 6, 2), prop('shelf', 19, 2, 6, 2), prop('shelf', 19, 6, 6, 2),
    prop('pallet', 4, 10, 4, 3), prop('pallet', 21, 12, 2, 2), prop('pallet', 24, 7, 2, 3),
    prop('machine', 13, 2, 3, 2), prop('tile', 13, 8, 3, 8),
  ]),
};

export const areaOf = (id: AreaId) => AREAS[id];
export const distance = (a: Point, b: Point) => Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
export const add = (a: Point, b: Point): Point => ({ x: a.x + b.x, y: a.y + b.y });

export function walkable(map: Area, { x, y }: Point): boolean {
  return x >= 1 && y >= (map.id === 'hub' ? 1 : 2) && x < map.width - 1 && y < map.height - 1 &&
    !map.blocked.has(y * map.width + x);
}

export function entityInReach(map: Area, position: Point, facing: Move) {
  const adjacent = map.objects.filter(o => distance(o.at, position) === 1);
  const forward = add(position, DELTAS[facing]);
  return adjacent.find(o => distance(o.at, forward) === 0) ?? adjacent[0];
}

// The touch controls and keyboard use the same collision map as the replay.
export function findPath(map: Area, from: Point, to: Point, interaction?: Entity, facing: Move = 's'): Move[] | null {
  if (!interaction && !walkable(map, to)) return null;
  const queue: { at: Point; from: number; move: Move }[] = [{ at: from, from: -1, move: facing }];
  const visited = new Set([from.y * map.width + from.x]);
  for (let i = 0; i < queue.length; i++) {
    const step = queue[i];
    const target = interaction
      ? entityInReach(map, step.at, step.move)?.id === interaction.id
      : distance(step.at, to) === 0;
    if (target) {
      const moves: Move[] = [];
      for (let cursor = i; queue[cursor].from !== -1; cursor = queue[cursor].from) moves.push(queue[cursor].move);
      return moves.reverse();
    }
    for (const move of MOVES) {
      const at = add(step.at, DELTAS[move]);
      const key = at.y * map.width + at.x;
      if (visited.has(key) || !walkable(map, at)) continue;
      queue.push({ at, from: i, move });
      visited.add(key);
    }
  }
  return null;
}
