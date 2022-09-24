import { merge } from '3h-utils';
import { Type } from './Type';

/**
 * Type of options for {@link CustomType}.
 */
export interface CustomTypeOptions {
    validate: (value: unknown) => void;
}
/** dts2md break */
/**
 * Custom validator.
 */
export class CustomType extends Type<CustomTypeOptions> {
    /** dts2md break */
    /**
     * Default type options.
     */
    static defaultOptions = {
        validate: () => {
            throw new TypeError('the custom validator is not implemented');
        },
    };
    /** dts2md break */
    /**
     * Constructor of {@link CustomType}.
     */
    constructor(options?: Partial<CustomTypeOptions>) {
        super(
            merge([CustomType.defaultOptions, options])
        );
    }
    /** dts2md break */
    /**
     * @override Type.validate
     */
    validate(value: unknown) {
        this.options.validate(value);
    }

}
