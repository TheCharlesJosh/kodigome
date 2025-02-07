/**
 *
 * Update these when there are new ballots:
 *
 * */
export const yearPack = {
  "2025": {
    yearCode: "2025-01-27",
    shortName: "2025 NLE",
    longName: "MAY 12, 2025 NATIONAL, LOCAL AND BARMM PARLIAMENTARY ELECTIONS",
    electionDate: "2025-05-12",
    hashtags: "#NLE2025 #Halalan2025",
  },
  "2022": {
    yearCode: "2022-01-28",
    shortName: "2022 NLE",
    longName: "MAY 9, 2022 NATIONAL AND LOCAL ELECTIONS",
    electionDate: "2022-05-9",
    hashtags: "#VoteSafePilipinas #BumotoKa #NLE2022 #Halalan2022",
  },
};

export type NationalCandidateGroupValues = {
  PRESIDENT?: string | null;
  "VICE PRESIDENT"?: string | null;
  SENATOR?: string[] | boolean;
  "PARTY LIST"?: string | null;
};

export type LocalCandidateGroupValues = {
  "MEMBER, HOUSE OF REPRESENTATIVES"?: string | null;
  "PROVINCIAL GOVERNOR"?: string | null;
  "PROVINCIAL VICE-GOVERNOR"?: string | null;
  "MEMBER, SANGGUNIANG PANLALAWIGAN"?: string[] | boolean;
  MAYOR?: string | null;
  "VICE-MAYOR"?: string | null;
  "MEMBER, SANGGUNIANG BAYAN"?: string[] | boolean;
  "MEMBER, SANGGUNIANG PANLUNGSOD"?: string[] | boolean;
  "MEMBER, SANGUNIANG BAYAN"?: string[] | boolean; // Mispelling in some 2022 ballots
  "BARMM PARTY REPRESENTATIVES"?: string | null;
  "BARMM MEMBERS OF THE PARLIAMENT"?: string | null; // Addition to 2025 ballots
};

export const NationalCandidateMultiple = {
  PRESIDENT: false,
  "VICE PRESIDENT": false,
  SENATOR: true,
  "PARTY LIST": false,
};

export const LocalCandidateMultiple = {
  "MEMBER, HOUSE OF REPRESENTATIVES": false,
  "PROVINCIAL GOVERNOR": false,
  "PROVINCIAL VICE-GOVERNOR": false,
  "MEMBER, SANGGUNIANG PANLALAWIGAN": true,
  MAYOR: false,
  "VICE-MAYOR": false,
  "MEMBER, SANGGUNIANG BAYAN": true,
  "MEMBER, SANGGUNIANG PANLUNGSOD": true,
  "MEMBER, SANGUNIANG BAYAN": true, // Mispelling in some 2022 ballots
  "BARMM PARTY REPRESENTATIVES": false,
  "BARMM MEMBERS OF THE PARLIAMENT": false, // Addition to 2025 ballots
};

/**
 *
 * Types, interfaces, and consts
 *
 * */

export interface Candidate {
  candidates: string[];
  voteFor: number;
  header: string;
  count: number;
}
export interface CityMuni {
  province: string;
  cityMunicipality: string;
  link: string;
  id?: number;
  identifier: string;
}

export interface ProvincesCitiesMunicipalitiesType {
  province: string;
  citiesMunicipalities: string[];
}

export interface CandidateGroupType {
  position: PositionEnum;
  cityMuni: Candidates;
  groupIndex?: number;
  year: keyof typeof yearPack;
}

export type PositionEnum = keyof CandidateGroupValues;

export type NationalCandidatesType = {
  [K in keyof NationalCandidateGroupValues]?: Candidate;
};

export type LocalCandidatesType = {
  [K in keyof LocalCandidateGroupValues]?: Candidate;
};

export interface Candidates
  extends NationalCandidatesType,
    LocalCandidatesType {}

export type CandidateGroupValues = NationalCandidateGroupValues &
  LocalCandidateGroupValues;

export type CandidateGroupValuesWithUser = CandidateGroupValues & {
  user?: {
    Province?: string | null;
    "City/Municipality"?: string | null;
  };
};

export type BetterPositionMapType = {
  position: keyof CandidateGroupValues;
  multiple: boolean;
};

export type MegapackType = {
  year: keyof typeof yearPack;
  yearCode: string;
  shortName: string;
  longName: string;
  electionDate: string;
  hashtags: string;
  national: NationalCandidatesType;
  localMapping: CityMuni[];
  provincesCitiesMunicipalities: ProvincesCitiesMunicipalitiesType[];
  betterPositionMap: BetterPositionMapType[];
};

// Unfortunately, I still need to make consts because I can't extract keys as string arrays.

export const CandidateMultiple = {
  ...NationalCandidateMultiple,
  ...LocalCandidateMultiple,
};
