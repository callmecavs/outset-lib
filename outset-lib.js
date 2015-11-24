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
const fileList = fs.readdirSync(FROM).map(name => FROM + '/' + name)

// sort into files and folders
let files = []
let folders = []

fileList.forEach(name => {
  const type = fs.statSync(name)

  type.isFile() && files.push(name)
  type.isDirectory() && folders.push(name)
})

// read files, replace templates, write to current directory
files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8')
})
