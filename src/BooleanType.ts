import { Type } from './Type';

/**
 * Validator for booleans.
 */
export class BooleanType extends Type<{}> {
    /** dts2md break */
    /**
     * Default type options.
     */
    static defaultOptions = Object.create(null) as {};
    /** dts2md break */
    /**
     * Constructor of {@link BooleanType}.
     */
    constructor() {
        super(BooleanType.defaultOptions);
    }
    /** dts2md break */
    /**
     * @override Type.validate
     */
    validate(value: unknown) {
        if (typeof value !== 'boolean') {
            throw new TypeError('expect a boolean');
        }
    }

}
