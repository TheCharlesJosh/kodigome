import { BASE_URL } from "@/lib/constants";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import getMegapack, { isValidYear } from "@/lib/megapack";
import { decodeForSharing } from "@/lib/for-sharing";
import { toDataURL } from "qrcode";
import {
  CandidateGroupValues,
  Candidates,
  LocalCandidatesType,
  MegapackType,
} from "@/lib/types";

export const CHAR_LIMIT = 50;
export const lineBreaker = (line: string, limit: number) => {
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

export const EmptyInvalidKodigo = await readFile(
  join(process.cwd(), "/public/images/error-kodigo-empty.png")
);

export const EmptyInvalidKodigoOG = await readFile(
  join(process.cwd(), "/public/images/kodigo-me-meta.png")
);

/**
 * Next.js 15 and ImageResponse makes a funny error:
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

const InterBuffer = await readFile(
  join(process.cwd(), "/src/app/[year]/png/[[...id]]/Inter-Regular.ttf")
);
const InterBoldBuffer = await readFile(
  join(process.cwd(), "/src/app/[year]/png/[[...id]]/Inter-Bold.ttf")
);
const InterSemiBoldBuffer = await readFile(
  join(process.cwd(), "/src/app/[year]/png/[[...id]]/Inter-SemiBold.ttf")
);
const InterExtraBoldBuffer = await readFile(
  join(process.cwd(), "/src/app/[year]/png/[[...id]]/Inter-ExtraBold.ttf")
);

export const imageResponseSettings = {
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

export enum ImageProcessError {
  INVALID_YEAR,
  NO_ID_PROVIDED,
  EMPTY_KODIGO,
}

export type ImageProcessData = {
  location: string;
  qrcode: string;
  nationalLocal: Candidates;
  candidates: CandidateGroupValues;
  megapack: MegapackType;
  id: string;
};

export default async function processDataForImage(
  year: string,
  idArray: string[]
) {
  // If year does not exist from the mapping, return 404:
  if (!isValidYear(year)) {
    return [null, ImageProcessError.INVALID_YEAR] as [null, ImageProcessError];
  }

  const megapack = await getMegapack(year);
  const { national, localMapping, yearCode } = megapack;

  if (
    !Array.isArray(idArray) ||
    (Array.isArray(idArray) && idArray.length === 0)
  ) {
    return [null, ImageProcessError.NO_ID_PROVIDED] as [
      null,
      ImageProcessError,
    ];
  }

  const id = idArray[0];
  const data = await decodeForSharing(id, megapack);

  const { user, ...candidates } = data ?? { user: {} };

  if (!candidates || Object.keys(data).length === 0) {
    return [null, ImageProcessError.EMPTY_KODIGO] as [null, ImageProcessError];
  }

  const location =
    user && user.Province && user["City/Municipality"]
      ? `${user.Province} • ${user["City/Municipality"]}`
      : "";

  if (location === "") {
    return [null, ImageProcessError.EMPTY_KODIGO] as [null, ImageProcessError];
  }

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

  return [
    { location, qrcode, nationalLocal, candidates, megapack, id },
    null,
  ] as [ImageProcessData, null];
}
