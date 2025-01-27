"use client";
import { useState, useEffect } from "react";
import localMapping from "@public/candidates/localMapping.json";
import { ComboboxWrapper } from "./ComboboxWrapper";
import { CandidateGroup } from "./CandidateGroup";
import { PositionEnum } from "../lib/CandidateTypes";
import { useFormContext } from "react-hook-form";
import userMap from "@public/candidates/userMap.json";

export const LocalCandidates = () => {
  const { watch, setValue } = useFormContext();
  const [localList, setLocalList] = useState<any>(null);
  const [selectedProvince, selectedCityMunicipality] = watch([
    "user.Province",
    "user.City/Municipality",
  ]);

  function setSelectedProvince(value: string | null) {
    setValue("user.Province", value);
  }

  function setSelectedCityMunicipality(value: string | null) {
    setValue("user.City/Municipality", value);
  }

  function setProvinceAndClear(province: string | null) {
    setSelectedProvince(province);
    setSelectedCityMunicipality(null);
  }

  // const provinces: string[] = localMapping
  //   .map((mapEntry) => mapEntry.province)
  //   .filter(
  //     (province, index, listOfProvinces) =>
  //       listOfProvinces.indexOf(province) === index
  //   )
  //   .sort()

  // const citiesMunicipalities: string[] = useMemo(
  //   () =>
  //     selectedProvince === '' || selectedProvince == null
  //       ? []
  //       : localMapping
  //           .filter((mapEntry) => mapEntry.province === selectedProvince)
  //           .map((mapEntry) => mapEntry.cityMunicipality)
  //           .sort(),
  //   [selectedProvince]
  // )

  const provinces = userMap.map((mapEntry) => mapEntry.province).sort();
  const citiesMunicipalities =
    selectedProvince === "" || selectedProvince == null
      ? []
      : (userMap.find((mapEntry) => mapEntry.province === selectedProvince)
          ?.citiesMunicipalities ?? []);

  const cityMuni = localMapping.find(
    (mapEntry) =>
      mapEntry.province === selectedProvince &&
      mapEntry.cityMunicipality === selectedCityMunicipality
  );

  useEffect(() => {
    const getLocal = async () => {
      if (cityMuni) {
        const list = await import(
          `@public/candidates/local/${cityMuni.identifier}.json`
        );

        setLocalList(list.default);
      }
    };

    getLocal().catch(console.error);
  }, [cityMuni]);

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
              />
            );
          }
        )}
    </div>
  );
};

// const LocalCandidatess: NextPage = () => {
//   const [query, setQuery] = useState<string>('')
//   const [selectedProvince, setSelectedProvince] = useState<string | null>()
//   const provinces: string[] = localMapping
//     .map((cityMuni) => cityMuni.province)
//     .filter(
//       (province, index, listOfProvinces) =>
//         listOfProvinces.indexOf(province) === index
//     )
//   const filteredProvinces = useMemo(
//     () =>
//       query === '' || query == null
//         ? provinces
//         : provinces.filter((province) => {
//             return province.toLowerCase().includes(query.toLowerCase())
//           }),
//     [query]
//   )
//   return (
//     <Combobox as="div" value={selectedProvince} onChange={setSelectedProvince}>
//       <Combobox.Label className="block text-sm font-medium text-gray-700">
//         Provinces
//       </Combobox.Label>
//       <div className="relative mt-1">
//         <Combobox.Input
//           className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
//           onChange={(event) => setQuery(event.target.value)}
//           displayValue={(selectedProvince: string) => selectedProvince}
//         />
//         <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
//           <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
//         </Combobox.Button>
//         {query !== '' && (
//           <button
//             className="absolute inset-y-0 right-8 flex items-center rounded-r-md px-2 focus:outline-none"
//             onClick={() => {
//               setQuery('')
//               setSelectedProvince(null)
//             }}
//           >
//             <XIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
//           </button>
//         )}
//         {filteredProvinces.length > 0 && (
//           <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
//             {filteredProvinces.map((province: string) => (
//               <Combobox.Option
//                 key={province}
//                 value={province}
//                 className={({ active }) =>
//                   clsx(
//                     'relative cursor-default select-none py-2 pl-3 pr-9',
//                     active ? 'bg-indigo-600 text-white' : 'text-gray-900'
//                   )
//                 }
//               >
//                 {({ active, selected }) => (
//                   <>
//                     <span
//                       className={clsx(
//                         'block truncate',
//                         selected && 'font-semibold'
//                       )}
//                     >
//                       {province}
//                     </span>
//                     {selected && (
//                       <span
//                         className={clsx(
//                           'absolute inset-y-0 right-0 flex items-center pr-4',
//                           active ? 'text-white' : 'text-indigo-600'
//                         )}
//                       >
//                         <CheckIcon className="h-5 w-5" aria-hidden="true" />
//                       </span>
//                     )}
//                   </>
//                 )}
//               </Combobox.Option>
//             ))}
//           </Combobox.Options>
//         )}
//       </div>
//     </Combobox>
//   )
// }
