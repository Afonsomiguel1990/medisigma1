// Retired public addresses with a verified equivalent. Unknown paths remain 404.
export const LEGACY_REDIRECTS: Record<string, string> = {
  '/blog/ficha-aptidao-trabalho-guia-completo': '/blog/ficha-aptidao-trabalho-validade/',
  '/Home.html': '/',
  '/index.php': '/',
  '/contact-us': '/contact/',
  '/contactos.php': '/contact/',
  '/formacao.php': '/servicos/formacao-certificada/',
  '/bolsa_recrutamento.php': '/recrutamento/',
  '/consulta_comercial.php': '/pedir-proposta/',
  '/extintores.php': '/servicos/manutencao-extintores/',
  '/sinaletica.php': '/signalsigma/',
  '/empresa.php': '/sobre-nos/',
  '/servicos_adicionais.php': '/servicos/',
  '/extintores_manutencao_carreteis.php': '/servicos/seguranca-incendios/',
  '/extintores_manutencao_comercio.php': '/servicos/manutencao-extintores/',
  '/hig_seg_trabalho.php': '/servicos/seguranca-no-trabalho/',
  '/seguranca_alimentar.php': '/servicos/seguranca-alimentar/',
  '/medicina_trabalho.php': '/servicos/medicina-no-trabalho/',
  '/extintores_manutencao.php': '/servicos/manutencao-extintores/',
  '/controlo_haccp.php': '/servicos/seguranca-alimentar/',
};

// Removed pages and a retired form handler have no equivalent public destination.
export const RETIRED_LEGACY_PATHS = new Set([
  '/envia_comercial.php',
  '/epi.php',
  '/higienizacao.php',
  '/the-goonies-1985-web-1080p-magnet-link',
]);
