// sc: https://ru.hexlet.io/challenges/js_arrays_compare_versions/instance

// solution.js

// Реализуйте и экспортируйте по умолчанию функцию compareVersion, которая сравнивает переданные
// версии version1 и version2. Если version1 > version2, то функция должна вернуть 1, если version1
// < version2, то - -1, если же version1 = version2, то - 0.

// Версия - это строка, в которой два числа (мажорная и минорные версии) разделены точкой, например:
// 12.11. Важно понимать, что версия - это не число с плавающей точкой, а несколько чисел не
// связанных между собой. Проверка на больше/меньше производится сравнением каждого числа
// независимо. Поэтому версия 0.12 больше версии 0.2.

// Пример порядка версий:
// 0.1 < 1.1 < 1.2 < 1.11 < 13.37

const split = (version) => version.split('.').map(Number);
const compareVersion = (v1, v2) => {
  const [maj1, min1] = split(v1);
  const [maj2, min2] = split(v2);
  const comparedMajor = Math.sign(maj1 - maj2);
  return comparedMajor !== 0 ? comparedMajor : Math.sign(min1 - min2);
};
export default compareVersion;
