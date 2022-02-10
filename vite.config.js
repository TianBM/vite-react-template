import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import babel from "vite-babel-plugin";
import istanbul from 'rollup-plugin-istanbul'
import eslintPlugin from '@nabla/vite-plugin-eslint'
import viteCompression from 'vite-plugin-compression';


// https://vitejs.dev/config/
export default defineConfig(({ mode })=>({
  server: {
    proxy: {
      "/api": {
        target: "https://law-test.sany.com.cn/api",
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, ''),
      }
    }
  },
  plugins: [
    react(),
    eslintPlugin(),
    babel(),
		mode === 'test' &&
			istanbul({
				include: ['src/**/*.{js,jsx,ts,tsx}']
			}),
    viteCompression()
  ]
}))
