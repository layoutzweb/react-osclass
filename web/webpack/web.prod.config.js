const path = require('path');
const webpack = require('webpack');
const webpackNotifier = require('webpack-notifier');

module.exports = {
    devtool: 'cheap-module-eval-source-map',
    entry: [
        'webpack-hot-middleware/client',
        'babel-polyfill',
        path.join(__dirname, '../../app/web/index'),
    ],
    output: {
        path: path.join(__dirname, '../public'),
        filename: 'bundle.js',
        publicPath: '/',
    },
    resolve : {
        extensions: [
            '.webpack.js',
            '.web.js',
            '.js'
        ]
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: ['style-loader', 'css-loader', 'sass-loader', 'postcss-loader']
            },
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            modules: true, // default is false
                            sourceMap: true,
                            importLoaders: 1,
                            localIdentName: "[name]--[local]--[hash:base64:8]"
                        }
                    },
                    "postcss-loader"
                ]
            },
            {
                test: /\.json$/,
                use: ["json-loader"]
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015', 'react'],
                        plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy']
                    }
                }
            }
        ],
    },
    plugins: [
        new webpackNotifier(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production'),
                PLATFORM_ENV: JSON.stringify('web'),
            },
        }),
        //new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
    ],
};
