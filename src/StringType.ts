import { merge } from '3h-utils';
import { Type } from './Type';

/**
 * Type of options for {@link StringType}.
 */
export interface StringTypeOptions {
    /**
     * @default null
     */
    pattern: RegExp | null;
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
 * Validator for strings.
 */
export class StringType extends Type<StringTypeOptions> {
    /** dts2md break */
    /**
     * Default type options.
     */
    static defaultOptions: StringTypeOptions = {
        pattern: null,
        minLength: 0,
        maxLength: Infinity,
        includeMin: true,
        includeMax: true,
    };
    /** dts2md break */
    /**
     * Constructor of {@link StringType}.
     */
    constructor(options?: Partial<StringTypeOptions>) {
        super(
            merge([StringType.defaultOptions, options])
        );
    }
    /** dts2md break */
    /**
     * @override Type.validate
     */
    validate(value: unknown) {
        if (typeof value !== 'string') {
            throw new TypeError('expect a string');
        }
        const { options } = this;
        const { length } = value;
        if (options.pattern && !options.pattern.test(value)) {
            throw new RangeError('the string does not match the pattern');
        }
        if (
            (length < options.minLength)
            || (!options.includeMin && (length === options.minLength))
        ) {
            throw new RangeError('the string is too short');
        }
        if (
            (length > options.maxLength)
            || (!options.includeMax && (length === options.maxLength))
        ) {
            throw new RangeError('the string is too long');
        }
    }

}
