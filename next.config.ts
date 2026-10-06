import type { NextConfig } from "next";

// Forçar rebuild para limpar cache do blog
const nextConfig: NextConfig = {
  outputFileTracingRoot: process.cwd(),
  outputFileTracingIncludes: {
    '/api/*': ['./src/lib/cv/inspect-worker.cjs', './node_modules/pdf-lib/**/*', './node_modules/@pdf-lib/**/*', './node_modules/pako/**/*', './node_modules/fflate/**/*', './node_modules/cfb/**/*', './node_modules/adler-32/**/*', './node_modules/crc-32/**/*', './node_modules/tslib/**/*'],
  },
  skipTrailingSlashRedirect: true,
  async redirects() {
    return [
      {
        source: '/controlo_pragas.php',
        destination: '/servicos/controlo-pragas/',
        permanent: true,
      },
      {
        source: '/services/controlo-de-pragas-urbanas',
        destination: '/servicos/controlo-pragas/',
        permanent: true,
      },
      {
        source: '/our-services',
        destination: '/servicos/',
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  trailingSlash: true,
};

export default nextConfig;
