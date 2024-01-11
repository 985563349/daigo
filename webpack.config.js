const path = require('path');

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'daigo.js',
    library: {
      type: 'commonjs2'
    },
    clean: true,
  },
};
