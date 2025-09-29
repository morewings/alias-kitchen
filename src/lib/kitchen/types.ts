export type InitialPaths = Record<string, string[]> | undefined;
export type NormalizedPaths = string[][];
export type RecipeFn = (paths: NormalizedPaths) => unknown;
export enum Recipes {
    rollup = 'rollup',
    webpack = 'webpack',
    vite = 'vite',
    jest = 'jest',
    babel = 'babel',
    rspack = 'rspack',
}
