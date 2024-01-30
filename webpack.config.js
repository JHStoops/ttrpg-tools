import path from 'path'

export default {
  entry: './src/index.js',
  output: {
    filename: 'index.js',
    path: path.resolve('dist/src'),
    library: {
      type: 'module',
    },
  },
  experiments: {
    outputModule: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [ '@babel/preset-env' ],
          },
        },
      },
    ],
  },
}
