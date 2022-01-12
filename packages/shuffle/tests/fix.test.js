import test from 'ava';

import shuffle from '../esm/index.js';
import { fixString, fixStringArray } from './data.js';

test('fix', t => {
    const result = shuffle(fixString, { fix: true });
    console.log(result);
    for (const s of fixStringArray) {
        t.is(result.indexOf(s) >= 0, true, s + result);
    }
});
