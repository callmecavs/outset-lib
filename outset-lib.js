#!/usr/bin/env node

'use strict'

const fs = require('fs')

// cache paths
const CWD = process.cwd()
const FROM = __dirname + '/lib';

// build names from cmd line arg
let name = process.argv[2]

const NAMES = {
  lower: name.toLowerCase(),
  upper: name.charAt(0).toUpperCase() + name.slice(1)
}

// read the directory for the file list
fs.readdir(FROM, (error, files) => {
  if(error) return error

  // read each file, transform it, pipe it out to CWD
  files.forEach(file => {

  })
})
