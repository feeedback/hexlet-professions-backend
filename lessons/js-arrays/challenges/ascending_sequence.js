// sc: https://ru.hexlet.io/challenges/js_arrays_ascending_sequence/instance

// arrays.js
// Реализуйте и экспортируйте по умолчанию функцию isContinuousSequence, которая
// проверяет, является ли переданная последовательность целых чисел возрастающей непрерывно (не
// имеющей пропусков чисел). Например, последовательность [4, 5, 6, 7] — непрерывная, а [0, 1, 3] —
// нет. Последовательность может начинаться с любого числа, главное условие — отсутствие пропусков
// чисел. Последовательность из одного числа не может считаться возрастающей.

const isContinuousSequence = (nums) => {
    for (let i = 0; i < nums.length - 1; i++) {
        if (nums[i] !== nums[i + 1] - 1) {
            return false;
        }
    }
    return nums.length > 1;
};
console.log(isContinuousSequence([1, 2, 3]));
