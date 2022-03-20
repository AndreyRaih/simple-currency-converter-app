const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  pages: {
    index: {
      entry: 'src/main.ts',
      title: 'Simple Convert App',
    },
  },
  pwa: {
    name: 'Simple Convert App',
    themeColor: '#18a058',
    workboxPluginMode: 'GenerateSW'
  }
})
