import { generatePageMeta } from "@/lib/meta";
import dynamic from "next/dynamic";

export const metadata = generatePageMeta({
  title: "Page Not Found",
  description: "Page Not Found",
});

const DynamicNotFound = dynamic(() => import("./not-found/not-found"), {
  ssr: false,
});

export default function Page() {
  return <DynamicNotFound />;
}
