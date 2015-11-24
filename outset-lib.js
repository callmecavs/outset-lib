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
const fileNames = fs.readdirSync(FROM)

// sort into files and folders
let files = []
let folders = []

fileNames.forEach(name => {
  const path = FROM + '/' + name
  const type = fs.statSync(path)

  type.isFile() && files.push(name)
  type.isDirectory() && folders.push(name)
})
