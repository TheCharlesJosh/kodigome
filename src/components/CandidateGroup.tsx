"use client";

import { RefObject, useEffect, useRef, useState } from "react";
import clsx from "clsx";
import {
  HiRefresh as RefreshIcon,
  HiSearch as SearchIcon,
} from "react-icons/hi";

import fuzzySearchStrings, { SearchResult } from "../lib/fuzzy-search";
import {
  FieldValues,
  useForm,
  useFormContext,
  UseFormRegister,
} from "react-hook-form";
import { CandidateOption } from "./CandidateOption";
import {
  CandidateGroupType,
  Candidate,
  PositionEnum,
} from "../lib/CandidateTypes";
import startCase from "lodash.startcase";

import { Scrollbar } from "react-scrollbars-custom";

export const CandidateGroup = ({
  position,
  cityMuni,
  groupIndex,
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
          // ...searchedCandidates.map(
          //   (candidate) => (candidate as SearchResult<string>).item
          // ),
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

  // const wrapperRef = useRef<HTMLDivElement>(null)
  const wrapperRef = useRef<Scrollbar & HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  // const shadowTopRef = useRef<HTMLDivElement>(null)
  // const shadowBottomRef = useRef<HTMLDivElement>(null)

  const [showSearch, setShowSearch] = useState<boolean>(false);

  const handleSearchButton = () => {
    requestAnimationFrame(() => setFocus(searchBoxName));
    setShowSearch((state) => !state);
  };

  // const wrapper = wrapperRef?.current
  // const content = contentRef?.current
  // const contentHeight = content?.scrollHeight ?? 0
  // const maxHeight = wrapper?.offsetHeight ?? 0
  // const contentHeight = contentRef?.current?.scrollHeight ?? 0
  // const maxHeight = wrapperRef?.current?.offsetHeight ?? 0
  // const [wrapperScrollTop, setWrapperScrollTop] = useState(0)
  const [contentHeight, setContentHeight] = useState(0);
  // const [_maxHeight, setMaxHeight] = useState(0)

  // const [scrollTop, scrollProps] = useScrollTop()

  useEffect(() => {
    function handleResize() {
      // const wrapper = wrapperRef?.current
      const content = contentRef?.current;
      setContentHeight(content?.scrollHeight ?? 0);
      // setMaxHeight(wrapper?.offsetHeight ?? 0)
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
  // useEffect(() => {
  /* Tailwind md reference: (min-width: 768px) */
  //   const mediaMatcher = window.matchMedia('(min-width: 768px)')
  //   function handleChange(event: MediaQueryListEvent) {
  //     setWindowMedium(event.matches)
  //     console.log(event.matches)
  //   }

  //   mediaMatcher.addEventListener('change', handleChange)
  // })

  // useEffect(() => {
  // const wrapper = wrapperRef?.current
  // const content = contentRef?.current
  // const contentHeight = content?.scrollHeight || 0
  // const maxHeight = wrapper?.offsetHeight || 0
  // const contentScrollTop = content?.scrollTop || 0

  // console.log(wrapper)

  // setContentHeight(content?.scrollHeight ?? 0)
  // setMaxHeight(wrapper?.offsetHeight ?? 0)

  // wrapper?.addEventListener('scroll', () => {
  // console.log(
  //   wrapper.scrollTop,
  //   contentHeight,
  //   maxHeight,
  //   wrapper.scrollTop / (contentHeight - maxHeight)
  // )
  // setWrapperScrollTop(wrapper.scrollTop ?? 0)
  // setContentHeight(content.scrollHeight ?? 0)
  // setMaxHeight(wrapper.offsetHeight ?? 0)
  // console.log(
  //   content.scrollTop,
  //   wrapperScrollTop,
  //   contentHeight,
  //   maxHeight,
  //   (wrapperScrollTop ?? 0 / (contentHeight - maxHeight)).toFixed(2)
  // )
  // console.log(wrapper.scrollTop, contentHeight, maxHeight)
  //   })
  // }, [wrapperRef, contentRef])

  // useEffect(() => {
  //   const wrapper = wrapperRef?.current
  //   const content = contentRef?.current
  //   const shadowTop = shadowTopRef?.current
  //   const shadowBottom = shadowBottomRef?.current
  //   const contentScrollHeight =
  //     content?.scrollHeight ?? 0 - wrapper?.offsetHeight ?? 0

  //   content &&
  //     shadowTop &&
  //     shadowBottom &&
  //     content.addEventListener('scroll', () => {
  //       var currentScroll = content.scrollTop / contentScrollHeight
  //       shadowTop.style.opacity = String(currentScroll)
  //       shadowBottom.style.opacity = String(1 - currentScroll)
  //     })

  //   // setVotesLength(votesEl?.current?.textContent?.length ?? 0)
  // }, [wrapperRef, contentRef, shadowTopRef, shadowBottomRef])

  return (
    <div className="relative">
      {/* <Lottie
        loop
        animationData={scrollHint}
        play
        className={clsx(
          'pointer-events-none absolute bottom-4 right-2 z-20 w-8 opacity-0 transition-all',
          wrapperScrollTop === 0 && 'animate-bounce',
          contentHeight > maxHeight && 'opacity-100'
        )}
      ></Lottie> */}
      {/* <div
        className="bg-red absolute top-0 left-0 z-10 h-4 w-full"
        style={{
          background:
            'linear-gradient(180deg, rgba(0, 0, 0, 0.35), transparent)',
        }}
        ref={shadowTopRef}
      ></div>
      <div
        className="bg-red absolute bottom-0 left-0 z-10 h-4 w-full"
        style={{
          background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.35), transparent)',
        }}
        ref={shadowBottomRef}
      ></div> */}
      <div className="sticky top-0 z-30">
        <div
          className={clsx(
            "ml-[0.2rem] mr-1 flex items-center px-2 py-1",
            groupIndex && groupIndex % 2 === 1 ? "bg-green-600" : "bg-blue-600"
          )}
        >
          <div className="flex-grow">
            <h3 className="font-bold leading-6 text-white md:text-lg">
              {position}
              {/* {position} {wrapperScrollTop} {contentHeight} {maxHeight}{' '}
              {wrapperScrollTop / (contentHeight - maxHeight)} */}
            </h3>
            <p className="max-w-4xl text-xs text-white md:text-sm">
              Vote no more than {voteFor || 0}, or leave blank.{" "}
              {/* {candidatesVotedCount
                ? '(' + String(remainingVotes) + ' more)'
                : ''} */}
            </p>
          </div>
          <div className="relative z-0 flex flex-col-reverse items-center justify-center lg:flex-row lg:gap-2">
            <div className="my-auto h-full">
              {" "}
              {candidatesVotedCount !== 0 && (
                <span
                  className={clsx(
                    "inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-medium lg:rounded-full",
                    groupIndex && groupIndex % 2 === 1
                      ? "bg-green-800 text-green-50"
                      : "bg-blue-800 text-blue-50"
                  )}
                >
                  {remainingVotes > 0 && (
                    <svg
                      className={clsx(
                        "-ml-0.5 mr-1.5 h-2 w-2",
                        groupIndex && groupIndex % 2 === 1
                          ? "text-green-400"
                          : "text-blue-400"
                      )}
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
                className={clsx(
                  "relative inline-flex items-center rounded-l-md border px-2 py-2 text-sm font-medium focus:z-10 focus:outline-none focus:ring-1",
                  groupIndex && groupIndex % 2 === 1
                    ? "border-green-300 bg-green-800 text-green-100 hover:bg-green-900 focus:border-green-400 focus:ring-green-400"
                    : "border-blue-300 bg-blue-800 text-blue-100 hover:bg-blue-900 focus:border-blue-400 focus:ring-blue-400"
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
                className={clsx(
                  "relative -ml-px inline-flex items-center rounded-r-md border px-2 py-2 text-sm font-medium focus:z-10 focus:outline-none focus:ring-1",
                  groupIndex && groupIndex % 2 === 1
                    ? "border-green-300 bg-green-800 text-green-100 hover:bg-green-900 focus:border-green-400 focus:ring-green-400"
                    : "border-blue-300 bg-blue-800 text-blue-100 hover:bg-blue-900 focus:border-blue-400 focus:ring-blue-400"
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
            {/* <button
            type="button"
            className="inline-flex items-center rounded-full border border-transparent bg-white p-1.5 text-gray-500 shadow-sm hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            onClick={() => resetOption(position)}
          >
            <RefreshIcon className="h-5 w-5" aria-hidden="true" />
          </button> */}
          </div>
        </div>
        <div
          // className={clsx('relative pl-[0.2rem] pr-1')}
          className={clsx(
            "relative mt-1 pl-[0.2rem] pr-1",
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
            className={clsx(
              "pointer-events-none absolute inset-y-0 left-0 ml-[0.2rem] flex items-center px-2",
              groupIndex && groupIndex % 2 === 1
                ? "bg-green-600"
                : "bg-blue-600"
            )}
          >
            <SearchIcon
              className="h-5 w-5 text-white"
              aria-hidden="true"
            />
          </div>
          <input
            type="search"
            id={searchBoxName}
            className={clsx(
              "block h-full w-full border-x pl-12 text-sm",
              groupIndex && groupIndex % 2 === 1
                ? "border-green-300 bg-green-50 focus:border-green-700 focus:ring-green-700"
                : "border-blue-300 bg-blue-50 focus:border-blue-700 focus:ring-blue-700"
            )}
            placeholder={"Search for a " + startCase(position)}
            {...registerSearch(searchBoxName)}
          />
        </div>
      </div>
      {/* <div className="max-h-64 overflow-y-auto overflow-x-clip md:max-h-fit"> */}
      {/* <div
        className={clsx(
          // 'relative -mt-1 mb-2 w-full p-1'
          'mb-2 max-h-96 overflow-y-auto overflow-x-clip p-1 md:max-h-fit md:overflow-auto',
          contentHeight > maxHeight && 'border-b-8 border-gray-200'
        )}
        style={{
          borderBottomWidth:
            contentHeight > maxHeight
              ? `${Math.round(
                  (wrapperScrollTop / (contentHeight - maxHeight) ?? 0.0) *
                    8.0 +
                    2.0
                )}px`
              : 'none',
          // borderColor: `rgb(209 213 219 / ${
          //   (1 - wrapperScrollTop / (contentHeight - maxHeight)).toFixed(2) ?? 1
          // })`,
        }}
        // style={{ borderImage: 'linear-gradient(#f6b73c, #4d9f0c) 30' }}
        ref={wrapperRef}
        {...scrollProps}
        // style={{ boxShadow: '1px 45px 35px -40px rgba(0,0,0,1) inset' }}
      > */}
      {/* <div className="max-h-64 overflow-y-auto overflow-x-clip md:max-h-fit"> */}
      {/* <div
          className="bg-red absolute top-0 left-0 z-10 h-4 w-full"
          style={{
            background:
              'linear-gradient(180deg, rgba(0, 0, 0, 0.35), transparent)',
          }}
          ref={shadowTopRef}
        ></div>
        <div
          className="bg-red absolute bottom-0 left-0 z-10 h-4 w-full"
          style={{
            background:
              'linear-gradient(0deg, rgba(0, 0, 0, 0.35), transparent)',
          }}
          ref={shadowBottomRef}
        ></div> */}
      {/* <div className="shadow--bottom shadow" ref={shadowBottomRef}></div> */}
      {/* <div className="absolute right-0">
          <Image src={scrollhint} width={50} height={300} />
        </div> */}
      <div className="mb-2 ml-[3.2px] mr-1 mt-1">
        {contentHeight > 384 && !isWindowMedium ? (
          <Scrollbar
            style={{
              height: contentHeight + 2,
              maxHeight: isWindowMedium ? undefined : 384,
              width: "100%",
              overflowX: "clip",
              border: "0.1px solid rgb(209 213 219)",
              // borderLeft: '1px solid rgb(209 213 219)',
              // borderTop: '1px solid rgb(209 213 219)',
              // borderRight:
              //   contentHeight > 384 ? '1px solid rgb(209 213 219)' : 'none',
              // borderBottom:
              //   contentHeight > 384 ? '1px solid rgb(209 213 219)' : 'none',
            }}
            // className="max-h-64 md:max-h-fit"
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

      {/* </div> */}
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
      className={clsx(
        "grid md:grid-flow-col",
        (!watchSearchBox ||
          watchSearchBox === "" ||
          searchedCandidates.length > 4) &&
          "md:grid-cols-4",
        // 'max-h-96 overflow-y-auto overflow-x-clip md:max-h-fit md:overflow-auto',
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
            // {...{ index, position, voteFor }}
            // candidate={
            //   candidate +
            //   ' ' +
            //   searchedCandidates.findIndex(
            //     (searchResult) => searchResult.item === candidate
            //   )
            // }
            key={"candidateContainer-" + (candidate || "blank-" + index)}
            register={registerOption}
            selected={
              Array.isArray(candidatesVoted)
                ? candidatesVoted.includes(candidate)
                : candidatesVoted === candidate
            }
            // className={searchedCandidates.findIndex(searchResult => searchResult.item === candidate) ? '' : 'hidden'}
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

// function useScrollTop() {
//   const [scrollTop, setScrollTop] = useState(0)
//   const onScroll = (event: UIEvent<HTMLDivElement>) =>
//     setScrollTop(event.currentTarget.scrollTop)
//   return [scrollTop, { onScroll }]
// }
