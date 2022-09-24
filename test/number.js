// @ts-check
const HV = /** @type {import('..')} */(
    /** @type {unknown} */(require('../dist/3h-validate.umd.js'))
);

/**
 * @type {import('3h-test').TestCases}
 */
exports.numberTests = {

    number_default(ctx) {
        const validator = HV.types.number();
        ctx.assert(validator.test(0));
        ctx.assert(validator.test(1));
        ctx.assert(validator.test(3.14));
        ctx.assert(validator.test(-Infinity));
        ctx.assert(validator.test(Infinity));
        ctx.assert(validator.test(NaN));
        ctx.expectThrow(
            TypeError,
            validator.validate,
            ['0'],
            validator,
            (error) => {
                ctx.assertStrictEqual(
                    /** @type {TypeError} */(error).message,
                    'expect a number',
                );
            },
        );
    },

    number_acceptNaN(ctx) {
        const validator = HV.types.number({ acceptNaN: false });
        ctx.assert(validator.test(2));
        ctx.assert(validator.test(3.14));
        ctx.assert(validator.test(Infinity));
        ctx.expectThrow(
            RangeError,
            validator.validate,
            [NaN],
            validator,
            (error) => {
                ctx.assertStrictEqual(
                    /** @type {RangeError} */(error).message,
                    'NaN is not acceptable',
                );
            },
        );
    },

    number_integersOnly(ctx) {
        const validator = HV.types.number({ integersOnly: true });
        ctx.assert(validator.test(2));
        ctx.expectThrow(
            RangeError,
            validator.validate,
            [3.14],
            validator,
            (error) => {
                ctx.assertStrictEqual(
                    /** @type {RangeError} */(error).message,
                    'accept only integers',
                );
            },
        );
        ctx.expectThrow(
            RangeError,
            validator.validate,
            [Infinity],
            validator,
            (error) => {
                ctx.assertStrictEqual(
                    /** @type {RangeError} */(error).message,
                    'accept only integers',
                );
            },
        );
        ctx.expectThrow(
            RangeError,
            validator.validate,
            [NaN],
            validator,
            (error) => {
                ctx.assertStrictEqual(
                    /** @type {RangeError} */(error).message,
                    'accept only integers',
                );
            },
        );
    },

    number_min(ctx) {
        const validator = HV.types.number({ min: 0 });
        ctx.assert(validator.test(0));
        ctx.assert(validator.test(2));
        ctx.assert(validator.test(3.14));
        ctx.assert(validator.test(Infinity));
        ctx.assert(validator.test(NaN));
        ctx.expectThrow(
            RangeError,
            validator.validate,
            [-1],
            validator,
            (error) => {
                ctx.assertStrictEqual(
                    /** @type {RangeError} */(error).message,
                    'the number is too small',
                );
            },
        );
        ctx.expectThrow(
            RangeError,
            validator.validate,
            [-Infinity],
            validator,
            (error) => {
                ctx.assertStrictEqual(
                    /** @type {RangeError} */(error).message,
                    'the number is too small',
                );
            },
        );
    },

    number_max(ctx) {
        const validator = HV.types.number({ max: 0 });
        ctx.assert(validator.test(0));
        ctx.assert(validator.test(-2));
        ctx.assert(validator.test(-3.14));
        ctx.assert(validator.test(-Infinity));
        ctx.assert(validator.test(NaN));
        ctx.expectThrow(
            RangeError,
            validator.validate,
            [1],
            validator,
            (error) => {
                ctx.assertStrictEqual(
                    /** @type {RangeError} */(error).message,
                    'the number is too big',
                );
            },
        );
        ctx.expectThrow(
            RangeError,
            validator.validate,
            [Infinity],
            validator,
            (error) => {
                ctx.assertStrictEqual(
                    /** @type {RangeError} */(error).message,
                    'the number is too big',
                );
            },
        );
    },

    number_includeMin(ctx) {
        const validator = HV.types.number({ includeMin: false });
        ctx.assert(validator.test(0));
        ctx.assert(validator.test(2));
        ctx.assert(validator.test(3.14));
        ctx.assert(validator.test(Infinity));
        ctx.assert(validator.test(-1));
        ctx.assert(validator.test(NaN));
        ctx.expectThrow(
            RangeError,
            validator.validate,
            [-Infinity],
            validator,
            (error) => {
                ctx.assertStrictEqual(
                    /** @type {RangeError} */(error).message,
                    'the number is too small',
                );
            },
        );
    },

    number_includeMax(ctx) {
        const validator = HV.types.number({ includeMax: false });
        ctx.assert(validator.test(0));
        ctx.assert(validator.test(2));
        ctx.assert(validator.test(3.14));
        ctx.assert(validator.test(-Infinity));
        ctx.assert(validator.test(-1));
        ctx.assert(validator.test(NaN));
        ctx.expectThrow(
            RangeError,
            validator.validate,
            [Infinity],
            validator,
            (error) => {
                ctx.assertStrictEqual(
                    /** @type {RangeError} */(error).message,
                    'the number is too big',
                );
            },
        );
    },

};
