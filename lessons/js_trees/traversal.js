/* eslint-disable no-undef */
// sc: https://ru.hexlet.io/courses/js-trees/lessons/traversal/exercise_unit

// downcaseFileNames.js
// Реализуйте и экспортируйте по умолчанию функцию, которая принимает на вход
// директорию (объект-дерево), приводит имена всех файлов в этой и во всех
// вложенных директориях к нижнему регистру. Результат в виде обработанной
// директории возвращается наружу.

// import { mkdir, mkfile } from '@hexlet/immutable-fs-trees';
// import downcaseFileNames from './downcaseFileNames.js';

// const tree = mkdir('/', [
//   mkdir('eTc', [
//     mkdir('NgiNx'),
//     mkdir('CONSUL', [
//       mkfile('config.json'),
//     ]),
//   ]),
//   mkfile('hOsts'),
// ]);

// downcaseFileNames(tree);
// // {
// //   name: '/',
// //   type: 'directory',
// //   meta: {},
// //   children: [
// //     {
// //       name: 'eTc',
// //       type: 'directory',
// //       meta: {},
// //       children: [
// //         {
// //           name: 'NgiNx',
// //           type: 'directory',
// //           meta: {},
// //           children: [],
// //         },
// //         {
// //           name: 'CONSUL',
// //           type: 'directory',
// //           meta: {},
// //           children: [{ name: 'config.json', type: 'file', meta: {} }],
// //         },
// //       ],
// //     },
// //     { name: 'hosts', type: 'file', meta: {}, },
// //   ],
// // }

// import {
//   mkdir, mkfile, isFile, getName, getMeta, getChildren,
// } from '@hexlet/immutable-fs-trees';
import _ from 'lodash';

// BEGIN (write your solution here)
const downcaseFileNames = (tree) => {
  const name = getName(tree);
  const newMeta = _.cloneDeep(getMeta(tree));

  if (isFile(tree)) {
    // Возвращаем обновленный файл
    return mkfile(name.toLowerCase(), newMeta);
  }

  // Вызываем рекурсивное обновление каждого ребенка
  const newChildren = getChildren(tree).map(downcaseFileNames);
  // Возвращаем обновленную директорию
  return mkdir(name, newChildren, newMeta);
};
export default downcaseFileNames;
// END
