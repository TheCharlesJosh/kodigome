"use client";
// import { useCopyToClipboard } from 'usehooks-ts'
import { useCopyToClipboard } from "react-use";
// import { useClipboard } from '@chakra-ui/react'
// import { LinkIcon } from '@heroicons/react/outline'
import { HiLink } from "react-icons/hi";
import { WhiteButtonBase } from "./white-button-base";

export const CopyLinkButton = ({
  textToClipBoard,
}: {
  textToClipBoard: string;
}) => {
  // const [, copy] = useCopyToClipboard()
  const [, copy] = useCopyToClipboard();
  // const { onCopy } = useClipboard(textToClipBoard)
  const handleClick = () => {
    copy(textToClipBoard);
    //   console.log('Copied to clipboard: ', textToClipBoard)
  };
  return (
    <WhiteButtonBase
      message="Copy Link"
      onClick={handleClick}
      Icon={HiLink}
    />
  );
};
