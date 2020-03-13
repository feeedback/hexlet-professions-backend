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

const getHistogramArr = (digits, sum) => {
    const max = _.max(Object.values(digits));
    const getPercent = (count) => `${Math.round((count / sum) * 100)}%`;

    const getRow = ([digit, count]) => {
        const row = [];
        _.times(max - count, () => row.push('   '));
        row.push(count > 0 ? getPercent(count).padEnd(3, ' ') : '   ');
        _.times(count, () => row.push('###'));
        row.push('---');
        row.push(` ${digit} `);

        return row;
    };

    const horizontal = Object.entries(digits).map(getRow);
    const vertical = _.unzip(horizontal);
    return vertical;
};

const play = (rollsCount, rollDie) => {
    const SIDES_NUMBER = 6;
    const rolls = _.times(rollsCount, rollDie);
    const sides = _.range(1, SIDES_NUMBER + 1);
    const digits = {
        ..._.mapValues(sides, () => 0),
        ..._.countBy(rolls),
    };
    console.log(_.mapKeys(sides));
    const histogram = getHistogramArr(digits, rollsCount).map((row) =>
        row.join(' ').trimRight()
    );

    const lineDash = '-'.repeat((3 + 1) * SIDES_NUMBER).slice(0, -1);
    histogram.push(lineDash);
    const lineDigits = sides
        .map((side) => ` ${side} `)
        .join(' ')
        .trimRight();
    histogram.push(lineDigits);

    console.log(histogram.join('\n'));
};

console.log(play(16, () => _.random(1, 6)));

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
