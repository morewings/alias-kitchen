import {resolve} from 'path';

import {defineConfig} from 'vite';

import {kitchen} from './src/lib/kitchen';

// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: kitchen({recipe: 'vite'}),
    },
    build: {
        sourcemap: true,
        lib: {
            entry: resolve(__dirname, 'src/lib/index.ts'),
            name: 'Alias Kitchen',
            fileName: 'index',
            formats: ['es', 'cjs'],
        },
        rollupOptions: {
            external: ['get-tsconfig', 'path', 'node:path'],
        },
    },
});
