const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        app: ['./src/index'],
    },
    devtool: 'source-map',
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    plugins: [
        new CleanWebpackPlugin(),
        new CopyPlugin({
            patterns: [
                { from: path.resolve(__dirname, 'resources'), to: 'resources' },
            ],
            options: {
                concurrency: 100,
            },
        }),
        new ImageminPlugin({
            test: /\.(jpe?g|png|gif|svg)$/i,
            disable: process.env.NODE_ENV !== 'production',
            pngquant: {
                verbose: true,
                quality: '80-90',
            },
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'public/index.html'),
        }),
    ],
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
            },
        ],
    },
    resolve: {
        alias: {
            config: path.resolve(__dirname, 'src/config'),
        },
        extensions: ['.js', '.jsx', '.ts'],
    },
    devServer: {
        contentBase: './dist',
        inline: false,
    },
    optimization: {
        moduleIds: 'deterministic',
        runtimeChunk: 'single',
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all',
                },
            },
        },
    },
    stats: {
        assetsSort: '!size',
        // Hide source maps from output
        excludeAssets: [/\.*\.map/],
    },
};
