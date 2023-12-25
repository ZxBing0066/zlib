import test from 'ava';

import diff from '../esm/index.js';
import { oldSimpleObj, newSimpleObj } from '../share/data-simple.js';
import jsonPatchFormatter from '../esm/formatter/jsonPatch.js';

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

    t.deepEqual(jsonPatchFormatter(diff(oldSimpleObj, newSimpleObj)), [
        { op: 'add', path: '/add', value: 'add' },
        { op: 'replace', path: '/change', value: 'changed', oldValue: 'will be changed' },
        { op: 'remove', path: '/remove', oldValue: 'will be removed' }
    ]);
});
