import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'

const info = require('./package.json')

const config = {
  entry: 'src/${ NAME.lower }.js',
  plugins: [
    resolve(),
    babel()
  ],
  targets: [
    {
      dest: info.main,
      format: 'umd',
      moduleName: '${ NAME.upper }'
    }, {
      dest: info.module,
      format: 'es'
    }
  ]
}

export default config
