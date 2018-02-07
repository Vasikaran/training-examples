#!/usr/bin/env node
var childprocess = require("child_process");
var output = childprocess.spawn("mv",[],{"stdio":"inherit"});
