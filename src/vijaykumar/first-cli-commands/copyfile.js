#!/usr/bin/env node
const { spawn } = require('child_process');
const mv = spawn('cp', [...process.argv.slice(2)], {"stdio":"inherit"});
