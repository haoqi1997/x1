/*
webpake 的配置文件

*/

const path = require('path')

module.exports = {


    outputDir: 'jcs',
    publicPath: "./",
    // publicPath: "/",
    chainWebpack: config => { //chainWebpack的链式操作

        config.resolve.alias
            // .set(路径,绝对路径)
            .set("assets", path.join(__dirname, './src/assets'))
            .set("components", path.join(__dirname, './src/components'))
            .set('layout', path.join(__dirname, './src/components/layout'))
            .set('router', path.join(__dirname, './src/router'))
            .set('store', path.join(__dirname, './src/store'))
            .set('utils', path.join(__dirname, './src/utils'))
            .set('views', path.join(__dirname, './src/views'))
            .set('api', path.join(__dirname, './src/api'))
            .set('img', path.join(__dirname, './src/assets/img'))
            .set('@', path.join(__dirname, './src'))

    },
    lintOnSave: true, //关闭语法 

    productionSourceMap: false,
    devServer: {
        //登录管理
        proxy: {
            // 系统和登录
            "/apiLoginSystem": {
                // target: "http://192.168.0.101:8600", //ip
                // target: "http://192.168.0.254:8600", //内网 
                target: "http://120.27.194.72:8600", //生产 
                changeOrgin: true,
                pathRewrite: {
                    '^/apiLoginSystem': '' //替换
                }
            },


        }
    },







}