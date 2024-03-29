// sc:
// https://ru.hexlet.io/courses/js-asynchronous-programming/lessons/event-loop/exercise_unit

// Это задание напрямую не связано с теорией урока, но позволяет еще больше прокачаться в
// работе с асинхронным кодом.

// В библиотеке async есть функция waterfall, которая позволяет строить цепочки
// асинхронных функций без необходимости вкладывать их друг в друга. Подробнее о том как
// она работает, посмотрите в документации. Попробуйте решить данное упражнение с
// применением этой функции.

// file.js
// Реализуйте и экспортируйте асинхронную функцию unionFiles, которую мы рассматривали в
// предыдущих уроках. Вот её обычное решение на колбэках:

// import fs from 'fs';

// const unionFiles = (inputPath1, inputPath2, outputPath, cb) => {
//   fs.readFile(inputPath1, 'utf-8', (error1, data1) => {
//     if (error1) {
//       cb(error1);
//       return;
//     }
//     fs.readFile(inputPath2, 'utf-8', (error2, data2) => {
//       if (error2) {
//         cb(error2);
//         return;
//       }
//       fs.writeFile(outputPath, `${data1}${data2}`, (error3) => {
//         if (error3) {
//           cb(error3);
//           return;
//         }
//         cb(null); // не забываем последний успешный вызов
//       });
//     });
//   });
// }
// Попробуйте написать её, используя указанную выше функцию waterfall.

/* eslint-disable import/prefer-default-export */
import fs from 'fs';
import { waterfall } from 'async';

// BEGIN (write your solution here)
export const unionFiles = (inputPath1, inputPath2, outputPath, callback) => {
  waterfall(
    [
      (cb) => fs.readFile(inputPath1, cb),
      (data1, cb) => fs.readFile(inputPath2, (err, data2) => cb(err, data1, data2)),
      (data1, data2, cb) => fs.writeFile(outputPath, `${data1}${data2}`, cb),
    ],
    callback
  );
};
// END
