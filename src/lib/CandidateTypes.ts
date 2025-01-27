export interface Candidate {
  candidates: string[];
  voteFor: number;
  header: string;
  count: number;
}

export interface NationalCandidates {
  PRESIDENT?: Candidate;
  "VICE PRESIDENT"?: Candidate;
  SENATOR?: Candidate;
  "PARTY LIST"?: Candidate;
}

export interface LocalCandidates {
  "MEMBER, HOUSE OF REPRESENTATIVES"?: Candidate;
  "PROVINCIAL GOVERNOR"?: Candidate;
  "PROVINCIAL VICE-GOVERNOR"?: Candidate;
  "MEMBER, SANGGUNIANG PANLALAWIGAN"?: Candidate;
  MAYOR?: Candidate;
  "VICE-MAYOR"?: Candidate;
  "MEMBER, SANGGUNIANG BAYAN"?: Candidate;
  "MEMBER, SANGGUNIANG PANLUNGSOD"?: Candidate;
  "MEMBER, SANGUNIANG BAYAN"?: Candidate;
}

export type Candidates = {
  [key in PositionEnum]?: Candidate;
};

export interface CityMuni {
  province: string;
  cityMunicipality: string;
  link: string;
  id: number;
  identifier: string;
}

export enum PositionEnum {
  "PRESIDENT" = "PRESIDENT",
  "VICE PRESIDENT" = "VICE PRESIDENT",
  "SENATOR" = "SENATOR",
  "MEMBER, HOUSE OF REPRESENTATIVES" = "MEMBER, HOUSE OF REPRESENTATIVES",
  "PARTY LIST" = "PARTY LIST",
  "PROVINCIAL GOVERNOR" = "PROVINCIAL GOVERNOR",
  "PROVINCIAL VICE-GOVERNOR" = "PROVINCIAL VICE-GOVERNOR",
  "MEMBER, SANGGUNIANG PANLALAWIGAN" = "MEMBER, SANGGUNIANG PANLALAWIGAN",
  "MAYOR" = "MAYOR",
  "VICE-MAYOR" = "VICE-MAYOR",
  "MEMBER, SANGGUNIANG BAYAN" = "MEMBER, SANGGUNIANG BAYAN",
  "MEMBER, SANGGUNIANG PANLUNGSOD" = "MEMBER, SANGGUNIANG PANLUNGSOD",
  "MEMBER, SANGUNIANG BAYAN" = "MEMBER, SANGUNIANG BAYAN",
}

export enum NationalCandidatesEnum {
  "PRESIDENT" = "PRESIDENT",
  "VICE PRESIDENT" = "VICE PRESIDENT",
  "SENATOR" = "SENATOR",
  "PARTY LIST" = "PARTY LIST",
}

export enum LocalCandidatesEnum {
  "MEMBER, HOUSE OF REPRESENTATIVES" = "MEMBER, HOUSE OF REPRESENTATIVES",
  "PROVINCIAL GOVERNOR" = "PROVINCIAL GOVERNOR",
  "PROVINCIAL VICE-GOVERNOR" = "PROVINCIAL VICE-GOVERNOR",
  "MEMBER, SANGGUNIANG PANLALAWIGAN" = "MEMBER, SANGGUNIANG PANLALAWIGAN",
  "MAYOR" = "MAYOR",
  "VICE-MAYOR" = "VICE-MAYOR",
  "MEMBER, SANGGUNIANG BAYAN" = "MEMBER, SANGGUNIANG BAYAN",
  "MEMBER, SANGGUNIANG PANLUNGSOD" = "MEMBER, SANGGUNIANG PANLUNGSOD",
  "MEMBER, SANGUNIANG BAYAN" = "MEMBER, SANGUNIANG BAYAN",
}

export interface CandidateGroupType {
  position: PositionEnum;
  cityMuni: Candidates;
  groupIndex?: number;
}

export const defaultPositionValues = {
  PRESIDENT: null,
  "VICE PRESIDENT": null,
  SENATOR: false,
  "MEMBER, HOUSE OF REPRESENTATIVES": null,
  "PARTY LIST": null,
  "PROVINCIAL GOVERNOR": null,
  "PROVINCIAL VICE-GOVERNOR": null,
  "MEMBER, SANGGUNIANG PANLALAWIGAN": false,
  MAYOR: null,
  "VICE-MAYOR": null,
  "MEMBER, SANGGUNIANG BAYAN": false,
  "MEMBER, SANGGUNIANG PANLUNGSOD": false,
  "MEMBER, SANGUNIANG BAYAN": false,
};

export interface CandidateGroupValues {
  PRESIDENT?: string | null;
  "VICE PRESIDENT"?: string | null;
  SENATOR?: string[] | boolean;
  "MEMBER, HOUSE OF REPRESENTATIVES"?: string | null;
  "PARTY LIST"?: string | null;
  "PROVINCIAL GOVERNOR"?: string | null;
  "PROVINCIAL VICE-GOVERNOR"?: string | null;
  "MEMBER, SANGGUNIANG PANLALAWIGAN"?: string[] | boolean;
  MAYOR?: string | null;
  "VICE-MAYOR"?: string | null;
  "MEMBER, SANGGUNIANG BAYAN"?: string[] | boolean;
  "MEMBER, SANGGUNIANG PANLUNGSOD"?: string[] | boolean;
  "MEMBER, SANGUNIANG BAYAN"?: string[] | boolean;
  user?: {
    Province?: string | null;
    "City/Municipality"?: string | null;
  };
}
