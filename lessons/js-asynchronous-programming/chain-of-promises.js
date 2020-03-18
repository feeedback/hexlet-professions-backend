// sc:
// https://ru.hexlet.io/courses/js-asynchronous-programming/lessons/chain-of-promises/exercise_unit

// file.js
// Реализуйте и экспортируйте асинхронную функцию getTypes, которая анализирует список
// переданных путей и возвращает массив (в промисе), с описанием того, что находится по
// каждому из путей:

// import { getTypes } from './file.js';

// getTypes(['/etc', '/etc/hosts', '/undefined']).then(console.log);
// // ['directory', 'file', null]
// Эта функция должна отрабатывать успешно в любом случае. Если во время выполнения
// асинхронной операции возникла ошибка, то значением для этого пути будет null. Для
// простоты считаем, что в эту функцию всегда передается как минимум один путь для
// обработки (иначе придется задействовать механизм, который проходится в курсах далее).

// Подсказки
// fs.stat - информация о файле или директории. Для проверки на директорию используйте
// метод isDirectory.
// Методы then и catch не меняют сам промис, а возвращают новый

/* eslint-disable import/prefer-default-export */
import { promises as fs } from 'fs';

// BEGIN (write your solution here)
const getTypeName = (stat) => (stat.isDirectory() ? 'directory' : 'file');

export const getTypesProcedure = (filePaths) => {
    const types = [];

    const statFilePipe = (promise, filepath) =>
        promise
            .then(() => fs.stat(filepath))
            .then((stat) => types.push(getTypeName(stat)))
            .catch(() => types.push(null));

    const promiseAll = filePaths.reduce(statFilePipe, Promise.resolve());
    return promiseAll.then(() => types);
};

export const getTypes = (filesPath) =>
    filesPath.reduce(
        (promise, filepath) =>
            promise.then((result) =>
                fs
                    .stat(filepath)
                    .then((data) => [...result, getTypeName(data)])
                    .catch(() => [...result, null])
            ),
        Promise.resolve([])
    );
// END
