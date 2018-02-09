#!/usr/bin/env node
const child_process = require("child_process");
let args = process.argv.slice(3);
switch (process.argv[2]) {
  case "--help":
    console.log(`
      to use these commands please enter the ececcom command

      --help  :  to provide the command list
      cpf     :  to copy the file or directory
      renf    :  to rename the file or directory
      mkd     :  to create the new directory
      mkf     :  to create the new empty file
      remf    :  to remove the file
      remd    :  to remove the directory
      mvf     :  to move the directory
      lsdir   :  to list the all files of the directory
    `);
    break;
  case "cpf":
    child_process.spawnSync("cp",args,{"stdio":"inherit"});
    break;
  case "renf":
    child_process.spawnSync("rename",args,{"stdio":"inherit"});
    break;
  case "mkd":
    child_process.spawnSync("mkdir",args,{"stdio":"inherit"});
    break;
  case "mkf":
    child_process.spawnSync("touch",args,{"stdio":"inherit"});
    break;
  case "remf":
    child_process.spawnSync("rm",args,{"stdio":"inherit"});
    break;
  case "remd":
    child_process.spawnSync("rmdir",args,{"stdio":"inherit"});
    break;
  case "mvf":
    child_process.spawnSync("mv",args,{"stdio":"inherit"});
    break;
  case "lsdir":
    child_process.spawnSync("ls",args,{"stdio":"inherit"});
    break;
  default:
    console.log();
}
