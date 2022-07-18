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
                target: 'http://192.168.28.64:8080/', //张占彬
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
