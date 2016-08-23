// imports

const json     = require('./package.json')
const sync     = require('browser-sync')
const del      = require('del')
const fs       = require('fs')
const gulp     = require('gulp')
const notifier = require('node-notifier')
const rollup   = require('rollup')
const babel    = require('rollup-plugin-babel')
const commonjs = require('rollup-plugin-commonjs')
const resolve  = require('rollup-plugin-node-resolve')
const uglify   = require('rollup-plugin-uglify')

// error handler

const onError = function(error) {
  notifier.notify({
    'title': 'Error',
    'message': 'Compilation failure.'
  })

  console.log(error)
}

// clean

gulp.task('clean', () => del('dist', '!dist/index.html'))

// attribution

const attribution =
`/*!
 * ${ NAME.upper }.js ${ json.version } - ${ json.description }
 * Copyright (c) ${ new Date().getFullYear() } ${ json.author.name } - https://github.com/${ json.repository }
 * License: ${ json.license }
 */
`

// js

const base = [
  resolve({
    jsnext: true,
    main: true,
    browser: true
  }),
  commonjs(),
  babel({
    // TODO: make this be a function that checks for the presence of a package's jsnext:main field
    exclude: 'node_modules/**',
  })
]

const minified = [
  uglify()
]

const read = flag => ({
  entry: 'src/test.js',
  sourceMap: true,
  plugins: flag
    ? base.concat(minified)
    : base
})

const write = {
  format: 'umd',
  exports: 'default',
  moduleName: '${ NAME.upper }',
  sourceMap: true
}

gulp.task('js', () => {
  return Promise
    .all([
      rollup.rollup(read(false)),
      rollup.rollup(read(true))
    ])
    .then(results => {
      const files = results.map(res => res.generate(write))

      // cache path to JS dist files
      const normal = 'dist/${ NAME.lower }.js'
      const minified = 'dist/${ NAME.lower }.min.js'

      // write attributions
      fs.writeFileSync(normal, attribution)
      fs.writeFileSync(minified, attribution)

      // write the sourcemap
      fs.writeFileSync('dist/maps/${ NAME.lower }.js.map', files[0].map.toString())

      // write JS files
      fs.appendFileSync(normal, files[0].code)
      fs.appendFileSync(minified, files[1].code)
    })
    .catch(onError)
})

// server

const server = sync.create()
const reload = sync.reload

const sendMaps = (req, res, next) => {
  const filename = req.url.split('/').pop()
  const extension = filename.split('.').pop()

  if(extension === 'css' || extension === 'js') {
    res.setHeader('X-SourceMap', '/maps/' + filename + '.map')
  }

  return next()
}

const options = {
  notify: false,
  server: {
    baseDir: 'dist',
    middleware: [
      sendMaps
    ]
  },
  watchOptions: {
    ignored: '*.map'
  }
}

gulp.task('server', () => sync(options))

// watch

gulp.task('watch', () => {
  gulp.watch('src/**/*.js', ['js', reload])
})

// build and default tasks

gulp.task('build', ['clean'], () => {
  // create dist directories
  fs.mkdirSync('dist')
  fs.mkdirSync('dist/maps')

  // run the tasks
  gulp.start('js')
})

gulp.task('default', ['build', 'server', 'watch'])
