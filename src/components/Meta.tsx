import Head from "next/head";
import {
  BASE_URL,
  CLOUDINARY_CACHE_BUSTER,
  CLOUDINARY_OG,
  // IS_PRODUCTION,
} from "../lib/constants";

export default function Meta({
  title = "kodigo.me 🗳 | PH Election 2022 Ballot Kodigo Generator",
  description = "Create your own kodigo ahead of time so that you can save time voting on May 9. 🇵🇭",
  saveKey = null,
  baseURL = BASE_URL,
}: {
  title?: string;
  description?: string;
  saveKey?: string | null;
  baseURL?: string;
}) {
  // const baseURL = saveKey
  //   ? BASE_URL + '/share/' + saveKey
  //   : BASE_URL

  // const image = CLOUDINARY_OG + '/api/og/' + (saveKey ?? '')
  const image = `${CLOUDINARY_OG}/api/og/${
    saveKey ?? "_"
  }/v${CLOUDINARY_CACHE_BUSTER}/${saveKey ?? "_"}`;
  return (
    <Head>
      <title>{title}</title>
      <meta
        name="title"
        content={title}
      />
      <meta
        name="description"
        content={description}
      />

      <meta
        property="og:type"
        content="website"
      />
      <meta
        property="og:url"
        content={baseURL}
      />
      <meta
        property="og:title"
        content={title}
      />
      <meta
        property="og:description"
        content={description}
      />
      <meta
        property="og:image"
        content={image}
      />

      <meta
        property="twitter:card"
        content="summary_large_image"
      />
      <meta
        property="twitter:url"
        content={baseURL}
      />
      <meta
        property="twitter:title"
        content={title}
      />
      <meta
        property="twitter:description"
        content={description}
      />
      <meta
        property="twitter:image"
        content={image}
      ></meta>

      {/* {IS_PRODUCTION && (
        <script
          async
          src="https://ackee.fourthestars.com/tracker.js"
          data-ackee-server="https://ackee.fourthestars.com"
          data-ackee-domain-id="55c1ed7f-21b8-4dd8-a749-acd5ca1a79d8"
        ></script>
      )} */}
    </Head>
  );
}
