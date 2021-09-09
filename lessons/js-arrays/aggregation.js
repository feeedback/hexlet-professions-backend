// sc: https://ru.hexlet.io/courses/js-arrays/lessons/aggregation/exercise_unit

// arrays.js
// Реализуйте и экспортируйте по умолчанию функцию calculateSum, которая
// высчитывает сумму всех элементов массива, которые делятся без остатка на 3(три).

const calculateSum = (arr) => {
  if (arr.length === 0) {
    return null;
  }
  return arr.reduce((sum, n) => (n % 3 === 0 ? sum + n : sum), 0);
};
export default calculateSum;

console.log([]);
