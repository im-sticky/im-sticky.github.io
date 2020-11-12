const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  optimization: {
    usedExports: true,
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
  },
});