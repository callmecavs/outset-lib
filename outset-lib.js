#!/usr/bin/env node

'use strict'

const fs = require('fs')

// cache paths
const TO = process.cwd()
const FROM = __dirname + '/template'

// prepare name from parameter
const input = process.argv[2]

const sanitized = input.indexOf('.') === -1
  ? input
  : input.split('.')[0]

const NAME = {
  lower: sanitized.toLowerCase(),
  upper: sanitized.charAt(0).toUpperCase() + sanitized.slice(1)
}

// get the file list
const fileList = fs.readdirSync(FROM)

// append to folder results
const srcIndex = fileList.indexOf('src')
const distIndex = fileList.indexOf('dist')
fileList[srcIndex] = 'src/lib.js'
fileList[distIndex] = 'dist/index.html'

// make folders for files
fs.mkdirSync(TO + '/src')
fs.mkdirSync(TO + '/dist')

// for each file - read, replace, write
fileList.forEach(file => {
  let content = fs.readFileSync(FROM + '/' + file, 'utf8')

  content = content.replace(/\${ NAME.upper }/g, NAME.upper)
  content = content.replace(/\${ NAME.lower }/g, NAME.lower)

  fs.writeFileSync(TO + '/' + file, content, 'utf8')
})

// rename JS file
fs.renameSync(TO + '/src/lib.js', TO + '/src/' + NAME.lower +'.js')

// rename gitignore
fs.renameSync(TO + '/gitignore', TO + '/.gitignore')
