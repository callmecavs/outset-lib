#!/usr/bin/env node

'use strict'

const fs = require('fs')

// cache paths
const COPY_FROM = __dirname + '/template'
const COPY_TO   = process.cwd()

const FILES = [
  'src/index.js',
  'test/index.js',
  'test/manual.html',
  '.eslintrc',
  '.travis.yml',
  'gitignore',
  'npmignore',
  'package.json',
  'README.md',
  'rollup.config.js'
]

// prepare names from arg
const input = process.argv[2]

const sanitized = input.includes('.')
  ? input.substring(0, input.indexOf('.'))
  : input

const NAME = {
  lower: sanitized.toLowerCase(),
  upper: sanitized.charAt(0).toUpperCase() + sanitized.slice(1)
}

// create required directories
fs.mkdirSync(COPY_TO + '/src')
fs.mkdirSync(COPY_TO + '/test')

FILES.forEach(name => {
  // read content
  const content = fs.readFileSync(COPY_FROM + '/' + name, 'utf8')

  // replace names
  const transformed = content
    .replace(/\${ NAME.upper }/g, NAME.upper)
    .replace(/\${ NAME.lower }/g, NAME.lower)

  // write file
  fs.writeFileSync(COPY_TO + '/' + name, transformed, 'utf8')
})

// rename index
fs.renameSync(COPY_TO + '/src/index.js', COPY_TO + '/src/' + NAME.lower +'.js')

// rename gitignore
fs.renameSync(COPY_TO + '/gitignore', COPY_TO + '/.gitignore')

// rename npmignore
fs.renameSync(COPY_TO + '/npmignore', COPY_TO + '/.npmignore')
