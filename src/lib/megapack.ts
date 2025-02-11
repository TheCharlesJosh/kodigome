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

    national: (await import(`@/years/${yearCode}/national.json`))
      .default as NationalCandidatesType,
    localMapping: (await import(`@/years/${yearCode}/localMapping.json`))
      .default as CityMuni[],
    provincesCitiesMunicipalities: (
      await import(`@/years/${yearCode}/provincesCitiesMunicipalities.json`)
    ).default as ProvincesCitiesMunicipalitiesType[],
    betterPositionMap: (
      await import(`@/years/${yearCode}/betterPositionMap.json`)
    ).default as BetterPositionMapType[],
  };

  return megapack;
}

export function isValidYear(year: string) {
  return isKeyof(yearPack, year);
}
