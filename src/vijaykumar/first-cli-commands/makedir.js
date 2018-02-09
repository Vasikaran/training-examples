#!/usr/bin/env node
//const { spawn } = require('child_process');
//const ls = spawn('mkdir', [...process.argv.slice(2)], {"stdio":"inherit"});
//mkdirsSync()
var arg = process.argv;
const fs = require('fs');
const path = require('path');
if(arg.length > 2){
  for(i=2;i<arg.length;i++){
    if(fs.existsSync(path.resolve(arg[i]))==false){
      fs.mkdir(arg[i]);
    }
  }
}
else {
  console.log("enter the directory name");
}
