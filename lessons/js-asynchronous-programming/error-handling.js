// sc:
// https://ru.hexlet.io/courses/js-asynchronous-programming/lessons/error-handling/exercise_unit

// file.js
// Реализуйте и экспортируйте функцию move, которая асинхронно перемещает файл из одного
// места в другое. Ее параметры:
// Путь до файла исходника
// Путь по которому нужно копировать файл
// Колбэк, у которого единственный аргумент — ошибка.

// Алгоритм работы функции следующий:
// Читаем исходный файл
// Создаём новый файл и записываем туда данные исходного файла (это важно сделать до
// попытки удаления исходного файла!)
// Удаляем исходный файл Реальная функция move устроена не так. Если исходник и приемник
// находятся на одном устройстве, то копирования не происходит, меняются лишь указатели в
// фс

// import { move } from './file.js';

// move('/opt/myfile', '/tmp/newfile', (error) => {
//   if (error) {
//     console.log('oops');
//     return;
//   }
//   console.log('yes!')
// });
// Другие примеры смотрите в тестах

// Подсказки
// fs.unlink - удаление файла
// https://nodejs.org/api/fs.html#fs_fs_unlink_path_callback
// fs.readFile - чтение файла
// https://nodejs.org/api/fs.html#fs_fs_readfile_path_options_callback
// fs.writeFile - запись в файл
// https://nodejs.org/api/fs.html#fs_fs_writefile_file_data_options_callback

// @ts-check
/* eslint-disable import/prefer-default-export */
import fs from 'fs';

// BEGIN (write your solution here)
export const move = (path, newPath, callback) => {
    fs.readFile(path, 'utf-8', (error1, data1) => {
        if (error1) {
            callback(error1);
            return;
        }
        fs.writeFile(newPath, data1, 'utf-8', (error2) => {
            if (error2) {
                callback(error2);
                return;
            }
            fs.unlink(path, callback);
        });
    });
};
// END
