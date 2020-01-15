// const banner = require("./data/banner.json");

// module.exports = {
//   baseUrl: "/", // 跟目录
//   outputDir: "dist",
//   assetsDir: "assets",
//   lintOnSave: false,
//   devServer: {
//     open: true,
//     host: "localhost",
//     port: "8080",
//     https: false,
//     hotOnly: false,
//     proxy: {
//       "/citylist": {
//         target: "http://api.yytianqi.com"
//       }
//     },
//     before(app) {
//       //localhost:8080,
//       http: app.get("/banner", (req, res) => {
//         res.json(banner);
//       });
//     }
//   }
// };
