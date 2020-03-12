// sc: https://ru.hexlet.io/challenges/js_arrays_summary_ranges/instance

// solution.js

// Реализуйте функцию summaryRanges, которая находит в массиве непрерывные возрастающие
// последовательности чисел и возвращает массив с их перечислением.

const summaryRanges = (nums) => {
    const ranges = [];
    const startRange = [];
    const addRange = (end) => ranges.push(`${startRange.pop()}->${end}`);
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] === nums[i + 1] - 1) {
            if (!startRange.length) {
                startRange[0] = nums[i];
            }
        } else if (startRange.length) {
            addRange(nums[i]);
        }
    }
    return ranges;
};
console.log(summaryRanges([1, 2, 3]).toString());
