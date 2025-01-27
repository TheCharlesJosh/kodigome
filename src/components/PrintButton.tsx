"use client";
import prntr from "prntr";
import { HiOutlinePrinter, HiOutlineRefresh } from "react-icons/hi";
import { WhiteButtonBase } from "./WhiteButtonBase";
import { toast } from "react-toastify";
import { useState } from "react";
import { useRouter } from "next/router";

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
    // if (pdfURL && window.print)
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
                toast.info("Downloading PDF...", { toastId: "print-fallback" });
                router.push("/api/pdf/" + id);
                return false;
              } else return isLoading;
            });
          }, 1000);
        },
      });
  };
  // if (window.print) {
  return (
    <>
      {/* <ToastContainer /> */}
      <WhiteButtonBase
        message="Print"
        onClick={handleClick}
        Icon={isLoading ? HiOutlineRefresh : HiOutlinePrinter}
      />
    </>
  );
  // } else return <></>
};
