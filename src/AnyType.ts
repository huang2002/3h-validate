import { Type } from './Type';

/**
 * Always-pass validator.
 */
export class AnyType extends Type<{}> {
    /** dts2md break */
    /**
     * Default type options.
     */
    static defaultOptions = Object.create(null) as {};
    /** dts2md break */
    /**
     * Constructor of {@link AnyType}.
     */
    constructor() {
        super(AnyType.defaultOptions);
    }
    /** dts2md break */
    /**
     * @override Type.validate
     */
    validate(value: unknown) {
        // pass
    }
    /** dts2md break */
    /**
     * @override Type.clone
     */
    clone() {
        return new AnyType();
    }

}
