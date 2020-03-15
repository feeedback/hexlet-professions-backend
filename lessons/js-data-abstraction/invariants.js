// sc: https://ru.hexlet.io/courses/js-data-abstraction/lessons/invariants/exercise_unit

// rational.js
// Реализуйте абстракцию для работы с рациональными числами включающую в себя следующие
// функции:

// Конструктор makeRational - принимает на вход числитель и знаменатель, возвращает дробь.
// Селектор getNumer - возвращает числитель
// Селектор getDenom - возвращает знаменатель
// Сложение add - складывает переданные дроби
// Вычитание sub - находит разность между двумя дробями
// Не забудьте реализовать нормализацию дробей удобным для вас способом.

// const rat1 = makeRational(3, 9);
// getNumer(rat1); // 1
// getDenom(rat1); // 3

// const rat2 = makeRational(10, 3);

// const rat3 = add(rat1, rat2);
// ratToString(rat3); // '11/3'

// const rat4 = sub(rat1, rat2);
// ratToString(rat4); // '-3/1'

// Подсказки:
// Действия с дробями https://ru.wikipedia.org/wiki/Дробь_(математика)#Действия_с_дробями
// Функция gcd находит наибольший общий делитель двух чисел (уже импортирована в модуль)
// Функция ratToString возвращает строковое представление числа (используется для отладки)

// import getGcd from './utils.js';
const getGcd = (a, b) => {
    if (b === 0) {
        return a;
    }

    return getGcd(b, a % b);
};
// BEGIN (write your solution here)
const normalizeRat = ({ numer, denom }) => {
    const gcd = getGcd(numer, denom);
    return { numer: numer / gcd, denom: denom / gcd };
};
const getLcm = (a, b) => Math.abs(a * b) / getGcd(a, b);

const makeRational = (numer, denom) => normalizeRat({ numer, denom });
const getNumer = (rat) => rat.numer;
const getDenom = (rat) => rat.denom;

const twoRatToCommonDenom = (rat1, rat2) => {
    const lcm = getLcm(getDenom(rat1), getDenom(rat2));
    const newNumer1 = (lcm / getDenom(rat1)) * getNumer(rat1);
    const newNumer2 = (lcm / getDenom(rat2)) * getNumer(rat2);
    return [newNumer1, newNumer2, lcm];
};
const add = (rat1, rat2) => {
    const [newNumer1, newNumer2, lcm] = twoRatToCommonDenom(rat1, rat2);
    return makeRational(newNumer1 + newNumer2, lcm);
};
const sub = (rat1, rat2) => {
    const [newNumer1, newNumer2, lcm] = twoRatToCommonDenom(rat1, rat2);
    return makeRational(newNumer1 - newNumer2, lcm);
};

const add2 = (rat1, rat2) => {
    const denom1 = getDenom(rat1);
    const denom2 = getDenom(rat2);
    const newNumer = getNumer(rat1) * denom2 + getNumer(rat2) * denom1;
    const newDenom = denom1 * denom2;

    return makeRational(newNumer, newDenom);
};
const sub2 = (rat1, rat2) => {
    const denom1 = getDenom(rat1);
    const denom2 = getDenom(rat2);
    const newNumer = getNumer(rat1) * denom2 - getNumer(rat2) * denom1;
    const newDenom = denom1 * denom2;

    return makeRational(newNumer, newDenom);
};
// END
const ratToString = (rat) => `${getNumer(rat)}/${getDenom(rat)}`;

export { makeRational, getNumer, getDenom, add, sub, ratToString };
