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
                '@pubComponent': path.resolve(__dirname, 'src/common/components'),
                '@static': path.resolve(__dirname, 'public/static'),
            }
        }
    },
    devServer: {
        port: 8083,
        proxy: {
            '/api': {
                // target: 'http://localhost:8080/', // 本地
                // target: 'http://192.168.14.28:8080/', // 张世豪
                target: 'http://192.168.14.45:8080/', // 陈方良
                // target: 'http://192.168.14.191:8080/', //张占彬
                // target: 'http://192.168.14.119:8080/', // 严海琳
                // target: 'http://192.168.14.185:8080/', // 赵春龙
                // target: 'http://192.168.14.180:8080/', // 张嘉诚
                // target: 'http://192.168.14.163:8080/', // 龙晓琼
                // target: 'http://192.168.14.198:8080/', // 唐增杰
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
