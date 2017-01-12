//node内置path模块
var path = require('path');
//express框架
var express = require('express');
//webpack for node.js
var webpack = require('webpack');
//import ../config/index.js
var config = require('../config');
//http proxy middleware
var proxyMiddleware = require('http-proxy-middleware');
var webpackConfig = process.env.NODE_ENV === 'testing'
  ? require('./webpack.prod.conf')
  : require('./webpack.dev.conf');
// 定义Web服务器默认的端口号
var port = process.env.PORT || config.dev.port
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
// 对指定的接口进行代理
var proxyTable = config.dev.proxyTable;
// 实例化一个express app
var app = express();
// 实例化一个webpack编译器
var compiler = webpack(webpackConfig);
// 这个中间件是express为webpack开发的中间件，能够将编译的app.js文件置于内存之中，供浏览器访问
var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  stats: {
    colors: true,
    chunks: false
  }
});
// 热加载中间件
var hotMiddleware = require('webpack-hot-middleware')(compiler);
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({action: 'reload'})
    cb()
  })
});
// 代理转发操作
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context];
  if (typeof options === 'string') {
    options = {target: options}
  }
  app.use(proxyMiddleware(context, options));
});
// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')());
// serve webpack bundle output
app.use(devMiddleware)
// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// 配置静态资源的访问路径
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory);
app.use(staticPath, express.static('./static'));

//启动express，监听8080端口
module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err);
    return
  }
  console.log('Listening at http://localhost:' + port + '\n')
})
