/* eslint-disable no-undef */
// sc: https://ru.hexlet.io/courses/js-trees/lessons/accumulator/exercise_unit

// findFilesByName.js
// Реализуйте и экспортируйте по умолчанию функцию, которая принимает на вход
// файловое дерево и подстроку, а возвращает список файлов, имена которых содержат
// эту подстроку. Функция должна вернуть полные пути до файлов.

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

// findFilesByName(tree, 'co');
// // => ['/etc/nginx/nginx.conf', '/etc/consul/config.json']
// Для реализации этой логики, вам понадобится аккумулятор, в котором будет
// храниться путь от корня до текущего узла. При проваливании внутрь директорий к
// нему добавляется имя текущей директории. В остальном логика работы идентична
// примеру из теории.

// Подсказки
// Переменную содержащую внутри себя путь от корня до текущего узла можно назвать
// ancestry.
// Для построения путей используйте функцию path.join().
// Проверку вхождения строк можно делать с помощью функции str.includes()

// import path from 'path';
// import { isFile, getName, getChildren } from '@hexlet/immutable-fs-trees';

// BEGIN (write your solution here)
const findFilesByName = (tree, str) => {
    const iter = (node, ancestry) => {
        const name = getName(node);
        const newAncestry = path.join(ancestry, name);

        if (isFile(node)) {
            return name.includes(str) ? newAncestry : [];
        }

        const children = getChildren(node);
        return children.flatMap((child) => iter(child, newAncestry));
    };

    return iter(tree, '');
};
export default findFilesByName;
// END
