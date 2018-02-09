#!/usr/bin/env node
let child = require("child_process");
let arg = process.argv.slice( 3 , process.argv.length );
switch (process.argv[2]){
  case "l" :
  child.spawn( "ls" , [] , {"stdio" : "inherit"});
  break;
  case "h" :
  console.log( " Help : 'h' \n List : 'l' \n Copy : 'c' \n Move : 'm' \n Romove File : 'r' \n Create File : 'n' \n Open File : 'o' \n All : 'a (commands)' ");
  break;
  case "m" :
  child.spawn( "mv" , arg , {"stdio" : "inherit"});
  break;
  case "c" :
  child.spawn( "cp" , arg , {"stdio" : "inherit"});
  break;
  case "r" :
  child.spawn( "rm" , arg , {"stdio" : "inherit"});
  break;
  case "n" :
  child.spawn( "touch" , arg , {"stdio" : "inherit"});
  break;
  case "o" :
  child.spawn( "vim" , arg , {"stdio" : "inherit"});
  break;
}
