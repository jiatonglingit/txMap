const path = require("path");
module.exports = {
    configureWebpack: {
        externals: {
            echarts: "echarts", // 配置使用CDN
        },
    },
    configureWebpack: (config) => {
        config.resolve = {
            // 配置解析别名
            extensions: [".js", ".json", ".vue"],
            alias: {
                "@": path.resolve(__dirname, "./src"),
                "@c": path.resolve(__dirname, "./src/components"),
            },
        };
    },
    // eslint-loader 是否在保存的时候检查
    lintOnSave: false,
    devServer: {
        port: 8088,
        proxy: {
            "/idata3d": {
                target: "http://test.idata3d.com:8081",
                ws: false,
                changeOrigin: true,
                pathRewrite: {
                    "^/idata3d": "",
                },
            },
            "/qqmap": {
                target: "https://apis.map.qq.com",
                ws: false,
                changeOrigin: true,
                pathRewrite: {
                    "^/qqmap": "",
                },
            },
        },
    },
    publicPath: "./",
    productionSourceMap: false,
};
