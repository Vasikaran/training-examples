#!/usr/bin/env node
const { spawn } = require('child_process');
const ls = spawn('ls',[...process.argv.slice(2)]);
ls.stdout.on('data', (data) => {
  console.log(`${data}`);
});
