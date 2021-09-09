// sc: https://ru.hexlet.io/challenges/js_functions_same_parity/instance

// sameParityFilter.js

// Реализуйте и экспортируйте по умолчанию функцию, которая принимает на вход массив и
// возвращает новый, состоящий из элементов, у которых такая же чётность, как и у первого
// элемента входного массива.

const sameParity = (arr) => {
  const isEven = (num) => num % 2 === 0;
  const firstIsEven = isEven(arr[0]);
  return arr.filter((num) => isEven(num) === firstIsEven);
};
export default sameParity;
