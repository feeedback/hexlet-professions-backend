// sc: https://ru.hexlet.io/courses/js-arrays/lessons/exchange/exercise_unit
// arrays.js
// Реализуйте и экспортируйте по умолчанию функцию swap, которая меняет местами два
// элемента относительно переданного индекса.Например, если передан индекс 5, то функция
// меняет местами элементы, находящиеся по индексам 4 и 6.

// Параметры функции:

// Массив
// Индекс
// Если хотя бы одного из индексов не существует, функция возвращает исходный массив.

const swap = (arr, pivotIndex) => {
    const prev = pivotIndex - 1;
    const next = pivotIndex + 1;
    if (!(prev in arr && next in arr)) return arr;

    const resArr = arr.slice();
    const temp = resArr[prev];
    resArr[prev] = resArr[next];
    resArr[next] = temp;

    return resArr;
};
export default swap;
