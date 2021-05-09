/*
    ./webpack.config.js
*/
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './client/index.html',
  filename: 'index.html',
  inject: 'body'
})
module.exports = {
  entry: './client/index.jsx',
  output: {
    path: path.resolve('dist'),
    filename: 'index_bundle.js'
  },
  resolve : {
    alias: { 'react': path.resolve(__dirname, 'node_modules', 'react') }
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader'],
        }),
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader'],
        }),
      },
      {
        test: /\.(png|svg|jpeg|gif|woff|woff2)$/,
        loader: 'url-loader',
      }
    ]
  },
  plugins: [HtmlWebpackPluginConfig,new ExtractTextPlugin('bundle.css'),new webpack.LoaderOptionsPlugin({ options: {} }),]
}
