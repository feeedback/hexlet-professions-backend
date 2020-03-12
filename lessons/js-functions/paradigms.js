// sc: https://ru.hexlet.io/courses/js-functions/lessons/paradigms/exercise_unit

// arrays.js

// Реализуйте функцию getDifference, которая принимает на вход два массива, а возвращает
// массив, составленный из элементов первого, которых нет во втором. Сделайте решение
// функциональным.

const getDifference = (data, exclude) => data.filter((e) => !exclude.includes(e));
export default getDifference;
