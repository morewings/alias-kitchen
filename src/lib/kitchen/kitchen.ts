import {getTsconfig} from 'get-tsconfig';

import type {RecipeFn} from './types.ts';
import {Recipes} from './types.ts';
import {rollup, jestRecipe, babel, webpack} from './recipes';
import {normalizePath} from './utils.ts';

const recipesMapping = {
    [Recipes.rollup]: rollup,
    [Recipes.webpack]: webpack,
    [Recipes.vite]: rollup,
    [Recipes.jest]: jestRecipe,
    [Recipes.babel]: babel,
    [Recipes.rspack]: webpack,
};

export type Config = {
    /**
     * Choose an alias configuration recipe for your bundler (vite, babel, rollup, etc.) or write your own recipe fn
     * @example
     * // custom recipe example
     * const recipe = (normalizedPaths) => {
     *   const pathArray = normalizedPaths.map(([alias, directory]) => [
     *       alias,
     *       path.resolve(directory),
     *   ]);
     *   return Object.fromEntries(pathArray);
     * };
     */
    recipe: keyof typeof Recipes | RecipeFn;
    /**
     * The file name of the TypeScript config file
     */
    configName?: string;
    /**
     * Path to a file or directory to search up for a tsconfig.json file
     */
    searchPath?: string;
};

export const kitchen = ({recipe, searchPath, configName}: Config) => {
    const normalizedPaths = normalizePath(
        getTsconfig(searchPath, configName)?.config?.compilerOptions?.paths
    );

    return typeof recipe === 'function'
        ? recipe(normalizedPaths)
        : recipesMapping[recipe](normalizedPaths);
};
