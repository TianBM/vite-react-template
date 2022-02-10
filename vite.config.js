import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import babel from "vite-babel-plugin";
import istanbul from 'rollup-plugin-istanbul'
import eslintPlugin from '@nabla/vite-plugin-eslint'


// https://vitejs.dev/config/
export default defineConfig(({ mode })=>({
  plugins: [
    react(),
    eslintPlugin(),
    babel(),
		mode === 'test' &&
			istanbul({
				include: ['src/**/*.{ts,tsx}']
			})
  ]
}))
