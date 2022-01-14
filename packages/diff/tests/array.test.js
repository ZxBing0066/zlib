import test from 'ava';

import diff from '../esm/index.js';

test('array add', t => {
    t.deepEqual(diff([1, 2, 3, 4], [1, 2, 3, 4, 5, 6]), [
        { type: 'ADD', path: [4], new: 5 },
        { type: 'ADD', path: [5], new: 6 }
    ]);
});

test('array remove', t => {
    t.deepEqual(diff([1, 2, 3, 4, 5, 6], [1, 2, 3, 4]), [
        { type: 'REMOVE', path: [4], old: 5 },
        { type: 'REMOVE', path: [5], old: 6 }
    ]);
});

test('array change', t => {
    t.deepEqual(diff([1, 2, 3, 4], [12, 2, 33, 4]), [
        { type: 'CHANGE', path: [0], old: 1, new: 12 },
        { type: 'CHANGE', path: [2], old: 3, new: 33 }
    ]);
});

test('array simple diff', t => {
    t.deepEqual(diff([1, 2, 3, 4], [1, 22, 3, 44, 5, 6]), [
        { type: 'ADD', path: [4], new: 5 },
        { type: 'ADD', path: [5], new: 6 },
        { type: 'CHANGE', path: [1], old: 2, new: 22 },
        { type: 'CHANGE', path: [3], old: 4, new: 44 }
    ]);
});
