module.exports = {
    presets: ["@babel/preset-env"],
    plugins: [
        "@babel/plugin-transform-runtime",
        [
            // Your aliases will be under this module
            "babel-plugin-module-resolver",
            {
                root: ["./"],
                alias: require('src/lib/kitchen/kitchen').kitchen({recipe: 'babel'}),
            },
        ],
    ],
};
