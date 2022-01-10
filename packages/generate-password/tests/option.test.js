import test from 'ava';

import generatePassword from '../esm/index.js';
import { checkDefault, createCharCheck, multipleCheck } from './check.js';

test('option.length', t => {
    const passwords = new Array(10).fill(null).map(() =>
        generatePassword({
            length: [10, 30]
        })
    );
    t.is(passwords.length, 10);
    passwords.forEach(password => {
        if (password.length < 10 || password.length > 30) {
            t.fail(`password length wrong: ${password}`);
        }
    });
    t.pass();

    const password = generatePassword({ length: 40 });
    t.is(password.length, 40);
});

test('range length check', t => {
    const rangeLengthPassword = generatePassword({
        length: [10, 30]
    });
    let remainingTimes = 20;
    let lengthChanged = false;
    do {
        const newPassword = generatePassword({
            length: [10, 30]
        });
        if (newPassword.length !== rangeLengthPassword.length) lengthChanged = true;
    } while (!lengthChanged && remainingTimes--);
    if (!lengthChanged) t.fail(`fail with same length for range: ${rangeLengthPassword.length}`);

    t.pass();
});

test('option.symbol', t => {
    multipleCheck(
        password => {
            t.is(/^[abcdefghijkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789]{16}$/.test(password), true, password);
        },
        {
            symbols: false
        }
    );

    const customPassword = generatePassword({
        symbols: '@#$'
    });
    t.is(/^[abcdefghijkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789@#$]{16}$/.test(customPassword), true);
    t.is(createCharCheck('@#$')(customPassword), true, customPassword);
});

test('option.customChars', t => {
    const customPassword = generatePassword({
        customChars: '我是中国人'
    });
    t.is(/^[abcdefghijkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789\-_.:!我是中国人]{16}$/.test(customPassword), true);
    t.is(createCharCheck('我是中国人')(customPassword), true, customPassword);
});

test('option.shuffleTimes', t => {
    const password = generatePassword({
        shuffleTimes: 10
    });
    t.is(checkDefault(password), true);
});
