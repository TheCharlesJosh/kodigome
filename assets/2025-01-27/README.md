# 2025 National and Local Elections - 2025-01-27

## Resolutions

COMELEC has removed the ballots from the website one or two weeks ago and they have come back up online. This was in accordance to the Temporary Restraining Orders ordered by the Supereme Court ([Resolution No. 11097](https://comelec.gov.ph/php-tpls-attachments/2025NLE/Resolutions/com_res_11097.pdf)).

This has resulted on the following changes to the ballots:

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

I wonder how much wastage happened because of these changes in the ballots, but I digress. Let's repeat the download process again.

## Redownloading the templates

My hope is that all links stay the same, and so we will use `links-fixed.pdf` from the `2025-01-12` extract to save time. We will compare the number of downloaded PDFs to see if anything is missing. We should be expecting 1,681 files.

This wget script then downloads it per folder.

```bash
wget -i links.txt \
    --force-directories \
    --no-host-directories \
    --cut-dirs=3 \
    --no-clobber \
    --continue \
    --progress=bar \
    --show-progress \
    --tries=3 \
    --timeout=15
```

Just don't forget to change the line sequences to LF so that the `grep` comparisons will work.

Two files were missing. I listed the files I downloaded through:

```
find . | grep -E '.pdf$' > downloaded.txt
```

I made them similar by making them in relative paths, and I checked for the missing files:

```
grep -xvFf downloaded-relative.txt  links-relative.txt > missing-raw.txt
```

Duenas is missing (same from the last extract), and the City of San Jose Del Monte as well. Checking the website, we see that the City of San Jose Del Monte got broken into two districts. I got uneasy relying on my old list. Let's extract the templates again.
Ballot face templates are housed here:

> [https://comelec.gov.ph/?r=2025NLE/2025BallotFace](https://comelec.gov.ph/?r=2025NLE/2025BallotFace)

Each region gets their own page. To get the PDF links from each region, I used the following line in the browser console:

```javascript
console.log(
  [...document.querySelectorAll('li.tb a, div.accordion-body ul li a')].reduce(
    (a, x) => a + x + '\n',
    ''
  )
)
```

Note that the COMELEC website tries to block you with a 403 Forbidden page if it detects an open Developer Tools window. Easy way out is to just exit the DevTools and reopen it again.

Then I copied everything in a text file (`links.txt`).

I'm sure there's a more efficient way to do it, but this got the job done.

```
grep -xvFf links.txt  links-recheck.txt > missing-recheck.txt
```

Confirming that it's just the City of San Jose Del Monte split into two districts bringing the total to 1,682.

We now have a complete set of ballots (`links-fixed.txt`).

## Processing the PDFs to JSONs

I will have the processing done via Jupyter Notebooks set up with a Deno runtime so that I can switch between Python and Node.js whenever necessary.

On this folder, set up the virtual env with:

```python
python -m venv notebook
.\notebook\Scripts\activate
deno jupyter --unstable-bare-node-builtins --unstable-byonm --install
pip install notebook
python -m jupyter notebook
```

Alternatively, we can work with Visual Studio Code's notebooks.

Install pymupdf4llm with `pip install pymupdf4llm`

PymuPDF4LLM will make the parsing easier through Markdown tables.
