import { AnyType } from './AnyType';
import { ArrayType, ArrayTypeOptions } from './ArrayType';
import { BooleanType } from './BooleanType';
import { CustomType, CustomTypeOptions } from './CustomType';
import { DictType, DictTypeOptions } from './DictType';
import { NoneType, NoneTypeOptions } from './NoneType';
import { NumberType, NumberTypeOptions } from './NumberType';
import { StringType, StringTypeOptions } from './StringType';

/**
 * Type factories.
 */
export namespace types {

    export const any = () => (
        new AnyType()
    );

    export const boolean = () => (
        new BooleanType()
    );

    export const number = (
        options?: Partial<NumberTypeOptions>,
    ) => (
        new NumberType(options)
    );

    export const string = (
        options?: Partial<StringTypeOptions>,
    ) => (
        new StringType(options)
    );

    export const none = (
        options?: Partial<NoneTypeOptions>,
    ) => (
        new NoneType(options)
    );

    export const custom = (
        options?: Partial<CustomTypeOptions>,
    ) => (
        new CustomType(options)
    );

    export const array = (
        options?: Partial<ArrayTypeOptions>,
    ) => (
        new ArrayType(options)
    );

    export const dict = (
        options?: Partial<DictTypeOptions>,
    ) => (
        new DictType(options)
    );

}
