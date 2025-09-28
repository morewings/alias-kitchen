import path from 'path';

import {defineConfig} from '@rspack/cli';

import {kitchen} from './../dist/index.js';

const targets = ['last 2 versions', '> 0.2%', 'not dead', 'Firefox ESR'];

export default defineConfig({
    entry: {
        main: './src/main.ts',
    },
    resolve: {
        extensions: ['...', '.ts'],
        alias: kitchen({recipe: 'rspack'}),
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [
                    {
                        loader: 'builtin:swc-loader',
                        options: {
                            jsc: {
                                parser: {
                                    syntax: 'typescript',
                                },
                            },
                            env: {targets},
                        },
                    },
                ],
            },
        ],
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve('./../temp'),
    },
});
