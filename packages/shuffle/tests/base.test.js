import test from 'ava';

import shuffle from '../esm/index.js';
import { string } from './data.js';

test('basic shuffle array 100 times', t => {
    const target = new Array(100).fill(null).map((v, i) => i);
    for (let i = 0; i < 100; i++) {
        const result = shuffle([...target]);
        t.notDeepEqual(target, result);
    }
    t.pass();
});

test('basic check string 100 times', t => {
    console.log(string);
    for (let i = 0; i < 100; i++) {
        const result = shuffle(string);
        t.notDeepEqual(string, result);
    }
    t.pass();
});
