const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const rootDir = path.resolve(__dirname, '../..');

module.exports = {
  mode: 'development',
  entry: path.resolve(rootDir, 'src/example/script.js'),
  output: {
    path: path.resolve(rootDir, 'example'),
    filename: 'script.js',
    publicPath: './',
    library: 'ethereum-blockies-base64',
    libraryTarget: 'umd'
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Ethereum Blockies Base64',
      template: path.resolve(rootDir, 'src/example/index.html'),
      inject: true
    })
  ]
};
