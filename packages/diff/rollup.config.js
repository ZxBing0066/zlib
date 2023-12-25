import tsPlugin from '@rollup/plugin-typescript';
import path from 'path';

const cwd = process.cwd();
const resolvePath = _path => path.resolve(cwd, _path);

export default {
    input: { index: resolvePath('./index.ts'), 'formatter/jsonPatch': resolvePath('./formatter/jsonPatch.ts') },
    output: [
        {
            entryFileNames: '[name].cjs',
            dir: 'cjs',
            format: 'cjs',
            exports: 'default'
            // sourcemap: true
        },
        {
            entryFileNames: '[name].js',
            dir: 'esm',
            format: 'es'
            // sourcemap: true
        }
    ],
    plugins: [
        tsPlugin({
            compilerOptions: {
                declaration: false,
                declarationDir: null
            }
        })
    ]
};
