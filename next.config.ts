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
    fundaDetail: {
      stale: 300,
      revalidate: 1800,
      expire: 86400,
    },
    // A listing we could not find may still be lagging behind in the Funda feed.
    fundaMissing: {
      stale: 30,
      revalidate: 60,
      expire: 300,
    },
  },
  images: {
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
