import { merge } from '3h-utils';
import { Type } from './Type';

/**
 * Type of options for {@link NumberType}.
 */
export interface NumberTypeOptions {
    /**
     * @default true
     */
    acceptNaN: boolean;
    /**
     * @default false
     */
    integersOnly: boolean;
    /**
     * @default -Infinity
     */
    min: number;
    /**
     * @default Infinity
     */
    max: number;
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
 * Validator for numbers.
 */
export class NumberType extends Type<NumberTypeOptions> {
    /** dts2md break */
    /**
     * Default type options.
     */
    static defaultOptions: NumberTypeOptions = {
        acceptNaN: true,
        integersOnly: false,
        min: -Infinity,
        max: Infinity,
        includeMin: true,
        includeMax: true,
    };
    /** dts2md break */
    /**
     * Constructor of {@link NumberType}.
     */
    constructor(options?: Partial<NumberTypeOptions>) {
        super(
            merge([NumberType.defaultOptions, options])
        );
    }
    /** dts2md break */
    /**
     * @override Type.validate
     */
    validate(value: unknown) {
        if (typeof value !== 'number') {
            throw new TypeError('expect a number');
        }
        const { options } = this;
        if (!options.acceptNaN && (value !== value)) {
            throw new RangeError('NaN is not acceptable');
        }
        if (options.integersOnly && !Number.isInteger(value)) {
            throw new RangeError('accept only integers');
        }
        if (
            (value < options.min)
            || (!options.includeMin && (value === options.min))
        ) {
            throw new RangeError('the number is too small');
        }
        if (
            (value > options.max)
            || (!options.includeMax && (value === options.max))
        ) {
            throw new RangeError('the number is too big');
        }
    }
    /** dts2md break */
    /**
     * @override Type.clone
     */
    clone() {
        return new NumberType(merge([this.options]));
    }

}
