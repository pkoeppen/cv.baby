const path = require('path');
const slsw = require('serverless-webpack');

module.exports = {
  mode: 'development',
  entry: slsw.lib.entries,
  target: 'node',
  module: {
    rules: [
      {
        test: /\.(js)$/,
        loader: 'eslint-loader',
        exclude: /(node_modules)/
      }
    ]
  },
  output: {
    libraryTarget: 'commonjs',
    path: path.join(__dirname, '.webpack'),
    filename: '[name].js'
  }
};
