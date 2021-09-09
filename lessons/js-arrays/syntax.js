// sc: https://ru.hexlet.io/courses/js-arrays/lessons/syntax/exercise_unit

// Реализуйте функцию apply, которая выполняет операции с массивом.
// Всего нужно реализовать четыре операции:

// reset - Возвращает пустой массив
// get - Возвращает значение по индексу
// change - Изменяет значение по индексу и возвращает обновлённый массив
// Операция по умолчанию - Если имя операции не передано или не соответствует
// ни одному из вышеперечисленных, необходимо вернуть исходный массив

const apply = (arr, operationName, index, value) => {
  // BEGIN (write your solution here)
  const fns = {
    reset: () => [],
    get: () => arr[index],
    change: () => {
      const resArr = arr.slice();
      resArr[index] = value;
      return resArr;
    },
  };
  return operationName in fns ? fns[operationName]() : arr;
  // END
};

export default apply;
