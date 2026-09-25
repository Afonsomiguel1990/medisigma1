import { readFileSync, writeFileSync } from 'node:fs';
const file = new URL('../src/content/service-media-publication.json', import.meta.url);
const publication = JSON.parse(readFileSync(file, 'utf8'));
const date = process.argv[2];
if (date && date !== '--check') {
  if (publication.publishedAt) throw Error('Publication date already recorded; preserve the first publication date.');
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || new Date(date).toISOString().slice(0, 10) !== date) throw Error('Supply the actual first publication date as YYYY-MM-DD.');
  if (new Date(date).valueOf() > Date.now()) throw Error('Publication date cannot be in the future.');
  writeFileSync(file, JSON.stringify({ publishedAt: date }, null, 2) + '\n');
  console.log('First publication date recorded:', date);
} else if (!publication.publishedAt) {
  if (process.env.VERCEL_ENV === 'production') throw Error('Record the actual first publication date before releasing service media. See docs/service-media-review.md.');
  console.log('Service media is a review draft; VideoObject will be emitted after the publication date is recorded.');
}
