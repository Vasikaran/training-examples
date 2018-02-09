#!/usr/bin/env node
var childprocess = require("child_process");
childprocess.spawn("cp",process.argv,{"stdio":"inherit"});
