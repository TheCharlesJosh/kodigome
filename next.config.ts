import type { NextConfig } from "next";
import remarkGfm from "remark-gfm";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [],
  },
  // Add markdown plugins here, as desired
});

export default withMDX(nextConfig);
