const path = require('path'); //引入path模块
const webpack = require("webpack")
const express = require("express");
const app = express();

function resolve(dir) {
    return path.join(__dirname, dir) //path.join(__dirname)设置绝对路径
}

module.exports = {
    lintOnSave: false,
    publicPath: "./", // 基本路径
    outputDir: "dist", // 输出文件目录W
    indexPath: "index.html",
    configureWebpack: {

        plugins: [

            new webpack.ProvidePlugin({
                $: "jquery",
                jQuery: "jquery",
                "windows.jQuery": "jquery"
            })

        ]

    },
    devServer: {
        overlay: {
            warning: false,
            errors: false
        },
        proxy: {
            "/api": {
                target: "http://39.98.244.125:8001/", // 访问数据的计算机域名
                ws: true, // 是否启用websockets
                changOrigin: true, //开启代理
                pathRewrite: { //我使用了 nginx 作为反向代理，所以，需要把前缀替换为nginx 配置中的代理路径
                    '^/api': "/", //服务器请求地址中，若没有/api ，则替换为 /
                }
            }
        }
    }

}