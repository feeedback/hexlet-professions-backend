// sc: https://ru.hexlet.io/courses/js-arrays/lessons/for-of/exercise_unit

// arrays.js
// Реализуйте и экспортируйте по умолчанию функцию, которая высчитывает среднее арифметическое
// элементов переданного массива. Благодаря этой функции мы наконец-то посчитаем среднюю температуру
// по больнице :)

const calculateAverage0 = (arr) =>
    !arr.length ? null : arr.reduce((sum, n) => sum + n, 0) / arr.length;

const calculateAverage = (arr) => {
    if (arr.length === 0) {
        return null;
    }
    const sum = arr.reduce((acc, n) => acc + n, 0);
    return sum / arr.length;
};
export default calculateAverage;
