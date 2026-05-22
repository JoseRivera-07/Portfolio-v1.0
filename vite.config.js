import { defineConfig } from 'vite';

export default defineConfig({
  root: 'frontend',
  server: {
    historyApiFallback: true,
  }
});