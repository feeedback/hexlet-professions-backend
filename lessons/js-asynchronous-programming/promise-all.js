// sc:
// https://ru.hexlet.io/courses/js-asynchronous-programming/lessons/promise-all/exercise_unit

// Это упражнение вы уже делали, но теперь тоже самое нужно сделать с помощью промисов

// file.js
// Реализуйте и экспортируйте асинхронную функцию getDirectorySize, которая считает размер
// переданной директории (не включая поддиректории).

// import { getDirectorySize } from './file.js';
// getDirectorySize('/usr/local/bin').then(console.log);

// Подсказка
// fs.readdir - чтение содержимого директории
// path.join - конструирует пути
// fs.stat - информация о файле
// _.sumBy - нахождение суммы в массиве

/* eslint-disable import/prefer-default-export */
import path from 'path';
import _ from 'lodash';
import { promises as fs } from 'fs';

// BEGIN (write your solution here)
export const getDirectorySize1 = (dirpath) =>
  fs.readdir(dirpath).then((names) => {
    const filepaths = names.map((name) => path.join(dirpath, name));

    const promises = filepaths.map((filepath) => fs.stat(filepath).then((stat) => stat));

    return Promise.all(promises).then((stats) => {
      const onlyFilesStats = stats.filter((stat) => stat.isFile());

      return _.sumBy(onlyFilesStats, 'size');
    });
  });

export const getDirectorySize2 = (dirpath) =>
  fs.readdir(dirpath).then((names) =>
    Promise.all(
      names.map((name) => path.join(dirpath, name)).map((filepath) => fs.stat(filepath).then((stat) => stat))
    ).then((stats) => {
      const onlyFilesStats = stats.filter((stat) => stat.isFile());
      return _.sumBy(onlyFilesStats, 'size');
    })
  );

export const getDirectorySize = (dirpath) => {
  const promise = fs.readdir(dirpath).then((filenames) => {
    const filepaths = filenames.map((name) => path.join(dirpath, name));
    const promises = filepaths.map(fs.stat);

    return Promise.all(promises);
  });

  return promise.then((stats) => {
    const onlyFilesStats = stats.filter((stat) => stat.isFile());

    return _.sumBy(onlyFilesStats, 'size');
  });
};
// END
