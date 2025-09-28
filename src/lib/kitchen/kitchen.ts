import {getTsconfig} from 'get-tsconfig';

import type {InitialPaths} from './types.ts';
import {Recipes} from './recipesList.ts';
import {rollup} from './recipes/rollup.ts';
import {jestRecipe} from './recipes/jest.ts';
import {babel} from './recipes/babel.ts';
import {webpack} from './recipes/webpack.ts';

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
     * Choose an alias config shape compatible with your bundler
     */
    recipe: keyof typeof Recipes;
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
    const initialPaths: InitialPaths = getTsconfig(searchPath, configName)?.config
        ?.compilerOptions?.paths;
    return recipesMapping[recipe](initialPaths);
};
