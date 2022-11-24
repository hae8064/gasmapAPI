const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    `/api/avgSidoPrice.do?out=json&code=${process.env.REACT_APP_GASAPI}&sido=01`,
    createProxyMiddleware({
      target: "http://www.opinet.co.kr",
      changeOrigin: true,
      //   pathRewrite: {
      //     "^/api": "",
      //   },
    })
  );
};
