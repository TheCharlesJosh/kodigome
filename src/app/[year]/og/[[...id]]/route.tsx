// import { createTailwindConverter } from "@/lib/utils";
import { ImageResponse } from "@vercel/og";
import processDataForImage, {
  EmptyInvalidKodigoOG,
  ImageProcessError,
  imageResponseSettings,
} from "../../png/[[...id]]/logic";
import {
  CandidateList,
  Header,
  LeftMeta,
} from "../../png/[[...id]]/image-components";

const size = {
  width: 1337,
  height: 700,
};

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ year: string; id: string[] }> }
) {
  const { year, id: idArray } = await params;
  const [data, error] = await processDataForImage(year, idArray);

  if (Number.isInteger(error)) {
    switch (Number(error)) {
      case ImageProcessError.INVALID_YEAR:
      case ImageProcessError.NO_ID_PROVIDED:
      case ImageProcessError.EMPTY_KODIGO:
        return new Response(EmptyInvalidKodigoOG, {
          headers: {
            "Content-Type": `image/png`,
            "Cache-Control": `public, immutable, no-transform, s-maxage=31536000, max-age=31536000`,
          },
          status: 404,
        });
      default:
        break;
    }
  }

  if (!data) {
    return new Response(EmptyInvalidKodigoOG, {
      headers: {
        "Content-Type": `image/png`,
        "Cache-Control": `public, immutable, no-transform, s-maxage=31536000, max-age=31536000`,
      },
      status: 404,
    });
  }

  const { location, qrcode, nationalLocal, candidates, megapack, id } = data;
  const { longName, colors } = megapack;

  const image = new ImageResponse(
    (
      <div tw="flex bg-white w-[1337px] h-[700px] p-4">
        <LeftMeta />
        <div tw="flex h-full w-[669px] flex-col pt-8">
          <Header
            {...{ location, longName, qrcode, colors }}
            og={true}
          />
          <CandidateList
            candidates={candidates}
            nationalLocal={nationalLocal}
            location={location}
            id={id}
            cutoff={23}
            megapack={megapack}
          />
        </div>
      </div>
    ),
    {
      ...imageResponseSettings,
      ...size,
      // debug: true,
    }
  );

  return image;
}
