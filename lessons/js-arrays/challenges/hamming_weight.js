// sc: https://ru.hexlet.io/challenges/js_arrays_hamming_weight/instance

// Вес Хэмминга — это количество единиц в двоичном представлении числа.

// solution.js
// Реализуйте и экспортируйте по умолчанию функцию hammingWeight,
// которая считает вес Хэмминга.

const hammingWeight = (num) => num.toString(2).replace(/0/g, '').length;
// .split('')
// .filter((d) => d === '1').length;
