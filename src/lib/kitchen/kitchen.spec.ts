import {kitchen} from '@/lib/kitchen';
import {Recipes} from '@/lib/kitchen/recipesList.ts';

jest.mock('get-tsconfig', () => ({
    __esModule: true,
    getTsconfig: () => ({
        config: {
            compilerOptions: {
                paths: {'@/*': ['./src/*']},
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
});
