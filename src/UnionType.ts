import { merge } from '3h-utils';
import { Type } from './Type';

/**
 * Type of options for {@link UnionType}.
 */
export interface UnionTypeOptions {
    /**
     * The union validator accepts only values
     * that passes at least one of these validators.
     * @default []
     */
    validators: Type[];
}
/** dts2md break */
/**
 * Validator for unions.
 */
export class UnionType extends Type<UnionTypeOptions> {
    /** dts2md break */
    /**
     * Default type options.
     */
    static defaultOptions: UnionTypeOptions = {
        validators: [],
    };
    /** dts2md break */
    /**
     * Constructor of {@link UnionType}.
     */
    constructor(options?: Partial<UnionTypeOptions>) {
        super(
            merge([UnionType.defaultOptions, options])
        );
    }
    /** dts2md break */
    /**
     * @override Type.validate
     */
    validate(value: unknown) {
        const { options } = this;
        const { validators } = options;
        for (let i = 0; i < validators.length; i++) {
            if (validators[i].test(value)) {
                return;
            }
        }
        throw new TypeError('the value is rejected by all validators');
    }
    /** dts2md break */
    /**
     * @override Type.clone
     */
    clone() {
        const options = merge([this.options]);
        if (Array.isArray(options.validators)) {
            options.validators = options.validators.map(
                (validator) => validator.clone()
            );
        }
        return new UnionType(options);
    }

}
