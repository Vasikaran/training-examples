#!/usr/bin/env node

const isReadFile = process.argv[2].trim();
const fs = require('fs');
try {
const a = fs.mkdirSync("./"+isReadFile);
console.log("Success!! you caeated file (or) directory");
} catch(error) {
  if(isReadFile.length>0) {
    console.log("Error\t:\t"+isReadFile+" File or directory  already exists");
  }
}
