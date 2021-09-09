// sc:
// https://ru.hexlet.io/courses/js-asynchronous-programming/lessons/promises/exercise_unit

// file.js
// Реализуйте и экспортируйте асинхронную функцию reverse, которая меняет строчки в файле
// в обратом порядке

// import { reverse } from './file.js';

// // До
// // one
// // two
// reverse(filepath);

// // После
// // two
// // one

/* eslint-disable import/prefer-default-export */
import { promises as fs } from 'fs';

// BEGIN (write your solution here)
const reverseLines = (data) => data.split('\n').reverse().join('\n');

export const reverse = (filepath) =>
  fs.readFile(filepath, 'utf8').then((data) => fs.writeFile(filepath, reverseLines(data), 'utf8'));
// END
