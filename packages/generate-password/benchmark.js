import b from 'benny';
import zGeneratePassword from './esm/index.js';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const passwordGenerator = require('generate-password');

const bmList = [
    {
        name: 'generate-password',
        func: () =>
            passwordGenerator.generate({ length: 15, number: true, strict: true, excludeSimilarCharacters: true })
    },
    {
        name: '@zlib/generate-password without shuffle',
        func: () => zGeneratePassword({ shuffleTimes: 0 })
    },
    {
        name: '@zlib/generate-password',
        func: zGeneratePassword
    }
];

const suiteList = [{ name: 'Basic usage' }];

suiteList.forEach(suite => {
    b.suite(
        suite.name,

        ...bmList.map(({ name, func }) =>
            b.add(name, () => {
                func();
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
