// @ts-check
const { test } = require('3h-test');
const { anyTests } = require('./any.js');
const { arrayTests } = require('./array.js');
const { booleanTests } = require('./boolean.js');
const { customTests } = require('./custom.js');
const { dictTests } = require('./dict.js');
const { noneTests } = require('./none.js');
const { numberTests } = require('./number.js');
const { stringTests } = require('./string.js');
const { unionTests } = require('./union.js');

test(null, {
    ...anyTests,
    ...booleanTests,
    ...numberTests,
    ...stringTests,
    ...noneTests,
    ...customTests,
    ...arrayTests,
    ...dictTests,
    ...unionTests,
});
