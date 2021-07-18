const path = require('path');

module.exports = {
  entry: './index.js',

  resolve: {
    extensions: ['', '.js'],
    alias: {
      'alliances': path.resolve(__dirname, './index')  // <-- When you build or restart dev-server, you'll get an error if the path to your utils.js file is incorrect.
    }
  },

  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'out'),
  },
};