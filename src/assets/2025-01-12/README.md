# 2025 National and Local Elections - 2025-01-12

## Downloading the Ballot Face Templates from the COMELEC website

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

Then I copied everything in a text file (`links.txt`).

I'm sure there's a more efficient way to do it, but this got the job done.

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

Unfortunately, I only downloaded 1657 out of 1681 (25 were missing). I listed the files I downloaded through:

```
find . | grep -E '.pdf$' > downloaded.txt
```

Check for missing:

```
grep -xvFf downloaded-relative-sorted.txt  links-relative-sorted.txt > missing-raw.txt
```

Fixing them required manually checking the website again (maybe someone from COMELEC had a copy-paste error in their Excel sheets?).

Common issues were:

- Fixable: Wrong province (BENGUET instead of KALINGA or IFUGAO)
- Do nothing: Ñ url encoded to %C3%91 but it still exists
- Fixable: Province was missing (SAN_JOAQUIN required to be renamed as ILOILO/SAN_JOAQUIN)
- Fixable: Misspelling (CARANGLAN instead of CARRANGLAN)

I cannot fix the following:

- CAPIZ/DUMARAO
- ILOILO/DUENAS

I requested for these via email, and they responded. We now have a complete set of ballots (`links-fixed.txt`).

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

Install pymupdf4llm with `pip install pymupdf4llm`

PymuPDF4LLM will make the parsing easier through Markdown tables.
