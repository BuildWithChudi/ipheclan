/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ik.imagekit.io",
        pathname: "/chewdee/**",
      },
    ],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
