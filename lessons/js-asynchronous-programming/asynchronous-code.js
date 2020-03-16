// sc:
// https://ru.hexlet.io/courses/js-asynchronous-programming/lessons/asynchronous-code/exercise_unit

// printer.js
// Реализуйте асинхронную функцию, которая читает данные файла по указанному пути и
// выводит их в консоль.

// import print from './printer.js';
// print('./myfile');

// Подсказки
// В теории был пример асинхронного чтения файла. Нужно сделать по аналогии.

// @ts-check
/* eslint-disable no-console */
import fs from 'fs';

// BEGIN (write your solution here) (write your solution here)
export default (path) => {
    fs.readFile(path, 'utf-8', (error, data) => console.log(error || data));
};
// END
