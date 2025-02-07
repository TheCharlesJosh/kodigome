import { generatePageMeta } from "@/lib/meta";
import FAQ from "./faq.mdx";
import { ReactNode } from "react";

export const metadata = generatePageMeta({
  title: "Frequently Asked Questions",
  description: "Here are some frequently asked questions about kodigo.me",
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
    <div className="mx-4 xl:mx-8">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-3xl divide-y-2 divide-gray-200">
          <h2 className="text-primary-600 max-w-prose text-center text-xl font-semibold uppercase tracking-tight">
            Frequently asked questions
          </h2>
          <dl className="mt-6 space-y-6 divide-y divide-gray-200">
            <FAQ components={styledComponents} />
          </dl>
        </div>
      </div>
    </div>
  );
}
