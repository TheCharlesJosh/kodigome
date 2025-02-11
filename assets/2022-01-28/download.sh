#!/bin/sh

while IFS= read -r URL; do
  # REWRITE=$(echo $URL | cut -c 69-)
  URL=$(echo $URL | sed 's/\r//')
  REWRITE=$(echo $URL | sed 's/^.\{68\}//;s/\//./g;s/\r//')
  # wget -w 3 -U "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.84 Safari/537.36" --header="Accept: text/html" --header="Cookie: __cfduid=xpzezr54v5qnaoet5v2dx1ias5xx8m4faj7d5mfg4og; cf_clearance=0n01f6dkcd31en6v4b234a6d1jhoaqgxa7lklwbj-1438079290-3600" -O "$REWRITE" "$URL"
  # http -d "$URL" -o "$REWRITE"
  # echo "./pdf3/$REWRITE"
  curl "$URL" \
    -H 'authority: comelec.gov.ph' \
    -H 'cache-control: max-age=0' \
    -H 'sec-ch-ua: " Not A;Brand";v="99", "Chromium";v="99", "Google Chrome";v="99"' \
    -H 'sec-ch-ua-mobile: ?0' \
    -H 'sec-ch-ua-platform: "Windows"' \
    -H 'upgrade-insecure-requests: 1' \
    -H 'dnt: 1' \
    -H 'user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.84 Safari/537.36' \
    -H 'accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9' \
    -H 'sec-fetch-site: same-origin' \
    -H 'sec-fetch-mode: navigate' \
    -H 'sec-fetch-user: ?1' \
    -H 'sec-fetch-dest: document' \
    -H 'accept-language: en-PH,en;q=0.9,fil-PH;q=0.8,fil;q=0.7,en-US;q=0.6' \
    -o "./pdf3/$REWRITE" \
    --compressed

  sleep 1
  # echo $REWRITE
done