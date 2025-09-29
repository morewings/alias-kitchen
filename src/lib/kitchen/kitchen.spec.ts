import {getTsconfig} from 'get-tsconfig';

import {kitchen} from '@/lib/kitchen';
import {Recipes} from '@/lib/kitchen/types.ts';
import {normalizePath} from '@/lib/kitchen/utils.ts';

const paths = {'@/*': ['./src/*']};
const pathsMultiple = {'@/*': ['./src/*', './src/*']};
const normalizedPaths = normalizePath(paths);

jest.mock('get-tsconfig', () => ({
    __esModule: true,
    getTsconfig: jest.fn(),
}));

jest.mock('path', () => ({
    __esModule: true,
    resolve: (directory: string) => `/resolved/${directory}`,
}));

const recipes = Object.values(Recipes);

describe('alias kitchen', () => {
    it.each(recipes)('cooks %s configuration', recipe => {
        (getTsconfig as jest.Mock).mockReturnValueOnce({
            config: {compilerOptions: {paths}},
        });
        expect(kitchen({recipe})).toMatchSnapshot();
    });

    it('runs and passes normalized paths array to custom recipe', () => {
        (getTsconfig as jest.Mock).mockReturnValueOnce({
            config: {compilerOptions: {paths}},
        });
        const customRecipe = jest.fn(() => 'custom');
        expect(kitchen({recipe: customRecipe})).toBe('custom');
        expect(customRecipe).toHaveBeenCalledTimes(1);
        expect(customRecipe).toHaveBeenCalledWith(normalizedPaths);
    });

    it('throws an error when multiple paths are configured for the same alias', () => {
        (getTsconfig as jest.Mock).mockReturnValueOnce({
            config: {compilerOptions: {paths: pathsMultiple}},
        });
        expect(() => {
            kitchen({recipe: 'rollup'});
        }).toThrow();
    });
});
