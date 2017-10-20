const { resolve } = require('path');
const webpack = require('webpack');

module.exports = {
  entry: [
    // activate HMR for React
    //'react-hot-loader/patch',
    
    // bundle the client for webpack-dev-server
    // and connect to the provided endpoint.
    // NOTE: port number needs to match devServer.port below
    //'webpack-dev-server/client?http://localhost:8080',
    
    // bundle the client for hot reloading
    // only- means to only hot reload for successful updates
    //'webpack/hot/only-dev-server',

    './src/index.js'
  ],
  output: {
    path: __dirname,
    publicPath: '/',
    filename: 'bundle.js'
  },
  //devtool: 'inline-source-map',
  module: {
    rules: [
      {test: /\.(js|jsx)$/, use: 'babel-loader', exclude: /node_modules/},
      //{test: /\.css$/, use: [ 'style-loader', 'css-loader?modules', ]}
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  devServer: {
    //hot: true,
    historyApiFallback: true,
    contentBase: './',
    port: 8080
  },
  plugins: [
    // enable HMR globally
    //new webpack.HotModuleReplacementPlugin(),
    
    // prints more readable module names in the browser console on HMR updates
    //new webpack.NamedModulesPlugin(),
  ]
};
