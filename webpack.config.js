const path = require('path');

module.exports = {
  resolve: {
    extensions: ['.js', '.ts'],
    alias: {
      '$js': path.resolve(__dirname, './resources/js/common'),
      '$app': path.resolve(__dirname, './resources/js/app'),
      '$admin': path.resolve(__dirname, './resources/js/admin'),

      '@app': path.resolve(__dirname, './resources/assets/app'),
      '@admin': path.resolve(__dirname, './resources/assets/admin'),
    }
  }
}