import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import path from 'path'
const PROJECT_NAME = 'myproject'
// https://vite.dev/config/
export default defineConfig({
  base: '/',
  publicDir: "public", //静态资源目录
  optimizeDeps: {
    include: ['react','react-dom'],//剥离通用包
    esbuildOptions: {
      loader: {
        '.js': 'jsx',//解决在js中写jsx报错误的问题
      },
    }
  },
  plugins: [react({
    jsxRuntime: 'automatic',
    babel: {
      plugins: [
        [

          "@babel/plugin-transform-react-jsx",//js中写jsx  转换jsx语法
          {
            runtime: 'automatic',
            importSource: 'react',//自动在顶部引入react，不用每次都写
          }

        ]

      ],
    }
  }),

  svgr({
    //不要忘记安装 @svgr/core  否则解析报错
    include: ['public/**/*.svg', 'src/**/*.svg']//扫描静态文件的路径，这些svg被引用会自动转换为react组件
  })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, "src"),
      "@public": path.resolve(__dirname, "public"),
      "@static": path.resolve(__dirname, "src/static"),
    }
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true, //启用less的js功能
      }
    }
  },

  build: {//打包优化
    chunkSizeWarningLimit: 500, //设置警告阈值，单位是kB
    outDir: `dist/${PROJECT_NAME}`, //输出目录,如果是子项目，直接输出到子目录
    copyPublicDir: true, //是否复制public目录到输出目录
    minify:'esbuild',//使用esbuild不用默认的terser
    rollupOptions: {
      output: {
        manualChunks: (id) => { //手动分包，避免所有包都打在一个里面太大
          if (id.includes('node_modules')) {
            // 如果是node_modules中的文件，则按模块名分割
            // console.log('id',id)
            // const moduleName = id.toString().split('node_modules/')[1].split('/')[0];
            if (id.includes('react')) {
              return 'vendor-react'; // 将react打包到vendor-react目录下
            }
            return `vendor`; // 将第三方库打包到vendor目录下
          } else if (id.includes('src/')) {
            return 'pages'
          }
        },
        entryFileNames: 'static/js/[name]-[hash].js', //入口文件名
        chunkFileNames: 'static/js/chunk/[name]-[hash].js', //分块文件名
        assetFileNames: (assetInfo) => {
          const extType = assetInfo.originalFileNames && assetInfo.originalFileNames.length > 1 
            ? assetInfo.originalFileNames[1] 
            : ''; // 安全获取后缀名
          if (['png', 'jpg', 'jpeg', 'gif', 'svg'].includes(extType)) {
            return `static/img/[name]-[hash].[ext]`; //图片文件名
          } else if (['woff', 'woff2', 'ttf'].includes(extType)) {
            return `static/fonts/[name]-[hash].[ext]`; //字体文件名
          } else if (extType == 'css') { 
            return `static/css/[name]-[hash].[ext]`; //css文件名
          } else {
            return `static/assets/[name]-[hash].[ext]`; //其他媒体文件名
          }
        }

      }
    }
  }
})
