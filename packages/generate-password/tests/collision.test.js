import test from 'ava';

import generatePassword from '../esm/index.js';

test('collision for 1000000 times', t => {
    t.timeout(1000000, 'xxxxx');
    const map = {};
    for (let i = 0; i < 1000000; i++) {
        const password = generatePassword();
        if (password in map) {
            t.fail('crash');
        } else {
            map[password] = 1;
        }
    }
    t.is(Object.keys(map).length, 1000000);
    t.pass();
});
