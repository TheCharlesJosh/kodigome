import { notFound, redirect } from "next/navigation";
import BallotPage from "./ballot-page";
import { cn } from "@/lib/utils";
import { yearPack } from "@/lib/types";
import { decodeForSharing } from "@/lib/for-sharing";
import { Metadata } from "next";
import getMegapack, { isValidYear } from "@/lib/megapack";

export async function generateStaticParams() {
  return Object.keys(yearPack).map((yearCode) => ({
    year: yearCode,
  }));
}

type BallotProps = {
  params: Promise<{ year: string; id: string[] }>;
  searchParams: Promise<{ error: string }>;
};

export async function generateMetadata({
  params,
}: BallotProps): Promise<Metadata> {
  const { year, id: idArray } = await params;

  // If year does not exist from the mapping, show a not found page:
  if (isValidYear(year)) {
    const megapack = await getMegapack(year);

    if (Array.isArray(idArray) && idArray.length > 0) {
      const id = idArray[0];
      const data = await decodeForSharing(id, megapack);
      if (
        data &&
        Object.keys(data).length !== 0 &&
        data.constructor === Object
      ) {
        return {
          title: `kodigo.me 🗳 | My Preferred Candidates for ${megapack.shortName}`,
          description: `Check out my election kodigo for ${megapack.shortName} and create your own! 🇵🇭`,
        };
      } else {
        return {};
      }
    }
  }

  return {};
}

export default async function Ballot({ params, searchParams }: BallotProps) {
  const { year, id: idArray } = await params;
  const { error } = await searchParams;

  // URL Cleanup: remove additional slugs
  if (Array.isArray(idArray) && idArray.length > 1) {
    return redirect(`/${year}/${idArray[0]}`);
  }

  // If year does not exist from the mapping, show a not found page:
  if (isValidYear(year)) {
    const megapack = await getMegapack(year);

    if (Array.isArray(idArray) && idArray.length > 0) {
      const id = idArray[0];
      const data = await decodeForSharing(id, megapack);
      if (
        data &&
        Object.keys(data).length !== 0 &&
        data.constructor === Object
      ) {
        return (
          <BallotPage
            initialValues={data}
            sharePage={true}
            initialSaveKey={id}
            pageType="share"
            megapack={megapack}
            error={error}
            className={cn(
              year === "2025" && "primary-2025",
              year === "2022" && "primary-2022"
            )}
          />
        );
      } else {
        return redirect(`/${year}?error=keyNotFound`);
      }
    } else {
      return (
        <BallotPage
          initialSaveKey={null}
          megapack={megapack}
          error={error}
          className={cn(
            year === "2025" && "primary-2025",
            year === "2022" && "primary-2022"
          )}
        />
      );
    }
  } else {
    return notFound();
  }
}
