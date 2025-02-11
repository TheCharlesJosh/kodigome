/** @type {import('next').NextConfig} */
import type { NextConfig } from "next";
import bundleAnalyzer from "@next/bundle-analyzer";
import createMDX from "@next/mdx";
import remarkGfm from "remark-gfm";
import path from "path";

const __dirname = new URL(".", import.meta.url).pathname;

const scriptSiteList: string[] = [];

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
  webpack(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": path.resolve(__dirname, "./src"),
      "@publc": path.resolve(__dirname, "./public"),
      "@lib": path.resolve(__dirname, "./src/lib"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@/components": path.resolve(__dirname, "./src/components"),
    };
    // config.resolve.alias["@"] = path.resolve(__dirname, "src");
    // config.resolve.alias["@public"] = path.resolve(__dirname, "public");
    // config.resolve.alias["@lib"] = path.resolve(__dirname, "src/lib");
    // config.resolve.alias["@components"] = path.resolve(
    //   __dirname,
    //   "src/components"
    // );
    return config;
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
