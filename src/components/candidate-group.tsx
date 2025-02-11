"use client";

import { RefObject, useEffect, useRef, useState } from "react";
import {
  HiRefresh as RefreshIcon,
  HiSearch as SearchIcon,
} from "react-icons/hi";

import fuzzySearchStrings, { SearchResult } from "@lib/fuzzy-search";
import {
  FieldValues,
  useForm,
  useFormContext,
  UseFormRegister,
} from "react-hook-form";
import { CandidateOption } from "./candidate-option";
import { CandidateGroupType, Candidate, PositionEnum } from "@lib/types";
import startCase from "lodash.startcase";

import { Scrollbar } from "react-scrollbars-custom";
import { cn } from "@/lib/utils";
import { candidateGroup, overrideToEven } from "@/lib/style-variants";
import Confetti from "react-dom-confetti";

export const CandidateGroup = ({
  position,
  cityMuni,
  groupIndex,
  year,
}: CandidateGroupType) => {
  const { register: registerSearch, watch: watchSearch, setFocus } = useForm();
  const {
    register: registerOption,
    watch: watchOption,
    resetField: resetOption,
  } = useFormContext();
  const { candidates, voteFor } = cityMuni[position] as Candidate;
  const searchCandidates = fuzzySearchStrings(candidates);

  const searchBoxName = "search-" + position;
  const watchSearchBox = watchSearch(searchBoxName);
  const searchedCandidates = searchCandidates(watchSearchBox || "");
  const gridRows = Math.ceil(
    (searchedCandidates && searchedCandidates.length > 0
      ? searchedCandidates.length
      : candidates.length) / 4
  );

  const paddedCandidates =
    watchSearchBox && searchedCandidates.length > 0
      ? [
          ...candidates,
          ...(searchedCandidates.length > 4
            ? Array(gridRows * 4 - searchedCandidates.length)
            : Array(0)),
        ]
      : watchSearchBox && searchedCandidates.length === 0
        ? []
        : [...candidates, ...Array(gridRows * 4 - candidates.length)];

  const candidatesVoted = watchOption(position);
  const candidatesVotedCount =
    candidatesVoted && Array.isArray(candidatesVoted)
      ? candidatesVoted.length
      : candidatesVoted == null || candidatesVoted === false
        ? 0
        : 1;
  const remainingVotes = voteFor - candidatesVotedCount;

  const wrapperRef = useRef<Scrollbar & HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const [showSearch, setShowSearch] = useState<boolean>(false);

  const handleSearchButton = () => {
    requestAnimationFrame(() => setFocus(searchBoxName));
    setShowSearch((state) => !state);
  };

  const [contentHeight, setContentHeight] = useState(0);
  useEffect(() => {
    function handleResize() {
      const content = contentRef?.current;
      setContentHeight(content?.scrollHeight ?? 0);
      const width = Math.max(
        document.documentElement.clientWidth || 0,
        window.innerWidth || 0
      );

      /* Tailwind md reference: (min-width: 768px) */
      setWindowMedium(width >= 768);
    }

    window.addEventListener("resize", handleResize);
    handleResize();
  });

  const [isWindowMedium, setWindowMedium] = useState(false);

  // const { reward } = useReward(`confetti-${position}`, "confetti", {
  //   zIndex: 40,
  //   position: "absolute",
  //   decay: 0.9,
  //   spread: 180,
  //   startVelocity: 10,
  //   angle: 45,
  //   lifetime: 100,
  //   elementCount: 50,
  // });

  // useThrottleFn(
  //   (remainingVotes) => {
  //     if (remainingVotes === 0 && voteFor > 1) {
  //       reward();
  //     }
  //   },
  //   2000,
  //   [remainingVotes]
  // );
  /*   useEffect(() => {
    if (remainingVotes === 0) {
      // if (remainingVotes === 0 && voteFor > 1) {
      reward();
    }
  }, [remainingVotes, reward, voteFor]); */

  const confettiConfig = {
    spread: 135,
    startVelocity: 18,
    elementCount: 60,
    dragFriction: 0.2,
    duration: 600,
    stagger: 5,
    width: "10px",
    height: "10px",
    perspective: "550px",
    colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"],
  };

  const oddEven = Number(groupIndex) % 2 === 0 ? "odd" : "even";
  const { base, primary, chip, chipCircle, helperButton, search } =
    candidateGroup({
      year,
      oddEven,
    });

  return (
    <div
      className={cn(
        "relative",
        // Custom rules for ballot quirks
        overrideToEven(position, year)
          ? base({
              oddEven: "even",
            })
          : base()
      )}
    >
      <div className="sticky top-0 z-30">
        <div
          className={cn(
            "ml-[0.2rem] mr-1 flex items-center px-2 py-1",
            primary()
          )}
        >
          <div className="flex-grow">
            <div className="inline-flex gap-2">
              <h3 className={cn("font-bold leading-6 md:text-lg")}>
                {position}
              </h3>
              {candidatesVotedCount !== 0 && (
                <span
                  className={cn(
                    "my-0.5 hidden items-center rounded-md py-0.5 text-xs font-medium md:inline-flex md:rounded-full",
                    remainingVotes > 0 ? "px-2.5" : "px-[7px]",
                    chip()
                  )}
                >
                  <Confetti
                    active={remainingVotes === 0 && voteFor > 1}
                    config={{ ...confettiConfig, angle: 45 }}
                    className="z-50"
                  />

                  {remainingVotes > 0 && (
                    <svg
                      className={cn("-ml-0.5 mr-1.5 h-2 w-2", chipCircle())}
                      fill="currentColor"
                      viewBox="0 0 8 8"
                    >
                      <circle
                        cx={4}
                        cy={4}
                        r={3}
                      />
                    </svg>
                  )}
                  {remainingVotes > 0 ? String(remainingVotes) + " left" : "✓"}
                </span>
              )}
            </div>
            <p className={cn("max-w-4xl text-xs md:text-sm")}>
              Vote no more than {voteFor || 0}, or leave blank.{" "}
            </p>
          </div>
          <div className="relative z-0 flex flex-col-reverse items-center justify-center lg:flex-row lg:gap-2">
            <div className="my-auto block h-full md:hidden">
              {" "}
              {candidatesVotedCount !== 0 && (
                <span
                  className={cn(
                    "inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-medium lg:rounded-full",
                    chip()
                  )}
                >
                  <Confetti
                    active={remainingVotes === 0 && voteFor > 1}
                    config={{ ...confettiConfig, angle: 135 }}
                    className="z-50"
                  />

                  {remainingVotes > 0 && (
                    <svg
                      className={cn("-ml-0.5 mr-1.5 h-2 w-2", chipCircle())}
                      fill="currentColor"
                      viewBox="0 0 8 8"
                    >
                      <circle
                        cx={4}
                        cy={4}
                        r={3}
                      />
                    </svg>
                  )}
                  {remainingVotes > 0 ? String(remainingVotes) + " left" : "✓"}
                </span>
              )}
            </div>
            <div className="inline-flex rounded-md shadow-sm">
              <button
                type="button"
                className={cn(
                  "relative inline-flex items-center rounded-l-md border px-2 py-2 text-sm font-medium focus:z-10 focus:outline-none focus:ring-1",
                  helperButton()
                )}
                onClick={handleSearchButton}
              >
                <span className="sr-only">Search</span>
                <SearchIcon
                  className="h-5 w-5"
                  aria-hidden="true"
                />
              </button>
              <button
                type="button"
                className={cn(
                  "relative -ml-px inline-flex items-center rounded-r-md border px-2 py-2 text-sm font-medium focus:z-10 focus:outline-none focus:ring-1",
                  helperButton()
                )}
                onClick={() => resetOption(position)}
              >
                <span className="sr-only">Reset</span>
                <RefreshIcon
                  className="h-5 w-5"
                  aria-hidden="true"
                />
              </button>
            </div>
          </div>
        </div>
        <div
          className={cn(
            "poi relative mt-1 pl-[0.2rem] pr-1",
            !showSearch && "hidden"
          )}
        >
          <label
            htmlFor={searchBoxName}
            className="sr-only"
          >
            Search for {position}
          </label>
          <div
            className={cn(
              "pointer-events-none absolute inset-y-[1px] left-[1px] ml-[0.2rem] flex items-center px-2",
              primary()
            )}
          >
            <SearchIcon
              className="h-5 w-5"
              aria-hidden="true"
            />
          </div>
          <input
            type="search"
            id={searchBoxName}
            className={cn(
              "block h-full w-full border-x pl-12 text-sm",
              search()
            )}
            placeholder={"Search for a " + startCase(position)}
            {...registerSearch(searchBoxName)}
          />
        </div>
      </div>
      <div className="mb-2 ml-[3.2px] mr-1 mt-1">
        {contentHeight > 384 && !isWindowMedium ? (
          <Scrollbar
            style={{
              height: contentHeight + 2,
              maxHeight: isWindowMedium ? undefined : 384,
              width: "100%",
              overflowX: "clip",
              border: "0.1px solid rgb(209 213 219)",
            }}
            ref={wrapperRef}
            noScrollX={true}
            disableTrackYWidthCompensation={true}
            disableTrackXWidthCompensation={true}
          >
            <CandidateList
              watchSearchBox={watchSearchBox}
              searchedCandidates={searchedCandidates}
              gridRows={gridRows}
              contentRef={contentRef}
              paddedCandidates={paddedCandidates}
              position={position}
              voteFor={voteFor}
              registerOption={registerOption}
              candidatesVoted={candidatesVoted}
              remainingVotes={remainingVotes}
            />
          </Scrollbar>
        ) : (
          <CandidateList
            watchSearchBox={watchSearchBox}
            searchedCandidates={searchedCandidates}
            gridRows={gridRows}
            contentRef={contentRef}
            paddedCandidates={paddedCandidates}
            position={position}
            voteFor={voteFor}
            registerOption={registerOption}
            candidatesVoted={candidatesVoted}
            remainingVotes={remainingVotes}
            className="ml-px"
          />
        )}
      </div>
    </div>
  );
};

function CandidateList({
  watchSearchBox,
  searchedCandidates,
  gridRows,
  contentRef,
  paddedCandidates,
  position,
  voteFor,
  registerOption,
  candidatesVoted,
  remainingVotes,
  className = "",
}: {
  watchSearchBox: string;
  searchedCandidates: string[] | SearchResult<string>[];
  gridRows: number;
  contentRef: RefObject<HTMLDivElement | null>;
  paddedCandidates: string[];
  position: PositionEnum;
  voteFor: number;
  registerOption: UseFormRegister<FieldValues>;
  candidatesVoted: string[];
  remainingVotes: number;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid md:grid-flow-col",
        (!watchSearchBox ||
          watchSearchBox === "" ||
          searchedCandidates.length > 4) &&
          "md:grid-cols-4",
        className
      )}
      style={{
        gridTemplateRows: `repeat(${gridRows}, minmax(0, 1fr))`,
      }}
      ref={contentRef}
    >
      {paddedCandidates && paddedCandidates.length > 0 ? (
        paddedCandidates.map((candidate, index) => (
          <CandidateOption
            {...{ candidate, index, position, voteFor }}
            key={"candidateContainer-" + (candidate || "blank-" + index)}
            register={registerOption}
            selected={
              Array.isArray(candidatesVoted)
                ? candidatesVoted.includes(candidate)
                : candidatesVoted === candidate
            }
            className={
              watchSearchBox &&
              searchedCandidates.findIndex(
                (searchResult) =>
                  (searchResult as SearchResult<string>).item === candidate
              ) === -1
                ? "hidden"
                : ""
            }
            remainingVotes={remainingVotes}
          />
        ))
      ) : (
        <div className="-ml-px -mt-px flex flex-col items-center justify-center border-[1px] border-gray-300 px-2 py-1 text-sm font-medium text-gray-700 md:row-span-2">
          <p className="text-md font-bold">
            Sorry, no candidates match your search.
          </p>
          <p className="text-sm">Please try again.</p>
        </div>
      )}
    </div>
  );
}
