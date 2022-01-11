import test from 'ava';

import generatePassword from '../esm/index.js';

test('run readAbility shuffle for coverage', t => {
    for (let i = 0; i < 10; i++) {
        generatePassword({
            length: 5,
            lowerCaseChars: '',
            upperCaseChars: '',
            digits: '',
            symbols: '_-'
        });
    }
    t.pass();
});
