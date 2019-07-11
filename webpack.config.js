const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './src/main.js',
    output: {
       path: path.join(__dirname, '/dist'),
       filename: 'index.js'
    },
    devServer: {
       inline: true,
       port: 8001
    },
    module: {
       rules: [
          {
             test: /\.jsx?$/,
             exclude: /node_modules/,
             loader: 'babel-loader',
             query: {
                presets: ['babel-preset-env', 'react']
             }
          },
          {
            test: /\.(scss)$/,
            use: [
              {
                // Adds CSS to the DOM by injecting a `<style>` tag
                loader: 'style-loader'
              },
              {
                // Interprets `@import` and `url()` like `import/require()` and will resolve them
                loader: 'css-loader'
              },
              {
                // Loader for webpack to process CSS with PostCSS
                loader: 'postcss-loader',
                options: {
                  plugins: function () {
                    return [
                      require('autoprefixer')
                    ];
                  }
                }
              },
              {
                // Loads a SASS/SCSS file and compiles it to CSS
                loader: 'sass-loader'
              }
            ]
          },
          {
            test: /\.css$/,
            use: [MiniCssExtractPlugin.loader, 'css-loader']
          },
          {
            test: /\.svg$/,
            loader: 'svg-inline-loader'
          }
       ]
    },
    resolve: {
      extensions: ['.js', '.jsx']
    },
    optimization: {
      minimizer: [new TerserPlugin, new OptimizeCSSAssetsPlugin({})]
    },
    plugins:[
       new HtmlWebpackPlugin({
          template: './src/index.html'
       }),
       new MiniCssExtractPlugin({
         filename: '[name].css',
         chunkFilename: '[id].css',
       }),
       new CopyPlugin([
         { from: 'manifest.json', to: '' },
         { from: './src/icon', to: 'icon/' },
       ])
    ]
}
