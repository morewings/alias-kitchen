import {resolve} from 'path';

import type {InitialPaths} from './../types.ts';
import {normalizePath} from './../utils.ts';

export const webpack = (initialPaths: InitialPaths) => {
    const pathArray = normalizePath(initialPaths).map(([alias, directory]) => [
        alias,
        resolve(directory),
    ]);

    return Object.fromEntries(pathArray);
};
