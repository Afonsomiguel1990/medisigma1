import { readFile, writeFile, mkdir } from 'node:fs/promises';

// Generate reviewable, transactional SQL. This script never connects to production.
const changes = JSON.parse(await readFile('src/content/seo-growth-editorial.json', 'utf8'));
const quote = value => `'${String(value).replaceAll("'", "''")}'`;
function sql(reverse = false) {
  return 'begin;\n' + changes.map(change => {
    const before = reverse ? change.after : change.before;
    const after = reverse ? change.before : change.after;
    const condition = Object.entries(before).map(([key,value])=>`${key} is not distinct from ${quote(value)}`).join(' and ');
    const values = Object.entries(after).map(([key,value])=>`${key}=${quote(value)}`).join(', ');
    if (Object.keys(after).some(key=>!['excerpt','content_mdx'].includes(key))) throw new Error('Unsupported field');
    return `do $growth$ begin\n if not exists(select 1 from web.posts where id=${quote(change.id)} and slug=${quote(change.slug)} and ${condition}) then\n raise exception 'Editorial precondition failed: ${change.slug}';\n end if;\n update web.posts set ${values}, updated_at=now() where id=${quote(change.id)};\nend $growth$;`;
  }).join('\n') + '\ncommit;\n';
}
await mkdir('output/seo-growth', { recursive: true });
await writeFile('output/seo-growth/editorial-apply.sql', sql());
await writeFile('output/seo-growth/editorial-rollback.sql', sql(true));
console.log(`Prepared ${changes.length} guarded editorial changes and their rollback. Nothing published.`);
