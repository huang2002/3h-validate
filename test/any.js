// @ts-check
const HV = /** @type {import('..')} */(
    /** @type {unknown} */(require('../dist/3h-validate.umd.js'))
);

/**
 * @type {import('3h-test').TestCases}
 */
exports.anyTests = {

    any(ctx) {
        const validator = HV.types.any();
        ctx.assert(validator.test(0));
        ctx.assert(validator.test(1));
        ctx.assert(validator.test(3.14));
        ctx.assert(validator.test(NaN));
        ctx.assert(validator.test(null));
        ctx.assert(validator.test(''));
        ctx.assert(validator.test({}));
        ctx.assert(validator.test([]));
    },

    any_clone(ctx) {
        const source = HV.types.any();
        const copy = source.clone();
        ctx.assert(copy instanceof HV.AnyType);
        ctx.assert(copy !== source);
    },

};
