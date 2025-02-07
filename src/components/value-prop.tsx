import TextLoop from "./text-loop";
import { cn } from "@/lib/utils";

export const ValueProp = () => {
  return (
    <h2
      className={cn(
        "mx-auto mt-0 flex flex-col justify-center gap-x-2 text-center text-sm sm:text-base md:text-xl xl:mt-0 xl:flex-row"
      )}
    >
      <span className="">will help you </span>
      {/* <TextLoop> */}
      <span className="font-bold">
        <TextLoop duration={3}>
          <span>🗳 vote quicker on May.</span>
          <span>🤔 see your ballot ahead of time.</span>
          <span>📃 create your own election kodigo.</span>
        </TextLoop>
      </span>
    </h2>
  );
};
