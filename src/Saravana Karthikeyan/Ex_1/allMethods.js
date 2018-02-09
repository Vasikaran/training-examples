#!/usr/bin/env node

let argu = process.argv.slice(2);

switch (argu[0]) {
  case "l":
    const { spawn } = require('child_process');
    const ls = spawn('ls',[...argu.slice(1)]);
    ls.stdout.on('data', (data) => {
      console.log(`${data}`);
    });
    break;
  case "mve":
    const fs_extra = require('fs-extra');
    try {
      fs_extra.move(argu[1], argu[2]+"/"+argu[1], err => {
        if(err) return console.error("Error : "+argu[1]+" no such file or directory");
        console.log('success!');
      });
    } catch(e) {
        console.log("Error was occurred");
    }
    break;
  case "cpy":
    const fs_ex = require('fs-extra');
    try {
      fs_ex.copy(argu[1], argu[2]+"/"+argu[1], err => {
        if(err) return console.error("Error : "+argu[1]+" no such file or directory");
        console.log('success!');
      });
    } catch(e) {
        console.log("Error was occurred");
    }
    break;
    break;
  case "mdr":
    let isReadFile = argu[1]
    try {
      isReadFile = (isReadFile!==undefined)? isReadFile.trim() : "";
      const fs = require('fs');
      const a = fs.mkdirSync("./"+isReadFile);
      console.log("Success!! you caeated file (or) directory");
    } catch(error) {
      if(isReadFile.length>0) {
        console.log("Error\t:\t"+isReadFile+" File or directory  already exists");
      }
    }
    break;
  case "hlp":
    var helpDocument = {
      "h/hlp" : "List out the help commants in cmd ",
      "mve" : "Move the file or directory in one directory to another directory \n \t\tex: 'mve filename foldername'",
      "cpy" : "Copy the file or directory in one directory to another directory \n \t\tex: 'cpy filename foldername'",
      "l" : "List out the files or directory in the current path",
      "mdir" : "Create a new directory"
    }
    Object.keys(helpDocument).forEach((ele)=>{
      console.log("\n"+"\""+ ele +"\""+"\t:\t"+ helpDocument[ele]);
    });
    break;
  default:
  console.log('\''+argu[0]+'\''+` is not recognized as an internal or external command,
operable program or batch file.`);
}
