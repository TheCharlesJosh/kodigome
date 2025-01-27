import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import { Url } from "url";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    a: ({ children, href, className, ...props }) => (
      <Link
        href={href as Url}
        {...props}
      >
        {children}
      </Link>
    ),
    ...components,
  };
}
