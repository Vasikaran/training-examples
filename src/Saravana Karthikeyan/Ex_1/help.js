#!/usr/bin/env node
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
