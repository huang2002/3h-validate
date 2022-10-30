import { merge } from '3h-utils';
import { Type } from './Type';

/**
 * Type of versioned objects.
 */
export interface VersionedData<T = unknown> {
    version: string;
    data: T;
}
/** dts2md break */
/**
 * Type of specification updaters.
 */
export type SpecificationUpdater<DataType, PreviousDataType> =
    (previousData: PreviousDataType) => DataType;
/** dts2md break */
/**
 * Type of options for {@link Specification}.
 */
export interface SpecificationOptions<DataType, PreviousDataType> {
    version: string;
    /**
     * @default null
     */
    validator: Type | null;
    /**
     * @default null
     */
    previousSpecification: Specification<PreviousDataType> | null;
    /**
     * @default null
     */
    updater: SpecificationUpdater<DataType, PreviousDataType> | null;
    /**
     * @default true
     */
    validateDuringTransform: boolean;
}
/** dts2md break */
/**
 * Class for object specifications
 * which validate objects and manage version upgrades.
 */
export class Specification<DataType = unknown, PreviousDataType = unknown>
    extends Type<SpecificationOptions<DataType, PreviousDataType>>{
    /** dts2md break */
    /**
     * Default type options.
     */
    static defaultOptions: SpecificationOptions<any, any> = {
        version: 'unknown',
        validator: null,
        previousSpecification: null,
        updater: null,
        validateDuringTransform: true,
    };
    /** dts2md break */
    /**
     * Constructor of {@link Specification}.
     */
    constructor(options: Partial<SpecificationOptions<DataType, PreviousDataType>>) {
        super(
            merge([Specification.defaultOptions, options])
        );
    }
    /** dts2md break */
    /**
     * @override Type.validate
     */
    validate(versionedData: VersionedData<unknown>) {
        const dataVersion = versionedData.version;
        const specVersion = this.options.version;
        if (dataVersion !== specVersion) {
            throw new RangeError(
                'cannot validate data of a different version'
                + ` (expected "${specVersion}" but got "${dataVersion}")`
            );
        }
        this.options.validator?.validate(versionedData.data);
    }
    /** dts2md break */
    /**
     * Transform the data from an older version.
     * (And validate each version if `validateDuringTransform` is `true`.)
     */
    transform(versionedData: VersionedData<unknown>) {

        const specifications: Specification<any, any>[] = [this];

        // find specification history
        let currentSpecification: Specification<any, any> = this;
        while (currentSpecification.options.version !== versionedData.version) {
            const { options: currentOptions } = currentSpecification;
            if (!currentOptions.previousSpecification) {
                throw new RangeError('unknown specification version');
            }
            currentSpecification = currentOptions.previousSpecification;
            specifications.push(currentSpecification);
        }

        // transform and validate
        const { validateDuringTransform } = this.options;
        let currentVersionedData = versionedData;
        for (let i = specifications.length - 1; i >= 0; i--) {
            const spec = specifications[i];
            if ((i < specifications.length) && spec.options.updater) {
                const data = spec.options.updater(
                    currentVersionedData.data
                );
                currentVersionedData = {
                    version: spec.options.version,
                    data,
                };
            } else {
                currentVersionedData = {
                    version: spec.options.version,
                    data: currentVersionedData.data,
                };
            }
            if (validateDuringTransform) {
                spec.validate(currentVersionedData);
            }
        }

        return currentVersionedData as VersionedData<DataType>;

    }
    /** dts2md break */
    /**
     * @override Type.clone
     */
    clone() {
        const options = merge([this.options]);
        if (options.validator) {
            options.validator = options.validator.clone();
        }
        return new Specification<DataType, PreviousDataType>(options);
    }
}
