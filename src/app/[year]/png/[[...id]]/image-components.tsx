/* eslint-disable @next/next/no-img-element */
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { CHAR_LIMIT, lineBreaker } from "./logic";
import { BASE_URL } from "@/lib/constants";
import { overrideToEven } from "@/lib/style-variants";
import { CandidateGroupValues, MegapackType, Candidates } from "@/lib/types";
import { cn } from "@lib/utils";

const logo = await readFile(join(process.cwd(), "/public/logo.svg"), {
  encoding: "base64",
});

const metaSquare = await readFile(
  join(process.cwd(), "/public/images/kodigo-me-meta-square.png"),
  {
    encoding: "base64",
  }
);

export const LeftMeta = () => (
  <div tw="flex flex-col justify-end">
    <img
      alt="kodigo.me meta square"
      tw="m-0"
      src={`data:image/png;base64,${metaSquare}`}
      width={600}
      height={600}
    />
  </div>
);

export const Header = ({
  location,
  longName,
  qrcode,
  colors,
  og,
}: {
  location: string;
  longName: string;
  qrcode: string;
  colors: string[];
  og?: boolean;
}) => (
  <div tw="mb-1 flex">
    <div tw="flex grow max-w-[560px] flex-col">
      <div tw="flex items-center">
        {!og && (
          <img
            alt="kodigo.me logo"
            tw="m-0"
            src={`data:image/svg+xml;base64,${logo}`}
            width={180}
            height={31}
          />
        )}
        <h1 tw={cn("m-0 text-3xl font-extrabold text-gray-900", !og && "ml-1")}>
          {!og ? "| Preferred Candidates" : "My Preferred Candidates"}
        </h1>
      </div>
      <h2
        tw={cn(
          "m-0 mt-2 font-bold uppercase tracking-wide",
          longName.length > CHAR_LIMIT ? "text-sm" : "text-base"
        )}
        style={{ color: colors[0] }}
      >
        {longName}
      </h2>

      {!og && (
        <p tw="m-0 mt-1 text-sm tracking-wide text-slate-500">
          <span tw="ml-px mr-2">🖨️</span> Print this! Some polling precincts
          might not allow use of mobile phones.
        </p>
      )}
      {location && location !== "" && (
        <div tw="flex m-0 my-2 w-[584px]">
          <p tw="m-0">🇵🇭</p>
          <p
            tw="m-0 ml-2 flex-grow font-semibold uppercase text-slate-600"
            style={{ whiteSpace: "pre-line" }}
          >
            {/* Necessary to override satori's line break logic */}
            {lineBreaker(location, CHAR_LIMIT)}
          </p>
        </div>
      )}
    </div>
    {!og && (
      <img
        alt="kodigo.me QR code"
        tw="m-0 shrink-0"
        src={qrcode}
        width={128}
        height={128}
      />
    )}
  </div>
);

export const Footer = () => (
  <div tw="flex w-full items-end">
    <p tw="m-0 mt-1 text-sm tracking-wide text-slate-500">
      Not an official ballot or survey | Create your own kodigo for free at
      <span tw="font-semibold mx-1">{BASE_URL}</span> {"🗳"}
    </p>
  </div>
);

export const CandidateList = ({
  candidates,
  megapack,
  nationalLocal,
  location,
  id,
  cutoff,
}: {
  candidates: CandidateGroupValues;
  megapack: MegapackType;
  nationalLocal: Candidates;
  location: string;
  id: string;
  cutoff: number;
}) => {
  const { betterPositionMap, colors, year } = megapack;

  // If the kodigo only contains the location and nothing else,
  if (candidates && Object.keys(candidates).length === 0) {
    return (
      <div
        tw="flex grow flex-col text-center items-center justify-center text-slate-500 text-lg -mt-20"
        style={{ gap: 4 }}
      >
        <p tw="m-0">This is an empty kodigo for</p>
        <p
          tw="m-0 mb-8 font-semibold"
          style={{ color: colors[0] }}
        >
          {location}
        </p>
        <p tw="m-0">Check out its national and local candidates here:</p>
        <p
          tw="m-0 font-bold text-2xl"
          style={{ color: colors[0] }}
        >{`${BASE_URL}/${year}/${id}`}</p>
        <p tw="m-0">Or scan the QR code on the top right.</p>
      </div>
    );
  }

  const sortedCandidates = Object.entries(candidates).sort(
    (previous, current) =>
      betterPositionMap.findIndex((entry) => entry.position === previous[0]) -
      betterPositionMap.findIndex((entry) => entry.position === current[0])
  );
  const list = [] as ListType;

  sortedCandidates.forEach(([position, candidate]) => {
    const voteFor =
      (nationalLocal &&
        nationalLocal.hasOwnProperty(position) &&
        nationalLocal[position as keyof typeof nationalLocal]?.voteFor) ||
      1;

    const colorIndex = Math.max(
      Object.keys(nationalLocal).findIndex((listPos) => listPos === position) %
        2,
      0
    );

    list.push({
      name: position,
      length:
        candidate && Array.isArray(candidate) ? candidate.length : undefined,
      voteFor,
      color:
        // Custom rules for ballot quirks
        overrideToEven(position, year) ? colors[1] : colors[colorIndex],
    });

    if (
      candidate &&
      (typeof candidate === "string" || Array.isArray(candidate))
    ) {
      list.push(
        ...[candidate].flat().map((candidate) => ({ name: candidate }))
      );
    }
  });

  // Adjust the cutoff if the columns can accommodate more
  if (list.length > cutoff * 2) {
    cutoff = Math.ceil(list.length / 2);
  } else if (list.length > cutoff) {
    const firstHalf = list.slice(0, cutoff);
    const lastPosition = firstHalf.findLastIndex((item) => item.length);

    if (list.length - lastPosition < cutoff) {
      cutoff = lastPosition;
    }
  }

  if (list.length > cutoff) {
    return (
      <div
        tw="flex grow mx-auto -ml-1"
        style={{ gap: 11 }}
      >
        <div tw="flex flex-col w-[49%]">
          {list.slice(0, cutoff).map(ListItem)}
        </div>
        <div tw="flex flex-col w-[49%]">{list.slice(cutoff).map(ListItem)}</div>
      </div>
    );
  } else {
    return (
      <div tw="flex grow flex-col w-3/5 mx-auto">{list.map(ListItem)}</div>
    );
  }
};

type ListItemType = {
  name: string;
  length?: number;
  voteFor?: number;
  color?: string;
};

type ListType = ListItemType[];

const ListItem = (item: ListItemType, index: number, list: ListType) => (
  <div
    tw={cn(
      "flex border-l border-r border-t border-black px-1 text-sm",
      index === list.length - 1 && "border-b",
      item.color && "font-semibold text-white"
    )}
    style={{ backgroundColor: item.color ?? "white" }}
    key={item.name}
  >
    <span tw="flex-grow">{item.name}</span>
    {item.length && (
      <span tw="font-medium opacity-80">
        {item.length}/{item.voteFor}
      </span>
    )}
  </div>
);
