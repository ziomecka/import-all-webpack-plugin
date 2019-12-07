const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const ImportAllPlugin = require('../src/');

const importAllPlugin = new ImportAllPlugin(
  path.resolve(__dirname, 'src/import-all')
);

module.exports = {
  devServer: {
    contentBase: './dist',
    filename: 'index.html',
    lazy: true
  },
  devtool: 'source',
  entry: './src/index.js',
  mode: 'development',
  module: {
    rules: [
      {
        exclude: /node_modules/,
        use: ['babel-loader', 'ts-loader'],
        test: /.tsx?$/
      }
    ]
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, './dist')
  },
  plugins: [
    new htmlWebpackPlugin({
      filename: 'index.html'
    }),
    importAllPlugin
    // importAllPlugin(path.resolve(__dirname, 'src/observables'))
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    modules: [
      'node_modules',
      './node_modules',
      path.resolve(__dirname, 'node_modules'),
      path.resolve(__dirname, 'src')
    ]
  }
};
