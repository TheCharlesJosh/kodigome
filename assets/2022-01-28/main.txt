const fs = require('fs')
const pdf = require('pdf-parse')

let dataBuffer = fs.readFileSync('./ABUCAY.pdf')

pdf(dataBuffer).then(function (data) {
  fs.writeFile('./ABUCAY.txt', data.text, () => {})
})
