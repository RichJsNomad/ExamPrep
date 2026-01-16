/// <reference types="vitest" />
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: [
        'src/components/lesson/VideoPlayer.tsx',
        'src/components/lesson/InteractiveOverlay.tsx',
        'src/hooks/useVideoProgress.ts',
        'src/constants/testVideos.ts',
      ],
    },
  },
})
