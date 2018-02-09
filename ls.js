#!/usr/bin/env node
var arg = process.argv;
const fs = require('fs');
const path = require('path');
if(arg.length == 2){
  var a = fs.readdirSync(process.cwd());
  console.log("path",process.cwd());
  for(i of a){
    console.log(i)
  }
}
else if(arg.length >= 3){
  for(i=2; i<arg.length; i++){
    console.log("path",path.resolve(arg[i]));
    if(fs.existsSync(path.resolve(arg[i]))==false){
      console.log("given file/folder does not exist");
    }
    else{
      let temp = fs.lstatSync(path.resolve(arg[i])).isDirectory();
      if(temp){
        a = fs.readdirSync(path.resolve(arg[i]));
        for(j of a){
         console.log(j);}
         if(a.length == 0){
           console.log("empty folder");
         }
      }
      else{
        console.log(arg[i]);
      }
    }
  }
}
