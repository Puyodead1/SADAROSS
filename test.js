var express = require('express')
var app = express()
var dash = require('appmetrics-dash').attach()
app.get('/', function (req, res) {
  res.send('Hello World!')
})
app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
