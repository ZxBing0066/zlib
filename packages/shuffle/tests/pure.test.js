import test from 'ava';

import shuffle from '../esm/index.js';
import { array } from './data.js';

test('default pure', t => {
    const arrayS = array.join('');
    const result = shuffle(array);
    t.not(result.join(''), array.join(''));
    t.is(arrayS, array.join(''));
});

test('pure=false', t => {
    const _array = [...array];
    const arrayS = _array.join('');
    const result = shuffle(_array, { pure: false });
    t.is(result.join(''), _array.join(''));
    t.not(arrayS, _array.join(''));
});
