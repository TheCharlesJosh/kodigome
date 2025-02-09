/* eslint-disable @next/next/no-img-element */
// import { createTailwindConverter } from "@/lib/utils";
import { ImageResponse } from "@vercel/og";
import { BASE_URL } from "@/lib/constants";
import { promises as fs } from "fs";
import getMegapack, { isValidYear } from "@/lib/megapack";
import { decodeForSharing } from "@/lib/for-sharing";
import { toDataURL } from "qrcode";
import {
  CandidateGroupValues,
  Candidates,
  LocalCandidatesType,
  MegapackType,
} from "@/lib/types";
import { cn } from "@/lib/utils";
import { overrideToEven } from "@/lib/style-variants";
import logo from '@assets/logo.svg'

const CHAR_LIMIT = 50;
const lineBreaker = (line: string, limit: number) => {
  if (line.length < limit) {
    return line;
  } else {
    const lineWithBreaks = line.replace(new RegExp(`(.{1,${limit}}) `), "$1\n");
    const lastBreak = lineWithBreaks.lastIndexOf("\n");
    if (lastBreak && (lineWithBreaks.match(/\n/g) || []).length > 1) {
      return (
        lineWithBreaks.substring(0, lastBreak) +
        lineWithBreaks.substring(lastBreak + 1)
      );
    } else {
      return lineWithBreaks;
    }
  }
};

/**
 * ImageResponse funny quirks require me to define types Weight and Style to house options in a const.
 */
export type Weight = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
export type Style = "normal" | "italic";

/**
 * Mext.js 15 and ImageResponse makes a funny error:
 * code: 'ERR_INTERNAL_ASSERTION'
 * [Error: TypeError: The "payload" argument must be of type object. Received null]
 *
 * Somebody else has the same error: https://www.reddit.com/r/nextjs/comments/1gkxdqe/comment/m19kxgn/
 *
 * But the reported bugs are only happening for Prisma. I don't know how to get a debugger ready to step on the function in question, but it seems like it's a source map problem.
 *
 * Annoyingly, a try-catch won't work also.
 *
 * Removing the line
 * `//# sourceMappingURL=index.node.js.map`
 * from `node_modules/next/dist/compiled/@vercel/og/index.node.js`
 * Makes the responses better, but still unreadable. I think it's because the mapping file does not exist. The @vercel/og package (version 0.6.5) has the source maps, but the packaged version with Next.js (version 0.6.4) does not.
 *
 * Problem still persisted with the @vercel/og package. Placing the index.node.js.map on the next/og folder just causes the same unreadable error.
 * [cause]: [TypeError: Cannot read properties of undefined (reading '256')]
 *
 * Found this solution: https://github.com/vercel/satori/issues/320
 * Lesson learned: Do not use a variable font.
 */

const InterBuffer = await fs.readFile(
  process.cwd() + "/src/app/[year]/png/[[...id]]/Inter-Regular.ttf"
);
const InterBoldBuffer = await fs.readFile(
  process.cwd() + "/src/app/[year]/png/[[...id]]/Inter-Bold.ttf"
);
const InterSemiBoldBuffer = await fs.readFile(
  process.cwd() + "/src/app/[year]/png/[[...id]]/Inter-SemiBold.ttf"
);
const InterExtraBoldBuffer = await fs.readFile(
  process.cwd() + "/src/app/[year]/png/[[...id]]/Inter-ExtraBold.ttf"
);

const imageResponseSettings = {
  width: 720,
  height: 720,
  // debug: true,
  fonts: [
    {
      name: "Inter",
      data: InterBuffer,
      style: "normal" as Style,
      weight: 400 as Weight,
    },
    {
      name: "Inter",
      data: InterSemiBoldBuffer,
      style: "normal" as Style,
      weight: 600 as Weight,
    },
    {
      name: "Inter",
      data: InterBoldBuffer,
      style: "normal" as Style,
      weight: 700 as Weight,
    },
    {
      name: "Inter",
      data: InterExtraBoldBuffer,
      style: "normal" as Style,
      weight: 800 as Weight,
    },
  ],
};

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ year: string; id: string[] }> }
) {
  const { year, id: idArray } = await params;

  // If year does not exist from the mapping, return 404:
  if (!isValidYear(year)) {
    return Response.json(
      {
        error: `Sorry, you have accessed an invalid link. Go back to the main page (${BASE_URL}) and try again.`,
      },
      { status: 404 }
    );
  }

  const megapack = await getMegapack(year);
  const { longName, national, localMapping, yearCode, colors } = megapack;

  // TODO: If there's no ID provided, return an image instead of a 404
  if (
    !Array.isArray(idArray) ||
    (Array.isArray(idArray) && idArray.length === 0)
  ) {
    return Response.json(
      {
        error: `Sorry, you have accessed an invalid link. Go back to the main page (${BASE_URL}) and try again.`,
      },
      { status: 404 }
    );
  }

  const id = idArray[0];
  const data = await decodeForSharing(id, megapack);

  // TODO: If data returned an invalid object, return a 404
  if (
    !(data && Object.keys(data).length !== 0 && data.constructor === Object)
  ) {
    return Response.json(
      {
        error: `Sorry, you have accessed an invalid kodigo ID. Go back to the main page (${BASE_URL}) and try again.`,
      },
      { status: 404 }
    );
  }

  const { user, ...restOfValues } = data ?? { user: {} };
  const location =
    user && user?.Province && user?.["City/Municipality"]
      ? `${user?.Province} • ${user?.["City/Municipality"]}`
      : "";

  const qrcode = await toDataURL(`${BASE_URL}/${year}/${id}`);

  const cityMuni = localMapping.find(
    (mapEntry) =>
      mapEntry.province === user?.Province &&
      mapEntry.cityMunicipality === user?.["City/Municipality"]
  );

  const local: LocalCandidatesType = cityMuni
    ? (await import(`@/assets/${yearCode}/json/${cityMuni.identifier}`)).default
    : {};

  const nationalLocal = { ...national, ...local };

  console.log(logo)

  const image = new ImageResponse(
    (
      <div tw="flex bg-white w-[720px] h-[720px] p-4">
        <div tw="flex h-full w-full flex-col">
          <Header {...{ location, longName, qrcode, colors }} />
          <CandidateList
            candidates={restOfValues}
            nationalLocal={nationalLocal}
            cutoff={23}
            megapack={megapack}
          />
          <Footer />
        </div>
      </div>
    ),
    imageResponseSettings
  );

  return image;
}

const Header = ({
  location,
  longName,
  qrcode,
  colors,
}: {
  location: string;
  longName: string;
  qrcode: string;
  colors: string[];
}) => (
  <div tw="mb-1 flex">
    <div tw="flex grow max-w-[560px] flex-col">
      <div tw="flex items-center">
        <img
          alt="kodigo.me logo"
          tw="m-0"
          // src={`${BASE_URL}/logo.svg`}
          src={logo}
          width={180}
          height={31}
        />
        <h1 tw="m-0 ml-1 text-3xl font-extrabold text-gray-900">
          | Preferred Candidates
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

      <p tw="m-0 mt-1 text-sm tracking-wide text-slate-500">
        <span tw="ml-px mr-2">🖨️</span> Print this! Some polling precincts might
        not allow use of mobile phones.
      </p>
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
    <img
      alt="kodigo.me QR code"
      tw="m-0 shrink-0"
      src={qrcode}
      width={128}
      height={128}
    />
  </div>
);

const Footer = () => (
  <div tw="flex w-full items-end">
    <p tw="m-0 mt-1 text-sm tracking-wide text-slate-500">
      Not an official ballot or survey | Create your own kodigo for free at
      <span tw="font-semibold mx-1">{BASE_URL}</span> {"🗳"}
    </p>
  </div>
);

const CandidateList = ({
  candidates,
  megapack,
  nationalLocal,
  cutoff,
}: {
  candidates: CandidateGroupValues;
  megapack: MegapackType;
  nationalLocal: Candidates;
  cutoff: number;
}) => {
  const { betterPositionMap, colors, year } = megapack;
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
        <div tw="flex flex-col w-1/2">{list.slice(cutoff).map(ListItem)}</div>
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
