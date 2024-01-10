const path = require('path');

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  entry: './src/index.js',
  output: {
    filename: 'daigo.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
};
