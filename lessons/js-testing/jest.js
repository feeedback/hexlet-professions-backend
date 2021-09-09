// sc: https://ru.hexlet.io/courses/js-testing/lessons/jest/exercise_unit

// tests/take.test.js

// Напишите тесты для функции without(coll, [values]), которая принимает первым параметром
// массив и возвращает его копию, из которой исключены значения, переданные вторым и
// последующими параметрами.

// _.without([2, 1, 2, 3], 1, 2); // [3]

// Подсказки
// _.without https://lodash.com/docs/4.17.15#without

// @ts-check

const getFunction = require('../functions');

const without = getFunction();

// BEGIN (write your solution here)
test('without', () => {
  const arr = [2, 1, 2, 3];
  expect(without(arr, 1, 2)).toEqual([3]);
  expect(without(arr)).toEqual(arr);
  expect(without([])).toEqual([]);
});
// END
