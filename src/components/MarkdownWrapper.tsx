import Link from "next/link";
import { ComponentProps } from "react";
import Markdown from "react-markdown";

import { UrlObject } from "url";
declare type Url = string | UrlObject;

const MarkdownWrapper = (props: ComponentProps<typeof Markdown>) => {
  return (
    <Markdown
      components={{
        a: ({ children, href, className, ...props }) => (
          <Link
            href={href as Url}
            {...props}
          >
            {children}
          </Link>
        ),
      }}
      {...props}
    >
      {props.children}
    </Markdown>
  );
};

export default MarkdownWrapper;
