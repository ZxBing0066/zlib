import b from 'benny';
import zShuffle from './esm/index.js';
import _ from 'lodash';
import arrayShuffle from 'array-shuffle';
import shuffleArray from 'shuffle-array';
import { array, string } from './tests/data.js';

const bmList = [
    {
        name: 'lodash/shuffle',
        func: _.shuffle
    },
    {
        name: 'array-shuffle',
        func: arrayShuffle
    },
    {
        name: 'shuffle-array',
        func: target => shuffleArray(target, { copy: true })
    },
    {
        name: '@zlib/shuffle',
        func: zShuffle
    },
    {
        name: '@zlib/shuffle pure=false',
        func: target => zShuffle(target, { pure: false })
    },
    {
        name: '@zlib/shuffle fix',
        func: target => zShuffle(target, { fix: true })
    }
];

const suiteList = [
    { name: 'Array shuffle', data: array, ignoreBm: ['@zlib/shuffle fix'] },
    { name: 'String shuffle', data: string, ignoreBm: ['array-shuffle', 'shuffle-array', '@zlib/shuffle pure=false'] }
];

suiteList.forEach(suite => {
    b.suite(
        suite.name,

        ...bmList
            .filter(bm => {
                return !suite.ignoreBm || suite.ignoreBm.indexOf(bm.name) === -1;
            })
            .map(({ name, func }) =>
                b.add(name, () => {
                    func(suite.data);
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
