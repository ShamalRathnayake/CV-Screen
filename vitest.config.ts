import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      reporter: ['text', 'html'],
    },
    environment: 'node',
    globals: true,
    exclude: ['node_modules', 'dist', 'build'],
  },
});
