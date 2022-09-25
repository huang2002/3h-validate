// @ts-check
const HV = /** @type {import('..')} */(
    /** @type {unknown} */(require('../dist/3h-validate.umd.js'))
);

/**
 * @type {import('3h-test').TestCases}
 */
exports.stringTests = {

    string_default(ctx) {
        const validator = HV.types.string();
        ctx.assert(validator.test('foo'));
        ctx.assert(validator.test(''));
        ctx.expectThrow(
            TypeError,
            validator.validate,
            [10.11],
            validator,
            (error) => {
                ctx.assertStrictEqual(
                    /** @type {TypeError} */(error).message,
                    'expect a string',
                );
            },
        );
    },

    string_pattern(ctx) {
        const pattern = /oo/;
        const validator = HV.types.string({ pattern });
        ctx.assert(validator.test('oo'));
        ctx.assert(validator.test('foo'));
        ctx.assert(validator.test('good'));
        ctx.assert(validator.test('oops'));
        ctx.expectThrow(
            RangeError,
            validator.validate,
            ['bad'],
            validator,
            (error) => {
                ctx.assertStrictEqual(
                    /** @type {RangeError} */(error).message,
                    'the string does not match the pattern',
                );
            },
        );
    },

    string_minLength(ctx) {
        const validator = HV.types.string({ minLength: 1 });
        ctx.assert(validator.test('1'));
        ctx.assert(validator.test('12'));
        ctx.expectThrow(
            RangeError,
            validator.validate,
            [''],
            validator,
            (error) => {
                ctx.assertStrictEqual(
                    /** @type {RangeError} */(error).message,
                    'the string is too short',
                );
            },
        );
    },

    string_maxLength(ctx) {
        const validator = HV.types.string({ maxLength: 1 });
        ctx.assert(validator.test(''));
        ctx.assert(validator.test('1'));
        ctx.expectThrow(
            RangeError,
            validator.validate,
            ['12'],
            validator,
            (error) => {
                ctx.assertStrictEqual(
                    /** @type {RangeError} */(error).message,
                    'the string is too long',
                );
            },
        );
    },

    string_includeMin(ctx) {
        const validator = HV.types.string({ includeMin: false });
        ctx.assert(validator.test('1'));
        ctx.assert(validator.test('12'));
        ctx.expectThrow(
            RangeError,
            validator.validate,
            [''],
            validator,
            (error) => {
                ctx.assertStrictEqual(
                    /** @type {RangeError} */(error).message,
                    'the string is too short',
                );
            },
        );
    },

    string_includeMax(ctx) {
        const validator = HV.types.string({ maxLength: 2, includeMax: false });
        ctx.assert(validator.test(''));
        ctx.assert(validator.test('1'));
        ctx.expectThrow(
            RangeError,
            validator.validate,
            ['12'],
            validator,
            (error) => {
                ctx.assertStrictEqual(
                    /** @type {RangeError} */(error).message,
                    'the string is too long',
                );
            },
        );
    },

    string_clone(ctx) {
        const source = HV.types.string({
            maxLength: 10,
        });
        const copy = source.clone();
        ctx.assert(copy !== source);
        ctx.assert(copy instanceof HV.StringType);
        ctx.assert(copy.options !== source.options);
        ctx.assert(copy.options.maxLength === 10);
    },

};
