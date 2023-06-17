const webpack = require('webpack');

module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      'CUSTOM_GLOBAL_VARIABLE': JSON.stringify(true)
    })
  ]
};