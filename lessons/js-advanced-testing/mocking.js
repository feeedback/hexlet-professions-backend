/* eslint-disable no-undef */
// sc: https://ru.hexlet.io/courses/js-advanced-testing/lessons/mocking/exercise_unit

// tests/getFilesCount.test.js
// Протестируйте функцию getFilesCount(path, log), которая считает количество всех
// файлов в указанной директории и всех поддиректориях. В отличие от предыдущей
// версии задания, здесь нас интересует только то, что эта функция выполняет
// логгирование. Мы хотим убедиться, что она отправляет сообщение в лог. Для этого
// придётся воспользоваться моком.

// Подсказки
// toHaveBeenCalledTimes https://jestjs.io/docs/en/expect#tohavebeencalledtimesnumber
// toHaveBeenCalledWith https://jestjs.io/docs/en/expect#tohavebeencalledwitharg1-arg2-

// const path = require('path');
// const getFunction = require('../functions');

// const getFilesCount = getFunction();

// const getFixturePath = (name) => path.join(__dirname, '..', '__fixtures__', name);

// BEGIN (write your solution here)
test('getFilesCount', () => {
  const directoryPath = getFixturePath('nested');
  const callback = jest.fn();

  getFilesCount(directoryPath, callback);
  expect(callback).toHaveBeenCalledTimes(1);
  expect(callback).toHaveBeenCalledWith('Go!');
});
// END
