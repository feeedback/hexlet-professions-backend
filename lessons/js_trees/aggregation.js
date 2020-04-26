/* eslint-disable no-undef */
// sc: https://ru.hexlet.io/courses/js-trees/lessons/aggregation/exercise_unit

// getHiddenFilesCount.js
// Реализуйте и экспортируйте по умолчанию функцию, которая считает количество
// скрытых файлов в директории и всех поддиректориях. Скрытым файлом в Linux
// системах считается файл, название которого начинается с точки.

// import { mkdir, mkfile } from '@hexlet/immutable-fs-trees';
// import getHiddenFilesCount from '../getHiddenFilesCount.js';

// const tree = mkdir('/', [
//   mkdir('etc', [
//     mkdir('apache'),
//     mkdir('nginx', [
//       mkfile('.nginx.conf', { size: 800 }),
//     ]),
//     mkdir('.consul', [
//       mkfile('.config.json', { size: 1200 }),
//       mkfile('data', { size: 8200 }),
//       mkfile('raft', { size: 80 }),
//     ]),
//   ]),
//   mkfile('.hosts', { size: 3500 }),
//   mkfile('resolve', { size: 1000 }),
// ]);

// getHiddenFilesCount(tree) // 3

import _ from 'lodash';
// import { isFile, getName, getChildren } from '@hexlet/immutable-fs-trees';

// BEGIN (write your solution here)
const getNodesCount = (tree) => {
    if (isFile(tree)) {
        return getName(tree).startsWith('.') ? 1 : 0;
    }

    const children = getChildren(tree);
    const descendantCounts = children.map(getNodesCount);
    return _.sum(descendantCounts);
};
export default getNodesCount;
// END
