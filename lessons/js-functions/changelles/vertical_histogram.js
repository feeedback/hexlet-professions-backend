/* eslint-disable no-unused-expressions */
// sc: https://ru.hexlet.io/challenges/js_functions_vertical_histogram/instance

// Игральная кость — шестигранный кубик, который бросается несколько раз. Гистограмма —
// это графическое представление данных в виде столбцов или колонок.

//     histogram.js

// Реализуйте и экспортируйте по умолчанию функцию, которая выводит на экран вертикальную
// гистограмму. Функция принимает на вход количество бросков кубика и функцию, которая
// имитирует бросок игральной кости (её реализовывать не нужно). Вызов этой функции
// генерирует значение от 1 до 6, что соответствует одной из граней игральной кости.

// Гистограмма содержит столбцы, каждой из которых соответствует грань игральной кости и
// количество выпадений этой грани. Результаты отображаются графически (с помощью символов
// #) и в виде процентного значения от общего количества бросков, за исключением случаев,
// когда количество равно 0 (нулю).

// Дополнительные условия:

// Строки не должны содержать лишние пробелы справа.
// Процентные значения должны быть прижаты влево относительно столбца.
// Значения сторон игральной кости должны быть посредине столбца.
// Столбцы между собой разделены пробелом
// Количество секций в столбце (высота столбца) должно соответствовать количеству
// выпадений каждой из сторон игральной кости.

// Подсказки:
// Гистограмма  https://ru.wikipedia.org/wiki/Гистограмма
// Для решения задачи активно используйте функции из библиотеки lodash.
// При получении процентного значения используйте стандартные правила округления числа.

const _ = require('lodash');

const getHistogramArr = (sides, counts, sum, COL_WIDTH) => {
  const max = _.max(Object.values(counts));
  const getPercent = (count) => `${Math.round((count / sum) * 100)}%`;

  const getRow = (side) => {
    const row = [];
    const count = _.get(counts, side, 0);
    const percent = getPercent(count).padEnd(COL_WIDTH, ' ');

    _.times(max - count, () => row.push(' '.repeat(COL_WIDTH)));
    row.push(count > 0 ? percent : ' '.repeat(COL_WIDTH));
    _.times(count, () => row.push('#'.repeat(COL_WIDTH)));

    return row;
  };

  const horizontal = sides.map(getRow);
  const vertical = _.unzip(horizontal);
  return vertical;
};

const play = (rollsCount, rollDie) => {
  const SIDES_NUMBER = 10;
  const COL_WIDTH = 3;
  const rolls = _.times(rollsCount, rollDie);
  const sides = _.range(1, SIDES_NUMBER + 1);
  const counts = _.countBy(rolls);

  const histogramArr = getHistogramArr(sides, counts, rollsCount, COL_WIDTH);

  const lineDash = '-'.repeat((COL_WIDTH + 1) * SIDES_NUMBER).slice(0, -1);
  const lineDigits = sides
    .map((side) => _.pad(side, COL_WIDTH, ' '))
    .join(' ')
    .trimRight();

  const histogram = histogramArr
    .map((row) => row.join(' ').trimRight())
    .concat(lineDash, lineDigits)
    .join('\n');

  console.log(histogram);
};

console.log(play(50, () => _.random(1, 10)));

`
                28%
                ###
                ###
        19%     ###
        ### 16% ### 16%
13%     ### ### ### ###
### 9%  ### ### ### ###
### ### ### ### ### ###
### ### ### ### ### ###
### ### ### ### ### ###
-----------------------
 1   2   3   4   5   6
`;
