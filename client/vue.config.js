var path = require("path");

module.exports = {
  outputDir: path.resolve("../server/public"),
  devServer: {
    proxy: {
      '^/api': {
        target: "http://localhost:3000",
        changeOrigin: true
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
    }
  }
}