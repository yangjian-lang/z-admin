import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// 按需引入element-plus
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { viteMockServe } from 'vite-plugin-mock'

export default defineConfig(({ command, mode }) => {

  const env = loadEnv(mode, process.cwd()) // 获取各个环境下的环境变量
  return {
    // 代理服务器配置
    server: {
      proxy: {
        [env.VITE_APP_BASE_API]: {
          target: env.VITE_SERVE, // 获取数据的服务器地址
          changeOrigin: true, // 需要代理跨域
          rewrite: (path) => path.replace(/^\/api/, '') //路径重写
        }
      }
    },
    plugins: [
      vue(),
      // 按需引入element-plus
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
      // 配置mock || 这里的vite-plugin-mock插件需下载2版本的不然报错
      viteMockServe({
        localEnabled: command === 'serve'
      })
    ],
    resolve: {
      alias: {
        "@": path.resolve("./src") // 相对路径设置别名
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          javascriptEnabled: true,
          additionalData: '@import "@/styles/variable.scss";'
        }
      }
    }
  }
})
