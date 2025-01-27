import {
  CandidateGroupValues,
  CityMuni,
  LocalCandidates,
} from "./CandidateTypes";
import * as b64 from "@juanelas/base64";
import userMap from "@public/candidates/userMap.json";
import betterPositionMap from "@public/candidates/betterPositionMap.json";
import localMapping from "@public/candidates/localMapping.json";
import national from "@public/candidates/national.json";

export const getBallotNumberRegex = /^\d+/;

export function encodeForSharing(initialValues: CandidateGroupValues) {
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
    user.Province !== null
  ) {
    const provinceIndex = userMap.findIndex(
      (entry) => entry.province === user.Province
    );

    if (provinceIndex === -1) {
      numberBuilder = [255, 255, ...numberBuilder];
    } else if (
      user?.hasOwnProperty("City/Municipality") &&
      user["City/Municipality"] !== null
    ) {
      const cityMuniIndex = userMap[
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
        // const positionArray =
        //   positionMap.indexOf(position) !== -1
        //     ? positionMap.indexOf(position)
        //     : 255
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
          //                 console.log(value)
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

export async function decodeForSharing(encodedString: string) {
  // let convertedValues = {} as any
  const convertedValues = {} as CandidateGroupValues;
  // let convertedValues = {} as {
  //   [key: string]:
  //     | { Province?: string | null; 'City/Municipality'?: string | null }
  //     | string
  //     | string[]
  // }

  if (typeof encodedString !== "string") {
    return convertedValues;
  }

  const numberArray = Array.from(b64.decode(encodedString) as Uint8Array);

  if (numberArray.length < 2) {
    return convertedValues;
  }

  const [provinceNumber, cityMuniNumber, ...restOfValues] = numberArray;

  //     console.log(provinceNumber)
  if (provinceNumber !== 255 && provinceNumber < userMap.length) {
    convertedValues.user = {};
    convertedValues.user.Province = userMap[provinceNumber].province;
    convertedValues.user["City/Municipality"] =
      userMap[provinceNumber].citiesMunicipalities[cityMuniNumber] || null;
  }

  const cityMuniHit = localMapping.find(
    (mapEntry: CityMuni) =>
      mapEntry.province === convertedValues.user?.Province &&
      mapEntry.cityMunicipality === convertedValues.user?.["City/Municipality"]
  )?.identifier;

  let localList = {} as LocalCandidates;

  try {
    if (cityMuniHit) {
      const localListRaw = await import(
        `@public/candidates/local/${cityMuniHit}.json`
      );
      localList = localListRaw.default;
    }
  } catch (error) {
    console.error(error);
  }

  for (
    let i = 0,
      toggle = true,
      currentPosition = "",
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
      // votedFor = votedForCount = pointer % 16
      // currentPosition = positionMap[positionArray]
      multiple = betterPositionMap[positionArray]?.multiple ?? false;
      votedForCount = pointer % 16;
      currentPosition = betterPositionMap[positionArray]
        ?.position as keyof CandidateGroupValues;
      toggle = false;
    } else {
      const isNational = [
        "PRESIDENT",
        "VICE PRESIDENT",
        "SENATOR",
        "PARTY LIST",
      ].indexOf(currentPosition);
      let candidateHit = String(pointer) as string | undefined;

      // console.log(
      //   votedFor,
      //   isNational,
      //   isKeyof(national, currentPosition),
      //   national[currentPosition]?.candidates,
      //   pointer
      // )

      if (!multiple) {
        if (isNational !== -1) {
          if (isKeyof(national, currentPosition)) {
            candidateHit = national[currentPosition]?.candidates.find(
              matchCandidateNumberToCandidate(pointer)
            );
            // console.log(candidateHit)
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
          candidateHit !== String(pointer)
        ) {
          // ;(convertedValues as { [key: string]: string | string[] })[
          convertedValues[currentPosition] = candidateHit;
        }
      } else if (multiple && votedForCount) {
        // console.log(isNational, currentPosition, pointer)
        if (isNational !== -1) {
          if (isKeyof(national, currentPosition)) {
            candidateHit = national[currentPosition].candidates.find(
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

        // console.log(currentPosition, candidateHit, pointer)
        if (
          convertedValues[currentPosition] &&
          Array.isArray(convertedValues[currentPosition]) &&
          candidateHit &&
          currentPosition &&
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
