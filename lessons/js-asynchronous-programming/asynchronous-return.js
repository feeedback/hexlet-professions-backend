// sc:
// https://ru.hexlet.io/courses/js-asynchronous-programming/lessons/asynchronous-return/exercise_unit

// writer.js
// Реализуйте асинхронную функцию, которая записывает данные по указанному пути и
// оповещает о завершении работы через переданный колбэк.

// import write from './writer.js';

// write('./myfile', 'data', () => {
//   console.log('success');
// });

// Подсказки:
// для записи в файл используйте функцию fs.writeFile.
// https://nodejs.org/api/fs.html#fs_fs_writefile_file_data_options_callback

// @ts-check

import fs from 'fs';

// BEGIN (write your solution here)
export default (path, data, callback) => {
  fs.writeFile(path, data, 'utf8', callback);
};
// END
