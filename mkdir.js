#!/usr/bin/env node
const { spawn } = require('child_process');
const ls = spawn('mkdir', [...process.argv.slice(2)], {"stdio":"inherit"});
