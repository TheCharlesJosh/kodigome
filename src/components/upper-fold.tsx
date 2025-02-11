import logo from "@public/logo.svg";
import Image from "next/image";
import { ReactNode, RefObject } from "react";
import { HiOutlineArrowDown, HiOutlineInformationCircle } from "react-icons/hi";
import { ShareContents } from "./share-dialog";
import { LinkBox, LinkOverlay } from "./link-overlay";
import { Instructions } from "./instructions";
import Link from "next/link";
import { ValueProp } from "./value-prop";
import { cn } from "@/lib/utils";
import { MegapackType } from "@/lib/types";
import { byLine } from "./sidebar/sidebar";

export const UpperFoldRedux = ({
  mainLogoRef,
  sharePage,
  longName,
  children,
}: {
  mainLogoRef?: RefObject<HTMLDivElement | null>;
  sharePage?: boolean;
  longName?: string;
  children?: ReactNode;
}) => {
  return (
    <div
      className={cn(
        "mb-4 flex w-full flex-col border-y-8 border-y-slate-300 bg-slate-200 py-8 xl:mt-0 xl:items-center xl:px-8",
        children ? "pt-8" : "py-8"
      )}
    >
      <div
        className="w-full"
        ref={mainLogoRef}
      >
        <div className="flex flex-col justify-center">
          <LinkBox
            as="div"
            className="mx-auto xl:w-fit"
          >
            <LinkOverlay href="/">
              <h1 className="sr-only">kodigo.me</h1>
              <Image
                src={logo}
                width={300}
                height={53}
                alt="kodigo.me logo"
              />
            </LinkOverlay>
          </LinkBox>

          {!sharePage ? (
            <>
              <ValueProp />
              <h2 className="mt-2 px-4 text-center text-xs uppercase tracking-wide md:text-sm">
                {byLine(longName)} | Free Kodigo Generator
              </h2>
            </>
          ) : (
            <h2
              className={cn(
                "mx-auto mt-0 flex-col items-center gap-x-2 text-center text-base sm:text-xl xl:mt-0 xl:flex-row",
                !sharePage ? "hidden" : "flex"
              )}
            >
              You&apos;re checking out a saved kodigo.
            </h2>
          )}
        </div>
      </div>
      {children}
    </div>
  );
};

const UpperFold = ({
  mainLogoRef,
  sharePage,
  saveKey,
  megapack,
}: {
  mainLogoRef: RefObject<HTMLDivElement | null>;
  sharePage?: boolean;
  saveKey: string | null;
  megapack: MegapackType;
}) => {
  return (
    <UpperFoldRedux
      {...{ mainLogoRef, sharePage }}
      longName={megapack.longName}
    >
      {sharePage && (
        <ShareContents
          saveKey={saveKey}
          isUpperFold={true}
          megapack={megapack}
        />
      )}
      {!sharePage ? (
        <Instructions />
      ) : (
        <div className="mb-2 mt-8 px-2 text-center">
          <h2 className="text-lg">Want to change anything from this kodigo?</h2>
          <h3 className="text-base italic text-gray-600">
            Make sure to save your changes after!
          </h3>
        </div>
      )}
      <div className="text-center">
        <a
          href="#national"
          type="button"
          className="inline-flex items-center rounded-md border border-transparent bg-primary-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        >
          <HiOutlineArrowDown
            className="-ml-1 mr-3 h-5 w-5 animate-bounce"
            aria-hidden="true"
          />
          {!sharePage ? "Get Started" : "Edit Kodigo"}
        </a>
      </div>
      <div className="mx-4 my-8 rounded-lg bg-gray-100 p-4 px-4 shadow-sm xl:mx-0">
        <div className="flex">
          <div className="flex-shrink-0">
            <HiOutlineInformationCircle
              className="h-5 w-5 text-primary-400"
              aria-hidden="true"
            />
          </div>
          <div className="ml-3 flex-1 md:flex md:justify-between">
            <p className="text-xs text-gray-700 md:text-sm">
              <span className="font-bold text-primary-600">
                Heads up! You keep full ownership of your data and your kodigo.{" "}
              </span>
              kodigo.me does not store any personal information, nor any
              information you key in. kodigo.me is not affiliated with COMELEC,
              any political party, or any media institution.{" "}
              <span className="font-bold text-primary-600">
                This is not a survey. This is not an official ballot.
              </span>
            </p>
            <p className="mt-3 text-sm md:ml-6 md:mt-0">
              <Link
                href="/privacy"
                className="cursor-pointer whitespace-nowrap font-medium text-gray-700 hover:text-gray-600"
              >
                Privacy Policy <span aria-hidden="true">&rarr;</span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </UpperFoldRedux>
  );
};

export default UpperFold;
