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
    recipe: keyof typeof Recipes;
};

export const kitchen = ({recipe}: Config) => {
    const initialPaths: InitialPaths = getTsconfig()?.config?.compilerOptions?.paths;
    return recipesMapping[recipe](initialPaths);
};
