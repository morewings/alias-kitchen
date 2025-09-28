// eslint-disable-next-line @typescript-eslint/no-require-imports
const path = require('path');

// eslint-disable-next-line @typescript-eslint/no-require-imports
const kitchen = require('./../dist/index.cjs').kitchen;

module.exports = {
    entry: './src/main.ts',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
                options: {
                    transpileOnly: true,
                    configFile: 'tsconfig.webpack.json',
                },
            },
        ],
    },
    resolve: {
        extensions: ['.ts'],
        alias: kitchen({recipe: 'webpack'}),
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, './../temp'),
    },
};
