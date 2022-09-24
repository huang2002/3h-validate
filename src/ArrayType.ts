import { merge } from '3h-utils';
import { AnyType } from './AnyType';
import { Type } from './Type';

/**
 * Type of options for {@link ArrayType}.
 */
export interface ArrayTypeOptions {
    /**
     * Provide a single validator for all elements,
     * or an array of validators
     * that validate each element separately.
     * @default new AnyType()
     */
    pattern: Type | Type[];
    /**
     * @default 0
     */
    minLength: number;
    /**
     * @default Infinity
     */
    maxLength: number;
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
 * Validator for arrays.
 */
export class ArrayType extends Type<ArrayTypeOptions> {
    /** dts2md break */
    /**
     * Default type options.
     */
    static defaultOptions: ArrayTypeOptions = {
        pattern: new AnyType(),
        minLength: 0,
        maxLength: Infinity,
        includeMin: true,
        includeMax: true,
    };
    /** dts2md break */
    /**
     * Constructor of {@link ArrayType}.
     */
    constructor(options?: Partial<ArrayTypeOptions>) {
        super(
            merge([ArrayType.defaultOptions, options])
        );
    }
    /** dts2md break */
    /**
     * @override Type.validate
     */
    validate(value: unknown) {

        if (!Array.isArray(value)) {
            throw new TypeError('expect an array');
        }

        const { options } = this;
        const { length } = value;

        if (
            (length < options.minLength)
            || (!options.includeMin && (length === options.minLength))
        ) {
            throw new RangeError('the array is too short');
        }

        if (
            (length > options.maxLength)
            || (!options.includeMax && (length === options.maxLength))
        ) {
            throw new RangeError('the array is too long');
        }

        const { pattern } = options;
        if (pattern) {
            if (Array.isArray(pattern)) {
                if (length !== pattern.length) {
                    throw new RangeError(
                        'the length of the array does not match the pattern'
                    );
                }
                for (let i = 0; i < length; i++) {
                    pattern[i].validate(value[i]);
                }
            } else {
                for (let i = 0; i < length; i++) {
                    pattern.validate(value[i]);
                }
            }
        }

    }

}
