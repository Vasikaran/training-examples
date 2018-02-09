#!/usr/bin/env node
var childProcess = require("child_process");
var args = process.argv.slice(2,process.argv.length);
childProcess.spawn("cp",args,{"stdio":"inherit"});
