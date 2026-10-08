/** @type {import('next').NextConfig} */

const nextConfig = {
  output: "standalone",

  images: {
    remotePatterns: [
      {
        protocol: "https" as const,
        hostname: "amuylbxwekzmqfhdbhhw.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
};

export default nextConfig;