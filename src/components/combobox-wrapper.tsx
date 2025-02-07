"use client";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
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
import { LocalCandidateMultiple } from "@/lib/types";
import { cn } from "@/lib/utils";

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

  const filteredOptions =
    query === "" || query == null
      ? options
      : options.filter((options) => {
          return options.toLowerCase().includes(query.toLowerCase());
        });

  const comboboxName = "user." + label;

  useEffect(() => {
    setValue(comboboxName, selected);
    Object.keys(LocalCandidateMultiple).forEach((key) => resetField(key));
  }, [selected, comboboxName, resetField, setValue]);

  return (
    <Combobox
      as="div"
      value={selected}
      onChange={setSelected}
      className={cn("flex-grow", className)}
    >
      <Label className="block text-sm font-medium text-gray-700">{label}</Label>
      <div className="relative mt-1">
        <Controller
          name={comboboxName}
          control={control}
          render={({ field: { onBlur, ref } }) => {
            return (
              <>
                <ComboboxInput
                  className="focus:border-primary-500 focus:ring-primary-500 w-full select-all rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:outline-none focus:ring-1 sm:text-sm"
                  displayValue={(selected: string) => selected}
                  placeholder={placeholder}
                  onClick={(event: React.MouseEvent<HTMLInputElement>) => {
                    const target = event.target as HTMLInputElement;
                    requestAnimationFrame(() => {
                      target.setSelectionRange(0, target.value.length);
                    });
                  }}
                  onBlur={onBlur}
                  ref={ref}
                  onChange={(event) => {
                    setQuery(event.target.value);
                  }}
                />
                <ComboboxButton className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                  <HiSelector
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </ComboboxButton>
                {((selected != null && selected !== "") || query !== "") && (
                  <button
                    className="absolute inset-y-0 right-8 flex items-center rounded-r-md px-2 focus:outline-none"
                    onClick={() => {
                      setQuery("");
                      // setSelected(null);
                      setSelected("");
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
                value={option ?? ""}
                className={({ focus }) =>
                  cn(
                    "relative cursor-default select-none py-2 pl-3 pr-9",
                    focus ? "bg-primary-600 text-white" : "text-gray-900"
                  )
                }
              >
                {({ focus, selected }) => (
                  <>
                    <span
                      className={cn(
                        "block truncate",
                        selected && "font-semibold"
                      )}
                    >
                      {option}
                    </span>

                    {selected && (
                      <span
                        className={cn(
                          "absolute inset-y-0 right-0 flex items-center pr-4",
                          focus ? "text-white" : "text-primary-600"
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
