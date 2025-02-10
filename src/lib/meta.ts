import { Metadata } from "next";
import { BASE_URL } from "./constants";

export function generatePageMeta({
  title,
  description,
  image = "/images/kodigo-me-meta.png",
}: {
  title: string;
  description: string;
  image?: string;
}): Metadata {
  return {
    title: title,
    description: description,
    metadataBase: new URL(BASE_URL),
    appleWebApp: {
      title: title,
    },
    openGraph: {
      type: "website",
      title: title,
      description: description,
      images: [
        {
          url: image,
          width: 1337,
          height: 700,
        },
      ],
    },
    twitter: {
      card: "summary",
      title: title,
      description: description,
      images: [
        {
          url: image,
          width: 1337,
          height: 700,
        },
      ],
    },
  };
}
