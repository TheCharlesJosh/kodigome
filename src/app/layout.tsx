import type { Metadata } from "next";
import { inter } from "@/lib/fonts";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";

const APP_NAME = "kodigo.me 🗳 | PH Election Ballot Kodigo Generator";
const APP_DEFAULT_TITLE =
  "Create your own kodigo ahead of time so that you can save time voting on election day. 🇵🇭";
const APP_TITLE_TEMPLATE = "%s - kodigo.me 🗳";
const APP_DESCRIPTION = "PH Election Ballot Kodigo Generator";
const APP_IMAGE = "/main-meta.png";

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  manifest: "/manifest.json",
  appleWebApp: {
    title: APP_DEFAULT_TITLE,
    statusBarStyle: "black-translucent",
    startupImage: [APP_IMAGE],
  },
  other: {
    "mobile-web-app-capable": "yes",
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
    images: [
      {
        url: APP_IMAGE,
        width: 1917,
        height: 960,
      },
    ],
  },
  twitter: {
    card: "summary",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
    images: [
      {
        url: APP_IMAGE,
        width: 1917,
        height: 960,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} scroll-smooth antialiased`}>
        {children}
      </body>
    </html>
  );
}
