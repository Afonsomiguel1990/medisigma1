import assert from 'node:assert/strict';
import test from 'node:test';
import { createResourceAccess, RESOURCE_ACCESS_WINDOW_MS } from '../src/lib/resources/access';
import { RESOURCES, getResource } from '../src/lib/resources/catalog';
import { POST as requestResource } from '../src/app/api/resources/[slug]/access/route';

test('withdrawn resource endpoint refuses requests without creating receipts or download links', async () => {
  const response = await requestResource();
  assert.equal(response.status, 410);
  assert.equal(response.headers.get('cache-control'), 'no-store');
  assert.deepEqual(await response.json(), { ok: false, error: 'Este recurso não está disponível.' });
});
const now = Date.parse('2026-09-14T12:00:00Z');
test('every signed link lasts exactly 600 seconds including last second of recovery window', async () => {
  for (const age of [0, RESOURCE_ACCESS_WINDOW_MS-1000]) {
    let calls = 0;
    const result = await createResourceAccess(RESOURCES[0], new Date(now-age).toISOString(), async (_, ttl) => { calls++; assert.equal(ttl,600); return 'https://example.invalid/signed'; }, now);
    assert.equal(calls,1);
    assert.equal(result.download_expires_at, '2026-09-14T12:10:00.000Z');
  }
});
test('24 hour boundary and missing receipt never sign a file', async () => {
  const signer = async () => { assert.fail('Must not sign'); return ''; };
  assert.equal((await createResourceAccess(RESOURCES[0], new Date(now-RESOURCE_ACCESS_WINDOW_MS).toISOString(), signer, now)).download_expired,true);
  assert.ok((await createResourceAccess(RESOURCES[0], undefined, signer, now)).download_error);
});
test('storage failure returns a recoverable download error without throwing away saved receipt', async () => {
  const result = await createResourceAccess(RESOURCES[0], new Date(now).toISOString(), async () => { throw new Error('Private provider details'); }, now);
  assert.match(result.download_error!,/pedido ficou guardado/);
  assert.ok(!result.download_error!.includes('Private provider'));
});
test('catalog rejects arbitrary identifiers and has exactly three PDFs and three workbooks', () => {
  assert.equal(getResource('../secret'),undefined);
  assert.equal(RESOURCES.filter(r => r.format === 'PDF').length,3);
  assert.equal(RESOURCES.filter(r => r.format === 'XLSX').length,3);
});
