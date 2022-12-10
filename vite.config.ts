import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'
import { createHtmlPlugin } from 'vite-plugin-html'
import { VitePWA, VitePWAOptions } from 'vite-plugin-pwa'
import analyze from 'rollup-plugin-analyzer'
import os from 'os'


const build1 = Math.floor(Date.now()/10000).toString(36).toUpperCase()
const hostname = os.hostname().substring(0,4).toUpperCase()
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@src": path.resolve(__dirname,'src'),
      "@components": path.resolve(__dirname,'src/components'),
      "@services": path.resolve(__dirname,'src/services'),
      "@apiservices": path.resolve(__dirname,'src/services'),
      "@helpers": path.resolve(__dirname,'src/helpers'),
      "@core": path.resolve(__dirname,'src/helpers'),
      "@shared": path.resolve(__dirname,'src/shared'),
      "@libs": path.resolve(__dirname,'src/libs'),
      "@pages": path.resolve(__dirname,'src/pages'),
      "@styles": path.resolve(__dirname,'src/assets/styles'),
      "@functions": path.resolve(__dirname,'src/functions'),
      "@mantenedores": path.resolve(__dirname,'src/mantenedores'),
    }
  },
})
