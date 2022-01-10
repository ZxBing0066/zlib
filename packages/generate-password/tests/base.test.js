import test from 'ava';

import generatePassword from '../esm/index.js';
import { checkDefault } from './check.js';

test('basic check for 100 times', t => {
    for (let i = 0; i < 100; i++) {
        const password = generatePassword();
        t.is(checkDefault(password), true, password);
    }
    t.pass();
});

test('collision for 100000 times', t => {
    const map = {};
    for (let i = 0; i < 100000; i++) {
        const password = generatePassword();
        if (password in map) {
            t.fail('crash');
        } else {
            map[password] = 1;
        }
    }
    t.is(Object.keys(map).length, 100000);
    t.pass();
});
