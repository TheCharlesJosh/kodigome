import { cn } from "@/lib/utils";

export function Instructions({ isSidebar = false }: { isSidebar?: boolean }) {
  return (
    <div className={cn("my-8", !isSidebar && "px-8")}>
      <h2
        className={cn(
          "font-semibold",
          !isSidebar && "text-sm sm:text-base md:text-lg"
        )}
      >
        Simply follow these steps:
      </h2>
      <ol
        className={cn(
          "list-inside list-decimal",
          !isSidebar && "text-sm sm:text-base md:text-lg"
        )}
      >
        <li className="mt-2">
          <span>Browse the kodigo!</span>
          <span className="my-1 ml-1 block border-l-4 border-slate-300 pl-2 text-xs italic text-gray-600 sm:text-sm">
            The layout is similar to the actual ballot for your ease of use.
          </span>
        </li>
        <li className="mt-2">
          Check and select candidates who you want to vote for.{" "}
          <span className="ml-1 block border-l-4 border-slate-300 pl-2 text-xs italic text-gray-600 sm:text-sm">
            Too many candidates to scroll through? Click the Search icon.
          </span>
        </li>
        <li className="mt-2">
          Save for later, print, or share your kodigo!{" "}
          <span className="ml-1 block border-l-4 border-slate-300 pl-2 text-xs italic text-gray-600 sm:text-sm">
            You may choose to abstain/undervote and still generate a kodigo.
          </span>
        </li>
      </ol>
    </div>
  );
}
