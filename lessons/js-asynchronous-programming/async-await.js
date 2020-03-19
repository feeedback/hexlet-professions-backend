// sc:
// https://ru.hexlet.io/courses/js-asynchronous-programming/lessons/async-await/exercise_unit

// file.js
// Реализуйте и экспортируйте асинхронную функцию exchange, которая обменивает содержимое
// двух файлов.

// import { exchange } from './file.js';

// exchange('/myfile1', '/myfile2');

/* eslint-disable import/prefer-default-export */
import { promises as fs } from 'fs';

// BEGIN (write your solution here)
export const exchange = async (filepath1, filepath2) => {
    const [data1, data2] = await Promise.all([
        fs.readFile(filepath1, 'utf-8'),
        fs.readFile(filepath2, 'utf-8'),
    ]);

    return Promise.all([fs.writeFile(filepath1, data2), fs.writeFile(filepath2, data1)]);
};
// END
