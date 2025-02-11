"use client";

import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import SimpleModal from "./simple-modal";
import { PrintButton } from "./print-button";
import { SaveImageButton } from "./save-image-button";
import { WebShareButton } from "./web-share-button";
import {
  HiOutlineClipboardCopy,
  HiOutlineInformationCircle,
  HiOutlineLink,
} from "react-icons/hi";
import { useCopyToClipboard } from "react-use";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  TelegramShareButton,
  TelegramIcon,
  WhatsappShareButton,
  WhatsappIcon,
  ViberShareButton,
  ViberIcon,
} from "react-share";
import { BASE_URL } from "@lib/constants";
import CopyPasteKodigo from "./copy-paste-kodigo";
import { MegapackType } from "@/lib/types";
import loadingAnim from "@public/kodigo-me-loading.json";
import Lottie from "lottie-react";

export const ShareDialog = ({
  openModal,
  setOpenModal,
  saveKey,
  megapack,
}: {
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  saveKey: string | null;
  megapack: MegapackType;
}) => {
  function handleResponse(_userInput: boolean) {
    // if (userInput === true) reset()
  }

  return (
    <SimpleModal
      openModal={openModal || false}
      setOpenModal={setOpenModal}
      setChecked={handleResponse}
      modalHeader="🥳 Save/share your kodigo!"
      negativeMessage={"Edit Kodigo"}
    >
      <ShareContents
        saveKey={saveKey}
        isUpperFold={false}
        megapack={megapack}
      />
    </SimpleModal>
  );
};

export const ShareContents = ({
  saveKey,
  isUpperFold = false,
  megapack,
}: {
  saveKey: string | null;
  isUpperFold?: boolean;
  megapack: MegapackType;
}) => {
  const { year, shortName, hashtags } = megapack;
  const [blob, setBlob] = useState<Blob>();
  const [isImageLoaded, setImageLoaded] = useState(false);
  const [isImageError, setImageError] = useState(false);
  const [imageSrc, setImageSrc] = useState(`/${year}/png/${saveKey ?? "_"}`);

  const shareURL = `${BASE_URL}/${year}/${saveKey}`;
  const imageURL = `/${year}/png/${saveKey ?? "_"}`;

  useEffect(() => {
    const getBlob = async () => {
      const blob = await fetch(imageSrc).then((r) => r.blob());
      setBlob(blob);
    };
    getBlob().catch(console.error);
  }, [isImageLoaded, imageSrc]);

  useEffect(() => {
    setImageLoaded(false);
    setImageSrc(imageURL);
  }, [imageURL, year]);

  const shareData = {
    title: `kodigo.me 🗳 | My Preferred Candidates for ${shortName}`,
    text: `I just created my own kodigo 🗳 for PH Elections ${shortName}! ${hashtags}`,
    url: shareURL,
  };

  return (
    <div className="mt-2">
      <p className="mx-auto max-w-[602px] p-1 text-left text-sm text-gray-600">
        <HiOutlineInformationCircle className="-mt-1 mr-2 inline h-4 w-4" />
        {isImageLoaded
          ? "Scroll down to see save/share options."
          : isImageError
            ? isUpperFold
              ? "Kodigo failed to load. Please try refreshing the page."
              : 'Kodigo failed to load. Please go back by clicking "Edit kodigo" then click "Save/Share" again.'
            : "Please wait while we generate your kodigo."}
      </p>
      <div className="relative h-[600px] w-[600px] border text-center">
        {!isImageLoaded && (
          <Lottie
            animationData={loadingAnim}
            className="absolute inset-0 bg-white"
            loop
            autoplay
          />
        )}
        <Image
          src={imageSrc}
          unoptimized={true}
          className="mx-auto"
          alt={
            isUpperFold
              ? "Generated kodigo from kodigo.me | Did the image fail to load? Please try refreshing the page."
              : 'Generated kodigo from kodigo.me | Did the image fail to load? Please go back by clicking "Edit Kodigo" then click "Save/Share" again.'
          }
          key={"kodigo " + saveKey}
          onLoad={() => {
            setImageLoaded(true);
          }}
          onError={() => {
            setImageSrc(
              isUpperFold
                ? "/images/error-kodigo-page.png"
                : "/images/error-kodigo-dialog.png"
            );
            setImageError(true);
          }}
          width={600}
          height={600}
          quality={100}
        />
      </div>
      {isImageLoaded && (
        <div className="mx-auto max-w-[602px] border bg-slate-50 px-4">
          <div className="my-4">
            <ShareURL url={shareURL} />
          </div>
          <div className="my-4">
            <p className="block text-sm font-medium text-gray-700">
              <span className="font-semibold">
                💾 Save or share your kodigo:
              </span>{" "}
              Make sure to share only to people you trust!
            </p>
            <div className="flex flex-col justify-center lg:flex-row">
              <div className="mt-2 flex justify-center gap-2 rounded-l-md border border-gray-300 bg-white p-2">
                <div className="rounded-md shadow-sm sm:flex">
                  <SaveImageButton
                    id={saveKey}
                    src={imageSrc}
                    blob={blob}
                  />
                  <PrintButton pdfURL={imageSrc} />
                </div>
              </div>
              <div className="mt-2 flex items-center justify-center gap-2 rounded-r-md border border-gray-300 bg-white p-2 lg:-ml-1">
                <FacebookShareButton url={shareData.url}>
                  <FacebookIcon
                    size={32}
                    round
                  />
                </FacebookShareButton>
                <TwitterShareButton
                  url={shareData.url}
                  title={shareData.text}
                >
                  <TwitterIcon
                    size={32}
                    round
                  />
                </TwitterShareButton>
                <TelegramShareButton
                  url={shareData.url}
                  title={shareData.text}
                >
                  <TelegramIcon
                    size={32}
                    round
                  />
                </TelegramShareButton>
                <WhatsappShareButton
                  url={shareData.url}
                  title={shareData.text}
                >
                  <WhatsappIcon
                    size={32}
                    round
                  />
                </WhatsappShareButton>
                <ViberShareButton
                  url={shareData.url}
                  title={shareData.text}
                >
                  <ViberIcon
                    size={32}
                    round
                  />
                </ViberShareButton>
                <WebShareButton
                  link={shareData.url}
                  title={shareData.title}
                  text={shareData.text}
                  blob={blob}
                />
              </div>
            </div>
            <div className="my-4">
              <CopyPasteKodigo
                saveKey={saveKey}
                url={shareURL}
                megapack={megapack}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const ShareURL = ({ url }: { url: string }) => {
  const linkRef = useRef<HTMLInputElement>(null);
  const [, copy] = useCopyToClipboard();

  return (
    <div>
      <label
        htmlFor="shareURL"
        className="block text-sm font-medium text-gray-700"
      >
        <span className="font-semibold">🔗 Your kodigo.me link:</span> Keep this
        so that you can come back later.
      </label>
      <div className="mt-2 flex rounded-md shadow-sm">
        <div className="relative flex flex-grow items-stretch focus-within:z-10">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <HiOutlineLink
              className="h-3 w-3 text-gray-400 sm:h-5 sm:w-5"
              aria-hidden="true"
            />
          </div>
          <input
            type="text"
            name="shareURL"
            id="shareURL"
            className="block w-full rounded-none rounded-l-md border-gray-300 pl-8 text-xs focus:border-primary-500 focus:ring-primary-500 sm:pl-10 sm:text-sm"
            placeholder="Share URL"
            defaultValue={url}
            ref={linkRef}
            readOnly
          />
        </div>
        <button
          type="button"
          className="relative -ml-px inline-flex items-center space-x-2 rounded-r-md border border-gray-300 bg-gray-50 px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-100 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 sm:text-sm"
          onClick={() => {
            requestAnimationFrame(() => {
              if (linkRef && linkRef.current) {
                linkRef.current.focus();
                linkRef.current.setSelectionRange(
                  0,
                  linkRef.current.value.length
                );
              }
              copy(url);
            });
          }}
        >
          <HiOutlineClipboardCopy
            className="h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
          <span className="hidden sm:block">Copy Link</span>
        </button>
      </div>
    </div>
  );
};
