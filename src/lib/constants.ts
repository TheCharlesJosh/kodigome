export const IS_PRODUCTION: boolean = process.env.NEXT_PUBLIC_VERCEL_ENV
  ? process.env.NEXT_PUBLIC_VERCEL_ENV === "production"
  : process.env.NEXT_PUBLIC_PRODUCTION === "true";
export const IS_PREVIEW: boolean =
  process.env.NEXT_PUBLIC_VERCEL_ENV === "preview";
export const IS_DEVELOPMENT: boolean = process.env.NEXT_PUBLIC_VERCEL_ENV
  ? process.env.NEXT_PUBLIC_VERCEL_ENV === "development"
  : process.env.NEXT_PUBLIC_PRODUCTION === "false";

export const BASE_URL: string =
  (process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.NEXT_PUBLIC_BASE_URL) ?? "https://kodigo.me";
export const BASE_DOMAIN: string = BASE_URL.replace(/^https?:\/\//, "");
