import b from 'benny';
import deepDiff from 'deep-diff';
import deepObjectDiff from 'deep-object-diff';
import { diffJson } from 'diff';
import microdiff from 'microdiff';
import turboDiff from './esm/index.js';
import { oldSimpleObj, newSimpleObj, oldNestedObj, newNestedObj, oldDeepObj, newDeepObj } from './share/data-simple.js';
import { oldBigObj, newBigObj, oldDeepBigObj, newDeepBigObj } from './share/data-complex.js';

const bmList = [
    { name: 'diff', func: diffJson },
    { name: 'deep-diff', func: deepDiff.diff },
    { name: 'deep-object-diff', func: deepObjectDiff.detailedDiff },
    { name: 'jsdiff', func: diffJson },
    { name: 'microdiff', func: microdiff },
    { name: 'microdiff-without-cyclesFix', func: (oldObj, newObj) => microdiff(oldObj, newObj, { cyclesFix: false }) },
    { name: 'turbo-diff', func: turboDiff }
];

const suiteList = [
    { name: 'Small object', data: [oldSimpleObj, newSimpleObj] },
    { name: 'Nested object', data: [oldNestedObj, newNestedObj] },
    { name: 'Big object', data: [oldBigObj, newBigObj] },
    { name: 'Deep nested object', data: [oldDeepObj, newDeepObj] },
    { name: 'Deep big object with deep: 4 and property count: 10', data: [oldDeepBigObj, newDeepBigObj] },
    {
        name: 'Simple array',
        data: [
            [1, 2, 3, 4],
            [11, 2, 3, 44, 5, 6]
        ]
    },
    {
        name: 'Simple array: short new',
        data: [
            [1, 2, 3, 4, 5, 6],
            [11, 2, 3, 44]
        ]
    }
];

suiteList.forEach(suite => {
    b.suite(
        suite.name,

        ...bmList.map(({ name, func }) =>
            b.add(name, () => {
                func(suite.data[0], suite.data[1]);
            })
        ),

        b.cycle(),
        b.complete(),
        b.save({
            file: suite.name,
            format: 'csv'
        }),
        b.save({
            file: suite.name,
            format: 'chart.html'
        })
    );
});
