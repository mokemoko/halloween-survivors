const path = require('path');
const pathToPhaser = path.join(__dirname, '/node_modules/phaser/');
const phaser = path.join(pathToPhaser, 'dist/phaser.js');

module.exports = {
  entry: {
    'survivors': './src/game.ts',
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js'
  },
  optimization: {
    splitChunks: {
      name: 'common',
      chunks: 'initial'
    }
  },
  module: {
    rules: [
      {test: /\.ts$/, loader: 'ts-loader', exclude: '/node_modules/'},
      // {test: /phaser\.js$/, loader: 'expose-loader', options: {exposes: ['Phaser']}}
    ]
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, './'),
    },
    host: '127.0.0.1',
    port: 8080,
    open: true
  },
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      phaser: phaser
    }
  }
};
