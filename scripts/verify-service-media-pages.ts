import assert from 'node:assert/strict';
import { serviceMedia, locationMedia } from '../src/lib/service-media';
const origin = process.argv[2] || 'http://127.0.0.1:3075';
async function main() {
const pages = [...new Set([...Object.values(serviceMedia).map(entry => entry.servicePath), ...Object.keys(locationMedia).map(city => `/${city}/`), '/abrantes/'])];
for (const path of pages) {
  const response = await fetch(new URL(path, origin), { headers: { Accept: 'text/html' } });
  assert.equal(response.status, 200, path);
  const html = await response.text();
  assert.ok(html.includes('data-service-media=') || html.includes('trabalho-em-abrantes'), `Missing block: ${path}`);
  const videos = [...html.matchAll(/<video\b[^>]*>/g)];
  for (const [tag] of videos) {
    assert.match(tag, /preload="none"/); assert.match(tag, /controls=""/);
    assert.doesNotMatch(tag, /autoplay/i); assert.match(tag, /width="720"/); assert.match(tag, /height="1280"/);
  }
  const isLocal = Object.keys(locationMedia).includes(path.replaceAll('/', ''));
  if (isLocal) {
    assert.equal(videos.length, 1);
    assert.ok(html.includes('Exemplo de trabalho realizado pela Medisigma em Portugal.'));
  }
  if (path === '/abrantes/') assert.equal(videos.length, 2);
  assert.equal([...html.matchAll(/<track\b[^>]*kind="captions"/g)].length, videos.length);
  for (const [, target] of html.matchAll(/<a[^>]*href="#([^"]+)"[^>]*data-service-media-cta=/g)) assert.ok(html.includes(`id="${target}"`), `Missing form anchor: ${path}`);
  console.log('HTML, player and contact anchors verified:', path);
}
const checkedImages = new Set<string>();
for (const entry of Object.values(serviceMedia)) {
  const video = entry.video;
  if (video) {
    const response = await fetch(new URL(video.src, origin), { headers: { Range: 'bytes=0-255' } });
    assert.equal(response.status, 206, video.src);
    assert.match(response.headers.get('content-range') || '', /^bytes 0-255\/\d+$/);
    assert.equal((await response.arrayBuffer()).byteLength, 256);
    const captions = await fetch(new URL(video.captions, origin));
    assert.equal(captions.status, 200); assert.match(captions.headers.get('content-type') || '', /text\/vtt/);
    assert.ok((await captions.text()).startsWith('WEBVTT'));
    checkedImages.add(video.poster);
  }
  entry.photos.forEach(photo => checkedImages.add(photo.src));
}
for (const src of checkedImages) {
  const response = await fetch(new URL(`/_next/image?url=${encodeURIComponent(src)}&w=256&q=75`, origin));
  assert.equal(response.status, 200, src); assert.match(response.headers.get('content-type') || '', /^image\//);
  await response.arrayBuffer();
}
console.log(`Verified ${pages.length} pages, five seekable video URLs, captions and ${checkedImages.size} optimized images. No form submissions or notifications sent.`);
}
main().catch(error => { console.error(error); process.exitCode = 1; });
