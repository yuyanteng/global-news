// 反向代理
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  // app.use(
  //   '/api',
  //   createProxyMiddleware({
  //     target: 'http://localhost:5000',
  //     changeOrigin: true,
  //   })
  // );
  app.use(
    '/ajax',
    createProxyMiddleware({
      target: 'http://localhost:5000',
      changeOrigin: true,
    })
  );
};
