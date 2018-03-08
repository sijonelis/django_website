var path = require('path')
var webpack = require('webpack')
var BundleTracker = require('webpack-bundle-tracker')

module.exports = {
  devtool: 'cheap-module-source-map',
  // the base directory (absolute path) for resolving the entry option
  context: __dirname,
  // the entry point we created earlier. Note that './' means 
  // your current directory. You don't have to specify the extension  now,
  // because you will specify extensions later in the `resolve` section
  entry: [
    'babel-polyfill', // Load this first
    // 'react-hot-loader/patch', // This package already requires/loads react (but not react-dom). It must be loaded after babel-polyfill to ensure both react and react-dom use the same Symbol.
    'react', // Include this to enforce order
    'react-dom', // Include this to enforce order
    './assets/js/index'
  ],

  output: {
    // where you want your compiled bundle to be stored
    path: path.resolve('./assets/bundles/'),
    // naming convention webpack should use for your files
    filename: '[name]-[hash].js'
  },

  plugins: [
    // tells webpack where to store data about your bundles.
    new BundleTracker({filename: './webpack-stats.json'}),
    // makes jQuery available in every module
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    }),
    // todo enable for production
    new webpack.DefinePlugin({ // <-- key to reducing React's size
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.DedupePlugin(), // dedupe similar code
    new webpack.optimize.UglifyJsPlugin(), // minify everything
    new webpack.optimize.AggressiveMergingPlugin()// Merge chunks
  ],

  module: {
    loaders: [
      // a regexp that tells webpack use the following loaders on all 
      // .js and .jsx files
      {
        test: /\.jsx?$/,
        // we definitely don't want babel to transpile all the files in 
        // node_modules. That would take a long time.
        exclude: /node_modules/,
        // use the babel loader 
        loader: 'babel-loader',
        query: {
          // specify that we will be dealing with React code
          presets: ['react', 'es2015']
        }
      },
      // Load images.
      {
        test: /\.(gif|jpe?g|png)$/,
        loader: 'url-loader?limit=25000',
        query: {
          limit: 10000,
          name: 'static/media/images/[name].[hash:8].[ext]'
        }
      },
      { test: /\.less$/, loader: 'style!css!less' },
      { test: /\.css$/, loader: 'style!css!' }
    ]
  },

  resolve: {
    // tells webpack where to look for modules
    modules: ['node_modules'],
    // extensions that should be used to resolve modules
    extensions: ['', '.js', '.jsx']
  }
}
