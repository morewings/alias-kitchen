import hq from 'alias-hq';

import {kitchen} from './dist/index.js';

console.log('test2', kitchen({recipe: 'rollup'}));
console.log('test3', hq.get('babel'));
// console.log('test5', hq.get('babel'));
