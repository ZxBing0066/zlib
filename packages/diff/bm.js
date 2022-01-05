import microdiff from 'microdiff';
import b from 'benny';
import zdiff from './dist/index.js';

const smallObjectArr = [
    {
        name: 'Testing',
        propertyTwo: 'Still testing...'
    },
    {
        name: 'TestingChanged',
        propertyThree: 'Still testing...'
    }
];

b.suite(
    'Small object (baseline)',

    b.add('with microdiff', () => {
        microdiff(smallObjectArr[0], smallObjectArr[1]);
    }),

    b.add('with zdiff', () => {
        zdiff(smallObjectArr[0], smallObjectArr[1]);
    }),

    b.cycle(),
    b.complete(),
    b.save({ file: 'small-diff', details: true, format: 'chart.html' })
);
