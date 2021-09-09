// sc: https://ru.hexlet.io/courses/js-testing/lessons/setup/exercise_unit

// tests/set.test.js
// Напишите тесты для функции set(obj, path, value) возвращающей объект, в котором она
// изменяет (или добавляет) значение по указанному пути. Функция мутирует объект.

// const object = { a: [{ b: { c: 3 } }] };

// set(object, 'a[0].b.c', 4);
// console.log(object.a[0].b.c); // => 4

// set(object, ['x', '0', 'y', 'z'], 5);
// console.log(object.x[0].y.z); // => 5

// Подсказки:
// Переиспользуйте объект данных
// _.set https://lodash.com/docs/4.17.15#set

// @ts-check

const { cloneDeep } = require('lodash');
const getFunction = require('../functions');

const set = getFunction();

// BEGIN (write your solution here)
let mutateObject;
let objectCopy;

beforeEach(() => {
  mutateObject = { a: [{ b: { c: 3 } }] };
  objectCopy = cloneDeep(mutateObject);
});

test('plain set', () => {
  set(mutateObject, 'a', 'value');
  objectCopy.a = 'value';
  expect(mutateObject).toEqual(objectCopy);
});

test('nested set', () => {
  set(mutateObject, 'a[0].b.c', true);
  objectCopy.a[0].b.c = true;
  expect(mutateObject).toEqual(objectCopy);
});

test('set new property', () => {
  set(mutateObject, 'a[0].b.d', false);
  objectCopy.a[0].b.d = false;
  expect(mutateObject).toEqual(objectCopy);
});
// END
