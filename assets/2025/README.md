# 2025 National and Local Elections

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

Then I copied everything in a text file.

I'm sure there's a more efficient way to do it, but this got the job done.
