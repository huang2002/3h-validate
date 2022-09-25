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
    validator?: Type | null;
    /**
     * @default null
     */
    previousSpecification?: Specification<PreviousDataType> | null;
    /**
     * @default null
     */
    updater?: SpecificationUpdater<DataType, PreviousDataType> | null;
    /**
     * @default true
     */
    validateDuringTransform?: boolean;
}
/** dts2md break */
/**
 * Class for object specifications
 * which validate objects and manage version upgrades.
 */
export class Specification<DataType = unknown, PreviousDataType = unknown> {
    /** dts2md break */
    /**
     * Constructor of {@link Specification}.
     */
    constructor(options: SpecificationOptions<DataType, PreviousDataType>) {
        this.version = options.version;
        this.validator = options.validator || null;
        this.previousSpecification = options.previousSpecification || null;
        this.updater = options.updater || null;
        this.validateDuringTransform = options.validateDuringTransform !== false;
    }
    /** dts2md break */
    /**
     * The version of this specification.
     */
    version: string;
    /** dts2md break */
    /**
     * The validator of this version.
     */
    validator: Type | null;
    /** dts2md break */
    /**
     * The previous version.
     */
    previousSpecification: Specification<PreviousDataType> | null;
    /** dts2md break */
    /**
     * The function that transforms data of the previous version
     * into that of this version.
     */
    updater: SpecificationUpdater<DataType, PreviousDataType> | null;
    /** dts2md break */
    /**
     * Whether to validate data during transform.
     */
    validateDuringTransform: boolean;
    /** dts2md break */
    /**
     * Validate the versioned data.
     */
    validate(versionedData: VersionedData<unknown>) {
        const dataVersion = versionedData.version;
        const specVersion = this.version;
        if (dataVersion !== specVersion) {
            throw new RangeError(
                'cannot validate data of a different version'
                + ` (expected "${specVersion}" but got "${dataVersion}")`
            );
        }
        this.validator?.validate(versionedData.data);
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
        while (currentSpecification.version !== versionedData.version) {
            if (!currentSpecification.previousSpecification) {
                throw new RangeError('unknown specification version');
            }
            currentSpecification = currentSpecification.previousSpecification;
            specifications.push(currentSpecification);
        }

        // transform and validate
        const { validateDuringTransform } = this;
        let currentVersionedData = versionedData;
        for (let i = specifications.length - 1; i >= 0; i--) {
            const spec = specifications[i];
            if ((i < specifications.length) && spec.updater) {
                const data = spec.updater(
                    currentVersionedData.data
                );
                currentVersionedData = {
                    version: spec.version,
                    data,
                };
            } else {
                currentVersionedData = {
                    version: spec.version,
                    data: currentVersionedData.data,
                };
            }
            if (validateDuringTransform) {
                spec.validate(currentVersionedData);
            }
        }

        return currentVersionedData as VersionedData<DataType>;

    }

}
