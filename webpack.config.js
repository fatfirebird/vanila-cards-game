const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimazeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const Copy = require('copy-webpack-plugin');
const path = require('path');

const dev = process.env.NODE_ENV === 'development';
const filename = ext => dev ? `[name].${ext}` : `[name].[hash].${ext}`
const css = extra => {
  const config = [
    {
       loader: MiniCssExtractPlugin.loader,
       options: {
        hmr: dev,
        reloadAll: true
       }
      },
    'css-loader'
  ]

  if (extra) {
    config.push(extra)
  }

  return config
}

const optimize = () => {
  const config = {
    splitChunks: {
      chunks: 'all'
    }
  }

  if (!dev) {
    config.minimizer = [
      new OptimazeCssAssetsWebpackPlugin(),
      new TerserPlugin()
    ]
  }

  return config;
}

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: {
    main: ['@babel/polyfill', './index.js']
  },
  output: {
    filename: filename('js'),
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.js', '.css'],
    alias: {
      '@assets': path.resolve(__dirname, 'assets'),
      '@fonts': path.resolve(__dirname, 'assets/fonts'),
      '@styles': path.resolve(__dirname, 'src/styles'),
    }
  },
  optimization: optimize(),
  devServer: {
    port: 3000,
    hot: dev
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      minify: {
        collapseWhitespace: !dev,
      }
    }),
    new CleanWebpackPlugin(),
    new Copy([
      {
        from: path.resolve(__dirname, 'assets/favicon.ico'),
        to: path.resolve(__dirname, 'dist')
      }
    ]),
    new MiniCssExtractPlugin({
      filename: filename('css')
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env'
            ],
            plugins: [
              '@babel/plugin-proposal-class-properties'
            ]
          },
        }
      },
      {
        test: /\.css$/,
        use: css()
      },
      {
        test: /\.s[ac]ss$/,
        use: css('sass-loader')
      },
      {
        test: /\.(jpg|png|svg|gif)$/,
        use: ['file-loader']
      },
      {
        test: /\.(ttf|woff|woff2|eot)$/,
        use: ['file-loader']
      }
    ]
  }
}