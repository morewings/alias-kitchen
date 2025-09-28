import alias from '@rollup/plugin-alias';
import typescript from '@rollup/plugin-typescript';

import {kitchen} from './../dist/index.js';

export default {
    input: 'src/main.ts',
    output: {
        format: 'cjs',
        dir: 'temp',
    },
    plugins: [
        typescript(),
        alias({
            entries: kitchen({recipe: 'rollup'}),
        }),
    ],
};
