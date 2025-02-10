import type { Metadata } from "next";
import { inter } from "@/lib/fonts";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import { BASE_URL } from "@/lib/constants";
import { cn } from "@/lib/utils";

const APP_NAME = "kodigo.me";
const SITE_TITLE = "kodigo.me 🗳 | PH Election Ballot Kodigo Generator";
const SITE_TITLE_TEMPLATE = "%s - kodigo.me 🗳";
const SITE_DESCRIPTION =
  "Create your own kodigo ahead of time so that you can save time voting on election day. 🇵🇭";
const SITE_IMAGE = "/kodigo-me-meta.png";

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: SITE_TITLE,
    template: SITE_TITLE_TEMPLATE,
  },
  metadataBase: new URL(BASE_URL),
  description: SITE_DESCRIPTION,
  manifest: "/manifest.json",
  appleWebApp: {
    title: SITE_TITLE,
    statusBarStyle: "black-translucent",
    startupImage: [SITE_IMAGE],
  },
  other: {
    "mobile-web-app-capable": "yes",
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: SITE_TITLE,
    title: {
      default: SITE_TITLE,
      template: SITE_TITLE_TEMPLATE,
    },
    description: SITE_DESCRIPTION,
    images: [
      {
        url: SITE_IMAGE,
        width: 1917,
        height: 960,
      },
    ],
  },
  twitter: {
    card: "summary",
    title: {
      default: SITE_TITLE,
      template: SITE_TITLE_TEMPLATE,
    },
    description: SITE_DESCRIPTION,
    images: [
      {
        url: SITE_IMAGE,
        width: 1917,
        height: 960,
      },
    ],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(inter.variable, "scroll-smooth antialiased")}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
