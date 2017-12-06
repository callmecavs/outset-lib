#!/usr/bin/env node

'use strict'

const fs = require('fs')

// cache paths
const COPY_FROM = `${ __dirname }/template`
const COPY_TO = process.cwd()

// cache template file list
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

// cache lib name
const NAME = process.argv[2]

// create required directories
fs.mkdirSync(`${ COPY_TO }/src`)
fs.mkdirSync(`${ COPY_TO }/test`)

// copy over template files
FILES.forEach(path => {
  const content = fs
    .readFileSync(`${ COPY_FROM }/${ path }`, 'utf8')
    .replace(/\${ NAME }/g, NAME)

  fs.writeFileSync(`${ COPY_TO }/${ path }`, content, 'utf8')
})

// rename index and dotfiles
fs.renameSync(`${ COPY_TO }/src/index.js`, `${ COPY_TO }/src/${ NAME }.js`)
fs.renameSync(`${ COPY_TO }/gitignore`, `${ COPY_TO }/.gitignore`)
fs.renameSync(`${ COPY_TO }/npmignore`, `${ COPY_TO }/.npmignore`)
