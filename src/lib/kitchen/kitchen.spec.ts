import {kitchen} from '@/lib/kitchen';
import {Recipes} from '@/lib/kitchen/types.ts';
import {normalizePath} from '@/lib/kitchen/utils.ts';

const paths = {'@/*': ['./src/*']};
const normalizedPaths = normalizePath(paths);

jest.mock('get-tsconfig', () => ({
    __esModule: true,
    getTsconfig: () => ({
        config: {
            compilerOptions: {
                paths,
            },
        },
    }),
}));

jest.mock('path', () => ({
    __esModule: true,
    resolve: (directory: string) => `/resolved/${directory}`,
}));

const recipes = Object.values(Recipes);

describe('alias kitchen', () => {
    it.each(recipes)('cooks %s configuration', recipe => {
        expect(kitchen({recipe})).toMatchSnapshot();
    });
    it('runs and passes normalized paths array to custom recipe', () => {
        const customRecipe = jest.fn(() => 'custom');
        expect(kitchen({recipe: customRecipe})).toBe('custom');
        expect(customRecipe).toHaveBeenCalledTimes(1);
        expect(customRecipe).toHaveBeenCalledWith(normalizedPaths);
    });
});
