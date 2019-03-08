const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const distDir = path.join(__dirname, 'dist');

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, 'src', 'App.jsx'),
  output: {
    path: distDir,
    filename: 'app.js',
  },
  module: {
    rules: [
      {
        test: /.jsx$/,
        include: [path.resolve(__dirname, 'src')],
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
        },
      },
      {
        test: /\.worker\.js$/,
        use: {loader: 'worker-loader'},
      },
    ],
  },
  devServer: {
    contentBase: distDir,
    compress: true,
    port: 1337,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src', 'index.html'),
    }),
  ],
};
