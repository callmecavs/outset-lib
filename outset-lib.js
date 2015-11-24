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
fs.readdir(FROM, (error, names) => {
  if(error) return error

  let files = []
  let folders = []

  // check for file or folder
  names.forEach(name => {
    fs.stat(FROM + '/' + name, (error, stats) => {
      if(error) return error

      stats.isFile() && files.push(name)
      stats.isDirectory() && folders.push(name)
    })
  })
})
