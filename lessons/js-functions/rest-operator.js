// sc: https://ru.hexlet.io/courses/js-functions/lessons/rest-operator/exercise_unit

// math.js

// Реализуйте и экспортируйте по умолчанию функцию average, которая возвращает среднее
// арифметическое всех переданных аргументов. Если функции не передать ни одного
// аргумента, то она должна вернуть null.

import { sum } from 'lodash';

export default (...nums) => {
  const count = nums.length;
  if (count === 0) {
    return null;
  }
  return sum(nums) / count;
};
