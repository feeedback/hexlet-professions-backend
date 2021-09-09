// sc: https://ru.hexlet.io/courses/js-testing/lessons/power-assert/exercise_unit

// tests/indexOf.test.js

// Напишите тесты для функции indexOf(items, value, [fromIndex=0]), которая возвращает
// индекс первого вхождения переданного элемента в массив, начиная поиск с индекса
// fromIndex, значение которого по умолчанию равно нулю:

// indexOf([1, 2, 1, 2], 2); // 1
// indexOf([1, 2, 1, 2], 2, 2); // 3
// indexOf([2, 'one', 'cat', false], 8); // -1

// Подсказки
// _.indexOf https://lodash.com/docs/4.17.15#indexOf

// @ts-check

const assert = require('power-assert');
const getFunction = require('../functions');

const indexOf = getFunction();

// BEGIN (write your solution here)
assert(indexOf([1, 2, 1, 2], 2) === 1);
assert(indexOf([1, 2, 1, 2], 2, 2) === 3);
assert(indexOf([2, 'one', 'cat', false], 8) === -1);

assert(indexOf([1, 2, 1, 2]) === -1);

// END
