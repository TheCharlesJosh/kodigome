// import { createTailwindConverter } from "@/lib/utils";
import { ImageResponse } from "@vercel/og";
import processDataForImage, {
  EmptyInvalidKodigo,
  ImageProcessError,
  imageResponseSettings,
} from "./logic";
import { CandidateList, Footer, Header } from "./image-components";

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
        return new Response(EmptyInvalidKodigo, {
          headers: {
            "Content-Type": `image/png`,
            // "Cache-Control": `public, immutable, no-transform, s-maxage=31536000, max-age=31536000`,
          },
          status: 404,
        });
      default:
        break;
    }
  }

  if (!data) {
    return new Response(EmptyInvalidKodigo, {
      headers: {
        "Content-Type": `image/png`,
        // "Cache-Control": `public, immutable, no-transform, s-maxage=31536000, max-age=31536000`,
      },
      status: 404,
    });
  }

  const { location, qrcode, nationalLocal, candidates, megapack, id } = data;
  const { longName, colors } = megapack;

  const image = new ImageResponse(
    (
      <div tw="flex bg-white w-[720px] h-[720px] p-4">
        <div tw="flex h-full w-full flex-col">
          <Header {...{ location, longName, qrcode, colors }} />
          <CandidateList
            candidates={candidates}
            nationalLocal={nationalLocal}
            location={location}
            id={id}
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
