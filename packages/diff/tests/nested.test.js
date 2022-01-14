import test from 'ava';

import diff from '../esm/index.js';
import { oldNestedObj, newNestedObj, oldDeepObj, newDeepObj } from '../share/data-simple.js';

test('nested diff', t => {
    t.deepEqual(diff(oldNestedObj, newNestedObj), [
        {
            type: 'ADD',
            path: ['key', 'add'],
            new: 'add'
        },
        {
            type: 'CHANGE',
            path: ['key', 'change'],
            old: 'will be changed',
            new: 'changed'
        },
        {
            type: 'REMOVE',
            path: ['key', 'remove'],
            old: 'will be removed'
        }
    ]);
});

test('deep diff', t => {
    t.deepEqual(diff(oldDeepObj, newDeepObj), [
        {
            type: 'ADD',
            path: ['newKey'],
            new: 'new content'
        },
        {
            type: 'ADD',
            path: ['newObjKey'],
            new: {
                key: 'content'
            }
        },
        {
            type: 'CHANGE',
            path: ['change'],
            new: 'content changed',
            old: 'will be changed'
        },
        {
            type: 'REMOVE',
            path: ['remove'],
            old: 'will be removed'
        },
        {
            type: 'REMOVE',
            path: ['objRemove'],
            old: {
                key: 'content'
            }
        },
        {
            path: ['keyA', 'keyB', 'remove'],
            type: 'REMOVE',
            old: {
                key: 'content'
            }
        },
        {
            path: ['keyA', 'keyB', 'keyC', 'newKey'],
            type: 'ADD',
            new: {
                key: 'content'
            }
        },
        {
            path: ['keyA', 'keyB', 'keyC', 'change'],
            type: 'CHANGE',
            new: 'content changed',
            old: 'will be changed'
        }
    ]);
});
