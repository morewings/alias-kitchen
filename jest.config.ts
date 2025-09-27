import {kitchen} from './src/lib/kitchen/kitchen.ts';

export default {
    preset: 'ts-jest',
    testEnvironment: 'node',
    transform: {
        '^.+\\.ts?$': 'ts-jest',
    },
    moduleNameMapper: {
        ...kitchen({recipe: 'jest'}),
        '\\.(gif|ttf|eot|svg|png|jpg)$': 'identity-obj-proxy',
        '\\.css$': 'identity-obj-proxy',
    },
};
