// import { FieldValues, UseFormReset } from 'react-hook-form'
import {
  // BaseSyntheticEvent,
  Dispatch,
  SetStateAction,
} from "react";
// import MarkdownWrapper from './MarkdownWrapper'
import { UpperHeader } from "./UpperHeader";
// import { Disclosure } from '@headlessui/react'
// import { ChevronDownIcon } from '@heroicons/react/outline'
// import clsx from 'clsx'
import Link from "next/link";

const Main = ({
  setMainLogoVisible,
  sharePage = false,
}: {
  setMainLogoVisible: Dispatch<SetStateAction<boolean>>;
  sharePage?: boolean;
}) => {
  function handleVisibility(inView: boolean) {
    setMainLogoVisible(inView);
  }
  return (
    <>
      <UpperHeader
        handleVisibility={handleVisibility}
        sharePage={sharePage}
      />
      <div className="flex flex-col bg-white">
        <main className="mx-auto flex w-full max-w-7xl flex-grow flex-col justify-center px-4 sm:px-6 lg:px-8">
          <div className="py-32">
            <div className="text-center">
              <p className="text-sm font-semibold uppercase tracking-wide text-indigo-600">
                404 error
              </p>
              <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
                Page not found.
              </h1>
              <p className="mt-2 text-base text-gray-500">
                Sorry, we couldn’t find the page you’re looking for.
              </p>
              <div className="mt-6">
                <Link
                  href="/"
                  className="text-base font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Go back home<span aria-hidden="true"> &rarr;</span>
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Main;
