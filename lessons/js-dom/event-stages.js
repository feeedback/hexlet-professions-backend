// sc: https://ru.hexlet.io/courses/js-dom/lessons/event-stages/exercise_unit

// Игра в 15 или пятнашки — популярная головоломка, придуманная в 1878 году Ноем
// Чепмэном. Представляет собой набор одинаковых квадратных костяшек с нанесёнными
// числами, заключённых в квадратную коробку. Длина стороны коробки в четыре раза
// больше длины стороны костяшек для набора из 15 элементов, соответственно в
// коробке остаётся незаполненным одно квадратное поле. Цель игры — перемещая
// костяшки по коробке, добиться упорядочивания их по номерам, желательно сделав
// как можно меньше перемещений.

// | 9  | 2  | 12 | 7  |
// |----|----|----|----|
// | 6  | 15 | 10 | 1  |
// |----|----|----|----|
// | 13 | 14 | 5  | 3  |
// |----|----|----|----|
// | 11 | 8  | 4  |    |

// src/application.js
// Реализуйте эту игру внутри функции экспортируемой по-умолчанию, учитывая
// следующие моменты:

// Перемещение происходит по клику. Если номер, на котором был клик, находится
// рядом с пустой областью, то он перемещается на эту область. Если пустой области
// рядом нет, то ничего не происходит.
// При перемещении числа, из текущей ячейки удаляется класс table-active и
// добавляется на ту, откуда происходит перемещение (та что становится пустой).
// В файле уже заданы values, в том порядке в котором они должны появляться в
// выводе. Для упрощения тестирования, этот порядок всегда один и тот же.
// В файле index.html находится div с классом gem-puzzle, именно к нему нужно
// привязывать игру.

// Теги и классы должны совпадать.

// Подсказки
// Используйте дополнительную навигацию доступную в таблицах: rows, cells.
// Достаточно повесить событие на всю таблицу и использовать возможности всплытия
// У cell есть свойство cellIndex у row есть свойство rowIndex
// Вычисление расстояний между соседними клетками

const values = [9, 6, 13, 11, 2, 15, 14, 8, 12, 10, 5, 4, 7, 1, 3];

const generatePlayingField = () => {
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

// BEGIN (write your solution here)
const getDistance = (a, b) => Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
const getCoordsCell = (cell) => {
  const {
    cellIndex,
    parentElement: { rowIndex },
  } = cell;
  return { y: rowIndex, x: cellIndex };
};

export default () => {
  const box = document.querySelector('div.gem-puzzle');
  const getEmptyCell = () => box.querySelector('td.table-active');

  const gameLogic = (event) => {
    const targetCell = event.target;
    const emptyCell = getEmptyCell();
    if (getDistance(getCoordsCell(targetCell), getCoordsCell(emptyCell)) !== 1) {
      return;
    }

    emptyCell.textContent = targetCell.textContent;
    targetCell.textContent = '';
    emptyCell.classList.remove('table-active');
    targetCell.classList.add('table-active');
  };

  const fieldGame = generatePlayingField();
  box.append(fieldGame);
  fieldGame.addEventListener('click', gameLogic);
};
// END
