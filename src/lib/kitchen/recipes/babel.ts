import type {NormalizedPaths} from './../types.ts';

export const babel = (normalizedPaths: NormalizedPaths) => {
    return Object.fromEntries(normalizedPaths);
};
