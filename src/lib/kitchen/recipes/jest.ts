import type {InitialPaths} from './../types.ts';
import {removeFirstSegment, normalizePath} from './../utils.ts';

export const jestRecipe = (initialPaths: InitialPaths) => {
    const pathArray = normalizePath(initialPaths)
        .map(([alias, directory]) => [alias, removeFirstSegment(directory, '.')])
        .map(([alias, directory]) => [`^${alias}/(.*)$`, `<rootDir>/${directory}/$1`]);

    return Object.fromEntries(pathArray);
};
