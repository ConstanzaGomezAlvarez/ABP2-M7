import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    include: ['tests/unit/**/*.spec.{js,mjs,cjs,ts,jsx,tsx}'],
    setupFiles: []
  }
})
