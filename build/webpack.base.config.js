var webpack = require('webpack');
var path = require('path');
var utils = require('./utils');

function resolve(relPath) {
    return path.resolve(__dirname, relPath);
}

module.exports = {
    entry: {
        index: resolve('../src/main.js'),
    },
    output: {
        filename: 'js/[name].js',
        chunkFilename: "js/[name].[chunkhash].js"
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            '@': resolve('../src'),
            '~': resolve('../src/assets'),
            '@scss': resolve('../src/static/scss'),
            '@img': resolve('../src/static/images')
        }
    },
    module: {
        rules: [{
            test: /\.js$/,
            use: "babel-loader",
            include: [resolve('../src')]
        },
            {
                test: /\.vue$/,
                use: {
                    loader: "vue-loader",
                    options: utils.vueLoaderOptions()
                }
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                use: {
                    loader: "url-loader",
                    options: {
                        limit: 10000,
                        name: 'images/[name].[hash:7].[ext]'
                    }
                }
            },
            {
                test: /\.(js|vue)$/,
                enforce: 'pre', // 强制先进行 ESLint 检查
                exclude: /node_modules|lib/,
                loader: 'eslint-loader',
                options: {
                    // 启用自动修复
                    fix: true,
                    // 启用警告信息
                    emitWarning: true,
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                use: [{
                    loader: "url-loader",
                    options: {
                        limit: 10000,
                        name: 'fonts/[name].[hash:7].[ext]'
                    }
                }]
            }
        ]
    }
}
