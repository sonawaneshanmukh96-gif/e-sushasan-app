/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // This is the exact key required for version 14.1.0
    serverComponentsExternalPackages: ["@prisma/client"],
  },
};

export default nextConfig;