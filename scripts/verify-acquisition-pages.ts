import assert from 'node:assert/strict';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { remarkSafeEditorial } from '../src/lib/security/mdx';
import { technicalServices } from '../src/lib/technical-services';
import { serviceAreas } from '../src/lib/service-areas';
import { LEGACY_REDIRECTS } from '../src/lib/legacy-redirects';

async function main() {
const [{compileMDX},{default:remarkGfm}]=await Promise.all([import('next-mdx-remote/rsc'),import('remark-gfm')]);
const origin=process.argv[2] || 'http://localhost:3085';
const paths=[...Object.keys(technicalServices).map(key=>`/servicos/${key}/`),...Object.keys(serviceAreas).map(key=>`/${key}/`),'/setores/industria/','/setores/hotelaria-alojamento/'];
const sitemap=await (await fetch(origin+'/sitemap.xml')).text();
const evidence=[];
for(const path of paths) {
  const htmlResponse=await fetch(origin+path,{headers:{Accept:'text/html'}});
  const markdownResponse=await fetch(origin+path,{headers:{Accept:'text/markdown'}});
  assert.equal(htmlResponse.status,200,path);assert.equal(markdownResponse.status,200,path+' Markdown');
  const html=await htmlResponse.text();const markdown=await markdownResponse.text();
  assert.equal((html.match(/<h1\b/g)||[]).length,1,path+' heading');
  assert.ok(html.includes(`rel="canonical" href="https://www.medisigma.pt${path}"`),path+' canonical');
  assert.ok(sitemap.includes(`https://www.medisigma.pt${path}`),path+' sitemap');
  assert.ok(markdown.includes('/pedir-proposta/'),path+' commercial route');
  const schema=[...html.matchAll(/<script type="application\/ld\+json">([^]*?)<\/script>/g)].flatMap(match=>JSON.parse(match[1]));
  if(Object.keys(serviceAreas).some(key=>path===`/${key}/`)) {
    assert.ok(schema.some(entry=>entry['@type']==='Service'&&entry.areaServed?.['@type']==='City'),path+' area');
    assert.ok(!schema.some(entry=>entry['@type']==='LocalBusiness'),path+' no invented branch');
  }
  evidence.push({path,html:htmlResponse.status,markdown:markdownResponse.status});
}
for(const [source,destination] of Object.entries(LEGACY_REDIRECTS)) {
  const response=await fetch(origin+source+'?origem=verificacao',{redirect:'manual'});
  assert.equal(response.status,301,source);
  const target=new URL(response.headers.get('location')!);
  assert.equal(target.pathname,destination);assert.equal(target.search,'?origem=verificacao');
  assert.equal((await fetch(target,{redirect:'manual'})).status,200,source+' direct target');
}
const edits=JSON.parse(await readFile('src/content/seo-growth-editorial.json','utf8'));
for(const edit of edits) if(edit.after.content_mdx) {
  await compileMDX({source:edit.after.content_mdx,components:{NoiseAssessmentMedia:()=>null},options:{parseFrontmatter:false,mdxOptions:{remarkPlugins:[remarkGfm,remarkSafeEditorial]}}});
  assert.match(edit.after.content_mdx,/\/servicos\/(radao|legionella|ruido-ocupacional|qualidade-do-ar-interior)\//);
}
await mkdir('output/seo-growth',{recursive:true});
await writeFile('output/seo-growth/acquisition-pages.json',JSON.stringify({origin,pages:evidence,redirects:Object.keys(LEGACY_REDIRECTS).length,preparedEditorialUpdates:edits.length},null,2));
console.log(`${paths.length} pages: HTML, Markdown, canonical, sitemap and commercial routes verified. ${Object.keys(LEGACY_REDIRECTS).length} redirects and ${edits.length} prepared editorial changes verified. No submissions or publication.`);
}
main().catch(error=>{console.error(error);process.exitCode=1;});
