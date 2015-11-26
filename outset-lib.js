#!/usr/bin/env node

'use strict'

const fs = require('fs')

// cache paths
const TO = process.cwd()
const FROM = __dirname + '/lib'

// get name argument
const input = process.argv[2]

// remove .js extension, its added where needed automatically in the templates
const sanitized = input.indexOf('.') === -1
  ? input
  : input.split('.')[0]

// prepare lowercase and capitalized versions of the name
const NAME = {
  lower: sanitized.toLowerCase(),
  upper: sanitized.charAt(0).toUpperCase() + sanitized.slice(1)
}

// read the directory for the file list
const fileList = fs.readdirSync(FROM)

const folderIndex = fileList.indexOf('src')
fileList[folderIndex] = 'src/lib.js'

// make folder for src file
fs.mkdirSync(TO + '/src')

// for each file
fileList.forEach(file => {
  // read it
  let content = fs.readFileSync(FROM + '/' + file, 'utf8')

  // replace templates
  content = content.replace(/\${ NAME.upper }/g, NAME.upper)
  content = content.replace(/\${ NAME.lower }/g, NAME.lower)

  // write it
  fs.writeFileSync(TO + '/' + file, content, 'utf8')
})

// rename src file
fs.renameSync(TO + '/src/lib.js', TO + '/src/' + NAME.lower +'.js')
