import { mkdir, writeFile } from 'node:fs/promises';
import sharp from 'sharp';

const size = 16;
const columns = 8;
const sheets = [];
const ink = '#18352f';
const deep = '#2b5147';
const moss = '#547a67';
const mint = '#91ad83';
const light = '#c7d6a3';
const cream = '#eef1ca';
const amber = '#eeb970';
const rust = '#976744';
const red = '#cc5e4f';
const blue = '#5e8892';
const steel = '#a8c6b4';

function draw(name, paint) {
  const pixels = Buffer.alloc(size * size * 4);
  paint((x, y, width, height, color) => {
    const rgb = Buffer.from(color.slice(1), 'hex');
    for (let row = y; row < y + height; row++) {
      for (let column = x; column < x + width; column++) {
        if (row < 0 || row >= size || column < 0 || column >= size) {
          throw new RangeError(`${name} extends outside its tile`);
        }
        const offset = (row * size + column) * 4;
        rgb.copy(pixels, offset);
        pixels[offset + 3] = 255;
      }
    }
  });
  sheets.push({ name, pixels });
}

draw('floorOffice', (box) => {
  box(0, 0, 16, 16, mint);
  box(0, 15, 16, 1, '#789776');
  box(15, 0, 1, 16, '#789776');
  box(2, 3, 2, 1, '#9cb68c');
  box(10, 10, 3, 1, '#9cb68c');
});
draw('floorWarehouse', (box) => {
  box(0, 0, 16, 16, '#9faf83');
  box(0, 15, 16, 1, '#899a75');
  box(0, 3, 16, 1, '#a6b78a');
  box(3, 8, 2, 1, '#899a75');
  box(11, 12, 1, 1, '#899a75');
});
draw('floorKitchen', (box) => {
  box(0, 0, 16, 16, '#adc4a2');
  box(0, 0, 8, 8, '#bed0aa');
  box(8, 8, 8, 8, '#bed0aa');
  box(7, 0, 1, 16, '#8eac93');
  box(0, 7, 16, 1, '#8eac93');
  box(0, 15, 16, 1, '#8eac93');
  box(15, 0, 1, 16, '#8eac93');
});

draw('wallOffice', (box) => {
  box(0, 0, 16, 16, deep);
  box(0, 0, 16, 1, moss);
  box(0, 3, 16, 1, ink);
  box(0, 8, 16, 1, ink);
  box(6, 4, 1, 4, ink);
  box(12, 9, 1, 4, ink);
  box(0, 13, 16, 1, '#e1bd75');
  box(0, 14, 16, 2, ink);
});
draw('wallWarehouse', (box) => {
  box(0, 0, 16, 16, '#39483b');
  box(0, 0, 16, 2, '#73795a');
  box(0, 5, 16, 1, '#657153');
  box(0, 8, 16, 1, '#29392e');
  box(2, 0, 2, 11, '#283a31');
  box(0, 12, 16, 2, rust);
  box(0, 14, 16, 2, ink);
});
draw('wallKitchen', (box) => {
  box(0, 0, 16, 16, '#56847a');
  box(0, 0, 16, 1, steel);
  box(0, 5, 16, 1, deep);
  box(0, 10, 16, 1, deep);
  box(7, 1, 1, 4, deep);
  box(2, 6, 1, 4, deep);
  box(0, 12, 16, 2, light);
  box(0, 14, 16, 2, deep);
});
draw('entry', (box) => {
  box(1, 1, 14, 15, ink);
  box(3, 2, 10, 11, moss);
  box(4, 3, 8, 9, deep);
  box(10, 7, 1, 2, amber);
  box(1, 13, 14, 2, steel);
});

draw('bench', (box) => {
  box(1, 5, 14, 10, deep);
  box(0, 3, 16, 7, ink);
  box(1, 3, 14, 5, '#9f8054');
  box(1, 3, 14, 1, amber);
  box(3, 5, 6, 1, steel);
  box(7, 4, 2, 3, blue);
  box(12, 5, 2, 2, deep);
  box(3, 11, 7, 2, moss);
  box(5, 11, 3, 1, light);
  box(12, 11, 2, 4, ink);
});
draw('rack', (box) => {
  box(0, 2, 16, 13, ink);
  box(1, 2, 14, 1, steel);
  box(1, 7, 14, 1, steel);
  box(1, 12, 14, 1, steel);
  box(2, 4, 5, 3, amber);
  box(9, 4, 4, 3, rust);
  box(3, 9, 4, 3, rust);
  box(8, 9, 5, 3, amber);
  box(11, 9, 1, 2, cream);
});
draw('bay', (box) => {
  box(1, 2, 14, 12, deep);
  box(2, 3, 12, 10, '#a99564');
  box(3, 4, 10, 8, '#a99c73');
  box(1, 2, 4, 1, amber);
  box(11, 2, 4, 1, amber);
  box(1, 13, 4, 1, amber);
  box(11, 13, 4, 1, amber);
});
draw('extinguisher', (box) => {
  box(3, 0, 10, 16, deep);
  box(4, 0, 8, 5, cream);
  box(7, 1, 2, 3, red);
  box(6, 2, 4, 1, red);
  box(7, 5, 3, 1, ink);
  box(6, 6, 5, 9, red);
  box(6, 6, 1, 8, '#e89a76');
  box(7, 9, 3, 3, cream);
  box(11, 6, 1, 5, ink);
  box(5, 15, 7, 1, ink);
});
draw('counter', (box) => {
  box(0, 3, 16, 12, deep);
  box(0, 2, 16, 9, steel);
  box(0, 2, 16, 1, cream);
  box(0, 10, 16, 1, cream);
  box(1, 12, 6, 2, moss);
  box(9, 12, 6, 2, moss);
  box(3, 12, 2, 1, light);
  box(11, 12, 2, 1, light);
});

draw('cable', (box) => {
  box(2, 4, 8, 2, ink);
  box(8, 5, 2, 5, ink);
  box(8, 9, 5, 2, ink);
  box(11, 8, 3, 4, deep);
  box(14, 8, 1, 1, cream);
  box(14, 11, 1, 1, cream);
  box(2, 3, 3, 4, amber);
});
draw('spill', (box) => {
  box(2, 7, 12, 4, deep);
  box(4, 5, 6, 8, deep);
  box(2, 8, 11, 2, blue);
  box(5, 6, 4, 6, blue);
  box(5, 7, 3, 1, cream);
  box(12, 12, 2, 1, blue);
});
draw('papers', (box) => {
  box(2, 6, 10, 7, deep);
  box(3, 5, 8, 6, amber);
  box(5, 3, 8, 6, cream);
  box(7, 5, 4, 1, moss);
  box(7, 7, 2, 1, moss);
  box(12, 8, 3, 4, cream);
});
draw('crate', (box) => {
  box(1, 3, 14, 12, ink);
  box(2, 3, 12, 10, rust);
  box(2, 3, 12, 3, amber);
  box(2, 8, 12, 1, '#bb9254');
  box(3, 6, 2, 7, '#bf985a');
  box(11, 6, 2, 7, '#bf985a');
  box(7, 7, 3, 3, cream);
  box(1, 14, 14, 1, deep);
});

function food(name, contents) {
  draw(name, (box) => {
    box(1, 5, 14, 8, ink);
    box(2, 5, 12, 6, cream);
    contents(box);
    box(3, 12, 10, 1, steel);
  });
}
food('fish', (box) => {
  box(4, 7, 7, 3, blue);
  box(6, 6, 4, 1, blue);
  box(10, 6, 2, 1, deep);
  box(10, 10, 2, 1, deep);
  box(5, 7, 1, 1, ink);
});
food('bowl', (box) => {
  box(4, 8, 8, 1, rust);
  box(5, 9, 6, 2, red);
  box(6, 6, 1, 2, moss);
  box(9, 6, 1, 2, moss);
});
food('carrot', (box) => {
  box(4, 8, 6, 2, rust);
  box(5, 7, 5, 2, amber);
  box(10, 6, 2, 2, deep);
  box(10, 9, 2, 1, moss);
});
draw('flag', (box) => {
  box(11, 2, 1, 9, ink);
  box(11, 2, 5, 5, ink);
  box(12, 3, 3, 3, amber);
  box(13, 4, 1, 1, deep);
});

for (const outfit of ['work', 'kitchen']) {
  for (const face of ['up', 'right', 'down', 'left']) {
    for (let frame = 0; frame < 3; frame++) {
      draw(`${outfit}-${face}-${frame}`, (box) => {
        const uniform = outfit === 'work' ? blue : steel;
        box(3, 13, 10, 2, moss);
        box(5, frame === 2 ? 12 : 13, 2, 2, ink);
        box(9, frame === 1 ? 12 : 13, 2, 2, ink);
        box(3, 8, 10, 4, deep);
        box(4, 10, 1, 2, amber);
        box(11, 10, 1, 2, amber);
        box(5, 7, 6, 6, uniform);
        box(5, 10, 6, 1, light);
        box(5, 3, 6, 5, ink);
        box(6, 4, 4, 4, face === 'up' ? rust : amber);
        if (face === 'left') box(5, 5, 1, 2, amber);
        if (face === 'right') box(10, 5, 1, 2, amber);
        if (face === 'down') box(6, 5, 1, 1, ink);
        if (face === 'down') box(9, 5, 1, 1, ink);
        box(5, 2, 6, 2, cream);
        box(6, 1, 4, 1, outfit === 'work' ? amber : cream);
        box(4, 4, 8, 1, outfit === 'work' ? cream : steel);
      });
    }
  }
}

const rows = Math.ceil(sheets.length / columns);
const width = columns * size;
const height = rows * size;
const atlas = Buffer.alloc(width * height * 4);
const coordinates = {};
for (const [index, { name, pixels }] of sheets.entries()) {
  const x = (index % columns) * size;
  const y = Math.floor(index / columns) * size;
  coordinates[name] = [x, y];
  for (let row = 0; row < size; row++) {
    const start = row * size * 4;
    pixels.copy(atlas, ((y + row) * width + x) * 4, start, start + size * 4);
  }
}

const output = new URL('../public/images/jogos/turno-seguro/', import.meta.url);
await mkdir(output, { recursive: true });
const png = await sharp(atlas, { raw: { width, height, channels: 4 } }).png().toBuffer();
await writeFile(new URL('sprites.png', output), png);
await writeFile(new URL('../src/lib/turno-seguro/sprite-map.json', import.meta.url), JSON.stringify(coordinates, null, 2) + '\n');
