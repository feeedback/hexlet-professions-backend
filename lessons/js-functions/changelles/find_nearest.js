// sc: https://ru.hexlet.io/challenges/js_functions_find_nearest/instance

// findIndexOfNearest.js

// Реализуйте и экспортируйте по умолчанию функцию, которая принимает на вход массив чисел
// и искомое число. Задача функции — найти в массиве ближайшее число к искомому и вернуть
// его индекс в массиве.

// Если в массиве содержится несколько чисел, одновременно являющихся ближайшими к
// искомому числу, то возвращается наименьший из индексов ближайших чисел.

export default (nums, wanted) => {
    let minIndex = 0;
    for (let i = 0, minDiff = Infinity; i < nums.length; i += 1) {
        const diff = Math.abs(wanted - nums[i]);
        if (diff < minDiff) {
            minIndex = i;
            minDiff = diff;
        }
    }
    return nums.length ? minIndex : null;
};

export const findIndexOfNearest = (nums, wanted) => {
    if (nums.length === 0) {
        return null;
    }
    const diffs = nums.map((n) => Math.abs(wanted - n));

    return diffs.reduce(
        (minIndex, diff, index) => (diff < diffs[minIndex] ? index : minIndex),
        0
    );
};
