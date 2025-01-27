import { generatePageMeta } from "@/lib/meta";
import Privacy from "./privacy";

export const metadata = generatePageMeta({
  title: "kodigo.me 🗳 | Privacy Policy",
  description: "Privacy Policy: No Stored Information",
});

export default function Page() {
  return <Privacy />;
}
