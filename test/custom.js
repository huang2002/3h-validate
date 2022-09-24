// @ts-check
const HV = /** @type {import('..')} */(
    /** @type {unknown} */(require('../dist/3h-validate.umd.js'))
);

/**
 * @type {import('3h-test').TestCases}
 */
exports.customTests = {

    custom_default(ctx) {
        const validator = HV.types.custom();
        ctx.expectThrow(
            TypeError,
            validator.validate,
            ['test value'],
            validator,
            (error) => {
                ctx.assertStrictEqual(
                    /** @type {TypeError} */(error).message,
                    'the custom validator is not implemented',
                );
            },
        );
    },

    custom_validate(ctx) {
        const validator = HV.types.custom({
            validate(value) {
                throw value;
            },
        });
        ctx.expectThrow(
            'string',
            validator.validate,
            ['test value'],
            validator,
            (error) => {
                ctx.assertStrictEqual(error, 'test value');
            },
        );
    },

};
