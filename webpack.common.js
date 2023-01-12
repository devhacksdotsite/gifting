/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
  entry: {
    index: './src/index.ts',
    pdp: './src/index.ts',
    checkout: './src/index.ts',
    review: './src/index.ts',
    confirmation: './src/index.ts',
    orderstatus: './src/index.ts',
    productList: './src/index.ts'
  },
  mode: 'development',
  devtool: 'source-map',
  optimization: {
    usedExports: true
  },
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
          options: {
            // disable type checker - we will use it in fork plugin
            transpileOnly: true
          }
        }
      },
      {
        test: /\.(scss|css)$/,
        use: [
          process.env.NODE_ENV !== 'production'
            ? 'style-loader'
            : MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name].[contenthash].css',
      chunkFilename: '[id].css'
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      inject: 'body',
      chunks: ['index'],
      filename: 'index.html'
    }),
    new HtmlWebpackPlugin({
      template: './src/pages/pdp.html',
      inject: 'body',
      chunks: ['pdp'],
      filename: 'pdp.html'
    }),
    new HtmlWebpackPlugin({
      template: './src/pages/checkout.html',
      inject: 'body',
      chunks: ['checkout'],
      filename: 'checkout.html'
    }),
    new HtmlWebpackPlugin({
      template: './src/pages/review.html',
      inject: 'body',
      chunks: ['review'],
      filename: 'review.html'
    }),
    new HtmlWebpackPlugin({
      template: './src/pages/confirmation.html',
      inject: 'body',
      chunks: ['confirmation'],
      filename: 'confirmation.html'
    }),
    new HtmlWebpackPlugin({
      template: './src/pages/orderstatus.html',
      inject: 'body',
      chunks: ['orderstatus'],
      filename: 'orderstatus.html'
    }),
    new HtmlWebpackPlugin({
      template: './src/pages/productList.html',
      inject: 'body',
      chunks: ['productList'],
      filename: 'productList.html'
    }),
    new ForkTsCheckerWebpackPlugin(),
    new CopyPlugin({
      patterns: [{ from: 'src/assets', to: 'assets' }]
    }),
    new ESLintPlugin({
      extensions: ['.tsx', '.ts', '.js'],
      exclude: 'node_modules',
      context: 'src'
    })
  ]
};
