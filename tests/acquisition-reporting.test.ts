import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { PGlite } from '@electric-sql/pglite';
import { randomUUID } from 'node:crypto';
import { acquisitionPageGroup, groupAcquisitionPages } from '../src/lib/analytics/page-groups';

test('page groups keep Careview, recruitment and Volta separate and do not infer unknown history',()=>{
  assert.equal(acquisitionPageGroup('/blog/sistema-volta-cobrar-devolver-deposito-estabelecimento/'),'Sistema Volta');
  assert.equal(acquisitionPageGroup('https://careview.medisigma.pt/'),'Careview');
  assert.equal(acquisitionPageGroup('/recrutamento/'),'Recrutamento');
  assert.equal(acquisitionPageGroup('unknown'),'Sem classificação');
  assert.equal(acquisitionPageGroup('Serviço: Radão'),'Páginas comerciais');
  assert.equal(acquisitionPageGroup('/setores/industria/'),'Páginas de setor');
  assert.deepEqual(groupAcquisitionPages([{key:'/lisboa/',count:2},{key:'Área de serviço: Coimbra',count:3}]),[{key:'Páginas locais',count:5}]);
});

test('acquisition reporting excludes explicit spam and tests, separates resources and retains unknown history', async () => {
  const db = new PGlite();
  try {
    await db.exec(await readFile('tests/fixtures/intake-baseline.sql', 'utf8'));
    await db.exec(`alter table web.contacts add column status text;
      alter table web.lead_submissions add column notification_started_at timestamptz;
      create table web.public_intake(submission_id uuid primary key,state text);
      create table web.contact_click_events(event_id uuid primary key,created_at timestamptz,page text,channel text,legacy_id uuid);
      create table public.phone_clicks(id uuid,created_at timestamptz);
      create table public.email_clicks(id uuid,created_at timestamptz);
      create table public.whatsapp_clicks(id uuid,created_at timestamptz);`);
    await db.exec(await readFile('supabase/migrations/20261014090000_acquisition_explicit_exclusions.sql', 'utf8'));
    const insert = async (key: string | null, kind = 'service_request', source = 'pedido-proposta', page = '/pedir-proposta/') => {
      const id = randomUUID();
      await db.query("insert into web.lead_submissions(submission_id,lead_kind,service_key,source,page,attribution) values($1,$2,$3,$4,$5,'{\"status\":\"unknown\"}')", [id,kind,key,source,page]);
      return id;
    };
    await insert('radao');
    await insert('ruido-ocupacional');
    const spam = await insert('legionella');
    await db.query("insert into web.public_intake values($1,'spam')",[spam]);
    await insert('legionella','service_request','e2e:local');
    await insert('legionella','resource_request');
    await insert(null);
    await insert('seguranca-alimentar','service_request','site','/blog/sistema-volta-cobrar-devolver-deposito-estabelecimento/');
    await insert('legionella','service_request','site','/recrutamento/');
    await db.exec("insert into web.contacts(empresa,status) values('Histórico sem classificação','novo')");
    const result = await db.query<{ report: { measurementVersion:number; submissions:number; serviceRequests:number; resourceRequests:number; byService:{key:string;count:number}[]; priorityByService:{key:string;count:number}[]; excludedRecords:{key:string;count:number}[]; legacyUnattributed:{contacts:number} } }>("select web.get_lead_analytics(now()-interval '1 day',now()+interval '1 day') as report");
    const report = result.rows[0].report;
    assert.equal(report.measurementVersion,2);
    assert.equal(report.submissions,5);
    assert.equal(report.serviceRequests,4);
    assert.equal(report.resourceRequests,1);
    assert.equal(report.legacyUnattributed.contacts,1);
    assert.equal(report.byService.find(row=>row.key==='unknown')?.count,1);
    assert.deepEqual(report.priorityByService.map(row=>row.key).sort(),['radao','ruido-ocupacional']);
    assert.deepEqual(report.excludedRecords.map(row=>row.key),['recruitment','spam','test']);
    for (const role of ['anon','authenticated']) {
      const result=await db.query<{allowed:boolean}>("select has_function_privilege($1,'web.get_lead_analytics(timestamptz,timestamptz)','execute') as allowed",[role]);
      assert.equal(result.rows[0].allowed,false);
    }
    await assert.rejects(db.query("select web.get_lead_analytics(now(),now()-interval '1 day')"));
  } finally { await db.close(); }
});
