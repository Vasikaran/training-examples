#!/usr/bin/env node
var childProcess = require("child_process");
childProcess.spawn("ls",[],{"stdio":"inherit"});
