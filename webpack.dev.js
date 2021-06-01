const path = require('path')
const webpack = require('webpack')

module.exports = {
    entry: './src/client/index.js',
    output: {},
    mode: 'development',
    devtool: 'source-map',
    module: {
        rules: []
    },
    plugins: []
}