import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import WindiCSS from 'vite-plugin-windicss'
import inject from '@rollup/plugin-inject'
// import process from 'process'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), WindiCSS()],
  // define: {
  //   // global: "globalThis",
  //   // process: process,
  // },
  server: {
    host: '0.0.0.0', // 解决 Network: use `--host` to expose
    port: 3000,
    open: true,
  },
  build: {
    rollupOptions: {
      plugins: [inject({ Buffer: ['buffer', 'Buffer'] })],
    },
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
  // 配置别名
  resolve: {
    alias: [
        {
            find: '@',
            replacement: resolve(__dirname, 'src')
        }
    ]
},
})
