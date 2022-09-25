// @ts-check
const HV = /** @type {import('..')} */(
    /** @type {unknown} */(require('../dist/3h-validate.umd.js'))
);

/**
 * @type {import('3h-test').TestCases}
 */
exports.dictTests = {

    dict_default(ctx) {
        const validator = HV.types.dict();
        ctx.assert(validator.test({ x: 0 }));
        ctx.assert(validator.test({}));
        ctx.expectThrow(
            TypeError,
            validator.validate,
            [[]],
            validator,
            (error) => {
                ctx.assertStrictEqual(
                    /** @type {TypeError} */(error).message,
                    'expect a dict',
                );
            },
        );
    },

    dict_pattern_single(ctx) {
        const pattern = HV.types.number();
        const validator = HV.types.dict({ pattern });
        ctx.assert(validator.test({}));
        ctx.assert(validator.test({ x: 0 }));
        ctx.assert(validator.test({ x: 0, y: 1 }));
        ctx.expectThrow(
            TypeError,
            validator.validate,
            [{ foo: 'bar' }],
            validator,
            (error) => {
                ctx.assertStrictEqual(
                    /** @type {TypeError} */(error).message,
                    'expect a number',
                );
            },
        );
    },

    dict_pattern_multiple(ctx) {
        const pattern = {
            x: HV.types.number(),
            s: HV.types.string(),
        };
        const validator = HV.types.dict({ pattern });
        ctx.assert(validator.test({ x: 0, s: '1' }));
        ctx.expectThrow(
            TypeError,
            validator.validate,
            [{ x: '0', s: '1' }],
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
            [{ x: 0, s: 1 }],
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
            [{ x: 0, s: '1', y: 2 }],
            validator,
            (error) => {
                ctx.assertStrictEqual(
                    /** @type {RangeError} */(error).message,
                    'unexpected key: y',
                );
            },
        );
    },

    dict_extensible(ctx) {
        const pattern = {
            x: HV.types.number(),
            s: HV.types.string(),
        };
        const validator = HV.types.dict({ pattern, extensible: true });
        ctx.assert(validator.test({ x: 0, s: '1' }));
        ctx.assert(validator.test({ x: 0, s: '1', y: 2 }));
        ctx.expectThrow(
            TypeError,
            validator.validate,
            [{ x: '0', s: '1' }],
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
            [{ x: 0, s: 1 }],
            validator,
            (error) => {
                ctx.assertStrictEqual(
                    /** @type {TypeError} */(error).message,
                    'expect a string',
                );
            },
        );
    },

    dict_minSize(ctx) {
        const validator = HV.types.dict({ minSize: 1 });
        ctx.assert(validator.test({ x: 1 }));
        ctx.assert(validator.test({ x: 1, y: 2 }));
        ctx.expectThrow(
            RangeError,
            validator.validate,
            [{}],
            validator,
            (error) => {
                ctx.assertStrictEqual(
                    /** @type {RangeError} */(error).message,
                    'too few entries',
                );
            },
        );
    },

    dict_maxSize(ctx) {
        const validator = HV.types.dict({ maxSize: 1 });
        ctx.assert(validator.test({}));
        ctx.assert(validator.test({ x: 1 }));
        ctx.expectThrow(
            RangeError,
            validator.validate,
            [{ x: 1, y: 2 }],
            validator,
            (error) => {
                ctx.assertStrictEqual(
                    /** @type {RangeError} */(error).message,
                    'too many entries',
                );
            },
        );
    },

    dict_includeMin(ctx) {
        const validator = HV.types.dict({ includeMin: false });
        ctx.assert(validator.test({ x: 1 }));
        ctx.assert(validator.test({ x: 1, y: 2 }));
        ctx.expectThrow(
            RangeError,
            validator.validate,
            [{}],
            validator,
            (error) => {
                ctx.assertStrictEqual(
                    /** @type {RangeError} */(error).message,
                    'too few entries',
                );
            },
        );
    },

    dict_includeMax(ctx) {
        const validator = HV.types.dict({ maxSize: 2, includeMax: false });
        ctx.assert(validator.test({}));
        ctx.assert(validator.test({ x: 1 }));
        ctx.expectThrow(
            RangeError,
            validator.validate,
            [{ x: 1, y: 2 }],
            validator,
            (error) => {
                ctx.assertStrictEqual(
                    /** @type {RangeError} */(error).message,
                    'too many entries',
                );
            },
        );
    },

    dict_clone(ctx) {
        const source1 = HV.types.dict({
            pattern: HV.types.number(),
        });
        const copy1 = source1.clone();
        ctx.assert(copy1 !== source1);
        ctx.assert(copy1 instanceof HV.DictType);
        ctx.assert(copy1.options !== source1.options);
        ctx.assert(copy1.options.pattern !== source1.options.pattern);
        ctx.assert(copy1.options.pattern instanceof HV.NumberType);
        const source2 = HV.types.dict({
            pattern: {
                x: HV.types.number(),
                s: HV.types.string(),
            },
        });
        const copy2 = source2.clone();
        ctx.assert(copy2 !== source2);
        ctx.assert(copy2 instanceof HV.DictType);
        ctx.assert(copy2.options !== source2.options);
        ctx.assert(Object.prototype.toString.call(copy2.options.pattern) === '[object Object]');
        ctx.assert(copy2.options.pattern !== source2.options.pattern);
        ctx.assert(copy2.options.pattern['x'] instanceof HV.NumberType);
        ctx.assert(copy2.options.pattern['s'] instanceof HV.StringType);
    },

};
