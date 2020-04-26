/* eslint-disable no-undef */
// sc: https://ru.hexlet.io/courses/js-trees/lessons/manipulations/exercise_unit

// tree.js
// Реализуйте и экспортируйте функцию compressImages, которая принимает на вход
// директорию, находит внутри нее картинки и "сжимает" их. Под сжиманием
// понимается уменьшение свойства size в метаданных в два раза. Функция должна
// вернуть обновленную директорию со сжатыми картинками и всеми остальными
// данными, которые были внутри этой директории.

// Картинками считаются все файлы заканчивающиеся на .jpg.

// const tree = mkdir('my documents', [
//   mkfile('avatar.jpg', { size: 100 }),
//   mkfile('passport.jpg', { size: 200 }),
//   mkfile('family.jpg', { size: 150 }),
//   mkfile('addresses', { size: 125 }),
//   mkdir('presentations')
// ]);

// const newTree = compressImages(tree);
// // То же самое, что и tree, но во всех картинках размер уменьшен в два раза

/* eslint-disable import/prefer-default-export */

import _ from 'lodash';
// import {
//     mkdir,
//     mkfile,
//     isFile,
//     getChildren,
//     getName,
//     getMeta,
// } from '@hexlet/immutable-fs-trees';

// BEGIN (write your solution here)
export const compressImages = (tree) => {
    const children = getChildren(tree);

    const compress = (file) => {
        const oldMeta = getMeta(file);
        const newMeta = _.cloneDeep(oldMeta);
        newMeta.size = oldMeta.size / 2;

        return mkfile(getName(file), newMeta);
    };

    const newChildren = children.map((node) =>
        isFile(node) && getName(node).endsWith('.jpg') ? compress(node) : node
    );
    const newMeta = _.cloneDeep(getMeta(tree));
    return mkdir(getName(tree), newChildren, newMeta);
};
// END
