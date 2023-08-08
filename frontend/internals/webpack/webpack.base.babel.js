/**
 * COMMON WEBPACK CONFIGURATION
 */

const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const StringReplacePlugin = require('string-replace-webpack-plugin');
const themes = require('../../app/themes/themes_webpack');

// Remove this line once the following warning goes away (it was meant for webpack loader authors not users):
// 'DeprecationWarning: loaderUtils.parseQuery() received a non-string value which can be problematic,
// see https://github.com/webpack/loader-utils/issues/56 parseQuery() will be replaced with getOptions()
// in the next major version of loader-utils.'
process.noDeprecation = true;

module.exports = (options) => ({
  entry: options.entry,
  output: {// Compile into js/build.js
    path: path.resolve(process.cwd(), 'build'),
    publicPath: `${(process.env.CDN_URL_PREFIX || '')}/`, // Use a CDN prefix from env variables if needed to load assets from there
   ...options.output}, // Merge with env dependent settings
  module: {
    rules: [
      {
        test: /index.html$/,
        loader: StringReplacePlugin.replace({
          replacements: [
            {
              pattern: /\$THEME\[(\w*?)]/g,
              replacement(match, attribute) {
                const theme = process.env.THEME || 'candidately';
                return themes[theme][attribute];
              },
            },
          ],
        }),
      },
      {
        test: /\.js$/, // Transform all .js files required somewhere with Babel
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: { ...options.babelQuery, cacheDirectory: true},
        },
      },
      {
        test: /\.json$/,
        use: ['json-loader'],
        type: 'javascript/auto',
      },
      {
        // Preprocess our own .css files
        // This is the place to add your own loaders (e.g. sass/less etc.)
        // for a list of loaders, see https://webpack.js.org/loaders/#styling
        test: /\.css$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader'],
      },
      {
        // Preprocess 3rd party .css files located in node_modules
        test: /\.css$/,
        include: /node_modules/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(eot|otf|ttf|woff|woff2)$/,
        use: 'file-loader',
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'svgr/webpack',
            options: { svgo: false },
          },
          'file-loader',
        ],
      },
      {
        test: /\.(jpg|png|gif)$/,
        use: 'file-loader',
      },
      {
        test: /\.html$/,
        use: 'html-loader',
      },
      {
        test: /\.(mp4|webm)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
          },
        },
      },
    ],
  },
  plugins: options.plugins.concat([
    // Always expose NODE_ENV to webpack, in order to use `process.env.NODE_ENV`
    // inside your code for any environment checks; UglifyJS will automatically
    // drop any unreachable code.
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
      PRODUCTION: JSON.stringify(true),
      REST_API_URL: JSON.stringify(process.env.REST_API_URL || '/api'),
    }),
    new webpack.NamedModulesPlugin(),

    // Copy static files to /build
    new CopyWebpackPlugin([{ from: 'public' }]),

    new StringReplacePlugin(),

    new webpack.NamedModulesPlugin(),

  ]),
  resolve: {
    modules: ['app', 'node_modules'],
    alias: {
      moment: 'moment/moment.js',
      'lodash-es': 'lodash',
    },
    extensions: [
      '.js',
      '.jsx',
      '.react.js',
    ],
    mainFields: [
      'browser',
      'jsnext:main',
      'main',
    ],
  },
  devtool: options.devtool,
  target: 'web', // Make web variables accessible to webpack, e.g. window
  performance: options.performance || {},
  node: { fs: 'empty' },
});