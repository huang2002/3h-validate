// @ts-check
const HV = /** @type {import('..')} */(
    /** @type {unknown} */(require('../dist/3h-validate.umd.js'))
);

/**
 * @type {import('3h-test').TestCases}
 */
exports.unionTests = {

    union(ctx) {
        const validator = HV.types.union({
            validators: [
                HV.types.string(),
                HV.types.number(),
            ],
        });
        ctx.assert(validator.test(0));
        ctx.assert(validator.test('1'));
        ctx.expectThrow(
            TypeError,
            validator.validate,
            [true],
            validator,
            (error) => {
                ctx.assertStrictEqual(
                    /** @type {TypeError} */(error).message,
                    'the value is rejected by all validators',
                );
            },
        );
    },

};
