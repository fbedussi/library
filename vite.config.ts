import { defineConfig } from 'vitest/config';

import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react({})],
  server: {
    host: 'localhost',
    port: 3000,
  },
  build: {
    outDir: 'build',
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.ts'],
    css: {
      modules: {
        classNameStrategy: 'non-scoped',
      },
    },
    environmentOptions: {
      jsdom: {
        url: 'http://localhost',
      },
    },
    server: {
      deps: {
        inline: ['@mui/material'],
      },
    },
  },
});
