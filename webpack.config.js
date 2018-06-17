const path = require('path');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const config = {
    mode: process.env.NODE_ENV,
    entry: './src/media/index',
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'media'),
    },
    resolve: {
        extensions: ['.js', '.ts', '.tsx'],
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                loader: 'ts-loader',
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'index.css',
        }),
    ],
};

module.exports = config;
