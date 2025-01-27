import { NationalCandidates } from "./NationalCandidates";
import { LocalCandidates } from "./LocalCandidates";
import { SaveShareButton } from "./save-share-button";
import { FieldValues, UseFormReset } from "react-hook-form";
import {
  BaseSyntheticEvent,
  // Dispatch,
  RefObject,
  // SetStateAction
} from "react";
import { StartOverButton } from "./start-over-button";

import UpperFold from "./UpperFold";
// import { InView } from 'react-intersection-observer'

// const Main = ({
//   initialValues = {},
// }: {
//   initialValues?: CandidateGroupValues
// }) => {
const Main = ({
  reset,
  onSubmit,
  saveKey,
  // mainLogoVisible,
  // setMainLogoVisible,
  sharePage = false,
  ballotRef,
  mainLogoRef,
}: // setBallotVisible,
{
  reset: UseFormReset<FieldValues>;
  onSubmit: (
    e?: BaseSyntheticEvent<object, unknown, unknown> | undefined
  ) => Promise<void>;
  saveKey: string | null;
  // mainLogoVisible: boolean
  // setMainLogoVisible: Dispatch<SetStateAction<boolean>>
  sharePage?: boolean;
  ballotRef: RefObject<HTMLDivElement | null>;
  mainLogoRef: RefObject<HTMLDivElement | null>;
  // setBallotVisible: Dispatch<SetStateAction<boolean>>
}) => {
  // function handleVisibility(inView: boolean) {
  //   setBallotVisible(inView)
  // }

  return (
    <>
      <UpperFold
        // mainLogoVisible={mainLogoVisible}
        // setMainLogoVisible={setMainLogoVisible}
        mainLogoRef={mainLogoRef}
        sharePage={sharePage}
        saveKey={saveKey}
      />

      {/* <InView
        as="div"
        className="mt-0 border-y-2 border-l-8 border-r-8 border-dashed border-gray-400 px-4 xl:border-y-0 xl:border-l-0 xl:border-r-0"
        id="national"
        onChange={handleVisibility}
      > */}
      <div
        className="mt-0 border-y-2 border-l-8 border-r-8 border-dashed border-gray-400 px-4 xl:border-y-0 xl:border-l-0 xl:border-r-0"
        id="national"
        ref={ballotRef}
      >
        {/* <div className="mt-12 border-y-2 border-l-8 border-r-8 border-dashed border-gray-400 px-4 lg:col-span-3 lg:col-start-2 lg:mt-0 lg:max-h-screen lg:overflow-y-auto lg:border-y-0"> */}
        <NationalCandidates />
        <LocalCandidates />
      </div>
      {/* </InView> */}

      <div className="my-8 flex w-full flex-col justify-center gap-2 py-4">
        <p className="text-center text-gray-500">
          🎉 Yay! Are you done filling up your kodigo?
        </p>
        <div className="flex w-full flex-row justify-center gap-2">
          <SaveShareButton
            onSubmit={onSubmit}
            saveKey={saveKey}
          />
          <StartOverButton reset={reset} />
        </div>
      </div>
    </>
  );
};

export default Main;
