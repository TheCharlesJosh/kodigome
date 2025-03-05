"use client";
import { MouseEvent } from "react";
import { HiDotsHorizontal } from "react-icons/hi";

export const WebShareButton = ({
  link,
  title,
  text,
  blob,
}: {
  link: string;
  title: string;
  text: string;
  blob?: Blob;
}) => {
  const shareData = {
    title,
    text,
    files: [] as File[],
    url: link,
  };
  const handleClick = async (_event: MouseEvent) => {
    const file = new File([blob as BlobPart], "kodigo-me.png", {
      type: "image/png",
    });
    shareData.files = [file];

    try {
      if (!navigator.canShare || !navigator.canShare(shareData)) {
        throw new Error("Cannot share data: " + shareData);
      } else {
        await navigator.share(shareData);
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (navigator.canShare && navigator.canShare(shareData) && blob) {
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
