/* eslint-disable no-undef */
// sc: https://ru.hexlet.io/courses/js-arrays/lessons/modification/exercise_unit

// arrays.js
// Реализуйте и экспортируйте функцию swap(), которая меняет местами первый и
// последний элемент массива. Если массив содержит меньше двух элементов, то он
// возвращается как есть.

// import { swap } from '../arrays';

// swap([]); // []
// swap([1]); // [1]
// swap([1, 2]); // [2, 1]
// swap(['one', 'two', 'three']); // ['three', 'two', 'one']
// Подсказки
// Чтобы поменять местами значения, нужно использовать третью переменную

/* eslint-disable no-param-reassign, prefer-destructuring, import/prefer-default-export */

// BEGIN (write your solution here)
export const swap = (arr) => {
  if (arr.length < 2) {
    return arr;
  }
  const temp = arr[0];
  arr[0] = arr[arr.length - 1];
  arr[arr.length - 1] = temp;

  return arr;
};
// END
