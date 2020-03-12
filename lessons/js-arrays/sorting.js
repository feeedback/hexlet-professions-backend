// sc: https://ru.hexlet.io/courses/js-arrays/lessons/sorting/exercise_unit

// arrays.js

// Реализуйте и экспортируйте по умолчанию функцию bubbleSort, которая сортирует массив
// используя пузырьковую сортировку. Постарайтесь не подглядывать в текст теории и попробуйте
// воспроизвести алгоритм по памяти.

const bubbleSort = (arr) => {
    const res = arr.slice();
    for (let i = 0; i < res.length; i++) {
        for (let j = 0; j < res.length - i; j++) {
            if (res[j] > res[j + 1]) {
                const temp = res[j];
                res[j] = res[j + 1];
                res[j + 1] = temp;
            }
        }
    }
    return res;
};
export default bubbleSort;
