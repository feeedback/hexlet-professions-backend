/* eslint-disable no-undef */
// sc: https://ru.hexlet.io/challenges/js_functions_dictionaries_merge/instance

// dictionary.js
// Реализуйте и экспортируйте по умолчанию функцию, которая объединяет несколько
// словарей (объектов) в один общий словарь. Функция принимает любое количество
// аргументов и возвращает результат в виде объекта, в котором каждый ключ
// содержит массив уникальных значений. Элементы в массиве располагаются в том
// порядке, в котором они появляются во входящих словарях.

// Примеры
// merge({}, {}, {});
// // {}

// merge({ a: 1, b: 2 }, { a: 3 });
// // { a: [1, 3], b: [2]] }

// merge(
//     { a: 1, b: 2, c: 3 },
//     {},
//     { a: 3, b: 2, d: 5 },
//     { a: 6 },
//     { b: 4, c: 3, d: 2 },
//     { e: 9 },
//   );
// // { a: [1, 3, 6], b: [2, 4], c: [3], d: [5, 2], e: [9] }

// import _ from 'lodash';

// BEGIN (write your solution here)
const cons = (array, el) => _.union(array, [el]);
export default (...dicts) => _.mergeWith({}, ...dicts, cons);
// END

// без lodash

// export default (...dicts) => {
//     const resObj = {};

//     dicts.forEach((obj) =>
//         Object.entries(obj).forEach(([key, value]) => {
//             console.log(resObj);
//             console.log([key, value]);
//             if (_.has(resObj, key)) {
//                 if (!resObj[key].includes(value)) {
//                     resObj[key].push(value);
//                 }
//             } else {
//                 resObj[key] = [value];
//             }
//         })
//     );

//     return resObj;
// };
