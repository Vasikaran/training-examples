#!/usr/bin/env node
const fs = require('fs-extra');

fs.copy(process.argv[2], process.argv[3]+"/"+process.argv[2], err =>{
  if(err) return console.error("Error : "+process.argv[2]+" no such file or directory");
  console.log('success!');
});
