/* eslint-disable func-names */
// sc: https://ru.hexlet.io/courses/js-introduction-to-oop/lessons/boxing/exercise_unit

// Это задание хоть и небольшое, но хитрое, его иногда задают на собеседованиях. Если не
// получится его решить сразу – не сдавайтесь. Оно стоит того чтобы разобраться
// самостоятельно (задавайте вопросы!)

// magic.js
// Реализуйте и экспортируйте по умолчанию функцию, которая работает следующим образом:

// Принимает на вход любое число аргументов и возвращает функцию, которая, в свою очередь,
// принимает на вход любое количество аргументов и так до бесконечности (привет, рекурсия
// ;)).
// Результат вызова этой функции при проверке на равенство должен быть равен сумме всех
// аргументов всех подфункций.
// magic() == 0; // true
// magic(5, 2, -8) == -1; // true
// magic(1, 2)(3, 4, 5)(6)(7, 10) == 38; // true
// magic(4, 8, 1, -1, -8)(3)(-3)(7, 2) == 13; // true

// Подсказки
// Функции это объекты

const magic1 = (magicNum = 0) => {
    let sum = magicNum;
    const inner = (innerNum = 0) => {
        sum += innerNum;
        return inner;
    };
    inner.valueOf = function() {
        console.log(`sum ${sum}`);
        return sum;
    };
    return inner;
}; // работает для одного

function magic2(...magicNum) {
    let sum = magicNum.reduce((a, b) => a + b, 0);
    const inner = (...innerNum) => {
        sum += innerNum.reduce((a, b) => a + b, 0);
        return inner;
    };
    inner.valueOf = function() {
        console.log(`sum ${sum}`);
        return sum;
    };
    return inner;
}
// общее состояние, для разных путей функции
// не сразу понял, что рекурсия должна быть через вызов родительской

const magic = (...a) => {
    const sum = a.reduce((acc, n) => acc + n, 0);

    const inner = (...b) => magic(sum, ...b);
    inner.valueOf = () => sum;
    return inner;
};
// export default magic;
