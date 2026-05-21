import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwind from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
    plugins: [
        react(),
        tailwind(),
    ],
    resolve: {
        alias: {
        '@': path.resolve(__dirname, 'src')
        }
    },
    server: {
        // port: 3000,
        proxy: {
            '/api': 'http://localhost:5000', // Remplacez 3000 par le port de votre API
        },
    }
})
