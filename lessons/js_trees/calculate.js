/* eslint-disable no-undef */
// sc: https://ru.hexlet.io/courses/js-trees/lessons/calculate/exercise_unit

// Во многих операционных системах (Linux, MacOS) существует утилита du. Она умеет
// подсчитывать занимаемое место указанными файлами и директориями. Например так:

//  tmp$ du -sh *
//   0B    com.docker.vmnetd.socket
//  10M    credo
// 4.0K    debug.mjs
//   0B    filesystemui.socket
// 4.0K    index.php
//  37M    node_modules
//  88K    package-lock.json
//  22M    taxdome
//   Перед тем как делать упражнение, обязательно попробуйте поиграйте с этой
//   утилитой в терминале, посмотрите ее опции через man du.

// du.js
// Реализуйте и экспортируйте по умолчанию функцию, которая принимает на вход
// директорию, а возвращает список узлов вложенных (директорий и файлов) в
// указанную директорию на один уровень и место которое они занимают. Размер файла
// задается в метаданных. Размер директории складывается из сумм всех размеров
// файлов находящихся внутри во всех подпапках. Сами папки размера не имеют.

// Обратите внимание на структуру результирующего массива. Каждый элемент - массив
// с двумя значениями, именем директории и размером файлов внутри.
// Результат отсортирован по размеру в обратном порядке. То есть сверху самые
// тяжелые, внизу самые легкие
// const tree = mkdir('/', [
//   mkdir('etc', [
//     mkdir('apache'),
//     mkdir('nginx', [
//       mkfile('nginx.conf', { size: 800 }),
//     ]),
//     mkdir('consul', [
//       mkfile('config.json', { size: 1200 }),
//       mkfile('data', { size: 8200 }),
//       mkfile('raft', { size: 80 }),
//     ]),
//   ]),
//   mkfile('hosts', { size: 3500 }),
//   mkfile('resolve', { size: 1000 }),
// ]);

// du(tree);
// // [
// //   ['etc', 10280],
// //   ['hosts', 3500],
// //   ['resolve', 1000],
// // ]

// Подсказки
// sort

import _ from 'lodash';
// import { isFile, getName, getMeta, getChildren } from '@hexlet/immutable-fs-trees';

// BEGIN (write your solution here)
const calcSize = (tree) => {
  if (isFile(tree)) {
    return getMeta(tree).size;
  }

  const children = getChildren(tree);
  const sizes = children.map(calcSize);
  return _.sum(sizes);
};

const du = (tree) => {
  const children = getChildren(tree);
  const result = children
    .map((child) => [getName(child), calcSize(child)])
    .sort(([, sizeA], [, sizeB]) => sizeB - sizeA);

  return result;
};
export default du;
// END
