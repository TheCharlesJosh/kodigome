import {
  CandidateGroupValuesWithUser,
  CityMuni,
  LocalCandidatesType,
  MegapackType,
  NationalCandidateMultiple,
} from "./types";
import * as b64 from "@juanelas/base64";

export const getBallotNumberRegex = /^\d+/;

export async function encodeForSharing(
  initialValues: CandidateGroupValuesWithUser,
  megapack: MegapackType
) {
  const { provincesCitiesMunicipalities, betterPositionMap } = megapack;

  let numberBuilder: number[] = [];

  if (
    initialValues.constructor !== Object ||
    (Object.keys(initialValues).length === 0 &&
      initialValues.constructor === Object)
  ) {
    numberBuilder = [255, 255];
    return b64.encode(new Uint8Array(numberBuilder), true, false);
  }
  const { user, ...initialVotes } = initialValues;

  if (
    initialValues.constructor === Object &&
    user?.hasOwnProperty("Province") &&
    user.Province !== null &&
    user.Province !== ""
  ) {
    const provinceIndex = provincesCitiesMunicipalities.findIndex(
      (entry) => entry.province === user.Province
    );

    if (provinceIndex === -1) {
      numberBuilder = [255, 255, ...numberBuilder];
    } else if (
      user?.hasOwnProperty("City/Municipality") &&
      user["City/Municipality"] !== null &&
      user["City/Municipality"] !== ""
    ) {
      const cityMuniIndex = provincesCitiesMunicipalities[
        provinceIndex
      ].citiesMunicipalities.findIndex(
        (entry) => entry === user["City/Municipality"]
      );
      if (cityMuniIndex === -1) {
        numberBuilder = [provinceIndex, 255, ...numberBuilder];
      } else {
        numberBuilder = [provinceIndex, cityMuniIndex, ...numberBuilder];
      }
    } else {
      numberBuilder = [provinceIndex, 255, ...numberBuilder];
    }
  } else {
    numberBuilder = [255, 255, ...numberBuilder];
  }

  const numberVotes = Object.entries(initialVotes).reduce(
    (acc, [position, value]) => {
      if (!value && value?.constructor !== Object) {
        return acc;
      } else {
        const positionArray =
          betterPositionMap.findIndex((x) => x.position === position) !== -1
            ? betterPositionMap.findIndex((x) => x.position === position)
            : 255;
        const votedForCount = Array.isArray(value) ? value.length : 1;
        const computedValue = Math.min(
          Number(16 * positionArray) + Number(votedForCount),
          255
        );

        if (positionArray === 255) {
          return [...acc, computedValue];
        } else if (Array.isArray(value)) {
          return [
            ...acc,
            computedValue,
            ...value
              .map((candidate: string) => {
                const candidateMatch = candidate.match(getBallotNumberRegex);
                if (candidateMatch == null) return Infinity;
                else return Number(candidateMatch[0]);
              })
              .filter((x) => x !== Infinity),
          ];
        } else if (typeof value === "string") {
          const candidateMatch = value.match(getBallotNumberRegex);
          if (candidateMatch == null) return acc;
          else return [...acc, computedValue, Number(candidateMatch[0])];
        } else {
          return [...acc, computedValue];
        }
      }
    },
    [] as number[]
  );

  numberBuilder = [...numberBuilder, ...numberVotes];
  return b64.encode(new Uint8Array(numberBuilder), true, false);
}

export async function decodeForSharing(
  encodedString: string,
  megapack: MegapackType
) {
  const {
    provincesCitiesMunicipalities,
    betterPositionMap,
    localMapping,
    national,
    yearCode,
  } = megapack;

  const convertedValues = {} as CandidateGroupValuesWithUser;

  if (typeof encodedString !== "string") {
    return convertedValues;
  }

  const numberArray = Array.from(b64.decode(encodedString) as Uint8Array);

  if (numberArray.length < 2) {
    return convertedValues;
  }

  const [provinceNumber, cityMuniNumber, ...restOfValues] = numberArray;

  if (
    provinceNumber !== 255 &&
    provinceNumber < provincesCitiesMunicipalities.length
  ) {
    convertedValues.user = {};
    convertedValues.user.Province =
      provincesCitiesMunicipalities[provinceNumber].province;
    convertedValues.user["City/Municipality"] =
      provincesCitiesMunicipalities[provinceNumber].citiesMunicipalities[
        cityMuniNumber
      ] || null;
  }

  const cityMuniHit = localMapping.find(
    (mapEntry: CityMuni) =>
      mapEntry.province === convertedValues.user?.Province &&
      mapEntry.cityMunicipality === convertedValues.user?.["City/Municipality"]
  )?.identifier;

  let localList = {} as LocalCandidatesType;

  try {
    if (cityMuniHit) {
      const localListRaw = await import(
        `@/assets/${yearCode}/json/${cityMuniHit}.json`
      );
      localList = localListRaw.default;
    }
  } catch (error) {
    console.error(error);
  }

  for (
    let i = 0,
      toggle = true,
      currentPosition: keyof CandidateGroupValuesWithUser | "" = "",
      multiple = false,
      votedForCount = 0;
    i < restOfValues.length;
    i++
  ) {
    const pointer = restOfValues[i];
    if (pointer >= 255) break;

    if (toggle) {
      // Compute for voteFor and positionMap, break when error
      const positionArray = Math.floor(pointer / 16.0);
      multiple = betterPositionMap[positionArray]?.multiple ?? false;
      votedForCount = pointer % 16;
      currentPosition = betterPositionMap[positionArray]?.position;
      toggle = false;
    } else {
      const isNational = Object.keys(NationalCandidateMultiple).indexOf(
        currentPosition
      );
      let candidateHit = String(pointer) as string | undefined;

      if (!multiple) {
        if (isNational !== -1) {
          if (isKeyof(national, currentPosition)) {
            candidateHit = national[currentPosition]?.candidates.find(
              matchCandidateNumberToCandidate(pointer)
            );
          }
        } else {
          if (isKeyof(localList, currentPosition)) {
            candidateHit = localList[currentPosition]?.candidates.find(
              matchCandidateNumberToCandidate(pointer)
            );
          }
        }

        if (
          candidateHit &&
          currentPosition &&
          candidateHit !== String(pointer) &&
          convertedValues[currentPosition]
        ) {
          // Coerce to string because we know it does not need multiple entries
          (convertedValues[currentPosition] as string) = candidateHit;
        }
      } else if (multiple && votedForCount) {
        if (isNational !== -1) {
          if (isKeyof(national, currentPosition)) {
            candidateHit = national[currentPosition]?.candidates.find(
              matchCandidateNumberToCandidate(pointer)
            );
          }
        } else {
          if (isKeyof(localList, currentPosition)) {
            candidateHit = localList[currentPosition]?.candidates.find(
              matchCandidateNumberToCandidate(pointer)
            );
          }
        }

        if (
          currentPosition &&
          convertedValues[currentPosition] &&
          Array.isArray(convertedValues[currentPosition]) &&
          candidateHit &&
          candidateHit !== String(pointer)
        ) {
          (convertedValues[currentPosition] as string[]) = [
            ...(convertedValues[currentPosition] as string[]),
            candidateHit,
          ];
        } else if (
          candidateHit &&
          currentPosition &&
          candidateHit !== String(pointer)
        ) {
          (convertedValues[currentPosition] as string[]) = [candidateHit];
        }
      }

      votedForCount--;
      if (votedForCount === 0) {
        toggle = true;
      }
    }
  }

  return convertedValues;
}

function matchCandidateNumberToCandidate(
  pointer: number
): (candidate: string) => boolean | null {
  return (candidate: string) => {
    const candidateMatch = candidate.match(getBallotNumberRegex);
    return candidateMatch && Number(candidateMatch[0]) === Number(pointer);
  };
}

function isKeyof<T extends object>(
  obj: T,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  possibleKey: keyof any
): possibleKey is keyof T {
  return possibleKey in obj;
}
