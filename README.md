# 3h-validate

> A runtime validator.

## Links

- [API Reference](https://github.com/huang2002/3h-validate/wiki)
- [Changelog](./CHANGELOG.md)
- [License (MIT)](./LICENSE)

## Example

```js
import { types } from '3h-validate';
// const { types } = HV; // from UMD global

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
