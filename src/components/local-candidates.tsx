"use client";
import { useState, useEffect } from "react";
import { ComboboxWrapper } from "./combobox-wrapper";
import { CandidateGroup } from "./candidate-group";
import { useFormContext } from "react-hook-form";
import { LocalCandidatesType, MegapackType, PositionEnum } from "@/lib/types";
import { BASE_URL } from "@/lib/constants";

export const LocalCandidates = ({ megapack }: { megapack: MegapackType }) => {
  const { localMapping, year, yearCode, provincesCitiesMunicipalities } =
    megapack;

  const { watch, setValue } = useFormContext();
  const [localList, setLocalList] = useState<LocalCandidatesType>({});
  const [selectedProvince, selectedCityMunicipality] = watch([
    "user.Province",
    "user.City/Municipality",
  ]);

  function setSelectedProvince(value: string | null) {
    setValue("user.Province", value || "");
  }

  function setSelectedCityMunicipality(value: string | null) {
    setValue("user.City/Municipality", value || "");
  }

  function setProvinceAndClear(province: string | null) {
    setSelectedProvince(province);
    // setSelectedCityMunicipality(null);
    setSelectedCityMunicipality("");
  }

  const provinces = provincesCitiesMunicipalities
    .map((mapEntry) => mapEntry.province)
    .sort();
  const citiesMunicipalities =
    selectedProvince === "" || selectedProvince == null
      ? []
      : (provincesCitiesMunicipalities.find(
          (mapEntry) => mapEntry.province === selectedProvince
        )?.citiesMunicipalities ?? []);

  const cityMuni = localMapping.find(
    (mapEntry) =>
      mapEntry.province === selectedProvince &&
      mapEntry.cityMunicipality === selectedCityMunicipality
  );

  useEffect(() => {
    const getLocal = async () => {
      if (cityMuni) {
        // const list = await import(
        // `@/../public/assets/${yearCode}/json/${cityMuni.identifier}.json`
        // );
        // setLocalList(list.default);
        const listRaw = await fetch(
          `${BASE_URL}/years/${yearCode}/${cityMuni.identifier}.json`
        );
        const list = await listRaw.json();

        setLocalList(list);
      }
    };

    getLocal().catch(console.error);
  }, [cityMuni, yearCode]);

  return (
    <div className="">
      <h2 className="mt-8 text-center text-2xl font-bold uppercase">
        Local Posts
      </h2>
      <p className="text-center text-sm text-gray-500">
        If you want to select your local candidates, key in your location.
      </p>
      <div className="my-4 block px-1 lg:flex lg:gap-4">
        <ComboboxWrapper
          selected={selectedProvince}
          setSelected={setProvinceAndClear}
          options={provinces}
          label="Province"
          placeholder="Select or Type your Province"
        />
        {citiesMunicipalities.length > 0 && (
          <ComboboxWrapper
            selected={selectedCityMunicipality}
            setSelected={setSelectedCityMunicipality}
            options={citiesMunicipalities}
            label="City/Municipality"
            placeholder="Select or Type your City/Municipality"
            className="pt-2 lg:pt-0"
          />
        )}
      </div>
      {cityMuni &&
        localList &&
        (Object.keys(localList) as PositionEnum[]).map(
          (position: PositionEnum, groupIndex) => {
            return (
              <CandidateGroup
                position={position}
                cityMuni={localList}
                key={"group-" + position}
                groupIndex={groupIndex}
                year={year}
              />
            );
          }
        )}
    </div>
  );
};
