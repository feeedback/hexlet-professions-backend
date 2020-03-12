// sc: https://ru.hexlet.io/courses/js-arrays/lessons/isset/exercise_unit

// arrays.js
// Реализуйте и экспортируйте по умолчанию функцию get, которая извлекает
// из массива элемент по указанному индексу, если индекс существует, либо возвращает
// значение по умолчанию. Функция принимает на вход три аргумента:

// Массив
// Индекс
// Значение по умолчанию (равно null)
const get = (arr, index, defaultValue = null) => (index in arr ? arr[index] : defaultValue);
export default get;
