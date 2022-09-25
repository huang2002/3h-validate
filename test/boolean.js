// @ts-check
const HV = /** @type {import('..')} */(
    /** @type {unknown} */(require('../dist/3h-validate.umd.js'))
);

/**
 * @type {import('3h-test').TestCases}
 */
exports.booleanTests = {

    boolean(ctx) {
        const validator = HV.types.boolean();
        ctx.assert(validator.test(true));
        ctx.assert(validator.test(false));
        ctx.expectThrow(
            TypeError,
            validator.validate,
            [0],
            validator,
            (error) => {
                ctx.assertStrictEqual(
                    /** @type {TypeError} */(error).message,
                    'expect a boolean',
                );
            }
        );
    },

    boolean_clone(ctx) {
        const source = HV.types.boolean();
        const copy = source.clone();
        ctx.assert(copy instanceof HV.BooleanType);
        ctx.assert(copy !== source);
    },

};
