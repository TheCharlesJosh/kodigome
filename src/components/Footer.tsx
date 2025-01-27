import clsx from "clsx";
import Link from "next/link";
import { IS_DEVELOPMENT } from "../lib/constants";
import { SidebarLinks } from "./sidebar-links";
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
    // <div className="my-8 text-center transition-colors">
    //   <ul className="justify-center gap-8 md:inline-flex">
    //     <li className="text-gray-400">
    //       <Link href={'/'}>
    //         <a className="cursor-pointer hover:text-indigo-600">
    //           kodigo.me • 2022
    //         </a>
    //       </Link>
    //     </li>
    //     <li className="text-gray-400">
    //       <Link href={'/faq'}>
    //         <a className="cursor-pointer hover:text-indigo-600">FAQs</a>
    //       </Link>
    //     </li>
    //     <li className="text-gray-400">
    //       <Link href={'/privacy'}>
    //         <a className="cursor-pointer hover:text-indigo-600">
    //           Privacy Policy
    //         </a>
    //       </Link>
    //     </li>
    //     <li className="text-gray-400">
    //       <Link href="https://www.facebook.com/kodigomeph">
    //         <a className="cursor-pointer hover:text-indigo-600">Facebook</a>
    //       </Link>
    //     </li>
    //     {/* <li>Acknowledgements</li> */}
    //   </ul>
    // </div>
  );
};

export default Footer;
