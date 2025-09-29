import type {NormalizedPaths} from './../types.ts';
import {removeFirstSegment} from './../utils.ts';

export const jestRecipe = (normalizedPaths: NormalizedPaths) => {
    const pathArray = normalizedPaths
        .map(([alias, directory]) => [alias, removeFirstSegment(directory, '.')])
        .map(([alias, directory]) => [`^${alias}/(.*)$`, `<rootDir>/${directory}/$1`]);

    return Object.fromEntries(pathArray);
};
