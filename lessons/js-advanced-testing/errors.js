/* eslint-disable no-undef */
// sc: https://ru.hexlet.io/courses/js-advanced-testing/lessons/errors/exercise_unit

// tests/gt.test.js
// Напишите негативный тест, проверяющий ошибочные ситуации. Рассмотрите следующие
// ситуации:
//    файл не найден
//    В функцию передан путь до директории на функцию read($filepath).

// read('/undefined'); // boom!
// read('/etc'); // boom!

// const getFunction = require('../functions');

// const read = getFunction();

// BEGIN
test('read', () => {
  expect(() => read('/undefined')).toThrow();
  expect(() => read('/etc')).toThrow();
});
// END
