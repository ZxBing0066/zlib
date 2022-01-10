import tsPlugin from '@rollup/plugin-typescript';

export default {
    input: './index.ts',
    output: [
        {
            file: 'cjs/index.cjs',
            format: 'cjs',
            exports: 'default',
            sourcemap: true
        },
        {
            file: 'esm/index.js',
            format: 'es',
            sourcemap: true
        },
        {
            file: 'umd/index.js',
            format: 'umd',
            name: 'zdiff',
            sourcemap: true
        }
    ],
    plugins: [tsPlugin()]
};
