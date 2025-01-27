import type { Config } from "tailwindcss";
import TailwindCSSForms from "@tailwindcss/forms";
import TailwindCSSTypography from "@tailwindcss/typography";
import defaultTheme from "tailwindcss/defaultTheme";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      spacing: {
        "8xl": "90rem",
      },
      colors: {
        transparent: "transparent",
        current: "currentColor",
      },
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [TailwindCSSForms, TailwindCSSTypography],
} satisfies Config;
