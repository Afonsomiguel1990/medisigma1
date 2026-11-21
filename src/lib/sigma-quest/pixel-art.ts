import { ZONES, type ZoneId } from './cases';
import { canDoExtra, type Quest } from './game';
import { AREAS, type Area, type AreaId, type Entity, type Move, type Point, type Prop } from './world';

export const TILE = 16;
type Paint = CanvasRenderingContext2D;
type ColourPoint = readonly [number, number];
type Palette = { floor: string; alternate: string; seam: string; wall: string; top: string; trim: string };
const ink = '#263c36';
const dark = '#42594a';
const paper = '#f7ecc3';
const white = '#fdf5d5';
const gold = '#efbd71';
const peach = '#dd8759';
const clay = '#ad624e';
const foliage = '#709459';
const leaf = '#a5bb73';
const grass = '#b7cc82';
const water = '#7caeb0';

const palettes: Record<AreaId, Palette> = {
  hub: { floor: grass, alternate: '#bcd187', seam: '#98b06c', wall: dark, top: leaf, trim: '#d9dea3' },
  office: { floor: '#cfb68b', alternate: '#d6bd91', seam: '#b39a76', wall: '#875f53', top: '#c18d73', trim: gold },
  factory: { floor: '#97ada2', alternate: '#9fb5a9', seam: '#7c978b', wall: '#526b69', top: '#82a39b', trim: '#d7cb89' },
  kitchen: { floor: '#e3c9a2', alternate: '#c99f8c', seam: '#b5977e', wall: '#875f59', top: '#be9386', trim: '#efd8ab' },
  hotel: { floor: '#b7beae', alternate: '#c5cbbb', seam: '#9ea89b', wall: '#6b7979', top: '#95aaa5', trim: '#dfcd9b' },
  warehouse: { floor: '#b3bb8a', alternate: '#bac491', seam: '#929e73', wall: '#506951', top: '#8c9a6a', trim: '#dbd099' },
};

function fill(g: Paint, x: number, y: number, w: number, h: number, colour: string) {
  g.fillStyle = colour;
  g.fillRect(Math.round(x), Math.round(y), w, h);
}
function frame(g: Paint, x: number, y: number, w: number, h: number, colour: string, edge = ink) {
  fill(g, x, y, w, h, edge);
  fill(g, x + 1, y + 1, w - 2, h - 2, colour);
}
function oval(g: Paint, x: number, y: number, w: number, h: number, colour: string) {
  for (let line = 0; line < h; line++) {
    const half = w / 2 * Math.sqrt(Math.max(0, 1 - Math.pow((line + .5 - h / 2) / (h / 2), 2)));
    const left = Math.round(w / 2 - half), right = Math.round(w / 2 + half);
    fill(g, x + left, y + line, right - left, 1, colour);
  }
}
function polygon(g: Paint, points: readonly ColourPoint[], colour: string) {
  const rows = points.map(([, y]) => y);
  for (let row = Math.floor(Math.min(...rows)); row < Math.max(...rows); row++) {
    const cuts: number[] = [];
    const scan = row + .5;
    for (let i = 0, j = points.length - 1; i < points.length; j = i++) {
      const [ax, ay] = points[j], [bx, by] = points[i];
      if ((ay > scan) !== (by > scan)) cuts.push(ax + (scan - ay) * (bx - ax) / (by - ay));
    }
    cuts.sort((a, b) => a - b);
    for (let i = 0; i + 1 < cuts.length; i += 2) {
      const left = Math.ceil(cuts[i] - .5), right = Math.ceil(cuts[i + 1] - .5);
      fill(g, left, row, right - left, 1, colour);
    }
  }
}

const font: Record<string, string> = {
  A:'0E11111F111111', B:'1E11111E11111E', C:'0F10101010100F', D:'1E11111111111E',
  E:'1F10101E10101F', F:'1F10101E101010', G:'0F10101711110F', H:'1111111F111111',
  I:'1F04040404041F', J:'0702020212120C', K:'11121418141211', L:'1010101010101F',
  M:'111B1515111111', N:'11191915131311', O:'0E11111111110E', P:'1E11111E101010',
  Q:'0E11111115120D', R:'1E11111E141211', S:'0F10100E01011E', T:'1F040404040404',
  U:'1111111111110E', V:'11111111110A04', W:'11111115151B11', X:'11110A040A1111',
  Y:'11110A04040404', Z:'1F01020408101F',
  '1':'040C040404040E', '2':'0E11010204081F', '3':'1E01010601011E', '4':'02060A121F0202', '5':'1F10101E01011E',
  '?':'0E110204040004', '!':'04040404040004', '+':'0004041F040400', '✓':'00010214080400', ' ':'00000000000000',
};
function textPixels(g: Paint, value: string, x: number, y: number, colour: string, scale = 1) {
  for (const char of value.toUpperCase()) {
    const letters = font[char.normalize('NFD')[0]] ?? font[' '];
    if ('ÁÉÍÓÚ'.includes(char)) {
      fill(g, x + 3 * scale, y - 2 * scale, 2 * scale, scale, colour);
      fill(g, x + 2 * scale, y - scale, 2 * scale, scale, colour);
    }
    for (let line = 0; line < 7; line++) {
      const bits = Number.parseInt(letters.slice(line * 2, line * 2 + 2), 16);
      for (let col = 0; col < 5; col++) {
        if (bits & (16 >> col)) fill(g, x + col * scale, y + line * scale, scale, scale, colour);
      }
    }
    x += (char === ' ' ? 4 : 6) * scale;
  }
}
export function drawWordmark(canvas: HTMLCanvasElement) {
  const g = canvas.getContext('2d');
  if (!g) return;
  g.clearRect(0, 0, canvas.width, canvas.height);
  textPixels(g, 'SIGMA QUEST', 2, 2, '#a9b78e', 2);
  textPixels(g, 'SIGMA', 0, 0, ink, 2);
  textPixels(g, 'QUEST', 68, 0, '#567b52', 2);
}

function tree(g: Paint, x: number, y: number) {
  oval(g, x - 11, y + 1, 24, 7, '#9fb56f');
  frame(g, x - 2, y - 11, 5, 16, clay, dark);
  oval(g, x - 13, y - 24, 26, 24, dark);
  oval(g, x - 11, y - 25, 24, 20, foliage);
  oval(g, x - 9, y - 25, 18, 14, leaf);
  fill(g, x - 3, y - 22, 5, 2, '#cfda8d');
  fill(g, x - 8, y - 16, 4, 2, '#b3c383');
  fill(g, x + 6, y - 10, 3, 2, '#495e43');
}

function plank(g: Paint, x: number, y: number, w: number, h: number, colour = '#bc8e70') {
  fill(g, x + 2, y + 6, w, h - 3, '#64574d55');
  frame(g, x, y + 3, w, h, colour);
  frame(g, x, y, w, h - 4, colour);
  fill(g, x + 2, y + 1, w - 4, 2, '#ffffff36');
  fill(g, x + 3, y + h - 3, w - 6, 2, '#49372a4d');
}
function boxCrate(g: Paint, x: number, y: number, w: number, h: number) {
  plank(g, x, y, w, h, '#ad925e');
  fill(g, x + 2, y + 3, 2, h - 4, '#c7ae73');
  fill(g, x + w - 4, y + 3, 2, h - 4, '#806f45');
  for (let i = 4; i < w - 4; i++) fill(g, x + i, y + Math.floor(2 + i / w * (h - 6)), 1, 2, '#d0b680');
}

function furniture(g: Paint, prop: Prop, palette: Palette) {
  const x = prop.x * TILE + 1, y = prop.y * TILE + 1, w = prop.w * TILE - 2, h = prop.h * TILE - 3;
  if (prop.kind === 'tile') {
    fill(g, x, y, w, h, '#c2b985');
    if (w > h) {
      for (let dx = 4; dx < w - 4; dx += 10) fill(g, x + dx, y + 4, 6, 2, '#efdeb1');
    } else {
      for (let dy = 4; dy < h - 4; dy += 10) fill(g, x + Math.floor(w / 2), y + dy, 2, 6, '#efdeb1');
    }
    return;
  }
  switch (prop.kind) {
    case 'desk':
      plank(g, x, y, w, h - 3);
      for (let dx = 8; dx < w - 14; dx += 22) {
        frame(g, x + dx, y + 4, 12, 9, '#a9bdaf');
        fill(g, x + dx + 5, y + 13, 3, 2, ink);
        fill(g, x + dx + 3, y + 17, 10, 3, paper);
      }
      break;
    case 'sofa':
      frame(g, x, y, w, h, '#b8816b');
      frame(g, x + 3, y + 1, w - 6, Math.max(4, Math.floor(h / 2)), '#d19b7f');
      fill(g, x + 4, y + h - 5, w - 8, 4, '#815d54');
      for (let dx = 18; dx < w - 6; dx += 18) fill(g, x + dx, y + 2, 1, h - 6, clay);
      break;
    case 'plant':
      tree(g, x + Math.floor(w / 2), y + Math.floor(h * .85));
      if (w < 20) frame(g, x + 4, y + h - 8, 8, 9, clay);
      break;
    case 'machine':
    case 'counter':
    case 'tank': {
      const machine = prop.kind === 'machine';
      const tank = prop.kind === 'tank';
      plank(g, x, y, w, h - 3, tank ? '#6b8f8d' : machine ? '#6d8381' : '#adad97');
      for (let dx = 4; dx < w - 19; dx += 19) {
        frame(g, x + dx, y + 4, 16, Math.max(10, h - 13), tank ? water : '#cad5be');
        if (machine) {
          fill(g, x + dx + 2, y + 6, 11, 5, dark);
          fill(g, x + dx + 3, y + 7, 4, 2, leaf);
        } else if (!tank) {
          frame(g, x + dx + 3, y + 7, 9, 5, '#7f9a95');
        }
        fill(g, x + dx + 11, y + h - 9, 3, 2, machine ? peach : palette.wall);
      }
      break;
    }
    case 'tables':
      plank(g, x, y + 4, w, h - 9, '#bca783');
      for (let dx = 7; dx < w - 9; dx += 18) {
        oval(g, x + dx, y + 7, 8, 6, '#f3e3b6');
        frame(g, x + dx + 1, y + h - 4, 7, 4, '#986b5c');
      }
      break;
    case 'shelf':
      frame(g, x, y, w, h, '#5d7460');
      for (let row = 0; row < 2; row++) {
        for (let dx = 4; dx < w - 13; dx += 14) {
          frame(g, x + dx, y + 3 + row * 11, 12, 8, dx % 3 ? '#a99b6e' : '#9eac7a');
          fill(g, x + dx + 4, y + 5 + row * 11, 3, 2, paper);
        }
        fill(g, x + 2, y + 10 + row * 11, w - 4, 2, '#c3cb98');
      }
      break;
    case 'pallet':
      for (let dx = 1; dx < w - 10; dx += 9) fill(g, x + dx, y + h - 4, 6, 6, dark);
      for (let dx = 1; dx < w - 11; dx += 14) {
        boxCrate(g, x + dx, y + 4, 13, Math.max(10, h - 9 - (dx % 3) * 2));
      }
      break;
    case 'garden':
      frame(g, x, y + 2, w, h - 2, '#9bae69', '#78935f');
      for (let dx = 4; dx < w - 6; dx += 13) {
        oval(g, x + dx, y + (dx % 3) * 3 + 4, 11, 9, foliage);
        fill(g, x + dx + 4, y + (dx % 3) * 3 + 6, 3, 3, dx % 2 ? gold : '#dc8d69');
      }
      break;
    case 'fountain':
      oval(g, x, y + 3, w, h - 2, '#91a96d');
      oval(g, x + 3, y + 1, w - 6, h - 2, dark);
      oval(g, x + 6, y + 3, w - 12, h - 8, '#e2d8aa');
      oval(g, x + 10, y + 6, w - 20, h - 13, '#5c8e93');
      oval(g, x + 13, y + 8, w - 26, h - 17, water);
      oval(g, x + 31, y + 13, 16, 10, '#d7d5ac');
      fill(g, x + 36, y + 8, 6, 10, '#e9e0c0');
      break;
  }
}

function building(g: Paint, item: NonNullable<Area['buildings']>[number]) {
  const { x, y, w, h } = { x: item.x * TILE, y: item.y * TILE, w: item.w * TILE, h: item.h * TILE };
  const zone = ZONES[item.zone], colour = zone.colour;
  const dx = item.door.x * TILE;
  fill(g, x + 5, y + 11, w, h - 6, '#4f714d4c');
  frame(g, x + 4, y + 13, w - 8, h - 14, '#e0d6a7');
  fill(g, x + 5, y + h - 9, w - 10, 7, '#aeac83');
  polygon(g, [[x, y + 22], [x + 11, y], [x + w - 11, y], [x + w, y + 22]], ink);
  polygon(g, [[x + 2, y + 20], [x + 12, y + 2], [x + w - 12, y + 2], [x + w - 2, y + 20]], colour);
  for (let row = 5; row <= 19; row += 5) {
    const indent = 12 - Math.floor(row / 2);
    fill(g, x + indent, y + row, w - indent * 2, 1, '#4b3b332b');
    for (let col = 15 + row % 3 * 5; col < w - 13; col += 14) fill(g, x + col, y + row + 1, 1, 3, '#4b3b332b');
  }
  frame(g, x + 11, y + 27, w - 22, 14, ink, '#695e4d');
  textPixels(g, zone.name, x + Math.round((w - zone.name.length * 6) / 2), y + 31, paper);
  for (let wx = x + 11; wx < x + w - 23; wx += 23) {
    if (Math.abs(wx + 8 - dx - 8) < 21) continue;
    frame(g, wx, y + 47, 16, 15, '#8cae9d');
    fill(g, wx + 2, y + 49, 9, 3, '#b5cec0');
    fill(g, wx + 7, y + 48, 1, 13, ink);
    fill(g, wx + 1, y + 54, 14, 1, ink);
    fill(g, wx - 1, y + 61, 18, 2, '#927b59');
  }
  frame(g, dx - 2, y + h - 29, 20, 29, dark);
  frame(g, dx, y + h - 26, 16, 25, '#657c60');
  fill(g, dx + 2, y + h - 23, 12, 8, '#b7cead');
  fill(g, dx + 12, y + h - 11, 2, 3, gold);
  fill(g, dx - 3, y + h, 22, 4, '#a6a77b');
}

function hubGround(g: Paint, area: Area) {
  fill(g, 0, 0, area.width * TILE, area.height * TILE, grass);
  for (let y = 0; y < area.height; y++) {
    for (let x = 0; x < area.width; x++) {
      if ((x * 17 + y * 31) % 5 < 2) {
        fill(g, x * TILE + (y % 4) * 3, y * TILE + 8, 5, 1, '#a7bd75');
        fill(g, x * TILE + (y % 4) * 3 + 2, y * TILE + 6, 1, 3, '#a7bd75');
      }
      if ((x * 13 + y * 19) % 29 === 0) fill(g, x * TILE + 9, y * TILE + 12, 2, 2, paper);
    }
  }
  const pave = (x: number, y: number, w: number, h: number) => {
    fill(g, x * TILE, y * TILE, w * TILE, h * TILE, '#d7cb9b');
    for (let row = 0; row < h; row++) {
      fill(g, x * TILE, (y + row) * TILE + 15, w * TILE, 1, '#baac88');
      for (let col = 0; col < w; col++) {
        if (col > 0) fill(g, (x + col) * TILE, (y + row) * TILE, 1, TILE, '#bdaf87');
        if ((row + col) % 4 === 0) fill(g, (x + col) * TILE + 4, (y + row) * TILE + 5, 8, 1, '#e4d8ae');
      }
    }
  };
  pave(2, 7, 34, 2);
  pave(5, 22, 30, 2);
  pave(6, 9, 2, 13); pave(18, 8, 2, 16); pave(30, 8, 2, 16);
  pave(13, 9, 11, 8);
  fill(g, 16, 13 * TILE, 36 * TILE, 2, '#e7daa5');
  fill(g, 16, 16 * TILE, 36 * TILE, 1, '#a7ab84');
  for (let x = 2; x < area.width - 2; x += 2) {
    fill(g, x * TILE, 14 * TILE + 7, TILE, 2, '#f2e4b9');
  }
  for (const prop of area.props) furniture(g, prop, palettes.hub);
  for (const item of area.buildings ?? []) building(g, item);
  for (let x = 0; x < area.width; x += 3) {
    tree(g, 7 + x * TILE, 15);
    tree(g, 6 + x * TILE, area.height * TILE + 3);
  }
}

function indoorGround(g: Paint, area: Area) {
  const p = palettes[area.id], w = area.width * TILE, h = area.height * TILE;
  fill(g, 0, 0, w, h, p.floor);
  for (let y = 1; y < area.height; y++) {
    for (let x = 0; x < area.width; x++) {
      const px = x * TILE, py = y * TILE;
      const alternate = area.id === 'kitchen' ? (x + y) % 2 : (x * 13 + y * 7) % 5 === 0;
      if (alternate) fill(g, px, py, TILE, TILE, p.alternate);
      fill(g, px, py + TILE - 1, TILE, 1, p.seam);
      if (area.id !== 'office' || (x + y) % 2 === 0) fill(g, px + TILE - 1, py, 1, TILE, p.seam);
      if ((x * 5 + y * 7) % 7 === 0) fill(g, px + 5, py + 4, 4, 1, '#ffffff38');
    }
  }
  const north = p.wall;
  fill(g, 0, 0, w, 31, north);
  fill(g, 0, 2, w, 20, p.top);
  for (let x = 12; x < w; x += 45) {
    fill(g, x, 3, 3, 20, p.wall);
    fill(g, x + 3, 13, 40, 1, '#25342b44');
    frame(g, x + 10, 5, 25, 12, p.floor);
    fill(g, x + 12, 7, 21, 3, '#ffffff50');
  }
  fill(g, 0, 23, w, 3, p.trim);
  fill(g, 0, 29, w, 2, ink);
  fill(g, 0, 32, TILE, h - 32, p.wall);
  fill(g, w - TILE, 32, TILE, h - 32, p.wall);
  fill(g, 3, 32, 1, h - 32, p.trim);
  fill(g, w - 4, 32, 1, h - 32, p.trim);
  fill(g, 0, h - 12, w, 12, p.wall);
  fill(g, 0, h - 13, w, 2, p.trim);
  const exit = Math.floor(area.width / 2) * TILE;
  fill(g, exit, h - 16, TILE, 16, '#cbd19a');
  for (let x = 1; x < TILE; x += 4) fill(g, exit + x, h - 11, 2, 10, '#7e986b');
  for (const prop of area.props) furniture(g, prop, p);
}

const areaArt = new Map<AreaId, HTMLCanvasElement>();
function layerFor(area: Area) {
  const cached = areaArt.get(area.id);
  if (cached) return cached;
  const layer = document.createElement('canvas');
  layer.width = area.width * TILE; layer.height = area.height * TILE;
  const g = layer.getContext('2d');
  if (g) {
    if (area.id === 'hub') hubGround(g, area);
    else indoorGround(g, area);
  }
  areaArt.set(area.id, layer);
  return layer;
}

type Person = 'trainee' | 'mentor' | 'inspector';
function person(g: Paint, x: number, y: number, role: Person, dir: Move, step = false) {
  const coat = role === 'trainee' ? peach : role === 'inspector' ? '#7b9eac' : paper;
  const hair = role === 'mentor' ? clay : ink;
  g.save();
  g.translate(x, y);
  oval(g, -7, 3, 15, 5, '#50634b7a');
  fill(g, -4, 4, 3, step ? 4 : 3, ink);
  fill(g, 2, 4, 3, step ? 3 : 4, ink);
  polygon(g, [[-5,-4],[4,-4],[7,-1],[6,5],[-6,5],[-7,-1]], ink);
  fill(g, -5, -3, 10, 7, coat);
  fill(g, -7, 0, 2, 3, gold); fill(g, 5, 0, 2, 3, gold);
  if (role === 'trainee') {
    fill(g, -5, 0, 10, 1, paper);
    fill(g, 0, -3, 2, 7, dark);
    frame(g, 1, 2, 6, 4, '#929e6b');
  } else {
    fill(g, -1, -3, 2, 7, dark);
    fill(g, 3, 0, 2, 2, gold);
  }
  polygon(g, [[-5,-10],[-3,-12],[3,-12],[5,-10],[5,-5],[3,-3],[-3,-3],[-5,-5]], ink);
  fill(g, -4, -9, 8, 5, gold);
  fill(g, -3, -11, 7, 3, hair);
  fill(g, -5, -9, 2, 4, hair);
  if (role === 'mentor') { frame(g, 2, -13, 4, 4, clay); }
  if (dir === 'n') fill(g, -4, -9, 8, 5, hair);
  if (dir === 's' || dir === 'w') fill(g, -3, -7, 1, 2, ink);
  if (dir === 's' || dir === 'e') fill(g, 2, -7, 1, 2, ink);
  g.restore();
}

function riskSprite(g: Paint, zone: ZoneId, settled = false) {
  switch (zone) {
    case 'warehouse':
      polygon(g, [[4,27],[1,20],[5,12],[7,16],[10,11],[9,6],[14,10],[18,0],[23,8],[24,15],[29,10],[32,17],[32,25],[26,31],[10,31]], ink);
      polygon(g, [[4,23],[4,17],[7,21],[13,12],[15,13],[18,4],[22,10],[20,19],[25,17],[28,14],[29,19],[28,25],[24,29],[10,29]], peach);
      polygon(g, [[6,24],[8,20],[10,23],[14,19],[17,12],[19,17],[19,23],[25,19],[25,24],[22,29],[11,28]], gold);
      polygon(g, [[11,27],[15,24],[17,21],[19,25],[23,23],[21,28],[13,29]], paper);
      fill(g, 10, 19, 5, 1, ink); fill(g, 12, 20, 2, 3, ink);
      fill(g, 20, 19, 4, 1, ink); fill(g, 20, 20, 2, 3, ink);
      fill(g, 17, 26, 3, 1, ink);
      break;
    case 'office':
      polygon(g, [[3,26],[0,21],[7,23],[10,18],[10,10],[13,6],[23,6],[27,9],[27,14],[31,16],[31,21],[25,22],[25,28],[22,31],[18,31],[17,28],[14,31],[9,31],[9,27]], ink);
      polygon(g, [[5,25],[10,22],[12,12],[15,8],[23,8],[25,11],[24,15],[29,18],[29,20],[22,20],[23,26],[20,29],[17,25],[14,25],[12,29],[10,29],[12,25]], '#82a46d');
      for (const [x,y] of (settled ? [[3,14]] : [[3,14],[5,10],[7,6],[9,2]])) {
        frame(g, x, y, 8, 6, y % 3 ? paper : gold);
        fill(g, x + 2, y + 2, 4, 1, clay);
      }
      fill(g, 20, 11, 4, 1, ink); fill(g, 22, 12, 2, 2, ink);
      fill(g, 21, 23, 2, 5, gold);
      break;
    case 'factory':
      for (const [x,y,w,h] of [[11,0,10,8],[3,5,9,8],[0,15,8,8],[5,24,8,6],[13,24,8,8],[23,22,7,7],[25,12,7,8],[22,4,8,8]]) frame(g, x, y, w, h, '#7b9290');
      oval(g, 3, 3, 27, 27, ink); oval(g, 5, 5, 23, 23, '#a4b9ad');
      oval(g, 9, 8, 16, 17, dark); oval(g, 11, 10, 12, 13, '#c7d0af');
      fill(g, 14, 12, 8, 6, ink);
      fill(g, 14, 14, 2, 2, gold); fill(g, 19, 14, 2, 2, gold);
      fill(g, 15, 20, 5, 2, clay);
      break;
    case 'kitchen':
      for (let i = 0; i < 3; i++) {
        fill(g, 1 + i % 2, 14 + i * 5, 8, 2, ink);
        fill(g, 23, 13 + i * 5, 8, 2, ink);
      }
      fill(g, 7, 4, 3, 2, ink); fill(g, 3, 2, 5, 2, ink);
      fill(g, 22, 3, 3, 5, ink); fill(g, 24, 2, 5, 2, ink);
      oval(g, 5, 8, 22, 23, ink); oval(g, 7, 11, 18, 18, clay);
      oval(g, 8, 13, 7, 14, peach); oval(g, 17, 13, 7, 14, '#c47b5b');
      oval(g, 8, 6, 16, 10, dark);
      fill(g, 10, 9, 4, 3, paper); fill(g, 19, 9, 3, 3, paper);
      break;
    case 'hotel':
      for (const [x,y] of [[3,8],[8,3],[21,2],[27,7],[27,21],[20,27],[7,26],[1,18]]) {
        frame(g, x, y, 4, 4, water);
      }
      oval(g, 5, 6, 23, 21, ink); oval(g, 7, 8, 19, 17, water);
      oval(g, 9, 10, 7, 4, '#b1c5a9');
      fill(g, 12, 16, 2, 3, ink); fill(g, 21, 15, 2, 3, ink);
      fill(g, 16, 21, 4, 1, dark);
      break;
  }
}
const sprites = new Map<string, HTMLCanvasElement>();
function sprite(g: Paint, zone: ZoneId, x: number, y: number, size: number, opacity = 1, settled = false) {
  const key = settled ? zone + '-settled' : zone;
  let raster = sprites.get(key);
  if (!raster) {
    raster = document.createElement('canvas');
    raster.width = 32; raster.height = 32;
    const ctx = raster.getContext('2d');
    if (ctx) riskSprite(ctx, zone, settled);
    sprites.set(key, raster);
  }
  g.save();
  g.imageSmoothingEnabled = false;
  g.globalAlpha = opacity;
  g.drawImage(raster, x, y, size, size);
  g.restore();
}
export function drawRiskIcon(canvas: HTMLCanvasElement, zone: ZoneId, done: boolean) {
  const g = canvas.getContext('2d');
  if (!g) return;
  g.clearRect(0, 0, canvas.width, canvas.height);
  oval(g, 6, 28, 26, 5, '#65765848');
  sprite(g, zone, 3, 0, 32, done ? 1 : .47);
}

function marker(g: Paint, x: number, y: number, label: string, colour: string, bounce = 0) {
  const py = y - bounce;
  polygon(g, [[x-6,py-10],[x+7,py-10],[x+7,py],[x+2,py],[x,py+3],[x-2,py],[x-6,py]], ink);
  fill(g, x - 5, py - 9, 11, 8, colour);
  textPixels(g, label, x - 2, py - 9, ink);
}

function entityArt(g: Paint, state: Quest, object: Entity, t: number) {
  const x = object.at.x * TILE + 8, y = object.at.y * TILE + 8;
  const bounce = Math.floor(t / 400) % 2;
  if (object.kind === 'door') {
    if (state.progress[object.zone].completed) marker(g, x, y - 13, '✓', '#d6e6a5');
    else marker(g, x, y - 13, '+', ZONES[object.zone].colour);
    return;
  }
  if (object.kind === 'exit') {
    marker(g, x, y - 8, 'V', '#d6e6a5');
    return;
  }
  if (object.kind === 'intro' || object.kind === 'inspector' || object.kind === 'mentor') {
    person(g, x, y, object.kind === 'inspector' ? 'inspector' : 'mentor', 's');
    const ready = object.kind === 'intro' ? !state.introduced :
      object.kind === 'inspector' ? Object.values(state.progress).every(p => p.completed) :
      state.area !== 'hub' && !state.progress[state.area].briefing;
    if (ready) marker(g, x, y - 17, '!', gold, bounce);
    return;
  }
  if (state.area === 'hub') return;
  const progress = state.progress[state.area];
  if (object.kind === 'risk') {
    oval(g, x - 10, y + 6, 20, 6, '#495e496f');
    if (state.area === 'office' && state.leftStressauro) sprite(g, 'office', x - 10, y - 14, 20, 1, true);
    else if (progress.completed) marker(g, x, y + 3, '✓', '#d6e6a5');
    else {
      sprite(g, state.area, x - 12, y - 16 - bounce, 24);
      marker(g, x, y - 20, '!', '#f0ae78');
    }
  } else if (object.kind === 'evidence') {
    const known = (progress.clues & 1 << object.index) !== 0;
    frame(g, x - 6, y - 7, 12, 16, known ? '#b4c38f' : paper);
    fill(g, x - 3, y - 8, 6, 3, clay);
    for (let line = 0; line < 3; line++) fill(g, x - 3, y - 2 + line * 3, 6, 1, dark);
    if (!known) marker(g, x, y - 12, '?', '#f9df9c', bounce);
  } else {
    frame(g, x - 7, y - 2, 14, 9, progress.extra ? '#b4c38f' : '#a9976f');
    if (canDoExtra(progress)) marker(g, x, y - 6, '+', gold, bounce);
    if (progress.extra) marker(g, x, y - 6, '✓', '#d6e6a5');
  }
}

export type Camera = { left: number; top: number; width: number; height: number };
export function cameraFor(area: Area, position: Point, narrow: boolean): Camera {
  const width = (narrow ? 16 : 26) * TILE, height = (narrow ? 10 : 14) * TILE;
  const left = Math.max(0, Math.min(area.width * TILE - width, position.x * TILE + 8 - width / 2));
  const top = Math.max(0, Math.min(area.height * TILE - height, position.y * TILE + 8 - height / 2));
  return { left: Math.round(left), top: Math.round(top), width, height };
}
function sceneCanvas(canvas: HTMLCanvasElement, width: number, height: number) {
  if (canvas.width !== width) canvas.width = width;
  if (canvas.height !== height) canvas.height = height;
  const g = canvas.getContext('2d');
  if (g) g.imageSmoothingEnabled = false;
  return g;
}

export function drawWorld(canvas: HTMLCanvasElement, state: Quest, t: number, camera: Camera, position: Point, moving: boolean) {
  const area = AREAS[state.area];
  const g = sceneCanvas(canvas, camera.width, camera.height);
  if (!g) return;
  fill(g, 0, 0, camera.width, camera.height, palettes[area.id].wall);
  g.save(); g.translate(-camera.left, -camera.top);
  g.drawImage(layerFor(area), 0, 0);
  if (area.id === 'hub') {
    for (let i = 0; i < 5; i++) {
      const wave = (i + Math.floor(t / 190)) % 5;
      fill(g, 276 + i * 8, 177 + wave * 3, 2 + wave, 1, '#ccded0');
    }
  }
  const drawPlayer = () => person(g, Math.round(position.x * TILE + 8), Math.round(position.y * TILE + 8), 'trainee', state.facing, moving && state.steps % 2 === 0);
  let playerDrawn = false;
  for (const object of [...area.objects].sort((a, b) => a.at.y - b.at.y)) {
    if (!playerDrawn && object.at.y > position.y) { drawPlayer(); playerDrawn = true; }
    entityArt(g, state, object, t);
  }
  if (!playerDrawn) drawPlayer();
  g.restore();
}

export function drawAtlas(canvas: HTMLCanvasElement, state: Quest) {
  const reference = AREAS.hub;
  const g = sceneCanvas(canvas, reference.width * 4, reference.height * 4);
  if (!g) return;
  g.drawImage(layerFor(reference), 0, 0, canvas.width, canvas.height);
  for (const item of reference.buildings ?? []) {
    const done = state.progress[item.zone].completed;
    frame(g, item.door.x * 4 - 2, item.door.y * 4 + 1, 7, 7, done ? '#eff8b6' : ZONES[item.zone].colour);
  }
  const room = reference.buildings?.find(item => item.zone === state.area);
  const position = state.area === 'hub' ? state.position : room?.door ?? reference.spawn;
  frame(g, position.x * 4, position.y * 4, 6, 6, peach, white);
}

export function drawEncounter(canvas: HTMLCanvasElement, state: Quest, t: number, narrow: boolean) {
  const scene = state.scene;
  if (scene.type !== 'choice' && scene.type !== 'reaction' && scene.type !== 'finish' && scene.type !== 'review') return;
  const width = narrow ? 256 : 416, height = narrow ? 160 : 224;
  const g = sceneCanvas(canvas, width, height);
  if (!g) return;
  const turn = scene.type === 'choice' || scene.type === 'reaction' ? scene.turn : null;
  const inspect = !turn || turn.challenge.round === 'inspection';
  const zone = turn?.challenge.zone ?? 'office';
  const p = palettes[inspect ? 'hub' : zone];
  const horizon = Math.round(height * .58);
  fill(g, 0, 0, width, height, p.alternate);
  fill(g, 0, 0, width, horizon, inspect ? '#d9dfab' : p.top);
  for (let x = 0; x < width; x += 32) {
    fill(g, x + 3, 0, 1, horizon - 7, '#28403523');
    for (let y = 5; y < horizon - 4; y += 12) fill(g, x, y, 32, 1, '#28403520');
  }
  for (let x = 8; x < width - 20; x += 39) {
    frame(g, x, 11, 25, 23, inspect ? '#a8c193' : p.floor, p.wall);
    fill(g, x + 2, 14, 16, 5, '#ffffff58');
    fill(g, x + 13, 12, 1, 21, p.wall);
  }
  fill(g, 0, horizon - 5, width, 3, p.trim);
  fill(g, 0, horizon - 2, width, 2, p.wall);
  for (let y = horizon + 6; y < height; y += 15) fill(g, 0, y, width, 1, p.seam);

  const front = Math.round(width * .72), back = Math.round(width * .26);
  const frontY = Math.round(height * .55), backY = Math.round(height * .83);
  const shift = Math.floor(t / 340) % 2;
  const correct = scene.type === 'reaction' && scene.choice.result === 'best';
  oval(g, front - 49, frontY + 1, 98, 17, p.seam);
  oval(g, front - 43, frontY + 2, 86, 10, p.trim);
  oval(g, back - 48, backY + 8, 96, 20, p.seam);
  oval(g, back - 43, backY + 9, 86, 12, p.trim);
  g.save(); g.translate(back, backY - 9); g.scale(3,3);
  person(g, 0, 0, 'trainee', 'n'); g.restore();
  if (inspect) {
    g.save(); g.translate(front, frontY - 13); g.scale(3,3);
    person(g, 0, 0, 'inspector', 's'); g.restore();
    plank(g, front - 41, frontY + 2, 83, 19, '#b99570');
    frame(g, front + 9, frontY + 4, 15, 8, paper);
  } else {
    const size = correct && turn.challenge.round === 'second' ? 51 : narrow ? 68 : 88;
    sprite(g, zone, front - Math.floor(size / 2), frontY + 6 - size - shift * 2, size, size === 51 ? .67 : 1);
    for (const [dx, dy] of [[-34,-23],[35,-40],[30,-71]]) {
      fill(g, front + dx, frontY + dy - shift * 3, 2, 3, correct ? '#eef2be' : ZONES[zone].colour);
    }
  }
  const label = inspect ? 'INÊS' : ZONES[zone].risk;
  frame(g, 11, 11, narrow ? 103 : 132, 29, paper);
  fill(g, 15, 17, 3, 8, inspect ? foliage : ZONES[zone].colour);
  textPixels(g, label, 23, 17, ink);
  fill(g, 16, 30, narrow ? 88 : 116, 3, dark);
  const progress = inspect ? state.inspected / 5 : turn.challenge.round === 'second' ? (correct ? 1 : .5) : (correct ? .5 : 0);
  fill(g, 17, 31, Math.round((narrow ? 86 : 114) * progress), 1, gold);
  if (correct) marker(g, front, Math.max(16, frontY - 81), '✓', '#ecf0b7', shift);
}
