var webpack = require('webpack');
var webpackDevServer = require('webpack-dev-server');
var devConfig = require("./webpack.dev.config");
var config = require("./config");
var compiler = webpack(devConfig);
var server = new webpackDevServer(compiler, {
    hot: true,
    quiet: true,
    publicPath: config.dev.outputPublicPath,
    stats: { colors: true },
    proxy:{
        '/call': {
            target: 'http://localhost:8001',
            changeOrigin: true,
            pathRewrite: {
                '^/call': '/call'
            }
        },
        '/manage': {
            target: 'http://188.131.139.100:8083',
            changeOrigin: true,
            pathRewrite: {
                '^/manage': '/manage'
            }
        },
        '/api': {
            target: 'http://47.105.160.157:8080',
            changeOrigin: true,
            pathRewrite: {
                '^/api': '/api'
            }
        }
    }
});
server.listen(config.dev.port, "127.0.0.1");
var url = `http://localhost:${config.dev.port}/`;
var opn = require('opn');
// 打包完毕后启动浏览器
server.middleware.waitUntilValid(function() {
    console.log(`> Listening at ${url}`);
    opn(`${url}`);
})
