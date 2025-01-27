import { cn } from "@/lib/utils";
import { ComponentType, MouseEventHandler, SVGProps } from "react";

export const WhiteButtonBase = ({
  message,
  onClick,
  Icon,
}: {
  message: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
  Icon?: ComponentType<SVGProps<SVGSVGElement>>;
}) => {
  return (
    <button
      type="button"
      className={cn(
        "relative my-1 -ml-px inline-flex w-full items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 first:ml-0 hover:bg-gray-50 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:my-0 sm:w-auto sm:first:rounded-l-md sm:first:rounded-r-none sm:last:rounded-l-none sm:last:rounded-r-md"
      )}
      onClick={onClick}
    >
      {Icon && (
        <Icon
          className="-ml-1 mr-2 h-5 w-5 text-gray-400"
          aria-hidden="true"
        />
      )}
      {message}
    </button>
  );
};
