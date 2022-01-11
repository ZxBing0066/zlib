import test from 'ava';

import generatePassword from '../esm/index.js';
import { checkDefault } from './check.js';

test('basic check for 100 times', t => {
    for (let i = 0; i < 100; i++) {
        const password = generatePassword();
        t.is(checkDefault(password), true, password);
        console.log(password);
    }
    t.pass();
});

test('basic check for 100 times without shuffle', t => {
    for (let i = 0; i < 100; i++) {
        const password = generatePassword({ shuffleTimes: 0 });
        t.is(checkDefault(password), true, password);
        console.log(password);
    }
    t.pass();
});
