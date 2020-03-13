// sc: https://ru.hexlet.io/courses/js-testing/lessons/asserts/exercise_unit

// tests/take.test.js Напишите тесты для функции take(items, n), которая возвращает первые
// n элементов из массива:

// take([1, 2, 3], 2); // [1, 2]
// take([], 2); // []
// take([4, 3], 9); // [4, 3]

// Подсказки
// _.take https://lodash.com/docs/4.17.15#take
// Asserts https://nodejs.org/api/assert.html
// Выберите правильный способ сравнения: по ссылке или по значению

const assert = require('assert');
const getFunction = require('../functions');

const take = getFunction();

// BEGIN (write your solution here)
assert.deepEqual(take([1, 2, 3], 2), [1, 2]);
assert.deepEqual(take([1, 2, 3]), [1]);
assert.deepEqual(take([], 2), []);
assert.deepEqual(take([1, 2, 3], 9), [1, 2, 3]);
// END
