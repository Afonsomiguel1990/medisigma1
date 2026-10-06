import { loadEnvConfig } from '@next/env';
import { createClient } from '@supabase/supabase-js';
import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
loadEnvConfig(process.cwd());
const client=createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!,process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,{auth:{persistSession:false}});
async function main(){
  for(const table of ['contacts','candidaturas','applications']){
    const result=await client.schema('web').from(table).insert({});assert.equal(result.error?.code,'42501',table);
  }
  const params=Object.fromEntries(['nome','email','telefone','area_interesse','cv_link','mensagem','pagina','url','origem'].map(key=>[`p_${key}`,key==='nome'?'TESTE DE PERMISSAO':'']));
  for(const schema of ['public','web']){const result=await client.schema(schema).rpc('insert_candidatura',params);assert.equal(result.error?.code,'42501',schema);}
  for(const bucket of ['os-cv','web-cv-private']){
    const result=await client.storage.from(bucket).upload(`security-permission-test-${randomUUID()}.pdf`,new Uint8Array([0]),{contentType:'application/pdf',upsert:false});assert.equal(result.error?.message,'new row violates row-level security policy');
  }
  for(const table of ['public_intake','cv_uploads','cv_access_tokens','intake_reviews','intake_settings','intake_counters']){
    const result=await client.schema('web').from(table).select('*').limit(0);assert.equal(result.error?.code,'42501',table);
  }
  console.log('Anonymous table writes, both candidature wrappers, CV uploads and private intake reads are denied.');
}
main().catch(error=>{console.error('Access acceptance failed:',error.message);process.exitCode=1;});
