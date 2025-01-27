import Link from "next/link";
import { HiOutlineExternalLink } from "react-icons/hi";
import clsx from "clsx";

export const SidebarLinks = ({ footer = false }: { footer?: boolean }) => {
  return (
    <div className={clsx(!footer && "my-8", footer && "flex-grow")}>
      <ul
        className={clsx(
          "flex flex-col justify-between gap-4 text-sm leading-6 text-gray-500 transition-colors",
          footer && "md:flex-row"
        )}
      >
        <div>
          <h4 className="font-bold">More about kodigo.me</h4>
          <li>
            <Link
              href={"/faq"}
              className="cursor-pointer hover:text-indigo-600"
            >
              Check the FAQs
            </Link>
          </li>
          <li>
            <Link
              href={"/privacy"}
              className="cursor-pointer hover:text-indigo-600"
            >
              Read our Privacy Policy
            </Link>
          </li>
          <li>
            <Link
              href="https://www.facebook.com/kodigomeph"
              className="cursor-pointer hover:text-indigo-600"
              target="_blank"
            >
              Like us on Facebook{" "}
              <HiOutlineExternalLink className="-mt-px inline h-4 w-4" />
            </Link>
          </li>
        </div>
        <div>
          <h4 className="font-bold">More from COMELEC</h4>
          <li>
            <Link
              href={"https://voterverifier.comelec.gov.ph/voter_precinct"}
              className="cursor-pointer hover:text-indigo-600"
              target="_blank"
            >
              Find your Precinct{" "}
              <HiOutlineExternalLink className="-mt-px inline h-4 w-4" />
            </Link>
          </li>
          <li>
            <Link
              href={
                "https://comelec.gov.ph/?r=2022NLE/VoterEducation/StepsinVoting"
              }
              className="cursor-pointer hover:text-indigo-600"
              target="_blank"
            >
              Steps in Voting{" "}
              <HiOutlineExternalLink className="-mt-px inline h-4 w-4" />
            </Link>
          </li>
        </div>
        <div>
          <h4 className="font-bold">Know more about your candidates</h4>
          <li>
            <Link
              href={"http://brainstorm.ph"}
              className="cursor-pointer hover:text-indigo-600"
              target="_blank"
            >
              Compare issue stances at Brainstorm.PH{" "}
              <HiOutlineExternalLink className="-mt-px inline h-4 w-4" />
            </Link>
          </li>
          <li>
            <Link
              href={"https://votepilipinas.com/"}
              className="cursor-pointer hover:text-indigo-600"
              target="_blank"
            >
              See candidate profiles at Vote Pilipinas{" "}
              <HiOutlineExternalLink className="-mt-px inline h-4 w-4" />
            </Link>
          </li>
          <li>
            <Link
              href={"https://www.votesafe.ph/"}
              className="cursor-pointer hover:text-indigo-600"
              target="_blank"
            >
              Check quick stats at Vote SAFE Pilipinas{" "}
              <HiOutlineExternalLink className="-mt-px inline h-4 w-4" />
            </Link>
          </li>
          <li>
            <Link
              href={"https://candidata.ph/candidates"}
              className="cursor-pointer hover:text-indigo-600"
              target="_blank"
            >
              Compare candidates at CandiData.ph{" "}
              <HiOutlineExternalLink className="-mt-px inline h-4 w-4" />
            </Link>
          </li>
        </div>
      </ul>
    </div>
  );
};
