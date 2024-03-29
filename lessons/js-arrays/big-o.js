// sc: https://ru.hexlet.io/courses/js-arrays/lessons/big-o/exercise_unit

// arrays.js
// Реализуйте и экспортируйте по умолчанию функцию getIntersectionOfSortedArrays, которая принимает
// на вход два отсортированных массива и находит их пересечение.

// Алгоритм
// Поиск пересечения двух неотсортированных массивов — операция, в рамках которой
// выполняется вложенный цикл с полной проверкой каждого элемента первого массива на вхождение во
// второй.

// Сложность данного алгоритма O(n * m) (произведение n и m), где n и m — размерности массивов. Если
// массивы отсортированы, то можно реализовать алгоритм, сложность которого уже O(n + m), что
// значительно лучше.

// Суть алгоритма довольно проста. В коде вводятся два указателя (индекса) на каждый из массивов.
// Начальное значение каждого указателя 0. Затем идёт проверка элементов, находящихся под этими
// индексами в обоих массивах. Если они совпадают, то значение заносится в результирующий массив, а
// оба индекса инкрементируются. Если значение в первом массиве больше, чем во втором, то
// инкрементируется указатель второго массива, иначе — первого.

export default (numsA, numsB) => {
  const intersection = [];
  let a = 0;
  let b = 0;
  while (a < numsA.length && b < numsB.length) {
    if (numsA[a] === numsB[b]) {
      intersection.push(numsA[a]);
      a += 1;
      b += 1;
    } else if (numsA[a] > numsB[b]) {
      b += 1;
    } else {
      a += 1;
    }
  }
  return intersection;
};
const bad = (numsA, numsB) => {
  const intersection = [];
  let a = 0;
  let b = 0;
  const fns = {
    0: () => {
      intersection.push(numsA[a]);
      a += 1;
      b += 1;
    },
    1: () => {
      b += 1;
    },
    '-1': () => {
      a += 1;
    },
  };
  while (a < numsA.length && b < numsB.length) {
    fns[Math.sign(numsA[a], numsB[b])]();
  }
  return intersection;
};
