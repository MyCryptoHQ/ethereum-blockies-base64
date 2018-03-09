const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const rootDir = path.resolve(__dirname);

module.exports = {
  mode: 'production',
  entry: path.resolve(rootDir, 'src/example/script.js'),
  output: {
    path: path.resolve(rootDir, 'example'),
    filename: 'script.js',
    publicPath: './'
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Ethereum Blockies Base64',
      template: path.resolve(rootDir, 'src/example/index.html'),
      inject: true
    })
  ]
};
