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
test('exception diff', t => {
    t.deepEqual(diff(null, null), []);
    t.deepEqual(diff(null, undefined), []);
    t.deepEqual(diff(undefined, undefined), []);
    t.deepEqual(diff(undefined, null), []);
    t.deepEqual(diff({ a: null }, { b: undefined }), [
        {
            new: undefined,
            path: ['b'],
            type: 'ADD'
        },
        {
            old: null,
            path: ['a'],
            type: 'REMOVE'
        }
    ]);
    t.deepEqual(diff({ a: null }, { b: null }), [
        {
            new: null,
            path: ['b'],
            type: 'ADD'
        },
        {
            old: null,
            path: ['a'],
            type: 'REMOVE'
        }
    ]);
    t.deepEqual(diff({ a: null }, { a: null }), []);
    t.deepEqual(diff({ a: undefined }, { a: null }), [{ new: null, old: undefined, path: ['a'], type: 'CHANGE' }]);
    t.deepEqual(diff({ a: null }, null), [{ type: 'REMOVE', path: ['a'], old: null }]);
    t.deepEqual(diff([], null), []);
    t.deepEqual(diff([], undefined), []);
    t.deepEqual(diff(null, []), []);
    t.deepEqual(diff(undefined, []), []);
});
test('edge case', t => {
    t.deepEqual(diff({ a: {} }, { a: [] }), [
        {
            new: [],
            old: {},
            path: ['a'],
            type: 'CHANGE'
        }
    ]);
    t.deepEqual(diff({ a: [] }, { a: {} }), [
        {
            new: {},
            old: [],
            path: ['a'],
            type: 'CHANGE'
        }
    ]);
});
