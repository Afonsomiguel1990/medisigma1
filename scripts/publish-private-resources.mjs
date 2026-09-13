import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
const files = ['preparacao-exames.pdf', 'dossier-legionella.pdf', 'preparacao-act.pdf', 'matriz-formacao.xlsx', 'inventario-primeiros-socorros.xlsx', 'controlo-incendios.xlsx'];
const bucket = 'web-resources';
const manifest = JSON.parse(readFileSync('resources/qc/manifest.json','utf8'));
const assets = files.map(file => {
  const body = readFileSync(`resources/files/${file}`);
  const hash = createHash('sha256').update(body).digest('hex');
  if (manifest.find(row => row.file === file)?.sha256 !== hash) throw new Error(`Unreviewed asset: ${file}`);
  return {file,body,hash};
});
if (!process.env.SUPABASE_SERVICE_ROLE || !process.env.NEXT_PUBLIC_SUPABASE_URL) throw new Error('Server credentials required');
const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL,process.env.SUPABASE_SERVICE_ROLE,{auth:{persistSession:false}});
const { data: buckets, error: bucketError } = await client.storage.listBuckets();
if(bucketError) throw bucketError;
let existing = buckets.find(item=>item.id===bucket);
if (existing?.public) throw new Error('Refusing to use a public resources bucket');
if (!process.argv.includes('--upload')) { console.log(JSON.stringify({verified:assets.map(a=>a.file),privateBucketExists:!!existing})); }
else {
if(!existing) {
  const {error} = await client.storage.createBucket(bucket,{public:false,fileSizeLimit:5242880,allowedMimeTypes:['application/pdf','application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']});
  if(error) throw error;
}
for(const {file,body,hash} of assets) {
  const {data: listing,error: listError} = await client.storage.from(bucket).list('',{search:file});
  if(listError) throw listError;
  if(listing.some(item=>item.name===file)) {
    const {data: old,error: oldError} = await client.storage.from(bucket).download(file);
    if(oldError || !old) throw oldError || new Error('Existing object unavailable');
    const oldHash=createHash('sha256').update(Buffer.from(await old.arrayBuffer())).digest('hex');
    if(oldHash!==hash) throw new Error(`Existing asset differs; review before replacing: ${file}`);
  } else {
    const {error} = await client.storage.from(bucket).upload(file,body,{upsert:false,contentType:file.endsWith('.pdf')?'application/pdf':'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
    if(error) throw error;
  }
  const {data: signed,error} = await client.storage.from(bucket).createSignedUrl(file,600,{download:true});
  if(error || !signed) throw error || new Error('Missing signed URL');
  const result = await fetch(signed.signedUrl);
  const deliveredHash = createHash('sha256').update(Buffer.from(await result.arrayBuffer())).digest('hex');
  if(!result.ok || deliveredHash!==hash) throw new Error(`Download verification failed: ${file}`);
  const publicResponse = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${bucket}/${file}`);
  if(publicResponse.ok) throw new Error(`Asset is publicly accessible: ${file}`);
  console.log(JSON.stringify({file,sha256:hash,signedDownload:result.status,publicAccess:publicResponse.status}));
}
}
