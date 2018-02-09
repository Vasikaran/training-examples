#!/usr/bin/env node
var childProcess = require("child_process");
var args = process.argv.slice(3,process.argv.length);
switch (process.argv[2]){
  case "l":
  childProcess.spawn("ls",[],{"stdio":"inherit"});
  break;
  case "m" :
  childProcess.spawn("mv",args,{"stdio":"inherit"});
  break;
  case "c" :
  childProcess.spawn("cp",args,{"stdio":"inherit"});
  break;
  case "h" :
  console.log(" 1. a l - Listout Files, \n 2. a m - Move Files, \n 3. a c - Copy Files, \n 4. a r - Remove File");
  break;
}
