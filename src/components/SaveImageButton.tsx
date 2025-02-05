"use client";
import FileSaver from "file-saver";
import { WhiteButtonBase } from "./white-button-base";
import { useState } from "react";
import { HiOutlineRefresh, HiPhotograph } from "react-icons/hi";
import { cloudinaryLoader } from "../lib/constants";

export const SaveImageButton = ({
  id,
  blob,
}: {
  id: string | null;
  blob?: Blob;
}) => {
  const [isLoading, setLoading] = useState(false);
  const imageURL = cloudinaryLoader({ src: id ?? "_" });
  const handleClick = () => {
    setLoading(true);
    if (isFacebookApp()) {
      const link = document.createElement("a");
      link.href = imageURL;
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
      FileSaver.saveAs(file);
      setLoading(false);
    }
  };
  // console.log(toast)
  return (
    <>
      <WhiteButtonBase
        message="Save Image"
        onClick={handleClick}
        Icon={isLoading ? HiOutlineRefresh : HiPhotograph}
      />
      {/* <ToastContainer /> */}
    </>
  );
};

// Use this to download images from Facebook's internal browser.
const isFacebookApp = function () {
  const ua = navigator.userAgent || navigator.vendor || window.opera;
  return ua.indexOf("FBAN") > -1 || ua.indexOf("FBAV") > -1;
};
