const path = require('path')
const webpack = require('webpack')
const HtmlWebPackPlugin = require("html-webpack-plugin")

module.exports = {
    entry: './src/client/index.js',
    output: {},
    mode: 'production',
    module: {
        rules: []
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/client/views/index.html",
            filename: "./index.html"
        })
    ]
}