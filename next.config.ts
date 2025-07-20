/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com', 'assets.aceternity.com', 'img.youtube.com'],
  },
  eslint: {
    // Ne bloque PAS le build en cas d'erreurs eslint
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
