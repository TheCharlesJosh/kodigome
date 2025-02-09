import { decodeForSharing } from "./for-sharing";
import getMegapack from "./megapack";

async function main() {
  const megapack = await getMegapack("2022");
  const test = "TgQBChEHLAQMEBESFRoiJSYtP6FfMQFBAVECYwwRE3EBgQGUBRMVHQ";
  console.log(await decodeForSharing(test, megapack));
}

main();
