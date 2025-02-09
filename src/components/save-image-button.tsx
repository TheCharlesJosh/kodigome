"use client";
import { saveAs } from "file-saver";
import { WhiteButtonBase } from "./white-button-base";
import { useState } from "react";
import { HiOutlineRefresh, HiPhotograph } from "react-icons/hi";

export const SaveImageButton = ({
  id,
  src,
  blob,
}: {
  id: string | null;
  src: string;
  blob?: Blob;
}) => {
  const [isLoading, setLoading] = useState(false);
  const handleClick = () => {
    setLoading(true);
    if (isFacebookApp()) {
      const link = document.createElement("a");
      link.href = src;
      link.download = `kodigo.me-${id}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setTimeout(() => {
        setLoading((isLoading) => {
          if (isLoading === true) {
            return false;
          } else return isLoading;
        });
      }, 10000);
    } else {
      const file = new File([blob as BlobPart], `kodigo.me-${id}.png`, {
        type: "image/png",
      });
      saveAs(file);
      setLoading(false);
    }
  };
  return (
    <WhiteButtonBase
      message="Save Image"
      onClick={handleClick}
      Icon={isLoading ? HiOutlineRefresh : HiPhotograph}
    />
  );
};

// Use this to download images from Facebook's internal browser.
const isFacebookApp = function () {
  const ua = navigator.userAgent || navigator.vendor || window.opera;
  return ua.indexOf("FBAN") > -1 || ua.indexOf("FBAV") > -1;
};
