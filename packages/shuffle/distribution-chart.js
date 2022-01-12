import shuffle from './esm/index.js';

import { array } from './tests/data.js';
array.length = 20;
const l = array.length;
const indexMap = {};
for (const key of array) {
    indexMap[key] = new Array(l).fill(0);
}

let c = 10000;
while (c--) {
    const result = shuffle(array);
    for (let i = 0; i < result.length; i++) {
        const key = result[i];
        indexMap[key][i]++;
    }
}

console.log(JSON.stringify(indexMap));
