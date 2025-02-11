"use client";
import prntr from "prntr";
import { HiOutlinePrinter, HiOutlineRefresh } from "react-icons/hi";
import { WhiteButtonBase } from "./white-button-base";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
// import { saveAs } from "file-saver"

export const PrintButton = ({ pdfURL }: { pdfURL: string | null }) => {
  const [isLoading, setLoading] = useState(false);
  const [isFallback, setFallback] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (isFallback && pdfURL) {
      router.push(pdfURL.replace("png", "pdf"));
      toast.info("Downloading PDF...", {
        toastId: "print-fallback",
      });
      setFallback(false);
    }
  }, [isFallback, pdfURL, router]);

  const handleClick = () => {
    if (pdfURL)
      prntr({
        printable: pdfURL,
        type: "image",
        onError: (error) => toast.error(JSON.stringify(error)),
        onLoadingEnd: () => {
          setLoading(false);
        },
        onLoadingStart: () => {
          setLoading(true);
          setTimeout(() => {
            setLoading((isLoading) => {
              if (isLoading === true) {
                setFallback(true);

                return false;
              } else return isLoading;
            });
          }, 1000);
        },
      });
  };
  return (
    <WhiteButtonBase
      message="Print"
      onClick={handleClick}
      Icon={isLoading ? HiOutlineRefresh : HiOutlinePrinter}
    />
  );
};
