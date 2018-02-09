#!/usr/bin/env node
var fs   = require('fs');
var path = process.argv
fs.readdirSync(process.cwd()).forEach(file => console.log(file)) ;
