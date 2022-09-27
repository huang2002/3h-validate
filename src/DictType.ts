import { isDict, merge } from '3h-utils';
import { AnyType } from './AnyType';
import { Type } from './Type';

/**
 * Type of options for {@link DictType}.
 */
export interface DictTypeOptions {
    /**
     * Provide a single validator for all values,
     * or a dict of validators
     * that validate each value separately.
     * @default new AnyType()
     */
    pattern: Type | Record<string, Type>;
    /**
     * Whether extra entries are acceptable
     * whose keys are not in `pattern`.
     * (This option only takes effect
     * when `pattern` is a dict.)
     * @default false
     */
    extensible: boolean;
    /**
     * @default 0
     */
    minSize: number;
    /**
     * @default Infinity
     */
    maxSize: number;
    /**
     * @default true
     */
    includeMin: boolean;
    /**
     * @default true
     */
    includeMax: boolean;
}
/** dts2md break */
/**
 * Validator for dicts.
 */
export class DictType extends Type<DictTypeOptions> {
    /** dts2md break */
    /**
     * Default type options.
     */
    static defaultOptions: DictTypeOptions = {
        pattern: new AnyType(),
        extensible: false,
        minSize: 0,
        maxSize: Infinity,
        includeMin: true,
        includeMax: true,
    };
    /** dts2md break */
    /**
     * Constructor of {@link DictType}.
     */
    constructor(options?: Partial<DictTypeOptions>) {
        super(
            merge([DictType.defaultOptions, options])
        );
    }
    /** dts2md break */
    /**
     * @override Type.validate
     */
    validate(value: unknown) {

        if (!isDict(value)) {
            throw new TypeError('expect a dict');
        }

        const { options } = this;
        const keys = Object.keys(value);
        const size = keys.length;

        if (
            (size < options.minSize)
            || (!options.includeMin && (size === options.minSize))
        ) {
            throw new RangeError('too few entries');
        }

        if (
            (size > options.maxSize)
            || (!options.includeMax && (size === options.maxSize))
        ) {
            throw new RangeError('too many entries');
        }

        const { pattern } = options;
        if (pattern) {
            if (pattern instanceof Type) {
                keys.forEach((key) => {
                    pattern.validate(value[key]);
                });
            } else {
                const patternKeys = Object.keys(pattern);
                patternKeys.forEach((key) => {
                    pattern[key].validate(value[key]);
                });
                if (!options.extensible) {
                    keys.forEach((key) => {
                        if (!patternKeys.includes(key)) {
                            throw new RangeError(`unexpected key: ${key}`);
                        }
                    });
                }
            }
        }

    }
    /** dts2md break */
    /**
     * @override Type.clone
     */
    clone() {
        const options = merge([this.options]);
        if (options.pattern instanceof Type) {
            options.pattern = options.pattern.clone();
        } else {
            const pattern = merge([options.pattern]);
            options.pattern = pattern;
            for (const key in pattern) {
                pattern[key] = pattern[key].clone();
            }
        }
        return new DictType(options);
    }

}
