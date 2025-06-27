/// <reference types="node" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import tailwindcss from '@tailwindcss/vite';
export default defineConfig({
    plugins: [react(), tailwindcss()],
    resolve: {
        alias: {
            '@components': path.resolve(__dirname, 'src/components'),
            '@pages': path.resolve(__dirname, 'src/pages'),
            '@api': path.resolve(__dirname, 'src/api'),
            '@hooks': path.resolve(__dirname, 'src/hooks'),
            '@types': path.resolve(__dirname, 'src/types'),
            '@constants': path.resolve(__dirname, 'src/constants'),
        }
    },
    server: {
        proxy: {
            '/api': {
                target: 'http://localhost:5500',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ''),
            }
        }
    }
});
