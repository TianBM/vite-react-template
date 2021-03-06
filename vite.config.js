import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

import babel from "vite-babel-plugin";
import istanbul from 'rollup-plugin-istanbul'
import eslintPlugin from '@nabla/vite-plugin-eslint'
import viteCompression from 'vite-plugin-compression';

/**
 * @type {import('vite').UserConfig}
 */
// https://vitejs.dev/config/
export default defineConfig(({ command, mode })=>({
  server: {
    proxy: {
      "/api": {
        target: "https://law-test.sany.com.cn/api",
        changeOrigin: true,
        rewrite: subpath => subpath.replace(/^\/api/, ''),
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/'),
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
  ],
  build: {
    sourcemap: mode === 'development' ? true : false
  }
}))
