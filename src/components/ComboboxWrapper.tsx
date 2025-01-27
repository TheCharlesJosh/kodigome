"use client";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import clsx from "clsx";
// import { CheckIcon, SelectorIcon, XIcon } from '@heroicons/react/solid'
import { HiCheck, HiSelector, HiX } from "react-icons/hi";
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Label,
} from "@headlessui/react";
import { Controller, useFormContext } from "react-hook-form";
import {
  // defaultPositionValues,
  LocalCandidatesEnum,
} from "../lib/CandidateTypes";
// import fuzzySearchStrings from '../lib/fuzzySearch'

interface ComboboxWrapperProps {
  selected: string | null;
  setSelected:
    | Dispatch<SetStateAction<string | null>>
    | ((province: string | null) => void);
  options: string[];
  label: string | ReactNode;
  placeholder: string;
  className?: string;
}
export const ComboboxWrapper = ({
  selected,
  setSelected,
  options,
  label,
  placeholder,
  className,
}: ComboboxWrapperProps) => {
  const { control, setValue, resetField } = useFormContext();
  const [query, setQuery] = useState<string>("");
  // const searchOptions = fuzzySearchStrings(options)

  const filteredOptions =
    query === "" || query == null
      ? options
      : options.filter((options) => {
          return options.toLowerCase().includes(query.toLowerCase());
        });
  // (searchOptions(query) as SearchResult<string>[]).map((x) => x.item)

  const comboboxName = "user." + label;

  useEffect(() => {
    setValue(comboboxName, selected);
    Object.keys(LocalCandidatesEnum).forEach((key) => resetField(key));
  }, [selected, comboboxName, resetField, setValue]);

  return (
    <Combobox
      as="div"
      value={selected}
      onChange={setSelected}
      className={clsx("flex-grow", className)}
    >
      <Label className="block text-sm font-medium text-gray-700">{label}</Label>
      <div className="relative mt-1">
        <Controller
          name={comboboxName}
          control={control}
          render={({ field }) => {
            // console.log(field.value)
            // useEffect(() => {
            //   setValue(comboboxName, field.value)
            // }, [])
            return (
              <>
                <ComboboxInput
                  className="w-full select-all rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                  displayValue={(selected: string) => selected}
                  placeholder={placeholder}
                  onClick={(event: React.MouseEvent<HTMLInputElement>) => {
                    const target = event.target as HTMLInputElement;
                    requestAnimationFrame(() => {
                      target.setSelectionRange(0, target.value.length);
                    });
                  }}
                  {...field}
                  onChange={(event) => {
                    setQuery(event.target.value);
                    // field.onChange(event.target.value)
                    // field.onChange(selected)
                  }}
                  // onBlur={() => {
                  //   field.onChange(selected)
                  // }}
                />
                <ComboboxButton className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                  <HiSelector
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </ComboboxButton>
                {(selected != null || query !== "") && (
                  <button
                    className="absolute inset-y-0 right-8 flex items-center rounded-r-md px-2 focus:outline-none"
                    onClick={() => {
                      setQuery("");
                      setSelected(null);
                    }}
                  >
                    <HiX
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </button>
                )}
              </>
            );
          }}
        />

        {filteredOptions.length > 0 && (
          <ComboboxOptions className="absolute z-40 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {filteredOptions.map((option: string) => (
              <ComboboxOption
                key={option}
                value={option}
                className={({ focus }) =>
                  clsx(
                    "relative cursor-default select-none py-2 pl-3 pr-9",
                    focus ? "bg-indigo-600 text-white" : "text-gray-900"
                  )
                }
              >
                {({ focus, selected }) => (
                  <>
                    <span
                      className={clsx(
                        "block truncate",
                        selected && "font-semibold"
                      )}
                    >
                      {option}
                    </span>

                    {selected && (
                      <span
                        className={clsx(
                          "absolute inset-y-0 right-0 flex items-center pr-4",
                          focus ? "text-white" : "text-indigo-600"
                        )}
                      >
                        <HiCheck
                          className="h-5 w-5"
                          aria-hidden="true"
                        />
                      </span>
                    )}
                  </>
                )}
              </ComboboxOption>
            ))}
          </ComboboxOptions>
        )}
      </div>
    </Combobox>
  );
};
