#!/usr/bin/env node
const {spawn} = require('child_process');
const list = spawn('ls', [...process.argv.slice(2)], {"stdio" : "inherit"});

const process = process.argv;
const fs = require('fs');
const path =require('path');
