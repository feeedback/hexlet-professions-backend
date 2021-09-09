// sc: https://ru.hexlet.io/challenges/js_arrays_chunk/instance

// chunk.js

// Реализуйте и экспортируйте функцию по умолчанию, которая принимает на вход массив и
// число, которое задает размер чанка (куска). Функция должна вернуть массив, состоящий из чанков
// указанной размерности.

const chunkRecursive = (arr, size) => {
  if (size > arr.length) {
    return arr.length ? [arr] : arr;
  }
  const head = arr.slice(0, size);
  const tail = arr.slice(size);
  return [head, ...chunk(tail, size)];
};
const chunk = (arr, size) => {
  const nArr = [];
  for (let i = 0; i < arr.length; i += size) {
    nArr.push(arr.slice(i, i + size));
  }
  return nArr;
};
console.log(chunk(['a', 'b', 'c', 'd', 'e'], 2));
