const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  entry: {
    app: './src/main.js'
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['**/*', '!.git'],
    }),
    new HtmlWebpackPlugin({
      title: 'Alex\'s Place',
      template: 'index.html',
      minify: Object.assign({
        removeRedundantAttributes: true,
        removeEmptyElements: false,
      }, isProd ? {
        collapseWhitespace: true,
        removeComments: true,
        useShortDoctype: true
      } : {}),
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css'
    }),
  ],
  resolve: {
    modules: [
      'node_modules',
      path.resolve(__dirname + '/src')
    ],
    alias: {
      src: path.resolve(__dirname + '/src')
    }
  },
  output: {
    filename: '[name].[hash].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ]
      },
      {
        test: /\.(png|svg|jpe?g|gif|xml|ico|webmanifest|woff|woff2|eot|ttf|otf)$/,
        include: path.resolve(__dirname, 'src/assets'),
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
          },
        },
      },
    ]
  },
};