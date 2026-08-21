export function agentFriendlyNotFoundMarkdown(origin: string) {
  return `# 404 — Página não encontrada

A página pedida não existe ou foi movida. Continue por um destes índices:

- [Mapa do site](${origin}/sitemap.xml)
- [Instruções para agentes](${origin}/llms.txt)
- [Serviços](${origin}/servicos/)
- [Blog](${origin}/blog/)
- [Contactos](${origin}/contact/)
`;
}
