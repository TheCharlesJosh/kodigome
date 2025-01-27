// import { TextLoop } from 'react-text-loop-next'
import clsx from "clsx";
import TextLoop from "./text-loop";
// import { TextLoop } from "react-text-loop-ts";

export const ValueProp = () => {
  return (
    <h2
      className={clsx(
        "mx-auto mt-0 flex flex-col justify-center gap-x-2 text-center text-sm sm:text-base md:text-xl xl:mt-0 xl:flex-row"
      )}
    >
      <span className="">will help you </span>
      {/* <TextLoop> */}
      <span className="font-bold">
        {/* <TextLoop
          texts={[
            "🗳 vote quicker on May.",
            "🤔 see your ballot ahead of time.",
            "📃 create your own election kodigo.",
          ]}/> */}
        <TextLoop>
          <span>🗳 vote quicker on May.</span>
          <span>🤔 see your ballot ahead of time.</span>
          <span>📃 create your own election kodigo.</span>
        </TextLoop>
      </span>

      {/* <span> 🗳 vote quicker on May 9.</span>
        <span className="font-bold">🤔 see your ballot ahead of time.</span>
        <span className="font-bold">📃 create your own election kodigo.</span> */}
      {/* </TextLoop> */}
    </h2>
  );
};
