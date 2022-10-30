// @ts-check
const HV = /** @type {import('..')} */(
    /** @type {unknown} */(require('../dist/3h-validate.umd.js'))
);

const { types } = HV;

/**
 * @type {import('3h-test').TestCases}
 */
exports.specTests = {

    spec_default(ctx) {

        const spec_1 = new HV.Specification({
            version: 'v1',
            validator: types.array({
                pattern: types.number(),
            }),
        });
        const versionedData_1 = {
            version: 'v1',
            data: [0, 1],
        };
        ctx.assert(
            spec_1.test(versionedData_1),
        );
        ctx.expectThrow(
            RangeError,
            spec_1.validate,
            [{ version: 'foo', data: null }],
            spec_1,
            (error) => {
                ctx.assertStrictEqual(
                    /** @type {RangeError} */(error).message,
                    'cannot validate data of a different version'
                    + ' (expected "v1" but got "foo")'
                );
            }
        );
        ctx.expectThrow(
            TypeError,
            spec_1.validate,
            [{ version: 'v1', data: ['str'] }],
            spec_1,
            (error) => {
                ctx.assertStrictEqual(
                    /** @type {TypeError} */(error).message,
                    'expect a number'
                );
            }
        );

        const spec_1_1 = new HV.Specification({
            version: 'v1.1',
            previousSpecification: spec_1,
            validator: types.array({
                pattern: types.any(),
            }),
        });
        const versionedData_1_1 = {
            version: 'v1.1',
            data: [0, '1'],
        };
        ctx.assert(
            spec_1_1.test(versionedData_1_1),
        );

        const spec_2 = new HV.Specification({
            version: 'v2',
            previousSpecification: spec_1_1,
            validator: types.string(),
            updater(data) {
                return /** @type {unknown[]} */(data).join(',');
            }
        });
        ctx.assertDeepEqual(
            spec_2.transform(versionedData_1),
            {
                version: 'v2',
                data: versionedData_1.data.join(','),
            },
        );
        ctx.expectThrow(
            RangeError,
            spec_2.validate,
            [{ version: 'v1', data: [0, 1] }],
            spec_2,
            (error) => {
                ctx.assertStrictEqual(
                    /** @type {RangeError} */(error).message,
                    'cannot validate data of a different version'
                    + ' (expected "v2" but got "v1")'
                );
            }
        );

    },

    spec_validateDuringTransform(ctx) {
        const spec1 = new HV.Specification({
            version: '1',
            validator: types.number(),
        });
        const spec2 = new HV.Specification({
            version: '2',
            previousSpecification: spec1,
            updater: () => true,
            validateDuringTransform: false,
        });
        const versionedData1 = {
            version: '1',
            data: 'blahblah',
        };
        ctx.assertDeepEqual(
            spec2.transform(versionedData1),
            { version: '2', data: true },
        );
    },

    spec_recursive(ctx) {
        const spec1_1 = new HV.Specification({
            version: '1.1',
            validator: types.number(),
        });
        const spec1_2 = new HV.Specification({
            version: '1.2',
            previousSpecification: spec1_1,
            validator: types.boolean(),
            updater: Boolean,
        });
        const spec2 = new HV.Specification({
            version: '2',
            validator: types.dict({
                pattern: {
                    data: spec1_2,
                },
            }),
        });
        ctx.assert(
            spec2.test({
                version: '2',
                data: {
                    data: { version: '1.2', data: true },
                },
            })
        );
        ctx.assert(
            !spec2.test({
                version: '2',
                data: {
                    data: { version: '1.1', data: 1 },
                },
            })
        );
    },

};
