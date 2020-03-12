// sc: https://ru.hexlet.io/courses/js-arrays/lessons/set-theory/exercise_unit

// strings.js

// Реализуйте и экспортируйте по умолчанию функцию countUniqChars, которая получает на
// вход строку и считает, сколько символов (без учёта повторяющихся символов) использовано в этой
// строке. Например, в строке 'yy' используется всего один символ — y. А в строке '111yya!' —
// используется четыре символа: 1, y, a и !.

// Задание необходимо выполнить без использования сторонних библиотек.

const countUniqChars = (str) => [...new Set(str.split(''))].length;
export default countUniqChars;
