const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    `/api`,
    createProxyMiddleware({
      target:
        'http://www.opinet.co.kr/api/aroundAll.do?code=F221123420&x=303981.50363080035&y=540560.4158811523&radius=2000&sort=1&prodcd=D047&out=json',
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
