var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './app/index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'index_bundle.js',
      publicPath: '/'
    },
    devtool: 'source-map',
    module: {
      rules: [
        {
          test: /\.(js)$/,
          loader: 'babel-loader' ,
          exclude:'/node_modules/',
        },
        {
          test: /\.scss$/,
          use: ExtractTextPlugin.extract('css-loader!sass-loader')
        }
      ]
    },
    plugins: [
        new ExtractTextPlugin({filename:'style.css',
            allChunks: true
        }),
        new HtmlWebpackPlugin({
          template: 'app/index.html'
        })
    ]
}
