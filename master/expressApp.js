const express = require('express')
const pretty = require('express-prettify');
const path = require('path')
const app = express()
app.use("/", express.static(__dirname+'/frontend'))

module.exports = app;
