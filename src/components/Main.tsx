import { NationalCandidates } from "./national-candidates";
import { LocalCandidates } from "./local-candidates";
import { SaveShareButton } from "./save-share-button";
import { FieldValues, UseFormReset } from "react-hook-form";
import { BaseSyntheticEvent, RefObject } from "react";
import { StartOverButton } from "./start-over-button";

import UpperFold from "./upper-fold";
import { MegapackType } from "@/lib/types";

const Main = ({
  reset,
  onSubmit,
  saveKey,
  sharePage = false,
  ballotRef,
  mainLogoRef,
  megapack,
}: {
  reset: UseFormReset<FieldValues>;
  onSubmit: (
    e?: BaseSyntheticEvent<object, unknown, unknown> | undefined
  ) => Promise<void>;
  saveKey: string | null;
  sharePage?: boolean;
  ballotRef: RefObject<HTMLDivElement | null>;
  mainLogoRef: RefObject<HTMLDivElement | null>;
  megapack: MegapackType;
}) => {
  return (
    <>
      <UpperFold
        mainLogoRef={mainLogoRef}
        sharePage={sharePage}
        saveKey={saveKey}
        megapack={megapack}
      />
      <div
        className="mt-0 border-y-2 border-l-8 border-r-8 border-dashed border-gray-400 px-4 xl:border-y-0 xl:border-l-0 xl:border-r-0"
        id="national"
        ref={ballotRef}
      >
        <NationalCandidates megapack={megapack} />
        <LocalCandidates megapack={megapack} />
      </div>

      <div className="my-8 flex w-full flex-col justify-center gap-2 py-4">
        <p className="text-center text-gray-500">
          🎉 Yay! Are you done filling up your kodigo?
        </p>
        <div className="flex w-full flex-row justify-center gap-2">
          <SaveShareButton
            onSubmit={onSubmit}
            saveKey={saveKey}
            megapack={megapack}
          />
          <StartOverButton reset={reset} />
        </div>
      </div>
    </>
  );
};

export default Main;
