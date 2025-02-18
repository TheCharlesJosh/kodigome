import { generatePageMeta } from "@/lib/meta";
import Privacy from "./privacy.mdx";
import { ReactNode } from "react";

export const metadata = generatePageMeta({
  title: "Privacy Policy",
  description: "Privacy Policy: No Stored Information",
});

const styledComponents = {
  h1: ({ children }: { children: ReactNode }) => (
    <h2 className="text-primary-600 max-w-prose text-center text-xl font-semibold uppercase tracking-tight">
      {children}
    </h2>
  ),
  strong: ({ children }: { children: ReactNode }) => (
    <span className="font-semibold">{children}</span>
  ),
};

export default function Page() {
  return (
    <div className="prose-primary prose mx-4 mb-8 pt-4 text-gray-800 xl:prose-lg xl:mx-auto">
      <Privacy components={styledComponents} />
    </div>
  );
}
