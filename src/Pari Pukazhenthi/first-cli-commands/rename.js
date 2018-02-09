#!/usr/bin/env node
const child_process = require("child_process");
let args = process.argv.slice(2);
child_process.spawnSync("rename",args,{"stdio":"inherit"});
