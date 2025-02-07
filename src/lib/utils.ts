import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";
import { defaultConfig } from "tailwind-variants";

const twMergeConfig = {
  extend: {
    theme: {
      spacing: ["8xl"],
      color: ["odd-2022", "even-2022", "odd-2025", "even-2025", "primary"],
    },
    classGroups: {
      "font-family": [
        {
          text: ["inter"],
        },
      ],
    },
  },
};

defaultConfig.twMergeConfig = twMergeConfig;

const customTwMerge = extendTailwindMerge(twMergeConfig);

export function cn(...inputs: ClassValue[]): string {
  return customTwMerge(clsx(inputs));
}

/**
 * This is used to verify if the current Website is running on a Development Environment
 */
export const IS_DEVELOPMENT = process.env.NODE_ENV === "development";

export async function fetcher(...args: Parameters<typeof fetch>) {
  return (await fetch(...args)).json();
}

export function isKeyof<T extends object>(
  obj: T,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  possibleKey: keyof any
): possibleKey is keyof T {
  return possibleKey in obj;
}
