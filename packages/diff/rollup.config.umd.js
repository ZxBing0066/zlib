import tsPlugin from '@rollup/plugin-typescript';
import path from 'path';
import terser from '@rollup/plugin-terser';

const cwd = process.cwd();
const resolvePath = _path => path.resolve(cwd, _path);
const name = 'turboDiff';

export default {
    input: resolvePath('./umd.ts'),
    output: [
        {
            file: 'umd/index.js',
            format: 'umd',
            name,
            sourcemap: true
        },
        {
            file: 'umd/index.min.js',
            format: 'umd',
            name,
            plugins: [terser()]
        }
    ].map(output => ({
        ...output,
        file: resolvePath(output.file)
    })),
    plugins: [tsPlugin()]
};
