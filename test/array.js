// @ts-check
const HV = /** @type {import('..')} */(
    /** @type {unknown} */(require('../dist/3h-validate.umd.js'))
);

/**
 * @type {import('3h-test').TestCases}
 */
exports.arrayTests = {

    array_default(ctx) {
        const validator = HV.types.array();
        ctx.assert(validator.test(['foo']));
        ctx.assert(validator.test([]));
        ctx.expectThrow(
            TypeError,
            validator.validate,
            [2002],
            validator,
            (error) => {
                ctx.assertStrictEqual(
                    /** @type {TypeError} */(error).message,
                    'expect an array',
                );
            },
        );
    },

    array_pattern_single(ctx) {
        const pattern = HV.types.number();
        const validator = HV.types.array({ pattern });
        ctx.assert(validator.test([]));
        ctx.assert(validator.test([0]));
        ctx.assert(validator.test([0, 1]));
        ctx.expectThrow(
            TypeError,
            validator.validate,
            [['bad']],
            validator,
            (error) => {
                ctx.assertStrictEqual(
                    /** @type {TypeError} */(error).message,
                    'expect a number',
                );
            },
        );
    },

    array_pattern_multiple(ctx) {
        const pattern = [
            HV.types.number(),
            HV.types.string(),
        ];
        const validator = HV.types.array({ pattern });
        ctx.assert(validator.test([0, '1']));
        ctx.expectThrow(
            TypeError,
            validator.validate,
            [['foo', 'bar']],
            validator,
            (error) => {
                ctx.assertStrictEqual(
                    /** @type {TypeError} */(error).message,
                    'expect a number',
                );
            },
        );
        ctx.expectThrow(
            TypeError,
            validator.validate,
            [[0, 1]],
            validator,
            (error) => {
                ctx.assertStrictEqual(
                    /** @type {TypeError} */(error).message,
                    'expect a string',
                );
            },
        );
        ctx.expectThrow(
            RangeError,
            validator.validate,
            [[0]],
            validator,
            (error) => {
                ctx.assertStrictEqual(
                    /** @type {RangeError} */(error).message,
                    'the length of the array does not match the pattern',
                );
            },
        );
        ctx.expectThrow(
            RangeError,
            validator.validate,
            [[0, '1', true]],
            validator,
            (error) => {
                ctx.assertStrictEqual(
                    /** @type {RangeError} */(error).message,
                    'the length of the array does not match the pattern',
                );
            },
        );
    },

    array_minLength(ctx) {
        const validator = HV.types.array({ minLength: 1 });
        ctx.assert(validator.test([1]));
        ctx.assert(validator.test([1, 2]));
        ctx.expectThrow(
            RangeError,
            validator.validate,
            [[]],
            validator,
            (error) => {
                ctx.assertStrictEqual(
                    /** @type {RangeError} */(error).message,
                    'the array is too short',
                );
            },
        );
    },

    array_maxLength(ctx) {
        const validator = HV.types.array({ maxLength: 1 });
        ctx.assert(validator.test([]));
        ctx.assert(validator.test([1]));
        ctx.expectThrow(
            RangeError,
            validator.validate,
            [[1, 2]],
            validator,
            (error) => {
                ctx.assertStrictEqual(
                    /** @type {RangeError} */(error).message,
                    'the array is too long',
                );
            },
        );
    },

    array_includeMin(ctx) {
        const validator = HV.types.array({ includeMin: false });
        ctx.assert(validator.test([1]));
        ctx.assert(validator.test([1, 2]));
        ctx.expectThrow(
            RangeError,
            validator.validate,
            [[]],
            validator,
            (error) => {
                ctx.assertStrictEqual(
                    /** @type {RangeError} */(error).message,
                    'the array is too short',
                );
            },
        );
    },

    array_includeMax(ctx) {
        const validator = HV.types.array({ maxLength: 2, includeMax: false });
        ctx.assert(validator.test([]));
        ctx.assert(validator.test([1]));
        ctx.expectThrow(
            RangeError,
            validator.validate,
            [[1, 2]],
            validator,
            (error) => {
                ctx.assertStrictEqual(
                    /** @type {RangeError} */(error).message,
                    'the array is too long',
                );
            },
        );
    },

};
