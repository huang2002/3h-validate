import babel from "@rollup/plugin-babel";

const input = './js/index.js';
const external = ['3h-utils'];

export default [
    {
        input,
        external,
        plugins: [
            babel({
                babelHelpers: 'bundled',
                presets: [
                    ['@babel/preset-env', {
                        loose: true,
                    }],
                ],
            }),
        ],
        output: {
            format: 'umd',
            name: 'HV',
            file: './dist/3h-validate.umd.js',
            globals: {
                '3h-utils': 'HUtils',
            },
        },
    },
    {
        input,
        external,
        output: {
            format: 'esm',
            file: './dist/3h-validate.js',
        },
    },
];
