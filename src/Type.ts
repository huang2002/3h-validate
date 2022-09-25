/**
 * Base class for type validators.
 */
export abstract class Type<OptionsType extends {} = {}> {
    /** dts2md break */
    /**
     * Constructor of {@link Type}.
     */
    constructor(options: OptionsType) {
        this.options = options;
    }
    /** dts2md break */
    /**
     * Type options.
     */
    options: OptionsType;
    /** dts2md break */
    /**
     * Returns nothing when the given value is valid,
     * but throws errors if it is not.
     */
    abstract validate(value: unknown): void;
    /** dts2md break */
    /**
     * Create a new validator from this one.
     */
    abstract clone(): Type<OptionsType>;
    /** dts2md break */
    /**
     * Tells whether the given value is valid.
     * (Using {@link validate} internally.)
     */
    test(value: unknown) {
        try {
            this.validate(value);
            return true;
        } catch {
            return false;
        }
    }

}
