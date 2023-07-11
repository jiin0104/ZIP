var path = require("path");

const target = 'http://127.0.0.1:3000';

module.exports = {
  outputDir: path.resolve("../server/public"),
  devServer: {
    port: 8080,
    proxy: {
      '^/api': {
        target,
        changeOrigin: true,
      },
      "/oath2.0": {
        target,
      },
      //필요없는 설정. 후에 우리가 업로드,다운로드 폴더를 쓸 경우 살림.
      // '^/upload': {
      //   target,
      //   changeOrigin: true,
      // },
      // '^/download': {
      //   target,
      //   changeOrigin: true,
      // }
    },
  },
};
