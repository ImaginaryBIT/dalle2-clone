/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['dalle2clonestorage.blob.core.windows.net'],
  },
  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig;
