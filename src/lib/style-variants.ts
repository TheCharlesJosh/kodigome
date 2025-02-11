import { tv } from "tailwind-variants";

export const overrideToEven = (position: string, year: string) =>
  ["SENATOR"].includes(position) && year === "2025";

export const candidateGroup = tv({
  slots: {
    base: "",
    pageColor: "",
    primary: "bg-primary-600 text-white",
    chip: "bg-primary-800 text-primary-50",
    chipCircle: "text-primary-400",
    helperButton:
      "border-primary-300 bg-primary-800 text-primary-100 hover:bg-primary-900 focus:border-primary-400 focus:ring-primary-400",
    search:
      "border-primary-300 bg-primary-50 focus:border-primary-700 focus:ring-primary-700",
  },
  variants: {
    oddEven: {
      odd: "",
      even: "",
    },
    year: {
      "2025": {
        pageColor: "primary-2025",
      },
      "2022": {
        pageColor: "primary-2022",
      },
    },
  },
  compoundVariants: [
    {
      oddEven: "odd",
      year: "2025",
      class: {
        base: "primary-2025",
      },
    },
    {
      oddEven: "even",
      year: "2025",
      class: {
        base: "secondary-2025",
      },
    },
    {
      oddEven: "odd",
      year: "2022",
      class: {
        base: "secondary-2022",
      },
    },
    {
      oddEven: "even",
      year: "2022",
      class: {
        base: "primary-2022",
      },
    },
  ],
});
