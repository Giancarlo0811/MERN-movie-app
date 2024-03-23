import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    envDir: "../../",
    define: {
      'process.env.API_KEY': JSON.stringify(env.API_KEY),
      'process.env.REACT_APP_BASE_URL': JSON.stringify(env.REACT_APP_BASE_URL)
    },
    plugins: [react()],
  }
})
