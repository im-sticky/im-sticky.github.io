const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const MarkdownRssPlugin = require('./webpack-plugins/markdownRssPlugin');

const isProd = process.env.NODE_ENV === 'production';
const siteUrl = isProd ? 'https://im-sticky.github.io' : 'http://localhost:8080';

module.exports = {
  entry: {
    app: './src/main.js'
  },
  plugins: [
    new MarkdownRssPlugin({
      title: 'Alex Craig\'s blog',
      description: 'A collection of my thoughts and anecdotes',
      id: siteUrl,
      link: `${siteUrl}/#/blog/`,
      image: `${siteUrl}/favicon-32x32.png`,
      favicon: `${siteUrl}/favicon.ico`,
      copyright: `All rights reserved ${new Date().getFullYear()}, Alex Craig`,
      feedLinks: {
        json: `${siteUrl}/feed.json`,
        atom: `${siteUrl}/feed.atom`,
        rss: `${siteUrl}/feed.xml`
      },
      author: {
        name: 'Alex Craig',
        email: 'acraig780@gmail.com',
        link: siteUrl
      },
    }),
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
        test: /\.(png|svg|jpe?g|gif|xml|ico|webmanifest|woff|woff2|eot|ttf|otf|dec)$/,
        include: path.resolve(__dirname, 'src/assets'),
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
          },
        },
      },
      {
        test: /\.md$/,
        loader: 'markdown-with-front-matter-loader',
      },
    ]
  },
};