/* eslint-disable import/prefer-default-export */
// sc: https://ru.hexlet.io/challenges/js_arrays_sea_battle/instance

// Перед вами популярная игра "Морской бой".

// solution.js
// Реализуйте и экспортируйте функцию calcShipsCount, которая принимает на вход
// поле боя в виде квадратного двумерного массива из нулей и единиц. Ноль — пустая
// ячейка, единица — часть корабля. Функция должна вернуть количество кораблей на
// поле боя.

// Так как корабли не должны соприкасаться друг с другом, реализуйте и
// экспортируйте функцию isValidateField, которая проверяет расстановку кораблей
// на корректность.

// Примеры
// calcShipsCount([]); // 0
// calcShipsCount([
//   [0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 1, 0, 0],
//   [0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 1],
//   [0, 0, 0, 0, 0, 1],
//   [1, 1, 0, 1, 0, 0],
// ]); // 6

// isValidateField([
//   [1, 0, 0, 0],
//   [1, 1, 0, 1],
//   [0, 0, 0, 0],
//   [0, 1, 1, 1],
// ]); // false

// BEGIN (write your solution here)
export const isValidateField = (field) => {
  const isNeighborhoodEmpty = (cell) => {
    const [x, y] = cell;

    const upLeft = field[x - 1]?.[y - 1];
    const upRight = field[x + 1]?.[y - 1];
    const downLeft = field[x - 1]?.[y + 1];
    const downRight = field[x + 1]?.[y + 1];

    const isDiagonalsEmpty = !(upLeft || upRight || downLeft || downRight);
    return isDiagonalsEmpty;
  };

  for (let y = 0; y < field.length; y++) {
    for (let x = 0; x < field[y].length; x++) {
      if (field[x][y] === 1 && !isNeighborhoodEmpty([x, y])) {
        return false;
      }
    }
  }
  return true;
};

// export const calcShipsCount = (field) => {
//     // идти сначала по строке вправо, если вертикально снизу нет 1, то корабль в длину.
//     // если есть, иду вертикально вниз.
//     // и заменяю единички на нули, и увеличиваю счётчик когда корабль закончится
//     // то если по направлению вниз или вправо нет 1 (0 или стена)
//     let shipsCount = 0;

//     const calcShip = (cellShip) => {
//         const [x, y] = cellShip;
//         if (field[y]?.[x + 1] === 1) {
//             // корабль идет горизонтально вправо
//             field[y][x] = 0;
//             calcShip([x + 1, y]);
//         } else if (field[y + 1]?.[x] === 1) {
//             // корабль идет вертикально вниз
//             field[y][x] = 0;
//             calcShip([x, y + 1]);
//         } else {
//             // корабль единичного размера
//             field[y][x] = 0;
//             shipsCount += 1;
//         }
//     };

//     for (let y = 0; y < field.length; y++) {
//         const row = field[y];
//         for (let x = 0; x < row.length; x++) {
//             if (field[y][x] === 1) {
//                 const startShip = [x, y];
//                 calcShip(startShip);
//             }
//         }
//     }

//     return shipsCount;
// };
// END

export const calcShipsCount = (battleField) => {
  let shipsCount = 0;
  const fieldSize = battleField.length;
  for (let row = 0; row < fieldSize; row += 1) {
    for (let col = 0; col < fieldSize; col += 1) {
      if (battleField[row][col] === 1) {
        if (!battleField[row - 1]?.[col] && !battleField[row][col - 1]) {
          shipsCount += 1;
        }
      }
    }
  }

  return shipsCount;
};
