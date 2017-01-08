import babel from 'rollup-plugin-babel'

const info = require('./package.json')

const config = {
  entry: 'src/${ NAME.lower }.js',
  plugins: [ babel() ],
  targets: [
    {
      dest: info.main,
      format: 'umd',
      moduleName: '${ NAME.lower }'
    }, {
      dest: info.module,
      format: 'es'
    }
  ]
}

export default config
