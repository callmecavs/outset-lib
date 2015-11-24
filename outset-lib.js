#!/usr/bin/env node

'use strict'

const fs = require('fs')

// cache paths
const TO = process.cwd()
const FROM = __dirname + '/lib';

// get name argument
const input = process.argv[2]

// if the name contains the .js extension, remove it
// it is added where needed automatically in the templates
const sanitized = input.indexOf('.') === -1
  ? input
  : input.split('.')[0]

// prepare lowercase and capitalized versions of the name
const NAMES = {
  lower: sanitized.toLowerCase(),
  upper: sanitized.charAt(0).toUpperCase() + sanitized.slice(1)
}

// read the directory for the file list
const fileList = fs.readdirSync(FROM).map(name => FROM + '/' + name)

// sort into files and folders
let files = []
let folders = []

fileList.forEach(name => {
  const type = fs.statSync(name)

  type.isFile()
    ? files.push(name)
    : folders.push(name)
})

// read files
files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8')

  // replace templates
  content = content.replace(/\${ NAME.upper }/g, NAMES.upper)
  content = content.replace(/\${ NAME.lower }/g, NAMES.lower)

  // write to current directory
  console.log(content)
})
