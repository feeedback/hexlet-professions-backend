// sc: https://ru.hexlet.io/challenges/js_trees_itinerary/instance

// itinerary.js
// Реализуйте и экспортируйте по умолчанию функцию itinerary, которая выстраивает маршрут
// между городами.

// Функция принимает 3 аргумента:
// дерево городов
// город старта
// город окончания маршрута

// и возвращает массив городов, выстроенный в том же порядке, в котором они находятся на
// пути следования по маршруту.

// Примеры
// const tree = [
//     'Moscow',
//     [
//         ['Smolensk'],
//         ['Yaroslavl'],
//         [
//             'Voronezh',
//             [
//                 ['Liski'],
//                 ['Boguchar'],
//                 ['Kursk', [['Belgorod', [['Borisovka']]], ['Kurchatov']]],
//             ],
//         ],
//         ['Ivanovo', [['Kostroma'], ['Kineshma']]],
//         ['Vladimir'],
//         ['Tver', [['Klin'], ['Dubna'], ['Rzhev']]],
//     ],
// ];

// itinerary(tree, 'Dubna', 'Kostroma');
// // ['Dubna', 'Tver', 'Moscow', 'Ivanovo', 'Kostroma']
// itinerary(tree, 'Borisovka', 'Kurchatov');
// // ['Borisovka', 'Belgorod', 'Kursk', 'Kurchatov']

// Подсказки
// Используйте функции из библиотеки lodash.
// Работа с иерархическими структурами данных https://youtu.be/95_U0FfM26Q
const _ = require('lodash');

const treeEx = [
  'Moscow',
  [
    ['Smolensk'],
    ['Yaroslavl'],
    ['Voronezh', [['Liski'], ['Boguchar'], ['Kursk', [['Belgorod', [['Borisovka']]], ['Kurchatov']]]]],
    ['Ivanovo', [['Kostroma'], ['Kineshma']]],
    ['Vladimir'],
    ['Tver', [['Klin'], ['Dubna'], ['Rzhev']]],
  ],
];

const itinerary = (cityTree, cityStart, cityFinish) => {
  const findCity = (tree, query) => {
    //
    if (tree.length === 1) {
      if (tree.includes(query)) {
        // console.log('++++++++++++++++++++++');
        return tree;
      }
    } else if (tree.length >= 2) {
      if (tree.includes(query)) {
        console.log('++++++++++++++++++++++');
        console.dir(tree);
        return tree;
      }
      return tree.find((e) => findCity(e, query));
    }
    return false;
  };
  const findRoad = () => {
    const road = [];
    road.push(cityStart);
    let next = cityStart;
    while (next !== cityFinish) {
      const res = findCity(cityTree, next);
      console.log(res);
      next = res[0];
      road.push(next);
    }
    return road;
  };
  return findRoad();
};

// export default itinerary;
console.log(`GOGOGO ${itinerary(treeEx, 'Dubna', 'Kostroma')}`);
// ['Dubna', 'Tver', 'Moscow', 'Ivanovo', 'Kostroma']

// itinerary(treeEx, 'Borisovka', 'Kurchatov');
// ['Borisovka', 'Belgorod', 'Kursk', 'Kurchatov']

const traverse = (obj) => {
  for (const value of obj) {
    if (typeof value === 'object') {
      traverse(value);
    } else {
      // s
    }
  }
};
