import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  // Lets the page render a static shell and stream the listings in, so the
  // header and title paint without waiting on the Funda feed.
  cacheComponents: true,
  experimental: {
    optimizePackageImports: ["@phosphor-icons/react"],
  },
  cacheLife: {
    fundaListings: {
      stale: 60,
      revalidate: 300,
      expire: 3600,
    },
  },
  images: {
    // AVIF first: roughly 20% smaller than WebP for photography, which is
    // nearly the whole payload of this site. Browsers without AVIF get WebP.
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cloud.funda.nl",
        pathname: "/valentina_media/**",
      },
    ],
  },
};

export default nextConfig;
