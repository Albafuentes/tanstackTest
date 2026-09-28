import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'

export default defineConfig({
    plugins: [react(), tsconfigPaths()],
    test: {
        environment: 'jsdom',
        globals: true,
        include: ['**/*.test.tsx', '**/*.test.ts'],
        setupFiles: ['./src/test/vitest.setup.tsx'],
    },
})