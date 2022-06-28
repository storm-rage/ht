const path = require('path')

module.exports = {
    lintOnSave:false,
    publicPath: '/',
    outputDir: 'dist',
    assetsDir: 'static',
    runtimeCompiler: true,
    configureWebpack: {
        resolve: {
            alias: {
                'vue$': 'vue/dist/vue.esm.js', //内部为正则表达式  vue结尾的
                '@': path.resolve(__dirname, 'src'),
                '@modules': path.resolve(__dirname, 'src/modules'),
                '@baseModules': path.resolve(__dirname, 'src/modules/base'),
                '@common': path.resolve(__dirname, 'src/common'),
                '@utils': path.resolve(__dirname, 'src/common/utils'),
                '@assets': path.resolve(__dirname, 'src/assets'),
                // '@views': path.resolve(__dirname, 'src/views'),
                '@pubComponent': path.resolve(__dirname, 'src/common/components'),
                // '@errorPage': path.resolve(__dirname, 'src/views/errorPage'),
                '@static': path.resolve(__dirname, 'public/static'),
            }
        }
    },
    devServer: {
        port: 8083,
        proxy: {
            '/api': {
                 target: 'http://172.16.20.39:8080/',
                // target: 'http://localhost:8080/', // 本地
                // target: 'http://172.16.20.89:8083/', // 本地2
                // target: 'http://172.16.20.57:8080/', // 天眼
                // target: 'http://172.16.20.82:8080/', // 达
                // target: 'http://172.16.20.38:8088', // 云
                //target: 'http://172.16.20.5:8080', // 辉品
                // target: 'http://172.16.20.38:8088', // 云
                // target: 'http://172.16.20.83:8080', // 辉
                // target: 'http://172.16.20.87:8080', // 杰
                // target: 'http://172.16.20.51:8080', // 旺
                // target: 'http://172.16.20.37:8080', // 勇
                // target: 'http://172.16.20.53:8080', //王1
                // target: 'http://172.16.20.53:8081', //王2
                // target: 'http://172.16.20.69:8080',//光
                // target: 'http://172.16.20.37:8080', // 杰
                // target:'http://172.16.50.50:8888',//斌
                //target:'http://172.16.20.96:8080',//肖
                // target: 'http://172.16.50.19:8090/',//姚
                // target:'http://172.16.20.54:8082', //肖庆云
                // target:'http://172.16.20.77:8080', //颜海琳
                //target:'http://172.16.20.73:8080', //甘嘉伟
                // target:'http://172.16.20.77:8080', //颜海琳
                pathRewrite: {
                    '^/api':''
                }
            }
        }
    },
    transpileDependencies: [
      /[/\\]node_modules[/\\](.+?)?element-ui(.*)[/\\]src/,
      /[/\\]node_modules[/\\](.+?)?element-ui(.*)[/\\]package/,
      /[/\\]node_modules[/\\](.+?)?f-render(.*)/,
      /[/\\]node_modules[/\\](.+?)?quill-image-drop-module(.*)/,
      /[/\\]node_modules[/\\](.+?)?vue-ele-form(.*)/,
      /[/\\]node_modules[/\\](.+?)?vue-ele-form-bmap(.*)/,
      /[/\\]node_modules[/\\](.+?)?vue-baidu-map(.*)/,
      /[/\\]node_modules[/\\](.+?)?vue-ele-upload-image(.*)/,
    ],
}
