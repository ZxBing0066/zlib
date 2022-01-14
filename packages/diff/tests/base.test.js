import test from 'ava';

import diff from '../esm/index.js';
import { oldSimpleObj, newSimpleObj } from '../share/data-simple.js';

test('diff change', t => {
    t.deepEqual(diff({ key: 'content' }, { key: 'content changed' }), [
        { type: 'CHANGE', path: ['key'], old: 'content', new: 'content changed' }
    ]);
});
test('diff add', t => {
    t.deepEqual(diff({ key: 'content' }, { key: 'content', newKey: 'content' }), [
        { type: 'ADD', path: ['newKey'], new: 'content' }
    ]);
});
test('diff remove', t => {
    t.deepEqual(diff({ key: 'content', remove: 'will be removed' }, { key: 'content' }), [
        { type: 'REMOVE', path: ['remove'], old: 'will be removed' }
    ]);
});
test('simple diff', t => {
    t.deepEqual(diff(oldSimpleObj, newSimpleObj), [
        {
            type: 'ADD',
            path: ['add'],
            new: 'add'
        },
        {
            type: 'CHANGE',
            path: ['change'],
            old: 'will be changed',
            new: 'changed'
        },
        {
            type: 'REMOVE',
            path: ['remove'],
            old: 'will be removed'
        }
    ]);
});
