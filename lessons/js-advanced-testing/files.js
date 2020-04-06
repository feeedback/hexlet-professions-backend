/* eslint-disable no-undef */
// sc: https://ru.hexlet.io/courses/js-advanced-testing/lessons/files/exercise_unit

// tests/prettifyHTMLFile.test.js
// Протестируйте функцию, которая форматирует указанный HTML-файл.

// // содержимое до форматирования
// // <div><p>hello <b>world</b></p></div>
// await prettifyHTMLFile('/path/to/file');

// // содержимое после форматирования:
// // <div>
// //     <p>hello <b>world</b></p>
// // </div>

// Подсказки
// В директории __fixtures__ лежат готовые фикстуры для тестов.

// const os = require('os');
// const path = require('path');
// const { promises: fs } = require('fs');
// const _ = require('lodash');
// const getFunction = require('../functions');

// const prettifyHTMLFile = getFunction();

// BEGIN (write your solution here)
const getFixturePath = (name) => path.join(__dirname, '..', '__fixtures__', name);

let tempFilePath;
beforeEach(async () => {
    tempFilePath = path.resolve(os.tmpdir(), 'example.html');
    await fs.unlink(tempFilePath).catch(_.noop);
    const srcFilePath = getFixturePath('before.html');
    await fs.copyFile(srcFilePath, tempFilePath);
});

test('форматирует указанный HTML-файл', async () => {
    const expectedAfter = await fs.readFile(getFixturePath('after.html'), 'utf-8');
    await prettifyHTMLFile(tempFilePath);
    const after = await fs.readFile(tempFilePath, 'utf-8');

    expect(after.trim()).toEqual(expectedAfter.trim());
});
// END
