/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  compress: true,
  poweredByHeader: false,
  images: {
    unoptimized: true,
  },
  experimental: {
    optimizePackageImports: [
      'react-icons',
      '@mui/icons-material',
      '@mui/material',
      'lenis',
    ],
  },
};

export default nextConfig;
