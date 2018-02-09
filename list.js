#!/usr/bin/env node
const process = process.argv;
const fs = require('fs');
const path =require('path');
const {spawn} = require('child_process');
const list = spawn('ls', [...process.argv.slice(2)], {"stdio" : "inherit"});
