import { generatePageMeta } from "@/lib/meta";
import NotFound from "./not-found/not-found";

export const metadata = generatePageMeta({
  title: "Page Not Found",
  description: "Page Not Found",
});

export default function Page() {
  return <NotFound />;
}
