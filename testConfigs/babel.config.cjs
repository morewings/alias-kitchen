const kitchen = require('./../dist/index.cjs').kitchen;

module.exports = {
    presets: ["@babel/preset-env", "@babel/preset-typescript"],
    plugins: [
        "@babel/plugin-transform-runtime",
        [
            // Your aliases will be under this module
            "babel-plugin-module-resolver",
            {
                root: ["./src"],
                alias: kitchen({recipe: 'babel'}),
            },
        ],
    ],
};
