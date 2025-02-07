import { ReactNode } from "react";
import { HiChevronDown } from "react-icons/hi";

export const Details = ({ children }: { children: ReactNode }) => (
  <details className="group pt-6 [&_summary_span_svg]:open:-rotate-180">
    {children}
  </details>
);

export const Panel = ({ children }: { children: ReactNode }) => (
  <dd className="prose-primary prose mt-2 pr-12">{children}</dd>
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
