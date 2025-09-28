[![types included](https://img.shields.io/github/package-json/types/morewings/alias-kitchen)](https://github.com/morewings/alias-kitchen)
[![npm version](https://badge.fury.io/js/alias-kitchen.svg)](https://www.npmjs.com/package/alias-kitchen)
[![npm downloads](https://img.shields.io/npm/dm/alias-kitchen)](https://www.npmcharts.com/compare/alias-kitchen?interval=7)
[![npm bundle size](https://deno.bundlejs.com/badge?q=alias-kitchen@latest&config={"esbuild":{"external":["react","react-dom"]}})](https://bundlejs.com/?bundle&q=koval-ui@latest&config={"analysis":"treemap","esbuild":{"external":["react","react-dom"]}})

# Alias Kitchen

[![Alias Kitchen logo](./design/logo.jpg)](#)

Alias Kitchen provides developers an ability to have a single source of truth regarding project import aliases.

## The problem

Are you tired of writing `import {Foo} from './../../../../../bar/bazz/Foo` and then changing it every time you move a file?
Do you wish you had a single, reliable source of truth for your project's internal links,
seamlessly integrated across all your favorite bundlers?

## The solution

**Alias Kitchen is here to help!**

Set paths property inside your `tsconfig.json` or `jsoncofing.json`.

```json
{
    "compilerOptions": {
        "paths": {
            "@/components/*": ["./src/components/*"],
            "@/features/*": ["./src/features/*"]
        }
    }
}
```

And then apply the same configuration to your bundlers using **alias-kitchen**. Vite, Rollup, Webpack, RsPack, Jest and so on.

## Installation

```shell
npm i -D alias-kitchen
```


## Usage with bundlers

**alias-kitchen** provides a utility function `kitchen` which allows a developer to choose which recipe of alias config they are going to use.

```js
import {kitchen} from 'alias-kitchen';

const aliasConfig = kitchen({recipe: 'rollup'});
```

Alias names and paths are picked from `compilerOptions.paths` property of TypeScript config file (`tsconfig.json`).
You can set a custom file name and path to look up.

```js
import {kitchen} from 'alias-kitchen';

const aliasConfig = kitchen({
    configName: 'jsconfig.json',
    searchPath: '/your/project/path'
});
```

### Rollup

With [@rollup/plugin-alias](https://www.npmjs.com/package/@rollup/plugin-alias).

```js
// rollup.config.js
import alias from '@rollup/plugin-alias';
import {kitchen} from 'alias-kitchen';

export default {
    //...
    plugins: [
        alias({
            entries: kitchen({recipe: 'rollup'}),
        }),
    ],
};
```

### Vite

```js
// vite.config.ts
import {defineConfig} from 'vite';
import {kitchen} from 'alias-kitchen';

export default defineConfig({
    //...
    resolve: {
        alias: kitchen({recipe: 'vite'}),
    }
})
```

### Babel

With [babel-plugin-module-resolver](https://github.com/tleunen/babel-plugin-module-resolver).

```js
// babel.config.js
const kitchen = require('alias-kitchen');

module.exports = {
    //...
    plugins: [
        [
            'babel-plugin-module-resolver',
            {
                alias: kitchen({recipe: 'babel'}),
            },
        ],
    ],
};
```

### Webpack

```js
// webpack.config.js
const kitchen = require('alias-kitchen');

module.exports = {
    //...
    resolve: {
        alias: kitchen({recipe: 'webpack'}),
    },
};

```

### Rspack

```js
// rspack.config.ts
import {defineConfig} from '@rspack/cli';
import {kitchen} from 'alias-kitchen';

export default defineConfig({
    //...
    resolve: {
        alias: kitchen({recipe: 'rspack'}),
    },
});
```

### Jest

```js
// jest.config.ts
import {kitchen} from 'alias-kitchen';

export default {
    //...
    moduleNameMapper: {
        //...
        ...kitchen({recipe: 'jest'}),
    },
};
```
