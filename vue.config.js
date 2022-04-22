const { defineConfig } = require('@vue/cli-service')
var path = require('path')
module.exports = defineConfig({
  transpileDependencies: true,
  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: './',

    // 下面的省略
  },
})
