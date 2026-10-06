import { parseDocument } from 'yaml';
export default function matter(source:string) {
  const match = /^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/.exec(source);
  if (!match) return { data:{} as Record<string,unknown> & { title:string;date:string }, content:source };
  const doc = parseDocument(match[1], { schema:'core', uniqueKeys:true });
  if (doc.errors.length) throw new Error('Invalid frontmatter');
  const data = doc.toJS({ maxAliasCount:30 });
  if (!data || typeof data !== 'object' || Array.isArray(data)) throw new Error('Invalid frontmatter');
  return { data:data as Record<string,unknown> & { title:string;date:string }, content:source.slice(match[0].length) };
}
