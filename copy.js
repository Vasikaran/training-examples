#!/usr/bin/env node
const {spawn} = require('child_process');
const list = spawn('cp', [...process.argv.slice(2)], { "stdio" : "inherit" });
