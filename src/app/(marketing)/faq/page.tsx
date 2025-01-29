import { generatePageMeta } from "@/lib/meta";
import FAQ from "./faq.mdx";
import { ReactNode } from "react";
import { HiChevronDown } from "react-icons/hi";

export const metadata = generatePageMeta({
  title: "Frequently Asked Questions",
  description: "Here are some frequently asked questions about kodigo.me",
});

export const Details = ({ children }: { children: ReactNode }) => (
  <details className="group pt-6 [&_summary_span_svg]:open:-rotate-180">
    {children}
  </details>
);

export const Panel = ({ children }: { children: ReactNode }) => (
  <dd className="prose prose-indigo mt-2 pr-12">{children}</dd>
);

export const Summary = ({ children }: { children: ReactNode }) => (
  <summary className="flex w-full items-start justify-between text-left text-gray-400">
    <dt className="text-lg font-bold text-gray-900">{children}</dt>
    <span className="ml-6 flex h-7 items-center">
      <HiChevronDown
        className="h-6 w-6"
        aria-hidden="true"
      />
    </span>
  </summary>
);

const styledComponents = {
  h1: ({ children }: { children: ReactNode }) => (
    <h2 className="max-w-prose text-center text-xl font-semibold uppercase tracking-tight text-indigo-600">
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
          <h2 className="max-w-prose text-center text-xl font-semibold uppercase tracking-tight text-indigo-600">
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
