/* eslint-disable import/prefer-default-export */
// sc:
// https://ru.hexlet.io/courses/js-asynchronous-programming/lessons/parallel-execution/exercise_unit

// info.js
// Реализуйте и экспортируйте асинхронную функцию getDirectorySize, которая считает размер
// переданной директории (не включая поддиректории). Анализ размера файла должен
// происходить параллельно, для этого воспользуйтесь библиотекой async

// import { getDirectorySize } from './info.js';

// getDirectorySize('/usr/local/bin', (err, size) => {
//   console.log(size);
// });
// Подсказка
// fs.readdir - чтение содержимого директории
// path.join - конструирует пути
// async.map
// fs.stat - информация о файле
// _.sumBy - нахождение суммы в массиве

// BEGIN (write your solution here)
export const getDirectorySize = (dirpath, callback) => {
    fs.readdir(dirpath, (error1, names) => {
        if (error1) {
            callback(error1);
            return;
        }
        const files = names.map((name) => path.join(dirpath, name));
        async.map(files, fs.stat, (error2, stats) => {
            if (error2) {
                callback(error2);
                return;
            }
            const onlyFilesStats = stats.filter((stat) => stat.isFile());
            callback(null, _.sumBy(onlyFilesStats, 'size'));
        });
    });
};
// END
