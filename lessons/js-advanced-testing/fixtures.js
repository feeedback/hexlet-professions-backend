/* eslint-disable no-undef */
// sc: https://ru.hexlet.io/courses/js-advanced-testing/lessons/fixtures/exercise_unit

// tests/toHtmlList.test.js
// Протестируйте функцию, которая преобразует различные входные форматы в выходной HTML.

// // Поддерживаются yml/json/csv
// const html1 = await toHtmlList('/path/to/yaml/file');
// const html2 = await toHtmlList('/path/to/json/file');
// const html3 = await toHtmlList('/path/to/csv/file');
// Каждый из входных файлов для этой функции содержит список элементов из которых
// формируется элемент <ul>. Входные данные и выходной HTML можно подсмотреть в
// фикстурах.

// Ваша задача, пропустить через эту функцию входные файлы и сравнить результат
// работы функции с ожидаемым значением находящимся в файле
// __fixtures__/result.html.

// Подсказки
// test.each
// .trim – позволяет удалять концевые пробелы

// const { promises: fs } = require('fs');
// const path = require('path');
// const getFunction = require('../functions');

// const toHtmlList = getFunction();

// BEGIN (write your solution here)
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFile(getFixturePath(filename), 'utf-8');

beforeAll(async () => {
  expected = await readFile('result.html');
});

const formats = ['csv', 'json', 'yml'];
test.each(formats)('%s', async (format) => {
  const filePath = getFixturePath(`list.${format}`);
  const actual = await toHtmlList(filePath);

  expect(actual.trim()).toEqual(expected.trim());
});
// END
