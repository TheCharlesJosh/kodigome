# kodigo.me

Free Kodigo Generator for the National and Local Elections.

This is version 2 of kodigo.me, made available to the public to inspect and assess.
Built with Next.js 15, Tailwind CSS.

## Notes

- **January 15, 2025** - COMELEC retracts upload of ballot face templates due to TROs released last January 14, 2025 ([Re: COMELEC Commits to Fully Comply with Supreme Court TROs in relation to the 2025 elections](https://comelec.gov.ph/?r=2025NLE/PressReleases/01142025_SC_TRO_COMELEC)). This meant that the ballot face templates we downloaded are to be updated at a later date.

- **January 26, 2025** - COMELEC reuploads new ballot face templates in compliance with the TROs.

| Date       | Resolution Number | Modification | Province/City/Municipality       | Position                         | Candidate                      | Notes              |
| ---------- | ----------------- | ------------ | -------------------------------- | -------------------------------- | ------------------------------ | ------------------ |
| 2025-01-20 | 11097             | Delete       | National                         | Senator                          | Chavit Singson                 |                    |
| 2025-01-20 | 11097             | Include      | National                         | Senator                          | Subair Guinthum Mustapha       |                    |
| 2025-01-20 | 11097             | Include      | Ilocos Sur (1st District)        | Member, House of Representatives | Charles 'DB' Savellano         |                    |
| 2025-01-20 | 11097             | Include      | Governor                         | Zambales                         | Chito Bulatao Balintay         |                    |
| 2025-01-20 | 11097             | Include      | Member, House of Representatives | City of Caloocan (2nd District)  | Edgar Erice                    |                    |
| 2025-01-20 | 11097             | Include      | Member, Sangguniang Panlungsod   | City of San Juan (1st District)  | Florendo de Ramos Ritualo Jr., |                    |
| 2025-01-20 | 11097             | Include      | Vice-Mayor                       | Limay, Bataan                    | Marie Grace R. David           |                    |
| 2025-01-20 | 11097             | Include      | Mayor                            | Palompon, Leyte                  | Mary Dominique A. Oñate        |                    |
| 2025-01-20 | 11097             | Include      | Mayor                            | Bocaue, Bulacan                  | Aldrin B. Sta Ana              |                    |
| 2025-01-20 | 11097             | Include      | Mayor                            | City of Mandaue, Cebu            | Jonas C. Cortes                |                    |
| 2025-01-22 | 11097-A           | Include      | National                         | Senator                          | Francis Leo Antonio Marcos     | Removed in 11097-B |
| 2025-01-22 | 11097-A           | Include      | Mayor                            | City of Mandaue, Cebu            | Jonas C. Cortes                | Duplicate?         |
| 2025-01-24 | 11097-B           | Delete       | National                         | Senator                          | Francis Leo Antonio Marcos     |                    |

## Extending to future elections

These files need to be generated, or updated:

| File                                                     | Type                  | Notes                                                                                                            |
| -------------------------------------------------------- | --------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `tailwind.config.ts`                                     | Styling               | Tailwind configuration for Odd and Even. Use [https://tints.dev](tints.dev) to generate colors and variables     |
| `src/app/globals.css`                                    | Styling               | CSS Variables for Primary and Secondary. Use [https://tints.dev](tints.dev) to generate colors and variables     |
| `src/lib/utils.ts`                                       | Styling               | Tailwind merge config for custom Tailwind configs                                                                |
| `src/components/candidate-group.tsx`                     | Styling               | Change the `base()` rules if there are weird ballot color quirks.                                                |
| `src/app/[year]/[[...id]].tsx`                           | Styling               | Change the `className` rules for different years.                                                                |
| `src/lib/types.ts`                                       | Types and definitions | Define the folders, short name, hashtags, aggregated positions across all elections, if can vote multiple or not |
| `src/assets/{folder}/betterPositionMap.json`             | Ballot                | List of positions and if the user needs to vote for one or many (Created manually)                               |
| `src/assets/{folder}/national.json`                      | Ballot                | List of national positions and candidates (Generated via Jupyter Deno Notebook)                                  |
| `src/assets/{folder}/localMapping.json`                  | Ballot                | List of provinces, cities, municipalities, identifiers, and COMELEC links (Generated via Jupyter Deno Notebook)  |
| `src/assets/{folder}/provincesCitiesMunicipalities.json` | Ballot                | List of provinces, cities, and municipalities (Generated via Jupyter Deno Notebook)                              |
| `src/assets/{folder}/json/{identifier}.json`             | Ballot                | List of local positions and candidates (Generated via Jupyter Deno Notebook)                                     |

## Environment variables

On development,

```
NEXT_PUBLIC_BASE_URL=               # Mandatory to make URL checks work, usually "http://localhost:3000"
NEXT_PUBLIC_PRODUCTION="false"      # Set this to "false" if you want to see the debug divs
```

On production,

```
# Vercel would set this already for you, if you're self-hosting, no need to set.
NEXT_PUBLIC_VERCEL_ENV="production"

# Vercel would set this already for you, if you're self-hosting, no need to set.
NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL="kodigo.me"

# If hosted on Vercel, no need to set.
NEXT_PUBLIC_BASE_URL="https://kodigo.me"
```
