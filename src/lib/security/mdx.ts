type Node = { type:string; name?:string; url?:string; value?:unknown; attributes?: { type:string; name:string; value:unknown }[]; children?:Node[] };
const tags = new Set('a abbr b blockquote br caption code dd del details div dl dt em figcaption figure h1 h2 h3 h4 h5 h6 hr i img kbd li mark ol p pre s small span strong sub summary sup table tbody td th thead tr u ul'.split(' '));
const attributes = new Set(['className','id','title','lang','dir','href','src','alt','width','height','target','rel','colSpan','rowSpan','scope','start','open']);
export function safeEditorialUrl(value:string) {
  if (/[\u0000-\u0020\u007f\\]/.test(value) || value.startsWith('//')) return false;
  return /^(?:https?:\/\/|mailto:|tel:|#|\/(?!\/))/.test(value) || (!value.includes(':') && !value.startsWith('\\'));
}
export function validateEditorialTree(tree:Node) {
  const walk = (node:Node) => {
    if (['mdxjsEsm','mdxFlowExpression','mdxTextExpression','html'].includes(node.type)) throw new Error('MDX active content rejected');
    if (node.url !== undefined && !safeEditorialUrl(node.url)) throw new Error('MDX URL rejected');
    if (['mdxJsxFlowElement','mdxJsxTextElement'].includes(node.type)) {
      if (!node.name || (!tags.has(node.name) && node.name !== 'FacebookVideo')) throw new Error('MDX component rejected');
      for (const attribute of node.attributes || []) {
        if (attribute.type !== 'mdxJsxAttribute' || node.name === 'FacebookVideo' ||
          (!attributes.has(attribute.name) && !/^aria-[a-z-]+$/.test(attribute.name)) ||
          (attribute.value !== null && typeof attribute.value !== 'string')) throw new Error('MDX attribute rejected');
        if (['href','src'].includes(attribute.name) && (typeof attribute.value !== 'string' || !safeEditorialUrl(attribute.value))) throw new Error('MDX URL rejected');
      }
    }
    node.children?.forEach(walk);
  };
  walk(tree);
}
export function remarkSafeEditorial() { return (tree:Node) => { validateEditorialTree(tree); }; }
