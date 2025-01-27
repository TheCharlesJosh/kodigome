import clsx from "clsx";
import { ReactNode } from "react";
import { BASE_URL } from "../lib/constants";
import national from "@public/candidates/national.json";
import orderedCandidateMap from "@public/candidates/orderedCandidateMap.json";

interface CandidateOptionProps {
  children: ReactNode;
  header?: boolean;
  index?: number;
  className?: string;
}

export const CandidateOption = (props: CandidateOptionProps) => (
  <div
    className={clsx(
      "border border-black px-1 text-sm",
      props.header && "flex items-center font-semibold text-white",
      props.header &&
        props.index !== undefined &&
        Number.isInteger(props.index) &&
        props.index % 2 === 1 &&
        "bg-green-600",
      props.header &&
        props.index !== undefined &&
        Number.isInteger(props.index) &&
        props.index % 2 === 0 &&
        "bg-blue-600",
      props.className
    )}
  >
    {props.children}
  </div>
);

export const CandidateList = ({
  // votesEl,
  // votesLength,
  needsColumns,
  restOfValues,
  localList,
}: {
  // votesEl: RefObject<HTMLDivElement>
  // votesLength: number
  needsColumns: boolean;
  restOfValues: {
    PRESIDENT?: string | null | undefined;
    "VICE PRESIDENT"?: string | null | undefined;
    SENATOR?: boolean | string[] | undefined;
    "MEMBER, HOUSE OF REPRESENTATIVES"?: string | null | undefined;
    "PARTY LIST"?: string | null | undefined;
    "PROVINCIAL GOVERNOR"?: string | null | undefined;
    "PROVINCIAL VICE-GOVERNOR"?: string | null | undefined;
    "MEMBER, SANGGUNIANG PANLALAWIGAN"?: boolean | string[] | undefined;
    MAYOR?: string | null | undefined;
    "VICE-MAYOR"?: string | null | undefined;
    "MEMBER, SANGGUNIANG BAYAN"?: boolean | string[] | undefined;
    "MEMBER, SANGGUNIANG PANLUNGSOD"?: boolean | string[] | undefined;
    "MEMBER, SANGUNIANG BAYAN"?: boolean | string[] | undefined;
  };
  localList: any;
}) => {
  // const rowCount = Object.entries(restOfValues).reduce(
  //   (count, pair, index, keyVal) => {
  //     return count + 1 + (Array.isArray(pair[1]) ? pair[1].length : 1)
  //   },
  //   0
  // )

  // console.log(rowCount, votesLength)

  return (
    <div
      // ref={votesEl}
      className={clsx(
        "mx-auto flex-grow",
        needsColumns ? "w-full columns-2" : "w-3/5"
        // rowCount > 21 && 'columns-2',
        // rowCount <= 21 && 'w-3/5'
        // votesLength > 550 && 'columns-2',
        // votesLength < 550 && 'w-2/5'
      )}
      style={{ columnFill: "auto" }}
    >
      {Object.entries(restOfValues)
        .sort(
          (previous, current) =>
            orderedCandidateMap.findIndex(
              (entry) => entry.position === previous[0]
            ) -
            orderedCandidateMap.findIndex(
              (entry) => entry.position === current[0]
            )
        )
        .map(([position, candidate], index) => {
          const voteFor =
            (localList && localList.hasOwnProperty(position)
              ? localList[position].voteFor
              : (national as any)[position]?.voteFor) ?? 1;

          return (
            <div key={"candidate for " + position}>
              <CandidateOption
                header
                index={index}
              >
                <span className="flex-grow">{position}</span>
                {Array.isArray(candidate) && candidate.length > 1 && (
                  <span className="text-xs font-medium opacity-80">
                    {candidate.length}/{voteFor}
                  </span>
                  // <span className='font-medium text-gray-100 text-xs absolute right-0'>{candidate.length}/{voteFor}</span>
                )}
              </CandidateOption>

              {Array.isArray(candidate) ? (
                candidate.map((entry) => (
                  <CandidateOption
                    key={"candidate for " + position + " : " + entry}
                  >
                    {entry}
                  </CandidateOption>
                ))
              ) : (
                <CandidateOption>{candidate}</CandidateOption>
              )}
            </div>
          );
        })}
    </div>
  );
};
export const EmptyCandidateList = () => {
  return (
    <div className="flex w-full flex-grow flex-col justify-center text-center">
      <h4 className="text-sm uppercase text-slate-400">
        Empty or Invalid Kodigo
      </h4>
      <h3 className="text-lg text-purple-600">
        Want to prepare to prepare who to vote for before election day?
      </h3>
      <h3 className="text-xl font-semibold text-purple-600">
        Create your own kodigo at {BASE_URL}
      </h3>
    </div>
  );
};
