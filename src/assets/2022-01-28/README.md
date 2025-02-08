# KodigoKo

## Step 1: Extract the PDFs from the Comelec website

Site: https://comelec.gov.ph/?r=2022NLE/BallotFaceTemplates
Script:

```
x = [...document.querySelectorAll(".subdivtitle")].slice(1)

timer = ms => new Promise(res => setTimeout(res, ms))

async function clickAll () {
    for (var region of x) {
        region.click()
        console.log(region.textContent)
        await timer(500)
    }
}

clickAll()

console.log([...document.querySelectorAll("ul.ballottemplate li a")].map(x => x.href).join('\n'))
```

Download from wget

wget -i "$(sed -n 1p ../links-small.txt)" -O "$(sed -n 1p ../links-small.txt | cut -c 69-)"
