import { loadEnvConfig } from '@next/env';
import { mkdir, writeFile } from 'node:fs/promises';
import { createClient } from '@supabase/supabase-js';
import { triage, looksRandom } from '../src/lib/security/triage';
import { remarkSafeEditorial } from '../src/lib/security/mdx';
import { createHash } from 'node:crypto';
loadEnvConfig(process.cwd());
const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!,process.env.SUPABASE_SERVICE_ROLE!,{auth:{persistSession:false}});
async function main() {
  const { compileMDX } = await import('next-mdx-remote/rsc');
  const { default: remarkGfm } = await import('remark-gfm');
  await mkdir('output/security',{recursive:true});
  const contacts = await client.schema('web').from('contacts').select('id,created_at,nome,empresa,localidade,concelho,mensagem,email').gte('created_at','2026-09-21T23:00:00Z').lt('created_at','2026-10-06T12:00:00Z');
  const candidates = await client.schema('web').from('candidaturas').select('id,created_at,nome,mensagem,cv_link,email').gte('created_at','2026-09-21T23:00:00Z').lt('created_at','2026-10-06T12:00:00Z');
  if(contacts.error || candidates.error) throw Error('Sample unavailable');
  const rows = [...contacts.data.map(data=>({kind:'contact' as const,data})),...candidates.data.map(data=>({kind:'spontaneous' as const,data}))];
  await writeFile('output/security/sample-private.json',JSON.stringify(rows,null,2));
  const summary = rows.map(({kind,data})=>({id:data.id,kind,decision:triage(kind,data),signals:Object.fromEntries(Object.entries(data).filter(([key])=>['nome','empresa','localidade','concelho','mensagem'].includes(key)).map(([key,value])=>[key,{length:String(value||'').length,random:looksRandom(value)}]))}));
  await writeFile('output/security/sample-results.json',JSON.stringify(summary,null,2));
  console.log(JSON.stringify({samples:rows.length, flagged:summary.filter(r=>r.decision.reasons.length).length},null,2));
  const links=await client.schema('web').from('candidaturas').select('id,cv_link').order('id');
  if(links.error)throw Error('CV baseline unavailable');
  await writeFile('output/security/historical-cv-references.json',JSON.stringify(links.data,null,2));
  console.log('Historical references fingerprint:',createHash('sha256').update(JSON.stringify(links.data)).digest('hex'));
  const posts=await client.schema('web').from('posts').select('id,slug,content_mdx').eq('status','published');
  if(posts.error)throw Error('Posts unavailable');
  const rejected=[];
  for(const post of posts.data){
    try { await compileMDX({source:post.content_mdx||'',components:{FacebookVideo:()=>null},options:{mdxOptions:{remarkPlugins:[remarkGfm,remarkSafeEditorial]}}}); }
    catch(error) { rejected.push({id:post.id,slug:post.slug,reason:error instanceof Error ? error.message.slice(0,140):'rejected'}); }
  }
  console.log(JSON.stringify({published:posts.data.length,rejected},null,2));
}
main().catch(()=>{console.error('security_sample_failed');process.exitCode=1;});
