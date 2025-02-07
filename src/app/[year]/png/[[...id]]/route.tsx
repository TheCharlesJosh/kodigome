// import { createTailwindConverter } from "@/lib/utils";
import { HiPrinter } from "react-icons/hi";
import { ImageResponse } from "next/og";
import { BASE_URL } from "@/lib/constants";
import { twj } from "tw-to-css";
import { promises as fs } from "fs";

export async function GET() {
  // request: Request,
  // { params }: { params: Promise<{ year: string; id: string[] }> }
  // const { year, id: idArray } = await params;

  const InterBuffer = await fs.readFile(
    process.cwd() + "/src/app/[year]/png/[[...id]]/Inter.ttf"
  );

  try {
    return new ImageResponse(
      (
        // <div>Hello</div>,
        <div
          tw="flex bg-white w-[720px] h-[720px] p-4"
          // style={{ fontFamily: "Inter" }}
        >
          <img
            src="http://localhost:3000/logo.svg"
            width={180}
            height={31}
          />
          <h1 tw="ml-1 text-3xl font-extrabold text-gray-900">
            | Preferred Candidates
          </h1>
        </div>
      ),
      // <div tw="flex bg-white p-4">
      //   <div tw="flex h-full w-full flex-col">
      //     <div tw="mb-2 flex gap-2">
      //       <div tw="flex-grow">
      //         <div tw="inline-flex">
      //           <h1 tw="sr-only">kodigo.me</h1>
      //           {/* <Image
      //           src={logo}
      //           width={180}
      //           height={26}
      //           alt="kodigo.me logo"
      //         /> */}
      //           <h1 tw="ml-1 text-3xl font-extrabold text-gray-900">
      //             | Preferred Candidates
      //           </h1>
      //         </div>
      //         <h2 tw="text-base font-semibold uppercase tracking-wide text-indigo-600">
      //           2022 National and Local Elections
      //         </h2>
      //         {/* {location && location !== "" && (
      //         <h3 tw="text-sm uppercase">{location}</h3>
      //       )} */}
      //         <p tw="mt-1 text-sm tracking-wide text-slate-500">
      //           {/* <HiPrinter tw="-mt-px mr-1 inline h-3 w-3" /> */}
      //           Print this! Use of mobile phones may be banned in the polling
      //           precincts.
      //         </p>
      //       </div>
      //       <div>{/* <QRCodeSVG value={BASE_URL + "/share/" + id} /> */}</div>
      //     </div>
      //     <div>
      //       <p tw="mt-1 text-right text-sm tracking-wide text-slate-500">
      //         Not an official ballot or survey | Create your own kodigo for free
      //         at {BASE_URL} {"🗳"}
      //       </p>
      //     </div>
      //   </div>
      // </div>
      {
        width: 720,
        height: 720,
        fonts: [
          {
            name: "Inter",
            data: InterBuffer,
            style: "normal",
          },
        ],
      }
    );
  } catch (e) {
    console.error(e.stack);
  }
}
