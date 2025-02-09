"use client";
import prntr from "prntr";
import { HiOutlinePrinter, HiOutlineRefresh } from "react-icons/hi";
import { WhiteButtonBase } from "./white-button-base";
import { toast } from "react-toastify";
import { useState } from "react";
import { useRouter } from "next/navigation";
// import { saveAs } from "file-saver"

export const PrintButton = ({
  pdfURL,
  id = "",
}: {
  pdfURL: string | null;
  id: string | null;
}) => {
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();
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
                // toast.info("Downloading PDF...", { toastId: "print-fallback" });
                router.push("/api/pdf/" + id);
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
