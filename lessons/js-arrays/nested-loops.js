// sc: https://ru.hexlet.io/courses/js-arrays/lessons/nested-loops/exercise_unit

// arrays.js
// Реализуйте и экспортируйте по умолчанию функцию getSameCount. Она работает так:

// Принимает на вход два массива.
// Считает количество элементов, которые присутствуют в обоих массивах, без учёта повторяющихся.

const getSameCount = (nums1, nums2) => [...new Set(nums1)].filter((n) => nums2.includes(n)).length;
export default getSameCount;
