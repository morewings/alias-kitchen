import {resolve} from 'path';

import type {NormalizedPaths} from './../types.ts';

export const rollup = (normalizedPaths: NormalizedPaths) => {
    const pathArray = normalizedPaths.map(([alias, directory]) => [
        alias,
        resolve(directory),
    ]);

    return Object.fromEntries(pathArray);
};
