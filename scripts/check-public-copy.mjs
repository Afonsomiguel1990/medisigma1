import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

export function hasEmDash(text) {
  return new RegExp(String.fromCodePoint(0x2014) + '|&mdash;|&#0*8212;|&#x0*2014;|\\\\u(?:2014|\\{2014\\})', 'i').test(text);
}

export async function checkPublicCopy(root = process.cwd()) {
  const failures = [];
  let checked = 0;
  async function scan(directory) {
    for (const entry of await readdir(directory, { withFileTypes: true })) {
      const file = path.join(directory, entry.name);
      if (entry.isDirectory()) { await scan(file); continue; }
      if (!/\.(?:tsx?|jsx?|m?js|mdx?|txt|json|html|css|svg|vtt|srt|xml)$/i.test(file)) continue;
      checked++;
      const content = await readFile(file, 'utf8');
      content.split(/\r?\n/).forEach((line, index) => {
        if (hasEmDash(line)) failures.push(path.relative(root, file) + ':' + (index + 1));
      });
    }
  }
  await scan(path.join(root, 'src'));
  await scan(path.join(root, 'public'));
  if (failures.length) throw new Error('M-dashes em conteúdo publicável:\n' + failures.join('\n'));
  console.log('Pontuação verificada em ' + checked + ' ficheiros: zero m-dashes.');
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  checkPublicCopy().catch(error => { console.error(error.message); process.exitCode = 1; });
}
