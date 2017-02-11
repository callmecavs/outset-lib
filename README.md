# outset-lib

[![outset-lib on NPM](https://img.shields.io/npm/v/outset-lib.svg?style=flat-square)](https://www.npmjs.com/package/outset-lib)

A boilerplate for vanilla JavaScript libraries.

## Features

* **Convenient.** Scaffold a project by running 1 command in your terminal.
* **Customized.** The library name you choose is used to pre-populate the template.
* **Modern.** Write ES6/7 syntax, and let users consume it how they want to (AMD, CommonJS, or script tag).
* **Lean.** Distribution files support users with tree-shaking bundlers (and the `package.json` is setup correctly).

## Install

Using NPM, install outset-lib globally.

```bash
$ npm install outset-lib -g
```

## Use

To create a new project:

```bash
# make a directory for it
$ mkdir project
$ cd project

# run outset-lib, passing the project name
$ outset-lib project

# install dependencies, and start coding
$ npm i
$ npm run dev
```

## Linting

[![JS Standard Style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](http://standardjs.com)

## License

MIT. © 2017 Michael Cavalea

[![Built With Love](http://forthebadge.com/images/badges/built-with-love.svg)](http://forthebadge.com)
