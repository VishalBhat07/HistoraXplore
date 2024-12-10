import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react' 

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: '../backend/static', // Build files will go to Flask's static folder
    emptyOutDir: true,
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // Your Flask server address
        changeOrigin: true,
        secure: false,
      }
    }
  }
})


