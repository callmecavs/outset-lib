import babel from 'rollup-plugin-babel'
import babelrc from 'babelrc-rollup'

const info = require('./package.json')

const config = {
  entry: 'src/${ NAME.lower }.js',
  plugins: [ babel(babelrc()) ],
  targets: [
    {
      dest: info.main,
      format: 'umd',
      moduleName: '${ NAME.lower }',
      sourceMap: true
    }, {
      dest: info.module,
      format: 'es',
      sourceMap: true
    }
  ]
}

export default config
