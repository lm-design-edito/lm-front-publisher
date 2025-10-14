import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';

// https://vite.dev/config/
export default defineConfig(({ command }) => {
  return {
    plugins: [
      TanStackRouterVite({ target: 'react', autoCodeSplitting: true }),
      react(),
    ],
    base: command === 'serve' ? '' : '/lm-front-publisher/',
    resolve: {
      alias: {
        '@src': '/src',
        '@api': '/src/api',
        '@utils': '/src/utils',
        '@features': '/src/features',
        '@common': '/src/common',
      },
    },
  };
});
