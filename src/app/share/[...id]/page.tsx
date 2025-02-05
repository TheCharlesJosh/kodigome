import { redirect } from "next/navigation";

// TODO

export default async function ShareIDLegacy({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  redirect("/" + id);
}
