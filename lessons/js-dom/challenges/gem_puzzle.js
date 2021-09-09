// sc: https://ru.hexlet.io/challenges/js_dom_gem_puzzle/instance

// Модификация игры в пятнашки, в которой управление осуществляется с помощью стрелок.

// application.js
// Реализуйте игру в соответствие со следующими требованиями:

// Размер поля должен быть 4x4
// В начальной позиции пустым всегда является правый нижний квадрат
// Элементы формируются случайным образом по следующему алгоритму: сначала они
// перемешиваются используя randomize(values), а затем они наполняют таблицу.
// Таблица должна заполняться значениями сверху вниз, то есть пятый элемент,
// добавляемый в неё, находится по индексам [0, 1];
// Перемещение костяшек происходит с помощью стрелок.

// Так как тесты завязаны на верстку (Bootstrap), то к ней предъявляются особые
// требования. Вот как выглядит начальная позиция:

// <div class="gem-puzzle">
//     <table class="table-bordered">
//         <tbody>
//             <tr>
//                 <td class="p-3">10</td>
//                 <td class="p-3">11</td>
//                 <td class="p-3">6</td>
//                 <td class="p-3">4</td>
//             </tr>
//             <tr>
//                 <td class="p-3">14</td>
//                 <td class="p-3">2</td>
//                 <td class="p-3">12</td>
//                 <td class="p-3">1</td>
//             </tr>
//             <tr>
//                 <td class="p-3">3</td>
//                 <td class="p-3">13</td>
//                 <td class="p-3">9</td>
//                 <td class="p-3">8</td>
//             </tr>
//             <tr>
//                 <td class="p-3">5</td>
//                 <td class="p-3">7</td>
//                 <td class="p-3">15</td>
//                 <td class="p-3 table-active"></td>
//             </tr>
//         </tbody>
//     </table>
// </div>

// Класс таблицы постоянен
// У каждой ячейки проставлен класс p-3
// Пустая ячейка не содержит текста.
// У пустой ячейки добавляется класс table-active

// Подсказки
// Нажатие на клавиши генерирует код, по которому можно понять что за клавиша была нажата
// Коды для стрелок можно подсмотреть в тестах

import _ from 'lodash';

// from lessons/event-stages
const NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
const generatePlayingField = (values) => {
  const tableEl = document.createElement('table');
  tableEl.className = 'table-bordered';
  for (let i = 0; i < 4; i += 1) {
    const row = tableEl.insertRow();
    for (let j = 0; j < 4; j += 1) {
      const cell = row.insertCell();
      cell.className = 'p-3';
      if (i === 3 && j === 3) {
        cell.classList.add('table-active');
      } else {
        cell.textContent = values[i + j * 4];
      }
    }
  }
  return tableEl;
};

const getCoordsCell = (cell) => {
  const {
    cellIndex,
    parentElement: { rowIndex },
  } = cell;
  return { y: rowIndex, x: cellIndex };
};

const mapKeys = {
  ArrowLeft: { getMovingCell: (table, x, y) => table.rows[y]?.cells[x + 1] },
  ArrowRight: { getMovingCell: (table, x, y) => table.rows[y]?.cells[x - 1] },
  ArrowUp: { getMovingCell: (table, x, y) => table.rows[y + 1]?.cells[x] },
  ArrowDown: { getMovingCell: (table, x, y) => table.rows[y - 1]?.cells[x] },
};

export default (randomize = _.shuffle) => {
  const box = document.querySelector('.gem-puzzle');
  const fieldGame = generatePlayingField(randomize(NUMBERS));
  box.append(fieldGame);

  const gameLogic = (event) => {
    event.preventDefault();
    if (!_.has(mapKeys, event.key)) {
      return;
    }
    const emptyCell = fieldGame.querySelector('td.table-active');
    const { y, x } = getCoordsCell(emptyCell);

    const movingCell = mapKeys[event.key].getMovingCell(fieldGame, x, y);
    if (!movingCell) {
      return;
    }
    emptyCell.textContent = movingCell.textContent;
    movingCell.textContent = '';
    emptyCell.classList.remove('table-active');
    movingCell.classList.add('table-active');
  };

  document.addEventListener('keyup', gameLogic);
};
