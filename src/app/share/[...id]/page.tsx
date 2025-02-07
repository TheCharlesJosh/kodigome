import { redirect } from "next/navigation";

export default async function ShareIDLegacy({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  redirect("/2022/" + id);
}
