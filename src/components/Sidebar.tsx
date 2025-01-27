import Image from "next/image";
import clsx from "clsx";
import {
  BaseSyntheticEvent,
  // Dispatch,
  // SetStateAction
} from "react";
import { FieldValues, UseFormReset } from "react-hook-form";
import { StartOverButton } from "./start-over-button";
import logo from "@assets/logo.svg";
import { SaveShareButton } from "./save-share-button";
// import { LinkBox, LinkOverlay } from '@chakra-ui/react'
import { LinkBox, LinkOverlay } from "./LinkOverlay";
import { Instructions } from "./Instructions";
import { IS_DEVELOPMENT } from "@lib/constants";
import { SidebarLinks } from "./sidebar-links";
import { CandidateGroupValues } from "@/lib/CandidateTypes";

export const SidebarRedux = ({
  mainLogoVisible,
  pageType,
}: {
  pageType?: string;
  mainLogoVisible: boolean;
}) => {
  // const [openModal, setOpenModal] = useState<boolean>(false)

  // function handleSubmit(event: MouseEvent) {
  //   setOpenModal(true)
  //   onSubmit(event)
  // }
  return (
    <>
      <LinkBox
        as="div"
        className={clsx(
          "transition-opacity",
          mainLogoVisible ? "opacity-0" : "opacity-100"
          // pageType !== 'main' && pageType !== 'share' && 'opacity-100'
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
      <h3 className="text-base font-semibold uppercase tracking-wide text-indigo-600">
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
}: {
  peek: CandidateGroupValues;
  reset: UseFormReset<FieldValues>;
  onSubmit: (
    e?: BaseSyntheticEvent<object, unknown, unknown> | undefined
  ) => Promise<void>;
  saveKey: string | null;
  pageType?: string;
  mainLogoVisible: boolean;
  // setMainLogoVisible: Dispatch<SetStateAction<boolean>>
  ballotVisible: boolean;
  // setBallotVisible: Dispatch<SetStateAction<boolean>>
}) => {
  // const [openModal, setOpenModal] = useState<boolean>(false)

  // function handleSubmit(event: MouseEvent) {
  //   setOpenModal(true)
  //   onSubmit(event)
  // }
  return (
    <>
      <LinkBox
        as="div"
        className={clsx(
          "transition-opacity",
          mainLogoVisible ? "opacity-0" : "opacity-100"
          // pageType !== 'main' && pageType !== 'share' && 'opacity-100'
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
      <h3 className="text-base font-semibold uppercase tracking-wide text-indigo-600">
        Create Your Own Election Kodigo
      </h3>
      <h3 className="text-sm uppercase tracking-wide">
        May 9, 2022 National and Local Elections
      </h3>
      {(pageType === "main" || pageType === "share") && (
        <div className={clsx("my-4", ballotVisible ? "block" : "hidden")}>
          <div className="flex w-full flex-col justify-center gap-2 p-2">
            <SaveShareButton
              onSubmit={onSubmit}
              saveKey={saveKey}
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
      <div className="flex-grow"></div>
      <SidebarLinks />
    </>
  );
};

export default Sidebar;
