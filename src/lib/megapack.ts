import {
  BetterPositionMapType,
  CityMuni,
  NationalCandidatesType,
  ProvincesCitiesMunicipalitiesType,
  yearPack,
} from "./types";
import { isKeyof } from "./utils";

export default async function getMegapack(year: keyof typeof yearPack) {
  const { yearCode } = yearPack[year];
  const megapack = {
    year,
    ...yearPack[year],

    national: (await import(`@/assets/${yearCode}/national.json`))
      .default as NationalCandidatesType,
    localMapping: (await import(`@/assets/${yearCode}/localMapping.json`))
      .default as CityMuni[],
    provincesCitiesMunicipalities: (
      await import(`@/assets/${yearCode}/provincesCitiesMunicipalities.json`)
    ).default as ProvincesCitiesMunicipalitiesType[],
    betterPositionMap: (
      await import(`@/assets/${yearCode}/betterPositionMap.json`)
    ).default as BetterPositionMapType[],
  };

  return megapack;
}

export function isValidYear(year: string) {
  return isKeyof(yearPack, year);
}
