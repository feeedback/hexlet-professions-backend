// sc: https://ru.hexlet.io/challenges/js_functions_horisontal_histogram/instance

// Игральная кость - шестигранный кубик, который бросается несколько раз. Гистограмма -
// это графическое представление данных в виде столбцов или колонок.

// histogram.js

// Реализуйте и экспортируйте по умолчанию функцию, которая выводит на экран
// горизонтальную гистограмму. Функция принимает на вход количество бросков кубика и
// функцию, которая имитирует бросок игральной кости (её реализовывать не нужно). Вызов
// этой функции генерирует значение от 1 до 6, что соответствует одной из граней игральной
// кости.

// Гистограмма содержит строки, каждой из которых соответствует грань игральной кости и
// количество выпадений этой грани. Результаты отображаются графически (с помощью символов
// #) и в виде числового значения, за исключением случаев, когда количество равно 0
// (нулю).

// Подсказки:
// Гистограмма https://ru.wikipedia.org/wiki/Гистограмма
// Для решения задачи используйте функции из библиотеки lodash

import _ from 'lodash';

export default (rollsCount, rollDie) => {
    const digits = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };

    for (let i = 1; i <= rollsCount; i += 1) {
        digits[rollDie()] += 1;
    }

    const rows = Object.entries(digits).map(([digit, count]) => {
        const row = `${digit}|`;
        return count === 0 ? row : `${row}${'#'.repeat(count)} ${count}`;
    });

    console.log(rows.join('\n'));
};

export const play = (rollsCount, rollDie) => {
    const rolls = _.times(rollsCount, rollDie);
    const digitsCount = {
        ...{ 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 },
        ..._.countBy(rolls),
    };

    const rows = Object.entries(digitsCount).map(([digit, count]) => {
        const row = `${digit}|`;
        return count === 0 ? row : `${row}${'#'.repeat(count)} ${count}`;
    });

    console.log(rows.join('\n'));
};
