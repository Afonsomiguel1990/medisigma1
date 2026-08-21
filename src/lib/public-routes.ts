export const INTERNAL_HTML_PREFIX = "/api/agent-html";
export const INTERNAL_MARKDOWN_PREFIX = "/api/agent-markdown";
export const REPRESENTATION_SOURCE_HEADER = "x-medisigma-content-source";
export const ORIGINAL_PATH_HEADER = "x-medisigma-original-path";

export const VALID_SERVICE_SLUGS = [
  "medicina-no-trabalho",
  "seguranca-no-trabalho",
  "seguranca-alimentar",
  "formacao-certificada",
  "psicologia",
  "controlo-pragas",
  "seguranca-incendios",
  "legionella",
  "medicina-desportiva",
  "nutricao",
  "manutencao-extintores",
] as const;

const CANONICAL_PUBLIC_ROUTES = new Set([
  "/abrantes",
  "/blog",
  "/casos-de-sucesso",
  "/castelo-branco",
  "/coimbra",
  "/contact",
  "/cookies",
  "/covilha",
  "/entroncamento",
  "/faqs",
  "/faqs/legionella",
  "/faqs/manutencao-extintores",
  "/fatima",
  "/ferramentas/simulador-caixas-primeiros-socorros",
  "/leiria",
  "/lisboa",
  "/livro-reclamacoes",
  "/newsletter",
  "/politica-de-privacidade",
  "/portalegre",
  "/recrutamento",
  "/resolucao-litigios",
  "/rio-maior",
  "/santarem",
  "/servicos",
  "/signalsigma",
  "/sobre-nos",
  "/termos-e-condicoes",
  "/testemunhos",
  "/tomar",
  "/torres-novas",
  ...VALID_SERVICE_SLUGS.map((slug) => `/servicos/${slug}`),
]);

const EXCLUDED_PREFIXES = [
  "/_next",
  "/_vercel",
  "/admin",
  "/api",
  "/estatisticas",
  "/images",
  "/public",
] as const;

const EXCLUDED_EXACT_PATHS = new Set([
  "/apple-icon",
  "/favicon.ico",
  "/icon",
  "/llms.txt",
  "/opengraph-image",
  "/robots.txt",
  "/sitemap.xml",
]);

export function isNegotiablePublicPath(pathname: string) {
  const normalized = pathname.toLowerCase();

  if (EXCLUDED_EXACT_PATHS.has(normalized)) return false;
  if (
    EXCLUDED_PREFIXES.some(
      (prefix) => normalized === prefix || normalized.startsWith(`${prefix}/`),
    )
  ) {
    return false;
  }

  const finalSegment = normalized.split("/").filter(Boolean).at(-1) || "";
  return !/\.[a-z0-9]{1,12}$/i.test(finalSegment);
}

export function canonicalTrailingSlashPath(pathname: string) {
  if (pathname === "/" || pathname.endsWith("/")) return null;
  return CANONICAL_PUBLIC_ROUTES.has(pathname) ? `${pathname}/` : null;
}

export function isSafeBlogPath(pathname: string) {
  if (!pathname.startsWith("/blog/")) return true;

  const slug = pathname.slice("/blog/".length).replace(/\/$/, "");
  return !(
    slug.includes("..") ||
    slug.includes("//") ||
    slug.length > 200 ||
    /[<>"']/.test(slug)
  );
}
