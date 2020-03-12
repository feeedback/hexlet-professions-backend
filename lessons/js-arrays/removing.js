// sc: https://ru.hexlet.io/courses/js-arrays/lessons/removing/exercise_unit

// arrays.js;
// Реализуйте функцию getSameParity, которая принимает на вход массив чисел и возвращает новый,
// состоящий из элементов, у которых такая же чётность, как и у первого элемента входного массива.
// Экспортируйте функцию по умолчанию.

const getSameParity = (nums) => {
    if (nums.length === 0) {
        return nums;
    }
    const parity1st = Math.abs(nums[0]) % 2;
    return nums.filter((n) => Math.abs(n) % 2 === parity1st);
};
export default getSameParity;
