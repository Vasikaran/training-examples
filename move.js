#!/usr/bin/env node
//const { spawn } = require('child_process');
//const mv = spawn('mv', [...process.argv.slice(2)], {"stdio":"inherit"});
var arg = process.argv;
const fs = require('fs');
const path = require('path');
let temp = fs.lstatSync(path.resolve(arg[i])).isDirectory();
