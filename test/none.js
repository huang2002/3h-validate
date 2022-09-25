// @ts-check
const HV = /** @type {import('..')} */(
    /** @type {unknown} */(require('../dist/3h-validate.umd.js'))
);

/**
 * @type {import('3h-test').TestCases}
 */
exports.noneTests = {

    none_default(ctx) {
        const validator = HV.types.none();
        ctx.assert(validator.test(null));
        ctx.assert(validator.test(undefined));
        ctx.expectThrow(
            TypeError,
            validator.validate,
            [0],
            validator,
            (error) => {
                ctx.assertStrictEqual(
                    /** @type {TypeError} */(error).message,
                    'expect null or undefined',
                );
            }
        );
    },

    none_acceptNull(ctx) {
        const validator = HV.types.none({ acceptNull: false });
        ctx.assert(validator.test(undefined));
        ctx.expectThrow(
            RangeError,
            validator.validate,
            [null],
            validator,
            (error) => {
                ctx.assertStrictEqual(
                    /** @type {TypeError} */(error).message,
                    'null is not acceptable',
                );
            }
        );
    },

    none_acceptUndefined(ctx) {
        const validator = HV.types.none({ acceptUndefined: false });
        ctx.assert(validator.test(null));
        ctx.expectThrow(
            RangeError,
            validator.validate,
            [undefined],
            validator,
            (error) => {
                ctx.assertStrictEqual(
                    /** @type {TypeError} */(error).message,
                    'undefined is not acceptable',
                );
            }
        );
    },

    none_clone(ctx) {
        const source = HV.types.none({
            acceptUndefined: false,
        });
        const copy = source.clone();
        ctx.assert(copy !== source);
        ctx.assert(copy instanceof HV.NoneType);
        ctx.assert(copy.options !== source.options);
        ctx.assert(!copy.options.acceptUndefined);
    },

};
