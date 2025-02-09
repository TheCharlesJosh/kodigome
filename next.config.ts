import type { NextConfig } from "next";
import createMDX from "@next/mdx";
import remarkGfm from "remark-gfm";

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  images: {
    localPatterns: [
      {
        pathname: "/*/png/**",
        search: "",
      },
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "kodigo.me",
      },
    ],
    // domains: ["localhost", BASE_DOMAIN, "kodigo.me"],
  },
  poweredByHeader: false,
  async redirects() {
    return [
      {
        source: "/",
        destination: "/2025",
        permanent: true,
      },
      {
        source: "/share/:id*",
        destination: "/2022/:id*",
        permanent: true,
      },
      {
        source: "/render/:id*",
        destination: "/2022/:id*",
        permanent: true,
      },
      {
        source: "/og/:id*",
        destination: "/2022/:id*",
        permanent: true,
      },
      {
        source: "/api/og/:id*",
        destination: "/2022/og/:id*",
        permanent: true,
      },
      {
        source: "/api/pdf/:id*",
        destination: "/2022/pdf/:id*",
        permanent: true,
      },
      {
        source: "/api/png/:id*",
        destination: "/2022/png/:id*",
        permanent: true,
      },
    ];
  },
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [],
  },

  // Add markdown plugins here, as desired
});

// const withBundleAnalyzer = require("@next/bundle-analyzer")({
//   enabled: process.env.ANALYZE === "true",
// });

// export default withBundleAnalyzer(withMDX(nextConfig));

export default withMDX(nextConfig);
