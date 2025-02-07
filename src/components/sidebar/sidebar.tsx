import Image from "next/image";
import { BaseSyntheticEvent } from "react";
import { FieldValues, UseFormReset } from "react-hook-form";
import { StartOverButton } from "@/components/start-over-button";
import logo from "@assets/logo.svg";
import { SaveShareButton } from "@/components/save-share-button";
import { LinkBox, LinkOverlay } from "@/components/link-overlay";
import { Instructions } from "@/components/instructions";
import { IS_DEVELOPMENT } from "@lib/constants";
import { SidebarLinks } from "@/components/sidebar/sidebar-links";
import { CandidateGroupValuesWithUser, MegapackType } from "@/lib/types";
import { cn } from "@/lib/utils";

export const SidebarRedux = ({
  mainLogoVisible,
  pageType,
}: {
  pageType?: string;
  mainLogoVisible: boolean;
}) => {
  return (
    <>
      <LinkBox
        as="div"
        className={cn(
          "transition-opacity",
          mainLogoVisible ? "opacity-0" : "opacity-100"
        )}
      >
        <LinkOverlay href="/">
          <h2 className="sr-only">kodigo.me</h2>
          <Image
            src={logo}
            width={300}
            height={53}
            alt="kodigo.me logo"
          />
        </LinkOverlay>
      </LinkBox>
      <h3 className="text-primary-600 text-base font-semibold uppercase tracking-wide">
        Create Your Own Election Kodigo
      </h3>
      <h3 className="text-sm uppercase tracking-wide">
        May 9, 2022 National and Local Elections
      </h3>
      {!mainLogoVisible && (pageType === "main" || pageType === "share") && (
        <Instructions isSidebar={true} />
      )}
      <div className="flex-grow"></div>
      <SidebarLinks />
    </>
  );
};

const Sidebar = ({
  peek,
  reset,
  onSubmit,
  saveKey,
  mainLogoVisible,
  ballotVisible,
  pageType = "main",
  megapack,
}: {
  peek: CandidateGroupValuesWithUser;
  reset: UseFormReset<FieldValues>;
  onSubmit: (
    e?: BaseSyntheticEvent<object, unknown, unknown> | undefined
  ) => Promise<void>;
  saveKey: string | null;
  pageType?: string;
  mainLogoVisible: boolean;
  ballotVisible: boolean;
  megapack: MegapackType;
}) => {
  return (
    <>
      <LinkBox
        as="div"
        className={cn(
          "transition-opacity",
          mainLogoVisible ? "opacity-0" : "opacity-100"
        )}
      >
        <LinkOverlay href="/">
          <h2 className="sr-only">kodigo.me</h2>
          <Image
            src={logo}
            width={300}
            height={53}
            alt="kodigo.me logo"
          />
        </LinkOverlay>
      </LinkBox>
      <h3 className="text-primary-600 text-base font-semibold uppercase tracking-wide">
        Create Your Own Election Kodigo
      </h3>
      <h3 className="text-sm uppercase tracking-wide">
        May 9, 2022 National and Local Elections
      </h3>
      {(pageType === "main" || pageType === "share") && (
        <div className={cn("my-4", ballotVisible ? "block" : "hidden")}>
          <div className="flex w-full flex-col justify-center gap-2 p-2">
            <SaveShareButton
              onSubmit={onSubmit}
              saveKey={saveKey}
              megapack={megapack}
            />
            <StartOverButton reset={reset} />
          </div>
          <p className="text-center text-sm text-gray-500">
            At any point, you may choose to save your progress or start over.
          </p>
        </div>
      )}
      {!mainLogoVisible && (pageType === "main" || pageType === "share") && (
        <Instructions isSidebar={true} />
      )}
      {IS_DEVELOPMENT && (
        <details
          className="my-2"
          open
        >
          <summary>Debug</summary>
          <pre
            className={cn(
              "w-full overflow-x-scroll bg-gray-200 p-2 text-sm text-gray-700"
            )}
          >
            {JSON.stringify(peek, null, 2)}
          </pre>
        </details>
      )}
      <div className="flex-grow"></div>
      <SidebarLinks />
    </>
  );
};

export default Sidebar;
