import { redirect } from "next/navigation";
import BallotPage from "./ballot-page";

export default async function Ballot({
  params,
}: {
  params: Promise<{ year: string; id: string[] }>;
}) {
  const year = (await params).year;
  const idArray = (await params).id;

  // URL Cleanup
  if (Array.isArray(idArray) && idArray.length > 1) {
    redirect(`/${year}/${idArray[0]}`);
  }

  // const id = idArray[0];

  return <BallotPage initialSaveKey={null} />;
}
