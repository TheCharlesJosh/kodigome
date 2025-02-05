"use client";
import { useEffect, useRef, useState } from "react";
// import emo from '../lib/emo'

import { useCopyToClipboard } from "react-use";
import { HiClipboardCopy } from "react-icons/hi";
// import { HiClipboardCopy } from '@heroicons/react/outline'
// import { useClipboard } from '@chakra-ui/react'

import orderedCandidateMap from "@public/candidates/orderedCandidateMap.json";

import { decodeForSharing } from "../lib/for-sharing";

const CopyPasteKodigo = ({
  saveKey,
  url,
}: {
  saveKey: string | null;
  url: string;
}) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [kodigoText, setKodigoText] = useState("Loading...");
  // const { onCopy } = useClipboard(kodigoText)
  const [, copy] = useCopyToClipboard();

  useEffect(() => {
    const decodeKey = async () => {
      if (saveKey) {
        const decoded = await decodeForSharing(saveKey);

        const { user, ...restOfValues } = decoded ?? { user: {} };
        const location =
          user && user?.Province && user?.["City/Municipality"]
            ? `${user?.Province} • ${user?.["City/Municipality"]}`
            : "";
        const isEmpty =
          Object.keys(restOfValues).length === 0 &&
          restOfValues.constructor === Object;

        let startingText = `🗳 kodigo.me 🇵🇭 | My Preferred Candidates\n${
          location ? location + "\n" : ""
        }`;

        Object.entries(restOfValues)
          .sort(
            (previous, current) =>
              orderedCandidateMap.findIndex(
                (entry) => entry.position === previous[0]
              ) -
              orderedCandidateMap.findIndex(
                (entry) => entry.position === current[0]
              )
          )
          .forEach(([position, candidate]) => {
            startingText += "\n" + position + "\n";
            startingText += Array.isArray(candidate)
              ? candidate.map((x) => `⚫ ${x}\n`).join("")
              : "⚫ " + candidate + "\n";
          });

        startingText += "\n🗳 Check full kodigo at " + url;

        if (isEmpty) {
          setKodigoText(
            "🗳 Create your own kodigo for free at https://kodigo.me 🇵🇭 "
          );
        } else {
          setKodigoText(startingText);
        }
      }
    };

    decodeKey().catch(console.error);
  }, [saveKey, url]);

  return (
    <div className="relative">
      <p className="mb-2 block text-sm font-medium text-gray-700">
        <span className="font-semibold">📋 Copy and paste your kodigo:</span> If
        you want, post a text-only version of your kodigo.
      </p>

      <div className="overflow-hidden rounded-lg border border-gray-300 shadow-sm focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500">
        <label
          htmlFor="kodigoText"
          className="sr-only"
        >
          Your kodigo here
        </label>
        <textarea
          rows={5}
          name="kodigoText"
          id="kodigoText"
          className="block w-full resize-none border-0 py-3 text-xs focus:ring-0 sm:text-sm"
          placeholder="Your kodigo in text form here..."
          value={kodigoText}
          ref={textAreaRef}
          readOnly
        />

        {/* Spacer element to match the height of the toolbar */}
        <div
          className="py-2"
          aria-hidden="true"
        >
          {/* Matches height of button in toolbar (1px border + 36px content height) */}
          <div className="py-px">
            <div className="h-9" />
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 flex justify-between py-2 pl-3 pr-2">
        <div className="flex items-center space-x-5">
          <div className="flex items-center">
            <span className="text-xs text-gray-500 sm:text-sm">
              {kodigoText.length} characters
            </span>
          </div>
        </div>
        <div className="flex-shrink-0">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-md border border-gray-300 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            onClick={() => {
              requestAnimationFrame(() => {
                textAreaRef?.current?.focus();
                if (textAreaRef && textAreaRef.current) {
                  textAreaRef.current.setSelectionRange(
                    0,
                    textAreaRef.current.value.length
                  );
                }
                // onCopy()
                copy(kodigoText);
              });
            }}
          >
            <HiClipboardCopy
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
            Copy
          </button>
        </div>
      </div>
    </div>
  );
};

export default CopyPasteKodigo;
