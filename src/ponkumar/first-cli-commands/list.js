#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
let commandName = "l";
var argument = process.argv.slice(2);
let spaceNameFile  = (file) => (file.indexOf(" ") == -1 ? file : "'"+file+"'")
let fileArrayToString = (files) => {
  files[0] = spaceNameFile(files[0]);
  return files.reduce((prev,file) => (prev+"  "+spaceNameFile(file)))
}
if (argument.length == 0) {
  console.log(fileArrayToString( fs.readdirSync(path.resolve("."))));
} else {
  argument.forEach((file) => {
    let temPath = path.resolve(file);
      if (fs.existsSync(temPath)) {
        if (fs.lstatSync(temPath).isDirectory()) {
          console.log(file+" : ");
          let files = fs.readdirSync(temPath);
          console.log(fileArrayToString(files));
        } else {
          console.log(temPath);
        }
      } else {
        console.log(commandName+" : cannot stat '"+file+"': No such file or directory");
      }
    console.log("");
  })
}
