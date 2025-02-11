/** @type {import('next').NextConfig} */
import type { NextConfig } from "next";
import bundleAnalyzer from "@next/bundle-analyzer";
import createMDX from "@next/mdx";
import remarkGfm from "remark-gfm";

const scriptSiteList: string[] = ["cdn.jsdelivr.net"];

const styleSiteList: string[] = ["fonts.googleapis.com"];

const imageSiteList: string[] = [];

const frameSiteList: string[] = [];

const cspHeader = `
    default-src 'none';
    script-src 'self' 'unsafe-eval' 'unsafe-inline' ${scriptSiteList.join(" ")};
    style-src 'self' 'unsafe-inline' ${styleSiteList.join(" ")};
    font-src 'self' fonts.gstatic.com data:;
    img-src 'self' blob: data: ${imageSiteList.join(" ")};
    worker-src 'self' blob:;
    object-src 'self';
    manifest-src 'self';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'self';
    frame-src ${frameSiteList.join(" ")};
    connect-src 'self' ${scriptSiteList.join(" ")};
    ${process.env.VERCEL_ENV === "production" || process.env.VERCEL_ENV === "preview" ? "upgrade-insecure-requests;" : ""}
`;

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "standalone",
  poweredByHeader: false,
  // productionBrowserSourceMaps: true,
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  images: {
    localPatterns: [
      {
        pathname: "/*/png/**",
        search: "",
      },
      {
        pathname: "/images/**",
        search: "",
      },
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "kodigo.me",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/png/:path*",
        destination: "/2022/png",
      },
      {
        source: "/api/og/:path*",
        destination: "/2022/og",
      },
    ];
  },
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
        source: "/api/pdf/:id*",
        destination: "/2022/pdf/:id*",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: cspHeader.replace(/\n/g, ""),
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
        ],
      },
    ];
  },
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkGfm],
    // rehypePlugins: [],
  },

  // Add markdown plugins here, as desired
});

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

export default withBundleAnalyzer(withMDX(nextConfig));

// export default withMDX(nextConfig);
