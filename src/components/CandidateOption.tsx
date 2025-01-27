"use client";
import clsx from "clsx";
import {
  FieldValues,
  UseFormRegister,
  // UseFormWatch
} from "react-hook-form";
import { PositionEnum } from "../lib/CandidateTypes";

export const CandidateOption = ({
  candidate,
  // index,
  position,
  voteFor,
  remainingVotes,
  register,
  selected,
  className = "",
}: {
  candidate: string;
  // index: number
  position: PositionEnum;
  voteFor: number;
  remainingVotes: number;
  register: UseFormRegister<FieldValues>;
  selected: boolean;
  className?: string;
}) => {
  if (typeof candidate === "undefined") {
    return (
      <div
        className={clsx(
          "-ml-px -mt-px hidden border-[1px] border-gray-300 px-2 py-1 md:flex md:items-center",
          !selected && remainingVotes === 0 && "bg-gray-100",
          selected && remainingVotes === 0 && "bg-white",
          className
        )}
      ></div>
    );
  } else {
    return (
      <div
        className={clsx(
          // 'flex items-center border-[1px] border-gray-300 bg-white transition duration-[50ms]',
          "-ml-px -mt-px flex items-center border-[1px] border-gray-300 bg-white transition duration-[50ms]",
          selected && "relative scale-y-[1.01] shadow-md",
          selected && remainingVotes !== 0 && "border-orange-400",
          selected && remainingVotes === 0 && "border-indigo-800",
          !selected && remainingVotes === 0 && "bg-gray-100",
          className
        )}
      >
        {voteFor === 1 || selected || (!selected && remainingVotes > 0) ? (
          <input
            // type="checkbox"
            type={voteFor > 1 ? "checkbox" : "radio"}
            id={"candidate-" + candidate}
            {...register(position)}
            className="ml-2 h-4 w-4 border-red-300 text-black focus:ring-gray-500"
            value={candidate}
            // disabled={voteFor === 1 ? false : !selected && remainingVotes === 0}
          />
        ) : (
          <input
            // type="checkbox"
            type={voteFor > 1 ? "checkbox" : "radio"}
            id={"candidate-" + candidate}
            className="ml-2 h-4 w-4 border-red-300 text-black focus:ring-gray-500"
            value={candidate}
            disabled
          />
        )}
        <label
          htmlFor={"candidate-" + candidate}
          className={clsx(
            "flex h-full w-full items-center py-1 pl-2 pr-2 text-sm",
            selected && "font-bold text-gray-800",
            !selected && "",
            remainingVotes === 0 && !selected && ""
          )}
          style={{
            overflowWrap: "anywhere",
            wordBreak: "normal",
          }}
        >
          {candidate}
        </label>
      </div>
    );
  }
};
