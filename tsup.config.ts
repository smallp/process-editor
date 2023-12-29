import { defineConfig } from 'tsup'

export default defineConfig({
    entry: [
        'back/index.ts',
    ],
    clean: false,
    splitting: true,
    format: ['cjs'],
    external: ['electron'],
    treeshake: true,
    minify: true,
    dts: false,
})