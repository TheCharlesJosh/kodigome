import clsx from "clsx";
import Link from "next/link";
import { IS_DEVELOPMENT } from "../lib/constants";
import { SidebarLinks } from "./sidebar/sidebar-links";
import { CandidateGroupValues } from "@/lib/CandidateTypes";

const Footer = ({ peek }: { peek?: CandidateGroupValues }) => {
  return (
    <div className="w-full border-t p-8">
      <div className="mb-8 md:text-center">
        <Link
          href={"/"}
          className="cursor-pointer font-bold text-gray-800 hover:text-indigo-600"
        >
          kodigo.me 🗳 • 2025 • 🇵🇭 Para Sa Bayan
        </Link>
      </div>
      <SidebarLinks footer={true} />
      {IS_DEVELOPMENT && (
        <details className="my-2">
          <summary>Debug</summary>
          <pre
            className={clsx(
              "w-full overflow-x-scroll bg-gray-200 p-2 text-sm text-gray-700"
            )}
          >
            {JSON.stringify(peek, null, 2)}
          </pre>
        </details>
      )}
    </div>
  );
};

export default Footer;
