"use client";
import { MouseEvent } from "react";
import { HiDotsHorizontal } from "react-icons/hi";

export const WebShareButton = ({
  link,
  blob,
}: {
  link: string;
  blob?: Blob;
}) => {
  const shareData = {
    title: "kodigo.me | Preferred Candidates",
    text: "I just created my own Kodigo for PH Elections 2022.",
    files: [] as File[],
    url: link,
  };
  const handleClick = async (_event: MouseEvent) => {
    const file = new File([blob as BlobPart], "kodigo-me.png", {
      type: "image/png",
    });
    shareData.files = [file];

    try {
      if (!navigator.canShare(shareData)) {
        throw new Error("Cannot share data: " + shareData);
      } else {
        await navigator.share(shareData);
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (navigator.canShare(shareData) && blob) {
    return (
      <HiDotsHorizontal
        className="-mt-px h-8 w-8 cursor-pointer rounded-full bg-gray-400 text-white"
        aria-hidden="true"
        onClick={handleClick}
      />
    );
  } else {
    return <></>;
  }
};
