// sc: https://ru.hexlet.io/courses/js-testing/lessons/unit-tests/exercise_unit

// tests/validator.test.js

// Напишите тесты для Validator. Он проверяет корректность данных. Принцип работы
// валидатора следующий:

// С помощью метода addCheck(fn) в него добавляются проверки. Каждая проверка представляет
// из себя функцию-предикат, которая принимает на вход проверяемое значение и возвращает
// либо true либо false в зависимости от того, соответствует ли значение требованиям
// проверки или нет.

// С помощью метода isValid(value), пользователь Validator проверяет соответствие значения
// всем добавленным проверкам. Если не было добавлено ни одной проверки, считается, что
// любое значение верное.

// const validator = makeValidator(); validator.isValid('some value'); // true
// validator.addCheck((v) => v > 5);
// validator.isValid(3); // false
// validator.isValid(8); // true
// validator.addCheck(/* add more checks */);

// @ts-check

const { isNumber } = require('lodash');
const getImplementation = require('../implementations');

const makeValidator = getImplementation();

// BEGIN (write your solution here)
test('Validator', () => {
  const validator = makeValidator();

  expect(validator.isValid('some value')).toBe(true);
  validator.addCheck(isNumber);

  validator.addCheck((v) => v > 5);
  expect(validator.isValid(3)).toBe(false);
  expect(validator.isValid(8)).toBe(true);

  validator.addCheck((v) => v % 2 === 0);
  expect(validator.isValid(4)).toBe(false);
  expect(validator.isValid(6)).toBe(true);

  expect(validator.isValid('string')).toBe(false);
});
// END
