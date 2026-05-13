import type { NextConfig } from "next";

// Forçar rebuild para limpar cache do blog
const nextConfig: NextConfig = {
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
