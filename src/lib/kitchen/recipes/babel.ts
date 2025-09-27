import type {InitialPaths} from './../types.ts';
import {normalizePath} from './../utils.ts';

export const babel = (initialPaths: InitialPaths) => {
    const pathArray = normalizePath(initialPaths);

    return Object.fromEntries(pathArray);
};
