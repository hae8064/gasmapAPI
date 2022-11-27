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

  app.use(
    '/map-reversegeocode/v2/gc?request=coordsToaddr&coords=126.9124,37.4622&sourcecrs=epsg:4326&output=json&orders=legalcode,admcode',
    createProxyMiddleware({
      target: `https://naveropenapi.apigw.ntruss.com`,
      changeOrigin: true,
      //   pathRewrite: {
      //     "^/api": "",
      //   },
    })
  );
};
