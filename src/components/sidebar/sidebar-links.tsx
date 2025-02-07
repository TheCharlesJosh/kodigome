import Link from "next/link";
import { HiOutlineExternalLink } from "react-icons/hi";
import Links from "./links.mdx";
import { HTMLProps, ReactNode } from "react";
import { BASE_URL } from "@/lib/constants";
import { cn } from "@/lib/utils";

const styledComponents = {
  h4: ({ children }: { children: ReactNode }) => (
    <h4 className="font-bold">{children}</h4>
  ),
  a: ({ href, children }: HTMLProps<HTMLAnchorElement>) => {
    const linkHref = new URL(href ?? "", BASE_URL);
    const isExternal = linkHref.origin !== BASE_URL;

    return (
      <Link
        href={href ?? ""}
        className="hover:text-primary-600 cursor-pointer"
        target={isExternal ? "_blank" : ""}
      >
        {children}
        {isExternal ? (
          <>
            {" "}
            <HiOutlineExternalLink className="-mt-px inline h-4 w-4" />
          </>
        ) : null}
      </Link>
    );
  },
};

export const SidebarLinks = ({ footer = false }: { footer?: boolean }) => {
  return (
    <div className={cn(!footer && "my-8", footer && "flex-grow")}>
      <ul
        className={cn(
          "flex flex-col justify-between gap-4 text-sm leading-6 text-gray-500 transition-colors",
          footer && "md:flex-row"
        )}
      >
        <Links components={styledComponents} />
      </ul>
    </div>
  );
};
