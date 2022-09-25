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

    union_clone(ctx) {
        const source = HV.types.union({
            validators: [HV.types.number()],
        });
        const copy = source.clone();
        ctx.assert(copy !== source);
        ctx.assert(copy instanceof HV.UnionType);
        ctx.assert(copy.options !== source.options);
        ctx.assert(copy.options.validators !== source.options.validators);
        ctx.assert(Array.isArray(copy.options.validators));
        ctx.assert(copy.options.validators[0] instanceof HV.NumberType);
    },

};
