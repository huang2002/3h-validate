import { merge } from '3h-utils';
import { Type } from './Type';

/**
 * Type of options for {@link NoneType}.
 */
export interface NoneTypeOptions {
    /**
     * @default true
     */
    acceptNull: boolean;
    /**
     * @default true
     */
    acceptUndefined: boolean;
}
/** dts2md break */
/**
 * Validator for `null` and/or `undefined`.
 */
export class NoneType extends Type<NoneTypeOptions> {
    /** dts2md break */
    /**
     * Default type options.
     */
    static defaultOptions: NoneTypeOptions = {
        acceptNull: true,
        acceptUndefined: true,
    };
    /** dts2md break */
    /**
     * Constructor of {@link NoneType}.
     */
    constructor(options?: Partial<NoneTypeOptions>) {
        super(
            merge([NoneType.defaultOptions, options])
        );
    }
    /** dts2md break */
    /**
     * @override Type.validate
     */
    validate(value: unknown) {
        if (value != null) { // `null` or `undefined`
            throw new TypeError('expect null or undefined');
        }
        const { options } = this;
        if (!options.acceptNull && (value === null)) {
            throw new RangeError('null is not acceptable');
        }
        if (!options.acceptUndefined && (value === undefined)) {
            throw new RangeError('undefined is not acceptable');
        }
    }

}
