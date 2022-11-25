const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    `/api`,
    createProxyMiddleware({
      target:
        'http://www.opinet.co.kr/api/avgSidoPrice.do?out=json&code=F221123420&sido=01',
      changeOrigin: true,
      //   pathRewrite: {
      //     "^/api": "",
      //   },
    })
  );
  //   app.use(
  //     "/api",
  //     createProxyMiddleware({
  //       target: `https://cors-anywhere.herokuapp.com/www.opinet.co.kr/api/avgSidoPrice.do?out=json&code=F221123420&sido=01`,
  //       changeOrigin: true,
  //       //   pathRewrite: {
  //       //     "^/api": "",
  //       //   },
  //     })
  //   );
};
