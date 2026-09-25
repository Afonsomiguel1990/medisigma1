import assert from 'node:assert/strict';
import { readFileSync, statSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
const root = new URL('../', import.meta.url);
const manifest = JSON.parse(readFileSync(new URL('docs/service-media-manifest.json', root), 'utf8'));
const transcripts = JSON.parse(readFileSync(new URL('src/content/service-media-transcripts.json', root), 'utf8'));
const seconds = text => text.split(':').reduce((sum, part) => sum * 60 + Number(part), 0);
let videos = 0;
for (const media of manifest) {
  const file = new URL(`public/media/servicos/${media.output}`, root);
  const bytes = readFileSync(file);
  assert.equal(bytes.length, media.bytes, `Size mismatch: ${media.id}`);
  assert.equal(createHash('sha256').update(bytes).digest('hex'), media.sha256, `Hash mismatch: ${media.id}`);
  if (!media.output.endsWith('.mp4')) continue;
  videos++;
  const stream = media.streams.find(stream => stream.codec_type === 'video');
  assert.deepEqual([stream.codec_name, stream.width, stream.height], ['h264', 720, 1280]);
  assert.equal(media.streams.find(stream => stream.codec_type === 'audio').codec_name, 'aac');
  assert.ok(statSync(file).size < (media.id === 'ramiro' ? 40 : 10) * 1024 * 1024);
  // MP4 atom order: the index must precede the media data for seeking/fast start.
  const atoms = []; let offset = 0;
  while (offset + 8 <= bytes.length) {
    let size = bytes.readUInt32BE(offset);
    atoms.push(bytes.toString('ascii', offset + 4, offset + 8));
    if (size === 1) size = Number(bytes.readBigUInt64BE(offset + 8));
    if (!size) break;
    assert.ok(size >= 8 && offset + size <= bytes.length, `Invalid MP4: ${media.id}`);
    offset += size;
  }
  assert.ok(atoms.indexOf('moov') >= 0 && atoms.indexOf('moov') < atoms.indexOf('mdat'), `Missing faststart: ${media.id}`);
  assert.ok(statSync(new URL(`public/media/servicos/${media.id}-capa.webp`, root)).size > 0);
  const vtt = readFileSync(new URL(`public/media/servicos/${media.id}.pt.vtt`, root), 'utf8').replaceAll('\r\n', '\n');
  assert.ok(vtt.startsWith('WEBVTT\n'));
  if (process.env.VERCEL_ENV === 'production') assert.ok(!vtt.includes('[passagem pouco percetível]'), `Caption review is still pending: ${media.id}`);
  const cues = [...vtt.matchAll(/(\d{2}:\d{2}:\d{2}\.\d{3}) --> (\d{2}:\d{2}:\d{2}\.\d{3})\n([^]*?)(?=\n\n|$)/g)];
  assert.ok(cues.length >= 5, `Missing captions: ${media.id}`);
  let end = 0;
  for (const cue of cues) {
    const start = seconds(cue[1]); const stop = seconds(cue[2]);
    assert.ok(start >= end && stop > start, `Invalid caption timing: ${media.id}`); end = stop;
    const lines = cue[3].trim().split('\n');
    assert.ok(lines.length <= 2 && lines.every(line => line.length <= 46), `Caption too long: ${media.id}: ${cue[3]}`);
  }
  assert.ok(end <= media.duration, `Captions exceed duration: ${media.id}`);
  assert.ok(transcripts[media.id]?.length > 100, `Missing transcript: ${media.id}`);
  const spokenText = cues.map(cue => cue[3].trim().replace(/\s+/g, ' ')).join(' ');
  assert.equal(transcripts[media.id].trim().replace(/\s+/g, ' '), spokenText, `Caption and transcript differ: ${media.id}`);
}
assert.equal(videos, 5);
console.log(`Verified ${videos} videos, ${manifest.length - videos} photographs, faststart, file hashes and PT captions in ${fileURLToPath(root)}.`);
