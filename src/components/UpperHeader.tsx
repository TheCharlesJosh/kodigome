// import { TextLoop } from 'react-text-loop-next'
// import { InView } from 'react-intersection-observer'
import { LinkBox, LinkOverlay } from "@components/LinkOverlay";
import logo from "../assets/logo.svg";
import Image from "next/image";
import clsx from "clsx";
import { ValueProp } from "./value-prop";
import { RefObject } from "react";

export const UpperHeader = ({
  // handleVisibility,
  mainLogoRef,
  sharePage,
}: {
  // handleVisibility: (inView: boolean) => void
  mainLogoRef: RefObject<HTMLDivElement | null>;
  sharePage: boolean;
}) => {
  return (
    <div className="mb-4 flex w-full flex-col border-y-8 border-y-slate-300 bg-slate-200 py-8 xl:mt-0 xl:items-center xl:px-8">
      {/* <InView as="div" onChange={handleVisibility}> */}
      <div ref={mainLogoRef}>
        <div className="flex flex-col justify-center">
          <div className="mx-auto w-52 xl:w-fit">
            <LinkBox
              as="div"
              className="mx-auto w-52 xl:w-fit"
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
          </div>

          {!sharePage ? (
            // <h2
            //   className={clsx(
            //     'mt-0 flex w-full flex-col items-center gap-x-2 text-base md:text-xl xl:mt-0 xl:flex-row'
            //   )}
            // >
            //   <span className="">will help you </span>
            //   <TextLoop>
            //     <span className="font-bold">🗳 vote quicker on May 9.</span>
            //     <span className="font-bold">
            //       🤔 see your ballot ahead of time.
            //     </span>
            //     <span className="font-bold">📃 create your own kodigo.</span>
            //   </TextLoop>
            // </h2>
            <>
              <ValueProp />

              <h2 className="mt-2 px-4 text-center text-xs uppercase tracking-wide md:text-sm">
                2022 Philippine National and Local Elections | Free Kodigo
                Generator
              </h2>
            </>
          ) : (
            <h2
              className={clsx(
                "mx-auto mt-0 flex-col items-center gap-x-2 text-xl xl:mt-0 xl:flex-row",
                !sharePage ? "hidden" : "flex"
              )}
            >
              You&apos;re checking out a saved kodigo.
            </h2>
          )}
        </div>
      </div>
      {/* </InView> */}
    </div>
  );
};
