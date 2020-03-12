// sc: https://ru.hexlet.io/challenges/js_collections_findodd

// Дан массив чисел. Каждое число в массиве встречается четное количество раз, кроме одного.
// Реализуйте и экспортируйте функцию по умолчанию,
//   которая принимает массив чисел и возвращает число, которое встречается нечетное количество раз.

const findOdd = (arr) => arr.find((num) => arr.filter((num2) => num === num2).length % 2);

const numbers = [1, 2, 4, 2, 4, 1, 5, 3, 3];
console.log(findOdd(numbers));
