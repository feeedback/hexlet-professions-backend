// sc:
// https://ru.hexlet.io/courses/js-asynchronous-programming/lessons/asynchronous-flow/exercise_unit

// info.js
// Реализуйте и экспортируйте асинхронную функцию compareFileSizes, которая сравнивает
// размеры двух файлов. Если первый больше второго, то она возвращает единицу, если
// размеры равны, то возвращает ноль, иначе — -1.

// import { compareFileSizes } from './info.js';
// compareFileSizes('file1', 'file2', (_err, result) => console.log(result));

// Подсказка
// Для реализации этого задания, нужно воспользоваться функцией fs.stat, которая
// использовалась в примерах теории
// https://nodejs.org/api/fs.html#fs_fs_stat_path_options_callback
// Math.sign

// @ts-check
/* eslint-disable import/prefer-default-export */
import fs from 'fs';

// BEGIN (write your solution here)
export const compareFileSizes = (file1, file2, cb) => {
  fs.stat(file1, (_error1, stats1) => {
    fs.stat(file2, (_error2, stats2) => {
      cb(_error1, Math.sign(stats1.size - stats2.size));
    });
  });
};
// END
