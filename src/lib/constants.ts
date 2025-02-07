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

export const CLOUDINARY_OG = IS_DEVELOPMENT
  ? process.env.NEXT_PUBLIC_BASE_URL
  : "https://kodigome.mo.cloudinary.net/og";
export const CLOUDINARY_SAVEABLE = IS_DEVELOPMENT
  ? process.env.NEXT_PUBLIC_BASE_URL
  : "https://kodigome.mo.cloudinary.net/save";
export const CLOUDINARY_CACHE_BUSTER = 2;

export const cloudinaryLoader = ({ src }: { src: string }) => {
  src = src ?? "_";
  if (src.startsWith("/")) {
    return `${CLOUDINARY_OG}${src}?v=${CLOUDINARY_CACHE_BUSTER}`;
  } else {
    return `${CLOUDINARY_SAVEABLE}/api/png/${src}/v${CLOUDINARY_CACHE_BUSTER}/kodigo-me-print-me`;
  }
};
