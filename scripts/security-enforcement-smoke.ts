// Run only after enforcement has been explicitly authorized and enabled.
// Public synthetic requests must remain held and never send a notification.
import { loadEnvConfig } from '@next/env';
import { createClient } from '@supabase/supabase-js';
import { randomUUID } from 'node:crypto';
import assert from 'node:assert/strict';
import { writeFile } from 'node:fs/promises';
loadEnvConfig(process.cwd());
const db=createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!,process.env.SUPABASE_SERVICE_ROLE!,{auth:{persistSession:false}}).schema('web');
const ids:string[]=[];
const results:{kind:string;state:string;duplicate:boolean}[]=[];
async function main(){
  const settings=await db.from('intake_settings').select('mode,enforcement_enabled_at').single();assert.equal(settings.error,null);assert.equal(settings.data?.mode,'enforce');
  for(const [kind,path] of [['contact','contact'],['spontaneous','spontaneous-applications'],['application','applications']]){
    const id=randomUUID();ids.push(id);
    const payload={submission_id:id,nome:'TESTE TECNICO RETENCAO',empresa:'TESTE TECNICO',email:`${id}@example.org`,telefone:'000000000',servico:'Medicina do Trabalho',mensagem:'Pedido sintético para testar retenção. Sem cliente ou candidato real.',confirm_mail:'synthetic-bot-fixture'};
    for(let attempt=0;attempt<2;attempt++){
      const response=await fetch(`https://www.medisigma.pt/api/${path}`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});
      assert.equal(response.status,200,`${kind} status`);const receipt=await response.json();assert.equal(receipt.saved,true);assert.equal(receipt.duplicate,attempt===1);
    }
    const row=await db.from('public_intake').select('state,operational_id,notification_status,notification_attempt_id,reasons').eq('submission_id',id).single();assert.equal(row.error,null);
    assert.equal(row.data?.state,'held');assert.equal(row.data.operational_id,null);assert.equal(row.data.notification_status,'pending');assert.equal(row.data.notification_attempt_id,null);assert.ok(row.data.reasons.includes('honeypot'));
    const claim=await db.rpc('claim_intake_notification',{p_id:id});assert.equal(claim.error,null);assert.equal(claim.data,null);
    results.push({kind,state:'held',duplicate:true});
  }
  await writeFile('output/security/enforcement-results.json',JSON.stringify({checkedAt:new Date().toISOString(),settings:settings.data,results,normalNotifications:0},null,2));
  console.log(JSON.stringify({results,normalNotifications:0},null,2));
}
main().catch(error=>{console.error('Enforcement verification failed:',error.message);process.exitCode=1;}).finally(async()=>{
  if(!ids.length)return;
  // Never remove a fixture if a regression promoted it; keep it for investigation.
  const current=await db.from('public_intake').select('submission_id,operational_id').in('submission_id',ids);
  if(current.error || current.data?.some(row=>row.operational_id)){console.error('Fixture cleanup requires investigation.');process.exitCode=1;return;}
  const cleanup=await db.from('public_intake').delete().in('submission_id',ids);if(cleanup.error){console.error('Fixture cleanup failed.');process.exitCode=1;}
  else console.log('Only synthetic held fixtures removed.');
});
