# 3h-validate

> A runtime validator.

## Links

- [API Reference](https://github.com/huang2002/3h-validate/wiki)
- [Changelog](./CHANGELOG.md)
- [License (MIT)](./LICENSE)

## Examples

### Type Validation

```js
import { types } from '3h-validate';
// or: const { types } = HV;

const validator = types.number({
    integersOnly: true,
    min: 0,
    includeMin: false,
});

if (validator.test(1)) {
    console.log('1 is a valid value.');
}

validator.validate(0); // RangeError: the number is too small
```

### Versioned Data Management

```js
import { types, Specification } from '3h-validate';
// or: const { types, Specification } = HV;

const spec1 = new Specification({
    version: 'v1',
    validator: types.number(),
});

const spec2 = new Specification({
    version: 'v2',
    validator: types.string(),
    previousSpecification: spec1,
    updater: String,
});

const versionedData = {
    version: 'v1',
    data: 3.14,
};

console.log(spec1.test(versionedData)); // true

console.log(spec2.transform(versionedData));
// { version: 'v2', data: '3.14' }
```
