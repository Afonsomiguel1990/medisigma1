// Read-only observation report. Never fetches a CV or submitted external URL.
import { loadEnvConfig } from '@next/env';
import { createClient } from '@supabase/supabase-js';
import { readFile,writeFile } from 'node:fs/promises';
import assert from 'node:assert/strict';
import { triage } from '../src/lib/security/triage';
loadEnvConfig(process.cwd());
const db=createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!,process.env.SUPABASE_SERVICE_ROLE!,{auth:{persistSession:false}}).schema('web');
async function main(){
  const baseline=JSON.parse(await readFile('output/security/historical-cv-references.json','utf8'));
  const historical=await db.from('candidaturas').select('id,cv_link').in('id',baseline.map((row:{id:string})=>row.id)).order('id');assert.equal(historical.error,null);assert.deepEqual(historical.data,baseline);
  const sample=JSON.parse(await readFile('output/security/sample-private.json','utf8'));
  const suspectCount=sample.filter((row:{kind:'contact'|'spontaneous';data:Record<string,unknown>})=>triage(row.kind,row.data).reasons.length).length;
  assert.equal(suspectCount,12);assert.equal(sample.length-suspectCount,19);
  const setting=await db.from('intake_settings').select('mode,observation_started_at,enforcement_enabled_at').single();assert.equal(setting.error,null);assert.ok(setting.data?.observation_started_at);
  const records=await db.from('public_intake').select('submission_id,kind,state,suspected,reasons,notification_status,created_at,cv_uploads(validation_status,validation_code)').gte('created_at',setting.data.observation_started_at).order('created_at').limit(1000);assert.equal(records.error,null);
  const groups:Record<string,number>={};for(const row of records.data!){const key=`${row.kind}/${row.state}/${row.notification_status}`;groups[key]=(groups[key]||0)+1;}
  const report={checkedAt:new Date().toISOString(),settings:setting.data,hoursObserved:(Date.now()-Date.parse(setting.data.observation_started_at))/3600000,historicalReferences:baseline.length,benchmark:{suspects:12,preserved:19},count:records.data!.length,truncated:records.data!.length===1000,groups,suspects:records.data!.filter(row=>row.suspected).map(({submission_id,kind,state,reasons,notification_status,cv_uploads})=>({submission_id,kind,state,reasons,notification_status,cv_uploads}))};
  await writeFile('output/security/observation-report.json',JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));
}
main().catch(()=>{console.error('Observation verification failed; keep observe and inspect the failed check.');process.exitCode=1;});
