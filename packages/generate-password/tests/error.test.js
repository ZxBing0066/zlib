import test from 'ava';

import generatePassword from '../esm/index.js';

test('wrong passwordLength', t => {
    try {
        generatePassword({ length: 4 });
        t.fail();
    } catch (error) {
        t.is(error.message, 'Invalid passwordLength: 4');
    }
    try {
        generatePassword({ length: 100 });
        t.fail();
    } catch (error) {
        t.is(error.message, 'Invalid passwordLength: 100');
    }
    try {
        generatePassword({ length: [16, 14] });
        t.fail();
    } catch (error) {
        t.is(error.message, 'Invalid passwordLength: [16,14]');
    }
    try {
        generatePassword({ length: [4, 14] });
        t.fail();
    } catch (error) {
        t.is(error.message, 'Invalid passwordLength: [4,14]');
    }
    try {
        generatePassword({ length: [10, 100] });
        t.fail();
    } catch (error) {
        t.is(error.message, 'Invalid passwordLength: [10,100]');
    }
});

test('empty collection', t => {
    try {
        generatePassword({ symbols: false, digits: false, lowerCaseChars: '', upperCaseChars: '' });
        t.fail();
    } catch (error) {
        t.is(error.message, `Invalid options without any char for generate password`);
    }
});
