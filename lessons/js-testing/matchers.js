// sc: https://ru.hexlet.io/courses/js-testing/lessons/matchers/exercise_unit

// tests/gt.test.js

// Напишите тесты для функции _.gt(value, other), которая возвращает true в том случае,
// если value > other, и false в иных случаях.

// gt(3, 1); // true
// gt(3, 3); // false
// gt(1, 3); // false

// Подсказки
// _.gt https://lodash.com/docs/4.17.15#gt

// @ts-check

const getFunction = require('../functions');

const gt = getFunction();

// BEGIN (write your solution here)
test('gt', () => {
  expect(gt(3, 1)).toBe(true);
  expect(gt(3, 3)).toBe(false);
  expect(gt(1, 3)).toBe(false);
});
// END
