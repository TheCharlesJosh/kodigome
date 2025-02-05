"use client";
import { useCopyToClipboard } from "react-use";
import { HiLink } from "react-icons/hi";
import { WhiteButtonBase } from "./white-button-base";

export const CopyLinkButton = ({
  textToClipBoard,
}: {
  textToClipBoard: string;
}) => {
  const [, copy] = useCopyToClipboard();
  const handleClick = () => {
    copy(textToClipBoard);
  };
  return (
    <WhiteButtonBase
      message="Copy Link"
      onClick={handleClick}
      Icon={HiLink}
    />
  );
};
