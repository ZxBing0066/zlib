import test from 'ava';

import zdiff from '../dist/index.js';

test('diff change', t => {
    t.deepEqual(zdiff({ key: 'content' }, { key: 'content changed' }), [
        { type: 'CHANGE', path: ['key'], old: 'content', new: 'content changed' }
    ]);
});
test('diff add', t => {
    t.deepEqual(zdiff({ key: 'content' }, { key: 'content', newKey: 'content' }), [
        { type: 'ADD', path: ['newKey'], new: 'content' }
    ]);
});
test('diff remove', t => {
    t.deepEqual(zdiff({ key: 'content', keyWillBeRemoved: 'content will be removed' }, { key: 'content' }), [
        { type: 'REMOVE', path: ['keyWillBeRemoved'], old: 'content will be removed' }
    ]);
});

test('simple diff', t => {
    const simpleOldObj = {
        keyWillChange: 'content will change',
        keyWillNotChange: 'content will not change',
        keyWillBeRemoved: 'content will be removed'
    };

    const simpleNewObj = { ...simpleOldObj };
    delete simpleNewObj['keyWillBeRemoved'];
    simpleNewObj.keyWillChange = 'content changed';
    simpleNewObj.newKey = 'new content';

    t.deepEqual(zdiff(simpleOldObj, simpleNewObj), [
        {
            type: 'ADD',
            path: ['newKey'],
            new: 'new content'
        },
        {
            type: 'CHANGE',
            path: ['keyWillChange'],
            old: 'content will change',
            new: 'content changed'
        },
        {
            type: 'REMOVE',
            path: ['keyWillBeRemoved'],
            old: 'content will be removed'
        }
    ]);
});

test('deep diff', t => {
    const deepOldObj = {
        keyWillNotChange: 'content will not change',
        keyWillChange: 'content will be changed',
        keyWillBeRemoved: 'content will be removed'
    };
    const deepNewObj = {
        keyWillNotChange: 'content will not change',
        keyWillChange: 'content changed'
    };

    const result = zdiff(deepOldObj, deepNewObj);

    t.deepEqual(result, [
        {
            type: 'CHANGE',
            path: ['keyWillChange'],
            new: 'content changed',
            old: 'content will be changed'
        },
        {
            type: 'REMOVE',
            path: ['keyWillBeRemoved'],
            old: 'content will be removed'
        }
    ]);
});
