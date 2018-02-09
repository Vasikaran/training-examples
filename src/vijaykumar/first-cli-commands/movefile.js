#!/usr/bin/env node
//const { spawn } = require('child_process');
//const mv = spawn('mv', [...process.argv.slice(2)], {"stdio":"inherit"});
var arg = process.argv;
const fs = require('fs');
const path = require('path');
if(arg.length == 4){
  if (fs.existsSync(path.resolve(arg[3])) == false && fs.lstatSync(path.resolve(arg[2])).isDirectory()){
      fs.renameSync(path.resolve(arg[2]),path.resolve(arg[3]));
      console.log("folder renamed successfully");
  }
  else if(fs.lstatSync(path.resolve(arg[2])).isDirectory()&&fs.lstatSync(path.resolve(arg[3])).isDirectory()){
    fs.renameSync(path.resolve(arg[2]),path.resolve(arg[3]));
    console.log("moved successfully");
  }
}
