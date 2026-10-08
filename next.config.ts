/** @type {import('next').NextConfig} */

const nextConfig = {
  output: "standalone",

  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https" as const,
        hostname: "amuylbxwekzmqfhdbhhw.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
  output: 'export',
};

export default nextConfig;