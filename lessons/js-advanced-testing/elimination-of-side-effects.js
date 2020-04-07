/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
// sc: https://ru.hexlet.io/courses/js-advanced-testing/lessons/elimination-of-side-effects/exercise_unit

// tests/getFilesCount.test.js
// Протестируйте функцию getFilesCount(path, log), которая считает количество всех
// файлов в указанной директории и всех поддиректориях. Эта функция внутри себя
// выполняет логгирование действий. Логгер падает с ошибкой если функцию
// getFilesCount запустить в тестах. Выполните подмену логгера, передайте вторым
// параметром функцию, которая имитирует логгер, но не выполняет реального
// логгирования.

// const filesCount = getFilesCount('/path/to/directory');
// Подсказки
// Заготовки директорий лежат в __fixtures__

// const path = require('path');
// const _ = require('lodash');
// const getFunction = require('../functions');

// const getFilesCount = getFunction();

const getFixturePath = (name) => path.join(__dirname, '..', '__fixtures__', name);

// BEGIN (write your solution here)
const fakeLogger = (args) => _.noop;

test('getFilesCount', () => {
    // flat можно не тестировать так как nested покрывает и flat тоже
    const directoryPath = getFixturePath('nested');
    const filesCount = getFilesCount(directoryPath, fakeLogger);
    expect(filesCount).toBe(4);
});
// END
